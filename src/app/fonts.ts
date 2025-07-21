import { Inter, Cinzel, Cinzel_Decorative } from 'next/font/google'
import { Roboto } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', 'arial'],
})

export const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  fallback: ['Georgia', 'serif'],
})

export const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel-decorative',
  weight: ['400', '700', '900'],
  fallback: ['Georgia', 'serif'],
})

export const fontVariables = [inter.variable, cinzel.variable, cinzelDecorative.variable].join(' ')

export const fontClasses = {
  body: inter.className,
  heading: cinzel.className,
  decorative: cinzelDecorative.className,
  magical: 'font-harry-potter',
  harryPotter: 'font-harry-potter',
} as const

export function getFontClass(type: keyof typeof fontClasses) {
  return fontClasses[type]
}

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})
