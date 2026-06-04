import { NextRequest, NextResponse } from 'next/server';
import { getArticleContent } from '@/lib/getArticle';

export async function GET(
  _request: NextRequest,
  context: { params: { slug: string } }
) {
  const content = await getArticleContent(context.params.slug);
  return NextResponse.json({ content });
}
