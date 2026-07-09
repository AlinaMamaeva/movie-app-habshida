import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guestSessionId = req.nextUrl.searchParams.get("guestSessionId");
  const page = req.nextUrl.searchParams.get("page") || "1";

  if (!guestSessionId) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
    );

    if (!res.ok) {
      console.error(`Failed to fetch rated movies: ${res.status}`);
      return NextResponse.json({ results: [] }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch rated movies:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
