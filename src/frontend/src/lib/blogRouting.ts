import { BlogPost } from '../backend';

export function buildBlogPostPath(post: BlogPost): string {
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `/blog/${post.id.toString()}-${slug}`;
}

export function parseBlogPostId(postIdParam: string): bigint | null {
  try {
    const idPart = postIdParam.split('-')[0];
    return BigInt(idPart);
  } catch {
    return null;
  }
}
