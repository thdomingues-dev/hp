import { Cinzel, Cinzel_Decorative } from 'next/font/google'

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

export const fontVariables = [cinzel.variable, cinzelDecorative.variable].join(' ')

export const fontClasses = {
  heading: cinzel.className,
  decorative: cinzelDecorative.className,
  magical: 'font-harry-potter',
  harryPotter: 'font-harry-potter',
} as const

export function getFontClass(type: keyof typeof fontClasses) {
  return fontClasses[type]
}
