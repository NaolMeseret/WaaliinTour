"use client"

import { useState, useCallback, useEffect, useRef } from 'react'

interface UseSpeechRecognitionReturn {
  isRecording: boolean
  transcript: string
  error: string | null
  startRecording: (lang?: string) => void
  stopRecording: () => void
  resetTranscript: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Speech Recognition is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsRecording(true)
      setError(null)
    }

    recognition.onresult = (event: any) => {
      const current = event.resultIndex
      const resultTranscript = event.results[current][0].transcript
      setTranscript(resultTranscript)
    }

    recognition.onerror = (event: any) => {
      setError(event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
  }, [])

  const startRecording = useCallback((lang = 'en-US') => {
    if (!recognitionRef.current) return
    
    setTranscript('')
    recognitionRef.current.lang = lang
    
    try {
      recognitionRef.current.start()
    } catch (err) {
      console.error('Speech recognition start error:', err)
      setError('Recording is already in progress or failed to start.')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (!recognitionRef.current) return
    recognitionRef.current.stop()
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
    resetTranscript
  }
}
