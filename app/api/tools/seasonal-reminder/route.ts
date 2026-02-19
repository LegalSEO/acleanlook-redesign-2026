import { NextResponse } from 'next/server'

interface ReminderBody {
  name: string
  email: string
  month: number
  monthName: string
}

export async function POST(request: Request) {
  try {
    const body: ReminderBody = await request.json()
    const { name, email, month, monthName } = body

    if (!name || !email || !month) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F9FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:linear-gradient(135deg,#1B365D 0%,#0C1627 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center">
      <h1 style="color:#fff;font-size:24px;margin:0 0 8px">A Clean Look</h1>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0">Seasonal Maintenance Reminder</p>
    </div>
    <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px;border:1px solid #e8e8e8;border-top:none">
      <p style="font-size:16px;color:#1A1A2E;margin:0 0 8px">Hi ${name},</p>
      <p style="font-size:14px;color:#4A5568;margin:0 0 24px;line-height:1.6">
        You've set a maintenance reminder for <strong>${monthName}</strong>.
        We'll send you a reminder when it's time to tackle your home maintenance tasks.
      </p>
      <p style="font-size:14px;color:#4A5568;margin:0 0 24px;line-height:1.6">
        In the meantime, check out our
        <a href="https://acleanlook.com/tools/seasonal-planner" style="color:#1B365D;font-weight:600">Seasonal Planner</a>
        for the full year's maintenance schedule.
      </p>
      <div style="text-align:center;margin-bottom:24px">
        <a href="https://acleanlook.com/free-estimate" style="display:inline-block;background:#E8630A;color:#fff;padding:14px 32px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:700">
          Get a Free Estimate for Any Project
        </a>
      </div>
      <div style="text-align:center;padding-top:16px;border-top:1px solid #f0f0f0">
        <p style="font-size:14px;color:#1A1A2E;margin:0 0 4px">Questions? Call us:</p>
        <a href="tel:+17734191718" style="font-size:18px;font-weight:700;color:#1B365D;text-decoration:none">(773) 419-1718</a>
      </div>
    </div>
    <div style="text-align:center;padding:24px 0">
      <p style="font-size:12px;color:#718096;margin:0">A Clean Look · 5444 N. La Crosse Ave, Chicago, IL 60630</p>
      <p style="font-size:12px;color:#718096;margin:4px 0 0">Chicago's Trusted Painting Professionals Since 1994</p>
    </div>
  </div>
</body>
</html>`

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'A Clean Look <reminders@acleanlook.com>',
        to: email,
        subject: `${monthName} Home Maintenance Reminder — A Clean Look`,
        html: htmlEmail,
      })

      // Notify business of lead
      await resend.emails.send({
        from: 'A Clean Look <reminders@acleanlook.com>',
        to: process.env.CONTACT_EMAIL || 'steve@acleanlook.com',
        subject: `New Seasonal Reminder Lead: ${name}`,
        html: `
          <h2>New seasonal planner reminder signup</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Reminder Month:</strong> ${monthName} (${month})</p>
        `,
      })
    } else {
      console.log('📅 Seasonal reminder request:', { name, email, monthName, month })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Seasonal reminder error:', error)
    return NextResponse.json(
      { error: 'Failed to set reminder' },
      { status: 500 }
    )
  }
}
