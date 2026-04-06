// Simulated AI service for resort dashboard
import { AIInsights, mockAIInsights } from './mockData'

// Simulate AI processing delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ResortAIService {
  // Get all AI insights (guests + analytics)
  static async getAIInsights(): Promise<AIInsights> {
    await simulateDelay(500) // Simulate API call
    return mockAIInsights
  }

  // Get insights for a specific guest
  static async getGuestInsights(guestId: string) {
    await simulateDelay(300)
    const guest = mockAIInsights.guestInsights.find(g => g.id === guestId)
    return guest || null
  }

  // Get daily analytics
  static async getDailyAnalytics() {
    await simulateDelay(400)
    return mockAIInsights.dailyAnalytics
  }

  // Generate personalized AI suggestion for a guest
  static async generateAISuggestion(guestId: string): Promise<string> {
    await simulateDelay(200)
    const guest = mockAIInsights.guestInsights.find(g => g.id === guestId)
    if (!guest) return 'No guest found'

    // Simulate AI logic based on guest data
    const suggestions = {
      happy: [
        'Offer upgrade to premium room',
        'Recommend exclusive cultural experience',
        'Suggest joining group activities'
      ],
      neutral: [
        'Provide personalized concierge service',
        'Offer relaxation amenities',
        'Suggest local exploration guide'
      ],
      unhappy: [
        'Schedule personal check-in meeting',
        'Offer complimentary service',
        'Provide alternative activity options'
      ]
    }

    const moodSuggestions = suggestions[guest.mood] || suggestions.neutral
    return moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)]
  }

  // Generate daily recommendations
  static async generateDailyRecommendations(): Promise<string[]> {
    await simulateDelay(600)
    return [
      'Focus on promoting afternoon activities during peak hours',
      'Offer personalized experiences for high-satisfaction guests',
      'Address concerns of guests with lower satisfaction scores',
      'Highlight top-selling services in marketing materials'
    ]
  }
}