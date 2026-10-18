import { useCallback, useRef, useState } from "react";

export interface UseVoiceOptions {
  onResult: (text: string, isFinal: boolean) => void;
  onError?: (errMsg: string) => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

async function transcribeAudio(audioBase64: string, mimeType: string): Promise<string> {
  const resp = await fetch("/api/transcribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audioBase64, mimeType }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || "语音转写失败");
  return data.text || "";
}

function useWebSpeech(options: UseVoiceOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const getRecognition = useCallback((): SpeechRecognitionInstance | null => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as SpeechRecognitionConstructor | undefined;
    if (!Ctor) return null;
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "zh-CN";
    return rec;
  }, []);

  const startListening = useCallback(() => {
    const rec = getRecognition();
    if (!rec) {
      options.onError?.("浏览器不支持语音识别");
      return;
    }
    recognitionRef.current = rec;
    let finalText = "";

    rec.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0]?.transcript || "";
        } else {
          interim += result[0]?.transcript || "";
        }
      }
      const display = finalText + interim;
      options.onResult(display, !interim);
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn("Web Speech error:", event.error);
      setIsListening(false);
      if (event.error === "network" || event.error === "not-allowed" || event.error === "service-not-allowed") {
        options.onError?.(event.error);
      }
    };

    rec.onend = () => {
      setIsListening(false);
    };

    setIsListening(true);
    rec.start();
  }, [getRecognition, options]);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      rec.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  return { isListening, isTranscribing, startListening, stopListening };
}

function useMediaRecorder(options: UseVoiceOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setIsListening(false);
        setIsTranscribing(true);

        try {
          const blob = new Blob(chunksRef.current, { type: mimeType });
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => {
              const result = reader.result as string;
              resolve(result.split(",")[1] || "");
            };
            reader.readAsDataURL(blob);
          });

          const text = await transcribeAudio(base64, mimeType);
          if (text) options.onResult(text, true);
        } catch (e: any) {
          options.onError?.(e.message || "云端转写失败");
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start();
      setIsListening(true);
    } catch (e: any) {
      options.onError?.(e.message || "无法访问麦克风");
    }
  }, [options]);

  const stopListening = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, []);

  return { isListening, isTranscribing, startListening, stopListening };
}

export function useVoiceInput(options: UseVoiceOptions): {
  isListening: boolean;
  isTranscribing: boolean;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
} {
  const [engine, setEngine] = useState<"web-speech" | "media-recorder" | null>(null);
  const webSpeech = useWebSpeech({
    ...options,
    onError: (err) => {
      if (engine === "web-speech" && (err === "network" || err === "not-allowed" || err === "service-not-allowed")) {
        setEngine("media-recorder");
      } else {
        options.onError?.(err);
      }
    },
  });
  const mediaRecorder = useMediaRecorder(options);

  const active = engine === "media-recorder" ? mediaRecorder : webSpeech;

  const startListening = useCallback(() => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (engine === null) {
      if (Ctor) {
        setEngine("web-speech");
      } else {
        setEngine("media-recorder");
      }
      return;
    }
    if (engine === "media-recorder") {
      mediaRecorder.startListening();
    } else {
      webSpeech.startListening();
    }
  }, [engine, webSpeech, mediaRecorder]);

  const stopListening = useCallback(() => {
    if (engine === "media-recorder") {
      mediaRecorder.stopListening();
    } else {
      webSpeech.stopListening();
    }
  }, [engine, webSpeech, mediaRecorder]);

  const toggleListening = useCallback(() => {
    if (active.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [active.isListening, startListening, stopListening]);

  return {
    isListening: active.isListening,
    isTranscribing: active.isTranscribing,
    startListening,
    stopListening,
    toggleListening,
  };
}