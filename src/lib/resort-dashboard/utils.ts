// Utility functions for resort dashboard
import { Guest } from '@/services/resort-dashboard/mockData'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const getMoodColor = (mood: Guest['mood']): string => {
  switch (mood) {
    case 'happy':
      return 'text-green-600 bg-green-50'
    case 'neutral':
      return 'text-yellow-600 bg-yellow-50'
    case 'unhappy':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export const getMoodIcon = (mood: Guest['mood']): string => {
  switch (mood) {
    case 'happy':
      return '😊'
    case 'neutral':
      return '😐'
    case 'unhappy':
      return '😞'
    default:
      return '🤔'
  }
}

export const getScoreColor = (score: number): string => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-red-600'
}

export const calculateAverageScore = (guests: Guest[]): number => {
  if (guests.length === 0) return 0
  const total = guests.reduce((sum, guest) => sum + guest.satisfactionScore, 0)
  return Math.round((total / guests.length) * 10) / 10
}