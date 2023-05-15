import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const { params: { id}  } = context ;

  const url = `http://54.215.118.180:81/api/cat-amenities-childs/${id}/`;
  console.log('URL', url);
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}