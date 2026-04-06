import { useState, useCallback, useRef, useEffect } from 'react'

export function useAudioPractice(textToSpeak: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState<number | null>(null)
  
  const recognitionRef = useRef<any>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US' // Default to English for recognition if Oromo is not supported

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        calculateScore(result, textToSpeak)
        setIsRecording(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }
  }, [textToSpeak])

  const playAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    }
  }, [textToSpeak])

  const startRecording = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript('')
      setScore(null)
      setIsRecording(true)
      recognitionRef.current.start()
    } else {
      alert('Speech recognition is not supported in this browser.')
    }
  }, [])

  const calculateScore = (spoken: string, expected: string) => {
    // Simple similarity score for demo purposes
    const s1 = spoken.toLowerCase().replace(/[^a-z]/g, '')
    const s2 = expected.toLowerCase().replace(/[^a-z]/g, '')
    
    if (s1 === s2) {
      setScore(10)
      return
    }

    // Rough check
    let matches = 0
    const words1 = spoken.toLowerCase().split(' ')
    const words2 = expected.toLowerCase().split(' ')
    
    words1.forEach(w => {
      if (words2.includes(w)) matches++
    })

    const rawScore = (matches / Math.max(words1.length, words2.length)) * 10
    setScore(Math.max(1, Math.min(10, Math.round(rawScore + (Math.random() * 2))))) // Add some "fuzziness" for demo
  }

  return {
    isPlaying,
    isRecording,
    transcript,
    score,
    playAudio,
    startRecording
  }
}
