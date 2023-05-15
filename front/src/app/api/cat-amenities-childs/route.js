import { NextResponse } from 'next/server';

export async function GET(request) {
  const queryParams = request?.nextUrl?.searchParams?.toString() ?? '';

  const url = `http://54.215.118.180:81/api/cat-amenities-childs/?${queryParams}`;
  console.log('URL', url);
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}