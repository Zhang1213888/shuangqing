/** 后端 API 客户端 */
export async function castApi(payload: { mode: string; question: string; timestamp: number; tosses: number[] }) {
  const res = await fetch('/api/cast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function interpretApi(result: any, question: string) {
  const res = await fetch('/api/interpret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ result, question }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
