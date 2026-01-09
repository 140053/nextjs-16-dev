"use client"


import { useEffect, useState } from "react";
import { getSocket } from "@/app/lib/socket";

export default function Home() {

  const socket = getSocket();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>

          <button onClick={() => socket.emit("message", "Hello Next.js 16.1 (pnpm)")}>
        Send Message
      </button>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>


         
        </div>
        
      </main>
    </div>
  );
}
