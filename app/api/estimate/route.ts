import { NextRequest, NextResponse } from 'next/server'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'steve@acleanlook.com'

// Validation
function validateEstimate(data: Record<string, unknown>): string | null {
  if (!data.serviceType || typeof data.serviceType !== 'string') {
    return 'Service type is required'
  }
  if (!data.propertyType || typeof data.propertyType !== 'string') {
    return 'Property type is required'
  }
  if (!data.timeline || typeof data.timeline !== 'string') {
    return 'Timeline is required'
  }
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Name is required'
  }
  if (!data.phone || typeof data.phone !== 'string' || !/^\+?[\d\s()-]{7,}$/.test(data.phone)) {
    return 'Valid phone number is required'
  }
  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return 'Valid email is required'
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const error = validateEstimate(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const {
      serviceType,
      propertyType,
      squareFootage,
      rooms,
      timeline,
      preferredDate,
      name,
      phone,
      email,
      address,
      bestTime,
      contactMethod,
    } = body

    // If Resend API key is configured, send emails
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Notification email to business
      await resend.emails.send({
        from: 'A Clean Look <noreply@acleanlook.com>',
        to: CONTACT_EMAIL,
        subject: `New Estimate Request: ${serviceType} - ${name}`,
        html: `
          <h2>New Estimate Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${serviceType}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Property</td><td style="padding:8px;border-bottom:1px solid #eee;">${propertyType}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Size</td><td style="padding:8px;border-bottom:1px solid #eee;">${squareFootage || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Rooms/Stories</td><td style="padding:8px;border-bottom:1px solid #eee;">${rooms || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Timeline</td><td style="padding:8px;border-bottom:1px solid #eee;">${timeline}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Preferred Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${preferredDate || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Address</td><td style="padding:8px;border-bottom:1px solid #eee;">${address || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Best Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${bestTime || 'Any'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Contact Via</td><td style="padding:8px;">${contactMethod || 'Phone'}</td></tr>
          </table>
        `,
      })

      // Auto-reply to customer
      await resend.emails.send({
        from: 'A Clean Look <noreply@acleanlook.com>',
        to: email,
        subject: "We've received your estimate request!",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#1B365D;">Thank you, ${name}!</h2>
            <p>We've received your estimate request for <strong>${serviceType.replace(/-/g, ' ')}</strong> and will review it shortly.</p>
            <p>Our team typically responds within <strong>2 hours</strong> during business hours. We'll reach out via ${contactMethod || 'phone'}.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
            <p style="font-size:14px;color:#4A5568;">
              <strong>A Clean Look</strong><br/>
              (773) 419-1718<br/>
              steve@acleanlook.com
            </p>
          </div>
        `,
      })
    } else {
      // Log to console when Resend is not configured (development)
      console.log('Estimate request received (Resend not configured):', {
        name,
        email,
        phone,
        serviceType,
        propertyType,
        timeline,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Estimate API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
