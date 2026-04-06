import { Volume2, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AudioPlayerButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function AudioPlayerButton({ onClick, disabled, className }: AudioPlayerButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick} 
      disabled={disabled}
      className={`flex items-center gap-2 rounded-full border-green-200 text-green-700 hover:bg-green-50 ${className}`}
    >
      <Volume2 className="h-4 w-4" />
      <span className="text-xs font-bold uppercase tracking-wider">Play Audio</span>
    </Button>
  )
}

interface VoiceInputButtonProps {
  onClick?: () => void
  isRecording?: boolean
  className?: string
}

export function VoiceInputButton({ onClick, isRecording, className }: VoiceInputButtonProps) {
  return (
    <Button 
      variant="outline"
      size="sm" 
      onClick={onClick} 
      className={`flex items-center gap-2 rounded-full ${isRecording ? 'border-red-500 bg-red-50 text-red-600 animate-pulse' : 'border-amber-200 text-amber-700 hover:bg-amber-50'} ${className}`}
    >
      <Mic className={`h-4 w-4 ${isRecording ? 'animate-bounce' : ''}`} />
      <span className="text-xs font-bold uppercase tracking-wider">
        {isRecording ? 'Listening...' : 'Try Speaking'}
      </span>
    </Button>
  )
}
