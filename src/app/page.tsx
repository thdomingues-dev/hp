import Link from 'next/link'
import { cn } from '@/features/ui'
import { NavigationCard } from '@/features/ui/types/app'
import { Container } from '@/features/ui/components/Container'

interface NavigationCardsProps {
  navigationCards: NavigationCard[]
}

interface HeaderProps {
  title: string
  subtitle: string
}

const navigationCards: NavigationCard[] = [
  {
    title: 'All Characters',
    description: 'Explore every witch and wizard from the Harry Potter universe',
    href: '/characters',
    color: 'bg-black',
  },
  {
    title: 'Students',
    description: 'Discover the young wizards studying at Hogwarts',
    href: '/characters?filter=students',
    color: 'bg-black',
  },
  {
    title: 'Staff',
    description: 'Meet the professors and staff of Hogwarts School',
    href: '/characters?filter=staff',
    color: 'bg-black',
  },
  {
    title: 'Spells',
    description: 'Learn about magical spells and their uses',
    href: '/spells',
    color: 'bg-black',
  },
]

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="max-w-7xl mx-auto my-16 md:mb-0">
      <div className="flex flex-col justify-between items-center">
        <h1 className="harry-potter-title text-white text-center">
          <span className="text-7xl md:text-9xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="font-heading text-white mt-2 text-center text-2xl md:text-3xl">{subtitle}</p>
      </div>
    </header>
  )
}

function NavigationGrid({ navigationCards }: NavigationCardsProps) {
  return (
    <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 !p-0">
      {navigationCards.map(({ href, title, description, color }) => (
        <Link
          key={href + title}
          href={href}
          className={cn(
            'group relative overflow-hidden p-8 text-white transition-all duration-300',
            'hover:shadow-lg hover:[box-shadow:0px_0px_20px_5px_var(--color-primary-light-gold)]',
            'border border-border-primary',
            color
          )}
        >
          <h3 className="text-xl font-bold mb-2 font-decorative text-primary-gold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </Link>
      ))}
    </Container>
  )
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-yellow-900/70 via-black to-black">
      <Container className="p-4 flex flex-col justify-between min-h-screen">
        <Header title="Harry Potter" subtitle="Mischief Managed" />
        <main>
          <NavigationGrid navigationCards={navigationCards} />
        </main>
        <footer className="text-center mt-16 md:mt-0 mb-4 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-decorative">
            Which Hogwarts House Do You Belong To?
          </h2>
          <p className="text-gray-300 mb-8">Personalize your magical experience</p>
          <Link
            href="/houses"
            className="inline-flex px-8 py-4 font-bold transition-all duration-300 transform hover:scale-105
              bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black"
            aria-label="choose your house"
          >
            Choose Your House
          </Link>
        </footer>
      </Container>
    </div>
  )
}
