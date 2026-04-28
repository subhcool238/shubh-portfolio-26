"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function SynChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi—I'm Syn. I am here to assist with any questions regarding this portfolio, specific project details, or Shubhanshu Sahu's professional background. Where would you like to start?",
    },
  ]);
  const [input, setInput] = useState("");
  const [previousChatId, setPreviousChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/syn/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, previousChatId }),
      });

      const data = await res.json();
      console.log("Full Vapi Data Object:", data); // This helps you see the structure

      // THE BULLETPROOF PARSER:
      // Instead of looking for a 'role', we map through the whole output array
      // and grab any content found in any field.
      let assistantText = "";
      
      if (data?.output && Array.isArray(data.output)) {
        assistantText = data.output
          .map((item: any) => item.content || item.message?.content || item.text || "")
          .join(" ");
      }

      // CLEANUP: Strip markdown code blocks
      const cleanText = assistantText.replace(/```[a-z]*\n?/g, "").replace(/```/g, "");

      if (cleanText.trim().length > 0) {
        setMessages((m) => [...m, { role: "assistant", content: cleanText }]);
        setPreviousChatId(data?.id ?? null);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: "Syn is ready for your query." }]);
      }

    } catch (err) {
      console.error("Fetch failed:", err);
      setMessages((m) => [...m, { role: "assistant", content: "Network error: Could not reach Syn." }]);
    } finally {
      setLoading(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-full sm:w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl origin-bottom-right animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900 rounded-t-2xl">
            <div>
              <div className="text-sm font-semibold tracking-wide">Syn</div>
              <div className="text-xs text-neutral-400">Portfolio Assistant</div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-neutral-950">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-neutral-100 text-neutral-950"
                      : "bg-neutral-900 text-neutral-100 border border-neutral-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Syn is thinking…
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t border-neutral-800 p-3 bg-neutral-900 rounded-b-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about GuruVR, FlytBase…"
              className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
            <button
              onClick={send}
              className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-950 disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-100 text-neutral-950 shadow-xl hover:scale-105 transition-transform"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        )}
      </button>
    </div>
  );
}
