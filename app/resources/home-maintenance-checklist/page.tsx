import type { Metadata } from 'next'
import EbookLandingPage from '@/components/sections/EbookLandingPage'

export const metadata: Metadata = {
  title: 'Free Guide: Seasonal Home Maintenance Checklist for Chicago Homeowners',
  description:
    'Download our free seasonal home maintenance checklist for Chicago. Month-by-month schedule for painting, gutters, power washing, and general maintenance tailored to Chicago weather.',
  keywords: [
    'chicago home maintenance checklist',
    'seasonal maintenance schedule chicago',
    'home maintenance calendar illinois',
    'chicago homeowner maintenance guide',
    'gutter cleaning schedule chicago',
  ],
  openGraph: {
    title: 'Seasonal Home Maintenance Checklist for Chicago | A Clean Look',
    description:
      'Free month-by-month maintenance checklist for Chicago homeowners. Never miss a critical task again.',
    url: 'https://acleanlook.com/resources/home-maintenance-checklist',
  },
}

export default function HomeMaintenanceChecklistPage() {
  return (
    <EbookLandingPage
      title="The Seasonal Home Maintenance Checklist for Chicago Homeowners"
      subtitle="Your month-by-month guide to keeping your Chicago home in top shape"
      description="Chicago's extreme weather demands a maintenance plan. This free checklist gives you a month-by-month schedule for painting, gutter cleaning, power washing, and general maintenance — so you never miss a critical task."
      coverColor="#2D8A4E"
      coverAccent="#1B365D"
      benefits={[
        'Complete month-by-month maintenance schedule tailored to Chicago weather patterns',
        'Never miss critical seasonal tasks — know exactly what to do and when',
        'Budget planning worksheet to help you plan and prioritize expenses',
        'Prevent costly damage with timely maintenance (ice dams, water damage, paint failure)',
        'Chicago-specific timing for exterior painting, gutter cleaning, and power washing',
        'Priority levels for every task — know what\'s critical vs. optional',
        'Printable checklist format you can hang on your fridge or in your garage',
      ]}
      tableOfContents={[
        'January–February: Winter Inspection & Planning',
        'March–April: Spring Prep & Cleaning',
        'May–June: Exterior Season Begins',
        'July–August: Peak Summer Maintenance',
        'September–October: Fall Prep & Last Calls',
        'November–December: Winterization & Planning',
        'Budget Planning Worksheet',
        'Emergency Maintenance Quick Reference',
        'Contractor Selection Checklist',
        'Annual Maintenance Cost Estimator',
      ]}
      formId="home-maintenance-checklist"
      downloadUrl="/resources/home-maintenance-checklist"
      stats={[
        { value: '12', label: 'Monthly Guides' },
        { value: '48+', label: 'Maintenance Tasks' },
        { value: '4', label: 'Service Categories' },
        { value: '500+', label: 'Guides Downloaded' },
      ]}
    />
  )
}
