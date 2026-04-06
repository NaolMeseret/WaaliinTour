"use client"

import { useState } from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExploreContent } from "@/types"
import { Languages, MessageSquare, Volume2, Mic, CheckCircle2, AlertCircle, Info, Shirt, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioPractice } from "@/hooks/use-audio-practice"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { SafeImage } from "@/components/ui/safe-image"

interface LanguageCardProps {
  item: ExploreContent
}

export function LanguageCard({ item }: LanguageCardProps) {
  const { isPlaying, isRecording, transcript, score, playAudio, startRecording } = useAudioPractice(item.local_text || '')

  const isCollection = item.is_collection

  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl hover:shadow-green-100 transition-all duration-500">
      <div className="flex flex-col md:flex-row min-h-[320px]">
        {/* LEFT SIDE - LOCAL LANGUAGE / COLLECTION TITLE */}
        <div className="flex-1 p-8 bg-slate-900 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/5 group-hover:bg-green-500/20 transition-all">
                {isCollection ? <Info className="h-5 w-5" /> : item.type === 'conversation' ? <MessageSquare className="h-5 w-5" /> : <Languages className="h-5 w-5" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none mb-1">
                  {item.ethnic_group || 'Ethiopian'} Culture
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                  {item.category_name || 'Language'}
                </span>
              </div>
            </div>

            <h3 className={cn("font-black tracking-tight mb-2 text-white leading-tight", isCollection ? "text-3xl" : "text-4xl")}>
              {isCollection ? item.title : item.local_text}
            </h3>
            
            {isCollection ? (
               <div className="mt-4 flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold text-green-400 uppercase tracking-widest">{item.sub_items?.length} Expressions Bundle</span>
               </div>
            ) : item.pronunciation && (
              <p className="text-emerald-400 font-mono text-sm font-bold tracking-widest uppercase mb-4">
                [{item.pronunciation}]
              </p>
            )}
          </div>

          {!isCollection && (
            <div className="flex items-center gap-4 mt-8 relative z-10">
              <button 
                onClick={playAudio}
                disabled={isPlaying}
                className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                  isPlaying ? "bg-green-500 text-white scale-95" : "bg-white text-slate-900 hover:bg-green-500 hover:text-white"
                )}
              >
                <Volume2 className={cn("h-6 w-6", isPlaying && "animate-pulse")} />
              </button>
              <button 
                onClick={startRecording}
                disabled={isRecording}
                className={cn(
                  "h-14 flex-1 rounded-2xl flex items-center justify-center gap-3 font-extrabold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg",
                  isRecording 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-green-600 text-white hover:bg-green-700"
                )}
              >
                <Mic className={cn("h-5 w-5", isRecording && "animate-bounce")} />
                {isRecording ? "Listening..." : "Try Speaking"}
              </button>
            </div>
          )}
          
          {isCollection && (
             <Link href={`/explore/${item.id}`} className="mt-8 relative z-10 flex items-center gap-2 text-green-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors group/link">
                View Collection
                <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
             </Link>
          )}
        </div>

        {/* RIGHT SIDE - ENGLISH & INFO */}
        <div className="flex-1 p-8 bg-white flex flex-col justify-between border-l border-slate-100">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 block mb-2">{isCollection ? "Overview" : "Meaning"}</span>
              <p className={cn("font-bold text-slate-800 leading-tight", isCollection ? "text-lg text-slate-600" : "text-2xl")}>
                 {isCollection ? item.content : item.english_text}
              </p>
            </div>

            {!isCollection && item.example_sentence && (
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 block mb-2">Example</span>
                <p className="text-sm font-medium text-slate-600 italic leading-relaxed">"{item.example_sentence}"</p>
              </div>
            )}

            {!isCollection && item.explanation && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
                <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{item.explanation}</p>
              </div>
            )}
            
            {isCollection && (
               <div className="space-y-4 pt-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Interactive practice included</p>
                  </div>
                  <Link href={`/explore/${item.id}`}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all">
                       Learn Now
                       <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
               </div>
            )}
          </div>

          {/* Feedback Section (only for single items) */}
          {!isCollection && (
          <AnimatePresence>
            {score !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 pt-6 border-t border-slate-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {score >= 8 ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-amber-500" />}
                    <span className={cn(
                      "text-sm font-black uppercase tracking-widest",
                      score >= 8 ? "text-green-600" : score >= 5 ? "text-amber-600" : "text-red-500"
                    )}>
                      {score >= 8 ? "Excellent!" : score >= 5 ? "Good start!" : "Try again!"}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{score}/10</span>
                </div>
                
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score * 10}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      score >= 8 ? "bg-green-500" : score >= 5 ? "bg-amber-400" : "bg-red-500"
                    )}
                   />
                </div>
                {transcript && (
                  <p className="text-[10px] text-slate-400 font-medium">You said: <span className="text-slate-600">"{transcript}"</span></p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </div>
      </div>
    </Card>
  )
}

export function LanguageListItem({ item }: LanguageCardProps) {
  const { isPlaying, isRecording, transcript, score, playAudio, startRecording } = useAudioPractice(item.local_text || '')

  return (
    <div className="group relative bg-white rounded-3xl p-6 border border-slate-100 hover:border-green-200 transition-all shadow-sm hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
             <h4 className="text-xl font-black text-slate-900">{item.local_text}</h4>
             {item.pronunciation && (
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                 {item.pronunciation}
               </span>
             )}
          </div>
          <p className="text-sm font-bold text-slate-500">{item.english_text}</p>
          {item.explanation && (
            <p className="text-[10px] text-slate-400 leading-relaxed max-w-md">{item.explanation}</p>
          )}
        </div>

        {/* RIGHT SIDE - INTERACTION */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={playAudio}
            disabled={isPlaying}
            className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center transition-all",
              isPlaying ? "bg-green-500 text-white" : "bg-slate-50 text-slate-600 hover:bg-green-100 hover:text-green-700"
            )}
          >
            <Volume2 className={cn("h-5 w-5", isPlaying && "animate-pulse")} />
          </button>
          
          <button 
            onClick={startRecording}
            disabled={isRecording}
            className={cn(
              "h-12 px-6 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
              isRecording 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-slate-900 text-white hover:bg-green-600"
            )}
          >
            <Mic className={cn("h-4 w-4", isRecording && "animate-bounce")} />
            {isRecording ? "Practice" : "Practice"}
          </button>
        </div>
      </div>

      {/* Inline Score Feedback */}
      <AnimatePresence>
        {score !== null && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-4 flex-1">
                  <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Accuracy</div>
                  <div className="h-1.5 flex-1 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 10}%` }}
                      className={cn(
                        "h-full transition-all duration-1000",
                        score >= 8 ? "bg-green-500" : score >= 5 ? "bg-amber-400" : "bg-red-500"
                      )}
                    />
                  </div>
               </div>
               <div className="ml-6 flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-black",
                    score >= 8 ? "text-green-600" : "text-amber-600"
                  )}>{score}/10</span>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
               </div>
            </div>
            {transcript && (
              <p className="mt-2 text-[9px] text-slate-400 italic">" {transcript} "</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ClothingCardProps {
  item: ExploreContent
}

export function ClothingCard({ item }: ClothingCardProps) {
  return (
    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl transition-all group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage 
          src={item.image_url} 
          alt={item.title} 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          fallbackSrc="/images (2).jpg"
        />
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">
                {item.ethnic_group || 'Ethiopian'} Tradition
              </span>
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Traditional Attire</span>
            </div>
           <CardTitle className="text-2xl font-bold text-white mb-2 leading-none">{item.title}</CardTitle>
        </div>
      </div>
      <CardContent className="p-8">
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{item.content}</p>
        <Link href={`/explore/${item.id}`} className="flex items-center gap-2 text-slate-800 font-extrabold uppercase tracking-widest text-[10px] hover:text-green-600 transition-all">
          View Detailed Styles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
