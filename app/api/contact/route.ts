import { NextRequest, NextResponse } from 'next/server'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'steve@acleanlook.com'

function validateContact(data: Record<string, unknown>): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Name is required'
  }
  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    return 'Valid email is required'
  }
  if (!data.phone || typeof data.phone !== 'string' || !/^\+?[\d\s()-]{7,}$/.test(data.phone)) {
    return 'Valid phone number is required'
  }
  if (!data.service || typeof data.service !== 'string') {
    return 'Service selection is required'
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    return 'Message is required'
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const error = validateContact(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const { name, email, phone, service, message, contactMethod } = body

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'A Clean Look <noreply@acleanlook.com>',
        to: CONTACT_EMAIL,
        subject: `Contact Form: ${service} - ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${service}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Contact Via</td><td style="padding:8px;border-bottom:1px solid #eee;">${contactMethod || 'Phone'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${message}</td></tr>
          </table>
        `,
      })

      await resend.emails.send({
        from: 'A Clean Look <noreply@acleanlook.com>',
        to: email,
        subject: "Thanks for contacting A Clean Look!",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;">
            <h2 style="color:#1B365D;">Thank you, ${name}!</h2>
            <p>We've received your message and will get back to you within <strong>2 hours</strong> during business hours.</p>
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
      console.log('Contact form received (Resend not configured):', {
        name,
        email,
        phone,
        service,
        message,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
