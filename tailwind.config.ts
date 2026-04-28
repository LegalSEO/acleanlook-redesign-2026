import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Editorial redesign tokens (acleanlook redesign 2026) ─────────
        paper: '#f7f2e8',
        'paper-2': '#efe9dd',
        'paper-3': '#e6dfd0',
        ink: {
          DEFAULT: '#1a1d24',
          soft: '#4a4d56',
        },
        'ink-soft': '#4a4d56',
        rule: {
          DEFAULT: '#d8cfb9',
          soft: '#e8e0cb',
        },
        'rule-soft': '#e8e0cb',
        'accent-soft': '#e9d6a8',
        // ── Legacy tokens (kept for transition; pages still using them
        //     will be replaced by the new editorial templates) ─────────
        primary: {
          DEFAULT: '#1B365D',
          50: '#E8EDF4',
          100: '#D1DBE9',
          200: '#A3B7D3',
          300: '#7593BD',
          400: '#476FA7',
          500: '#1B365D',
          600: '#162C4D',
          700: '#11213A',
          800: '#0C1627',
          900: '#070B14',
        },
        accent: {
          DEFAULT: '#b9842b',
          50: '#FCF6E8',
          100: '#F8EDD1',
          200: '#F1DBA3',
          300: '#EAC975',
          400: '#DFB85C',
          500: '#b9842b',
          600: '#a0721f',
          700: '#8A6A23',
          800: '#5C4717',
          900: '#2E230C',
        },
        cta: {
          DEFAULT: '#E8630A',
          50: '#FEF0E6',
          100: '#FDE1CC',
          200: '#FBC399',
          300: '#F9A566',
          400: '#F08738',
          500: '#E8630A',
          600: '#BA4F08',
          700: '#8B3B06',
          800: '#5D2804',
          900: '#2E1402',
        },
        success: {
          DEFAULT: '#2D8A4E',
          50: '#E8F5ED',
          100: '#D1EBDB',
          200: '#A3D7B7',
          300: '#75C393',
          400: '#47AF6F',
          500: '#2D8A4E',
          600: '#246E3E',
          700: '#1B532F',
          800: '#12371F',
          900: '#091C10',
        },
        background: {
          light: '#F8F9FA',
          warm: '#FFF9F0',
          DEFAULT: '#FFFFFF',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#4A5568',
          light: '#718096',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        // Editorial redesign: Fraunces for display, Inter for body, JetBrains Mono for kickers
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        // Legacy aliases (heading/accent map to the new system during transition)
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        accent: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial type scale — clamp-driven, used by .acl-h1 / .acl-h2
        'acl-h1': ['clamp(44px, 7vw, 96px)', { lineHeight: '0.96', letterSpacing: '-0.025em' }],
        'acl-h2': ['clamp(30px, 4.4vw, 54px)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'acl-lede': ['clamp(16px, 1.4vw, 19px)', { lineHeight: '1.55' }],
        // Legacy scale
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.25' }],
        'h3': ['1.875rem', { lineHeight: '1.3' }],
        'h4': ['1.5rem', { lineHeight: '1.35' }],
        'h5': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        shell: '1400px',
        '56ch': '56ch',
        '64ch': '64ch',
      },
      letterSpacing: {
        eyebrow: '0.18em',
        kicker: '0.12em',
        mono: '0.06em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(27, 54, 93, 0.07), 0 10px 20px -2px rgba(27, 54, 93, 0.04)',
        'medium': '0 4px 25px -5px rgba(27, 54, 93, 0.1), 0 10px 30px -5px rgba(27, 54, 93, 0.06)',
        'strong': '0 10px 40px -10px rgba(27, 54, 93, 0.15), 0 20px 50px -10px rgba(27, 54, 93, 0.1)',
        'glow-orange': '0 0 20px rgba(232, 99, 10, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 168, 67, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'count-up': 'countUp 2s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'paint-drip': 'paintDrip 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        paintDrip: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #1B365D 0%, #0C1627 100%)',
        'gradient-cta': 'linear-gradient(135deg, #E8630A 0%, #D4A843 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FFF9F0 0%, #FFFFFF 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(27, 54, 93, 0.9) 0%, rgba(12, 22, 39, 0.8) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
