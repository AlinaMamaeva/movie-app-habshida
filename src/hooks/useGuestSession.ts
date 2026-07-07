import { useEffect } from "react";
import { createGuestSession } from "@/src/lib/api";

export const useGuestSession = () => {
  useEffect(() => {
    const initSession = async () => {
      const existing = localStorage.getItem("guestSessionId");
      const expiresAt = localStorage.getItem("guestSessionExpires");
      if (existing && expiresAt && new Date() < new Date(expiresAt)) return;

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
        localStorage.setItem("guestSessionExpires", data.expires_at);
      } catch (error) {
        console.error("Failed to create guest session:", error);
      }
    };
    initSession();
  }, []);
  return null;
};
