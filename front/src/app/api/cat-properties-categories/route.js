import { NextResponse } from 'next/server';
 
export async function GET() {
  const res = await fetch('http://54.215.118.180:81/api/cat-properties-categories/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
 
  return NextResponse.json({ data });
}