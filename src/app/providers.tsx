"use client";

import { GenreProvider } from "../context/GenreContext";
import GuestSession from "../components/guest-session/GuestSession";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GenreProvider>
      {" "}
      <GuestSession />
      {children}
    </GenreProvider>
  );
}
