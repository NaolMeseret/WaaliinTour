"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  recommendations: any[]; // Adjust type based on your recommendations
  selectedRecommendation?: {
    text: string;
    index: number;
  } | null;
  onClearSelection?: () => void;
}

export default function AIChatInterface({
  recommendations,
  selectedRecommendation,
  onClearSelection,
}: AIChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: selectedRecommendation
        ? `I'm here to help you with this specific recommendation: "${selectedRecommendation.text}". How would you like to implement or modify this suggestion for your hotel?`
        : "Hi! I'm here to help you refine these AI suggestions for your hotel. Ask me questions about the recommendations, request modifications, or discuss implementation strategies.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedRecommendation) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Now focusing on: "${selectedRecommendation.text}". What would you like to explore about this recommendation?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [selectedRecommendation]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/resort-dashboard/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          recommendations: recommendations, // Pass recommendations for context
          selectedRecommendation: selectedRecommendation, // Pass selected recommendation for focused discussion
        }),
      });

      const data = await response.json();
      if (data.role && data.content) {
        setMessages((prev) => [
          ...prev,
          {
            role: data.role,
            content: data.content,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error. Could you try again?",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection lost. Please check your internet.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-[2rem] bg-white shadow-xl shadow-slate-200/40">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl font-bold text-slate-900">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Discuss AI Suggestions
          </div>
          {selectedRecommendation && onClearSelection && (
            <Button
              onClick={onClearSelection}
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-300 hover:bg-slate-50"
            >
              Clear Focus
            </Button>
          )}
        </CardTitle>
        <p className="text-slate-600">
          {selectedRecommendation
            ? `Focused on: "${selectedRecommendation.text}"`
            : "Chat with our AI to refine, modify, or get more details about the recommendations above."}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <div
          ref={scrollRef}
          className="h-96 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-200"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-emerald-600" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-800 border border-slate-200",
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-2 opacity-70",
                    message.role === "user"
                      ? "text-emerald-100"
                      : "text-slate-500",
                  )}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200">
                <p className="text-sm text-slate-500">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the AI suggestions..."
            className="flex-1 rounded-2xl border-slate-200 focus:border-emerald-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
