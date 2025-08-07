// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  // authorize
  const auth = request.headers.get('authorization') || '';
  const token = auth.split(' ')[1];
  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // parse payload
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { model, entry } = body;

  if (!model) {
    return NextResponse.json({ message: 'Missing model' }, { status: 400 });
  }

  // revalidate based on content type
  switch (model) {
    case 'global':
      console.log('Global data updated — invalidating global cache');
      revalidateTag('global');
      revalidatePath('/');  // or use layout type if needed
      break;
    case 'home':
      console.log('home data is updated')
      revalidatePath('/');
      break;
    case 'who-we-are':
      revalidatePath('/who-we-are');
      break;
    case 'what-we-do':
      revalidatePath('/what-we-do');
      break;
    case 'strategic-partnership':
      revalidatePath('/strategic-partnership');
      break;
    case 'think-forward':
      revalidatePath('/think-forward');
      break;
    case 'article':
      const slug = entry?.slug || entry?.Slug || null;
      revalidatePath('/think-forward');
      if (slug) {
        console.log(`Revalidating post slug: ${slug}`);
        revalidatePath(`/article/${slug}`);
      } else {
        revalidatePath(`/article`);
      }
      break;
    case 'page':
      const pageSlug = entry?.slug || entry?.Slug || null;
      console.log("🚀 ~ POST ~ pageSlug:", pageSlug)
      if (pageSlug) {
        console.log(`Revalidating post pageSlug: ${pageSlug}`);
        revalidatePath(`/service/${pageSlug}`);
      } else {
        revalidatePath(`/service`);
      }
      break;
    case 'gallery-category':
      revalidatePath('/think-forward');
      break;
    case 'privacy-policy':
      revalidatePath('/privacy-policy');
      break;
    case 'cache':
      console.log(' Received `cache` model - no action taken');
      break;
    default:
      // fallback: revalidate a page named after the model
      revalidatePath(`/${model}`);
  }

  return NextResponse.json({ revalidated: true });
}
