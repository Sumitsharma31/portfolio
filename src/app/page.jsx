"use client";

import dynamic from "next/dynamic";

// Dynamically import the main portfolio component and disable SSR.
// This prevents Next.js from throwing errors with Framer Motion and React 19
// during the server-side static generation phase.
const Portfolio = dynamic(() => import("./Portfolio"), {
  ssr: false,
});

export default function Page() {
  return <Portfolio />;
}
