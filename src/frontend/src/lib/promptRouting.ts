import { PromptRecord } from '../backend';

export function buildPromptPath(prompt: PromptRecord): string {
  const slug = prompt.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `/prompt/${prompt.id.toString()}-${slug}`;
}

export function parsePromptId(promptIdParam: string): bigint | null {
  try {
    const idPart = promptIdParam.split('-')[0];
    return BigInt(idPart);
  } catch {
    return null;
  }
}
