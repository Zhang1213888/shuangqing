import type { NextApiRequest, NextApiResponse } from 'next';

const ASR_API_KEY = process.env.ASR_API_KEY || '';
const ASR_BASE_URL = process.env.ASR_BASE_URL || 'https://api.siliconflow.cn/v1';
const ASR_MODEL = process.env.ASR_MODEL || 'FunAudioLLM/SenseVoiceSmall';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { audioBase64, mimeType } = req.body as { audioBase64?: string; mimeType?: string };

    if (!audioBase64) {
      return res.status(400).json({ error: '缺少 audioBase64' });
    }

    if (!ASR_API_KEY) {
      return res.status(200).json({
        text: '',
        fallback: true,
        message: '未配置云端语音密钥，请使用 Safari/Edge 或移动端浏览器进行原生语音输入',
      });
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');
    const ext = (mimeType || 'audio/webm').includes('webm') ? 'webm'
      : (mimeType || '').includes('mp4') ? 'mp4'
      : (mimeType || '').includes('wav') ? 'wav'
      : 'webm';

    const formData = new FormData();
    const blob = new Blob([audioBuffer], { type: mimeType || 'audio/webm' });
    formData.append('file', blob, 'recording.' + ext);
    formData.append('model', ASR_MODEL);

    const response = await fetch(ASR_BASE_URL + '/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + ASR_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[/api/transcribe] ASR upstream error:', response.status, errText);
      return res.status(502).json({ error: 'ASR service error (' + response.status + ')' });
    }

    const data = await response.json();
    return res.status(200).json({ text: data.text || '' });
  } catch (err) {
    console.error('[/api/transcribe]', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'ASR failed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};