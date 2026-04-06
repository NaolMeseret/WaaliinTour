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
  ArrowDown,
  Globe,
  Compass,
  Feather,
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I am Waaliin, your cultural guide. Ask me about Ethiopian traditions, festivals, coffee ceremonies, or any of our tours!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

  const suggestedQuestions = [
    "Tell me about Ethiopian coffee ceremony",
    "What are major festivals in Ethiopia?",
    "Traditional Ethiopian clothing",
    "Best time to visit Lalibela",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 print:hidden">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95"
        >
          <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold border-2 border-white animate-pulse">
            1
          </div>

          {/* Tooltip */}
          <div className="absolute right-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-100 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
            <p className="text-xs font-bold text-amber-700 tracking-tight flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Ask Waaliin, our Cultural AI
            </p>
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full animate-ping bg-amber-400 opacity-20"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "w-[380px] sm:w-[420px] rounded-3xl border-0 shadow-2xl shadow-black/20 flex flex-col overflow-hidden transition-all duration-500 ease-in-out origin-bottom-right bg-gradient-to-br from-white to-amber-50/30",
            isMinimized ? "h-20" : "h-[650px] max-h-[85vh]",
          )}
        >
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-amber-700 via-orange-700 to-red-800 px-6 py-5 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg rotate-12">
                  <Feather className="w-6 h-6 -rotate-12" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Waaliin Guide
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </CardTitle>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-amber-100 uppercase tracking-widest">
                    Ready to assist
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-amber-200 hover:text-white transition-all rounded-xl hover:bg-white/10"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-amber-200 hover:text-red-300 transition-all rounded-xl hover:bg-white/10"
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
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-amber-50/20 to-white"
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
                        "w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-md transition-all duration-200",
                        m.role === "assistant"
                          ? "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                          : "bg-gradient-to-br from-amber-600 to-orange-600 text-white",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <Bot className="w-4.5 h-4.5" />
                      ) : (
                        <User className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed shadow-sm transition-all duration-200",
                        m.role === "assistant"
                          ? "bg-white text-gray-700 border border-amber-100 rounded-tl-md shadow-md"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-md shadow-lg",
                      )}
                    >
                      <div className="prose prose-sm max-w-none">
                        {m.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 animate-in fade-in duration-300">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center">
                      <Loader2 className="w-4.5 h-4.5 text-amber-600 animate-spin" />
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-md border border-amber-100 shadow-md">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested Questions (only show if no messages or only initial) */}
                {messages.length === 1 && !isLoading && (
                  <div className="mt-4 pt-2">
                    <p className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <Compass className="w-3 h-3" />
                      SUGGESTED QUESTIONS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInput(question);
                            inputRef.current?.focus();
                          }}
                          className="text-xs bg-white border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 shadow-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Scroll to bottom button */}
              {showScrollButton && (
                <button
                  onClick={scrollToBottom}
                  className="absolute bottom-24 right-6 bg-amber-600 text-white p-2 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-200 animate-in fade-in zoom-in"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              )}

              {/* Footer / Input */}
              <CardFooter className="p-4 border-t border-amber-100 bg-white/80 backdrop-blur-sm">
                <form
                  onSubmit={handleSend}
                  className="w-full flex items-center gap-2"
                >
                  <div className="relative flex-1 group">
                    <Input
                      ref={inputRef}
                      placeholder="Ask about Ethiopian culture, traditions..."
                      className="h-12 pr-12 rounded-2xl bg-amber-50/50 border-amber-200 focus-visible:ring-amber-500 focus-visible:ring-offset-0 hover:bg-amber-50 transition-all duration-200 text-sm"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </CardFooter>

              {/* Typing indicator in footer */}
              <div className="px-4 pb-3 text-center">
                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" />
                  Powered by Ethiopian cultural knowledge
                </p>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
