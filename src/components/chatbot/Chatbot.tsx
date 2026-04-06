"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Do not render chatbot in resort dashboard
  if (pathname?.startsWith("/resort-dashboard")) {
    return null;
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          tourContext: null,
        }),
      });

      const data = await response.json();
      if (data.role && data.content) {
        setMessages((prev) => [...prev, data]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error. Could you try again?",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection lost. Please check your internet.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 print:hidden">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 border-4 border-white"
        >
          <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold border-2 border-white animate-pulse">
            1
          </div>

          <div className="absolute right-20 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            <p className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Ask our Cultural AI
            </p>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "w-[350px] sm:w-[400px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out origin-bottom-right bg-white",
            isMinimized ? "h-20" : "h-[600px] max-h-[85vh]",
          )}
        >
          {/* Header */}
          <CardHeader className="bg-slate-900 px-6 py-5 flex flex-row items-center justify-between border-b border-white/5 space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-white shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-white tracking-tight">
                  Cultural Assistant
                </CardTitle>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Active Now
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          {/* Body */}
          {!isMinimized && (
            <>
              <CardContent
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-white"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                      m.role === "user" ? "flex-row-reverse" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-1 shadow-sm",
                        m.role === "assistant"
                          ? "bg-white text-green-600 border-slate-100"
                          : "bg-slate-800 text-white border-transparent",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed shadow-sm",
                        m.role === "assistant"
                          ? "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                          : "bg-green-600 text-white border-none rounded-tr-none shadow-green-100",
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-50 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100">
                      <div className="h-2 w-12 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Footer / Input */}
              <CardFooter className="p-4 border-t bg-white">
                <form
                  onSubmit={handleSend}
                  className="w-full flex items-center gap-2"
                >
                  <div className="relative flex-1 group">
                    <Input
                      placeholder="Ask about culture, festivals..."
                      className="h-12 pr-12 rounded-xl bg-slate-50 border-slate-100 focus-visible:ring-green-500 hover:bg-slate-100 transition-colors"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center disabled:bg-slate-200 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
