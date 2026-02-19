import type { Metadata } from 'next'
import SeasonalPlannerClient from './SeasonalPlannerClient'

export const metadata: Metadata = {
  title: 'Chicago Seasonal Home Maintenance Planner — Month-by-Month Guide',
  description:
    'Free interactive maintenance planner for Chicago homeowners. Month-by-month painting, power washing, gutter cleaning, and home maintenance tasks tailored to Chicago weather.',
  keywords: [
    'Chicago home maintenance schedule',
    'seasonal home maintenance planner',
    'when to paint house Chicago',
    'Chicago gutter cleaning schedule',
    'exterior painting season Chicago',
    'home maintenance calendar Illinois',
    'Chicago homeowner guide',
    'seasonal painting schedule',
  ],
  openGraph: {
    title: 'Chicago Seasonal Home Maintenance Planner | A Clean Look',
    description:
      'Interactive month-by-month maintenance guide for Chicago homeowners. Know exactly when to paint, clean gutters, and power wash — tailored to Chicago weather.',
    url: 'https://acleanlook.com/tools/seasonal-planner',
  },
}

export default function SeasonalPlannerPage() {
  return <SeasonalPlannerClient />
}
