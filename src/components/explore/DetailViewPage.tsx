"use client"

import { useState, useEffect } from 'react'
import { ExploreContent } from '@/types'
import { Button } from '@/components/ui/button'
import { AudioPlayerButton, VoiceInputButton } from './interactive-buttons'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { ChevronLeft, Share2, Bookmark, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { LanguageListItem } from './explore-cards'

interface DetailViewPageProps {
  item: ExploreContent
}

export function DetailViewPage({ item }: DetailViewPageProps) {
  const isLanguage = item.type === 'language' || item.type === 'conversation'
  const { speak, isSpeaking } = useTextToSpeech()
  const { isRecording, transcript, startRecording, stopRecording, resetTranscript } = useSpeechRecognition()
  
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)

  const handlePlayAudio = () => {
    speak(item.audio_text || item.text_content || item.local_text || '')
  }

  const handleToggleVoice = () => {
    if (isRecording) {
      stopRecording()
    } else {
      resetTranscript()
      setFeedback(null)
      startRecording('en-US') 
    }
  }

  // Basic similarity check (for single items)
  useEffect(() => {
    if (!isRecording && transcript && !item.is_collection) {
      const expected = (item.audio_text || item.text_content || item.local_text || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
      const actual = transcript.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
      
      if (actual.includes(expected) || expected.includes(actual)) {
        setFeedback('correct')
      } else if (actual.length > 5) {
        setFeedback('incorrect')
      }
    }
  }, [isRecording, transcript, item.audio_text, item.text_content, item.local_text, item.is_collection])

  const hasSubItems = item.sub_items && item.sub_items.length > 0

  return (
    <div className="max-w-5xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
      {/* Navigation & Header Actions */}
      <div className="flex items-center justify-between mb-16">
        <Link href="/explore">
          <Button variant="ghost" className="rounded-full group flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-green-600">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-full h-10 w-10 p-0 text-slate-400 hover:text-green-600 border border-slate-100">
             <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="rounded-full h-10 w-10 p-0 text-slate-400 hover:text-green-600 border border-slate-100">
             <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg tracking-[0.2em] uppercase">
              {item.ethnic_group || 'Ethiopian'} Culture
            </div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-[10px] font-extrabold px-4 py-2 rounded-full shadow-sm tracking-[0.2em] uppercase">
              {item.category} • {item.is_collection ? "Collection" : (item.type || 'Article')}
            </div>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 max-w-4xl">
            {item.title}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            {item.content || `Discover the depth of ${item.ethnic_group || 'Ethiopian'} traditions and linguistic heritage.`}
          </p>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-24">
        {hasSubItems ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
             <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interactive <span className="text-green-600">Practice List</span></h2>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">{item.sub_items?.length} Expressions Found</span>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {item.sub_items?.map((subItem) => (
                  <LanguageListItem key={subItem.id} item={subItem} />
                ))}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              {isLanguage && (
                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 mb-12 shadow-inner">
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Phonetics & Text</h3>
                    <p className="text-2xl font-extrabold text-slate-900 leading-relaxed font-mono mb-6">
                      {item.local_text || item.text_content}
                    </p>
                    <div className="flex items-center gap-4">
                      <AudioPlayerButton 
                        onClick={handlePlayAudio}
                        disabled={isSpeaking}
                        className="h-14 px-8"
                      />
                      <VoiceInputButton 
                        onClick={handleToggleVoice}
                        isRecording={isRecording}
                        className="h-14 px-8"
                      />
                    </div>
                  </div>

                  {(transcript || feedback) && (
                    <div className={`mt-8 p-8 rounded-3xl border animate-in zoom-in-95 duration-300 ${feedback === 'correct' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                       <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Result</h3>
                       <div className="flex items-start gap-4">
                          {feedback === 'correct' ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-1" />
                          ) : (
                            <XCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                          )}
                          <div>
                            <p className="text-lg font-bold text-slate-800 italic mb-2">"{transcript || '...'}"</p>
                            <p className={feedback === 'correct' ? 'text-green-700 font-bold text-sm' : 'text-amber-700 font-bold text-sm'}>
                                {feedback === 'correct' ? 'Excellent pronunciation!' : 'Try one more time focused on clarity.'}
                            </p>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="prose prose-slate max-w-none">
                 <p className="text-slate-600 leading-relaxed text-lg">
                    {item.explanation || "Explore the intricate details and historical context that make this cultural element unique to the region. Mastery comes through practice and understanding."}
                 </p>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              {item.image_url ? (
                <div className="relative group">
                   <div className="absolute inset-0 bg-green-200/20 rounded-[3rem] rotate-3 -z-10 transition-transform group-hover:rotate-6 duration-500" />
                   <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white aspect-[3/4]">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                </div>
              ) : (
                <div className="aspect-[3/4] bg-slate-100 rounded-[3rem] flex items-center justify-center border-4 border-dashed border-slate-200">
                   <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px]">Collection Overview</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
