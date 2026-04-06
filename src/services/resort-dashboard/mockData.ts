// Mock data for resort dashboard
export interface Guest {
  id: string
  name: string
  roomNumber: string
  tourJoined?: string
  behaviorSummary: string
  likes: string[]
  dislikes: string[]
  mood: 'happy' | 'neutral' | 'unhappy'
  satisfactionScore: number // 1-10
  aiSuggestion: string
}

export interface DailyAnalytics {
  totalGuests: number
  estimatedRevenue: number
  activeTours: number
  peakActivityTime: string
  topSellingItems: string[]
  lowSellingItems: string[]
  aiRecommendations: string[]
}

export interface AIInsights {
  guestInsights: Guest[]
  dailyAnalytics: DailyAnalytics
}

// Mock guest data
export const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    roomNumber: '201',
    tourJoined: 'Irreecha Festival Tour',
    behaviorSummary: 'Active participant, enjoys cultural activities',
    likes: ['Traditional music', 'Group activities'],
    dislikes: ['Crowded spaces'],
    mood: 'happy',
    satisfactionScore: 9,
    aiSuggestion: 'Recommend private cultural lesson'
  },
  {
    id: '2',
    name: 'Michael Chen',
    roomNumber: '305',
    tourJoined: 'Addis Ababa City Tour',
    behaviorSummary: 'Quiet observer, prefers individual exploration',
    likes: ['Photography', 'Local cuisine'],
    dislikes: ['Early mornings'],
    mood: 'neutral',
    satisfactionScore: 7,
    aiSuggestion: 'Suggest afternoon photography tour'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    roomNumber: '102',
    behaviorSummary: 'Social and energetic, loves meeting people',
    likes: ['Dancing', 'Social events'],
    dislikes: ['Formal settings'],
    mood: 'happy',
    satisfactionScore: 10,
    aiSuggestion: 'Offer dance workshop invitation'
  },
  {
    id: '4',
    name: 'David Thompson',
    roomNumber: '408',
    tourJoined: 'Simien Mountains Trek',
    behaviorSummary: 'Adventurous, fitness-focused',
    likes: ['Hiking', 'Nature'],
    dislikes: ['Indoor activities'],
    mood: 'happy',
    satisfactionScore: 8,
    aiSuggestion: 'Recommend additional hiking gear'
  },
  {
    id: '5',
    name: 'Lisa Park',
    roomNumber: '156',
    behaviorSummary: 'Relaxed, enjoys spa services',
    likes: ['Spa treatments', 'Quiet time'],
    dislikes: ['Loud environments'],
    mood: 'neutral',
    satisfactionScore: 6,
    aiSuggestion: 'Suggest premium spa package'
  }
]

// Mock daily analytics
export const mockDailyAnalytics: DailyAnalytics = {
  totalGuests: 5,
  estimatedRevenue: 12500,
  activeTours: 3,
  peakActivityTime: '14:00 - 16:00',
  topSellingItems: ['Cultural tours', 'Spa services', 'Local dining'],
  lowSellingItems: ['Shopping excursions', 'Night activities'],
  aiRecommendations: [
    'Promote afternoon cultural tours',
    'Offer spa discounts for quiet guests',
    'Prepare additional hiking equipment',
    'Host evening social gathering'
  ]
}

// Combined mock data
export const mockAIInsights: AIInsights = {
  guestInsights: mockGuests,
  dailyAnalytics: mockDailyAnalytics
}