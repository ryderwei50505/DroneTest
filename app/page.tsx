  
"use client";
import dynamic from "next/dynamic";

const DronePracticeApp = dynamic(() => import("@/components/DronePracticeApp"), { ssr: false });

export default function HomePage() {
  return <DronePracticeApp />;
}
