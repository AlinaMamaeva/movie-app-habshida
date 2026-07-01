"use client";

import { useEffect } from "react";
import { createGuestSession } from "@/src/lib/api";

export default function GuestSession() {
  useEffect(() => {
    const initSession = async () => {
      const existing = localStorage.getItem("guestSessionId");
      if (existing) return;

      try {
        const res = await createGuestSession();

        if (!res.ok) {
          console.error(`Failed to create guest session: ${res.status}`);
          return;
        }

        const data = await res.json();
        if (!data.guest_session_id) {
          console.error("No guest_session_id in response:", data);
          return;
        }
        localStorage.setItem("guestSessionId", data.guest_session_id);
      } catch (error) {
        console.error("Failed to create guest session:", error);
      }
    };
    initSession();
  }, []);
  return null;
}
