import { NextResponse } from 'next/server'
import type { EstimateResult } from '@/lib/pricing'
import { formatCurrency } from '@/lib/pricing'

interface EstimateEmailBody {
  name: string
  email: string
  estimate: EstimateResult
  projectType: 'interior' | 'exterior'
}

export async function POST(request: Request) {
  try {
    const body: EstimateEmailBody = await request.json()
    const { name, email, estimate, projectType } = body

    if (!name || !email || !estimate) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const lineItemsHtml = estimate.lineItems
      .map(
        (item) =>
          `<tr>
            <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1A1A2E">${item.label}</td>
            <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1A1A2E;text-align:right;font-weight:600">${formatCurrency(item.low)} – ${formatCurrency(item.high)}</td>
          </tr>`
      )
      .join('')

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F8F9FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1B365D 0%,#0C1627 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center">
      <h1 style="color:#fff;font-size:24px;margin:0 0 8px">A Clean Look</h1>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0">Your Paint Estimate</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px;border:1px solid #e8e8e8;border-top:none">
      <p style="font-size:16px;color:#1A1A2E;margin:0 0 8px">Hi ${name},</p>
      <p style="font-size:14px;color:#4A5568;margin:0 0 24px;line-height:1.6">
        Here's the estimate you calculated for your
        <strong>${projectType}</strong> painting project using our
        Chicago Paint Estimate Calculator.
      </p>

      <!-- Estimate Total -->
      <div style="background:linear-gradient(135deg,#1B365D 0%,#0C1627 100%);border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
        <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px">Estimated Range</p>
        <p style="color:#fff;font-size:28px;font-weight:700;margin:0">
          ${formatCurrency(estimate.total.low)} – ${formatCurrency(estimate.total.high)}
        </p>
        <p style="color:#D4A843;font-size:13px;margin:8px 0 0">
          Chicago average: ${formatCurrency(estimate.chicagoAverage)}
        </p>
      </div>

      <!-- Line Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <thead>
          <tr>
            <th style="padding:10px 16px;background:#F8F9FA;font-size:12px;color:#718096;text-align:left;text-transform:uppercase;letter-spacing:0.5px">Item</th>
            <th style="padding:10px 16px;background:#F8F9FA;font-size:12px;color:#718096;text-align:right;text-transform:uppercase;letter-spacing:0.5px">Range</th>
          </tr>
        </thead>
        <tbody>
          ${lineItemsHtml}
          <tr>
            <td style="padding:10px 16px;font-size:13px;color:#718096">Subtotal</td>
            <td style="padding:10px 16px;font-size:13px;color:#718096;text-align:right">${formatCurrency(estimate.subtotal.low)} – ${formatCurrency(estimate.subtotal.high)}</td>
          </tr>
          ${
            estimate.conditionMultiplier !== 1
              ? `<tr><td style="padding:10px 16px;font-size:13px;color:#718096">${estimate.conditionLabel}</td><td style="padding:10px 16px;font-size:13px;color:#E8630A;text-align:right">×${estimate.conditionMultiplier}</td></tr>`
              : ''
          }
          ${
            estimate.qualityMultiplier !== 1
              ? `<tr><td style="padding:10px 16px;font-size:13px;color:#718096">${estimate.qualityLabel}</td><td style="padding:10px 16px;font-size:13px;color:#E8630A;text-align:right">×${estimate.qualityMultiplier}</td></tr>`
              : ''
          }
        </tbody>
      </table>

      <p style="font-size:12px;color:#718096;margin:0 0 24px;line-height:1.5">
        This estimate is based on Chicago market averages. Your actual quote
        may vary based on specific site conditions, access, and detailed
        measurements.
      </p>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:24px">
        <a href="https://acleanlook.com/free-estimate" style="display:inline-block;background:#E8630A;color:#fff;padding:14px 32px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:700">
          Get Your Exact Quote — Free In-Home Estimate
        </a>
      </div>

      <div style="text-align:center;padding-top:16px;border-top:1px solid #f0f0f0">
        <p style="font-size:14px;color:#1A1A2E;margin:0 0 4px">
          Or call us directly:
        </p>
        <a href="tel:+17734191718" style="font-size:18px;font-weight:700;color:#1B365D;text-decoration:none">
          (773) 419-1718
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0">
      <p style="font-size:12px;color:#718096;margin:0">
        A Clean Look · 5444 N. La Crosse Ave, Chicago, IL 60630
      </p>
      <p style="font-size:12px;color:#718096;margin:4px 0 0">
        Chicago's Trusted Painting Professionals Since 1994
      </p>
    </div>
  </div>
</body>
</html>`

    // Send via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'A Clean Look <estimates@acleanlook.com>',
        to: email,
        subject: `Your ${projectType === 'interior' ? 'Interior' : 'Exterior'} Painting Estimate — A Clean Look`,
        html: htmlEmail,
      })

      // Notify business
      await resend.emails.send({
        from: 'A Clean Look <estimates@acleanlook.com>',
        to: process.env.CONTACT_EMAIL || 'steve@acleanlook.com',
        subject: `New Estimate Calculator Lead: ${name}`,
        html: `
          <h2>New estimate calculator submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project:</strong> ${projectType}</p>
          <p><strong>Range:</strong> ${formatCurrency(estimate.total.low)} – ${formatCurrency(estimate.total.high)}</p>
          <p><strong>Chicago Avg:</strong> ${formatCurrency(estimate.chicagoAverage)}</p>
        `,
      })
    } else {
      // Fallback: log to console in development
      console.log('📧 Estimate email request:', {
        name,
        email,
        projectType,
        range: `${formatCurrency(estimate.total.low)} – ${formatCurrency(estimate.total.high)}`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Estimate email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
