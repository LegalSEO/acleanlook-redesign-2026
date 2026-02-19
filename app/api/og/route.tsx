import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || "Chicago's Trusted Painting Professionals"
  const subtitle = searchParams.get('subtitle') || 'A Clean Look — Since 1994'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1B365D 0%, #0C1627 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top bar accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #E8630A, #D4A843)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#E8630A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: 800,
              }}
            >
              A
            </div>
            <span
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              A Clean Look Chicago
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '24px',
              marginTop: '20px',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
            acleanlook.com
          </span>
          <span style={{ color: '#D4A843', fontSize: '16px', fontWeight: 600 }}>
            (773) 419-1718
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
