import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

// Imported constants from styles.js
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR_LIGHT,
  ACCENT_COLOR_LIGHT,
  BASE_100_LIGHT,
  BASE_200_LIGHT,
  BASE_300_LIGHT,
  SECONDARY_COLOR_DARK,
  ACCENT_COLOR_DARK,
  BASE_100_DARK,
  BASE_200_DARK,
  BASE_300_DARK,
  SUCCESS_COLOR_LIGHT,
  WARNING_COLOR_LIGHT,
  ERROR_COLOR_LIGHT,
  INFO_COLOR_LIGHT,
  SUCCESS_COLOR_DARK,
  WARNING_COLOR_DARK,
  ERROR_COLOR_DARK,
  INFO_COLOR_DARK,
} from './src/marketplaceVariables/styles'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: `${PRIMARY_COLOR}`,
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: `${SECONDARY_COLOR_LIGHT}`,
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: `${ACCENT_COLOR_LIGHT}`,
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        warning: {
          light: `${WARNING_COLOR_LIGHT}`,
          dark: `${WARNING_COLOR_DARK}`,
        },
        success: {
          light: `${SUCCESS_COLOR_LIGHT}`,
          dark: `${SUCCESS_COLOR_DARK}`,
        },
        error: {
          light: `${ERROR_COLOR_LIGHT}`,
          dark: `${ERROR_COLOR_DARK}`,
        },
        info: {
          light: `${INFO_COLOR_LIGHT}`,
          dark: `${INFO_COLOR_DARK}`,
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        DEFAULT: 'calc(var(--radius) - 2px)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-fast': 'spin 0.6s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
