"use client";

import { useGuestSession } from "@/src/hooks/useGuestSession";

export default function GuestSession(): null {
  useGuestSession();
  return null;
}
