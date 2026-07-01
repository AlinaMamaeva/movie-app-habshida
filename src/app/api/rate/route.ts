import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { movieId, rating, guestSessionId } = await req.json();

    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${movieId}/rating?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: rating }),
      },
    );

    if (!res.ok) {
      console.error(`Failed to rate movie: ${res.status}`);
      return NextResponse.json({ success: false }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to rate movie:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
