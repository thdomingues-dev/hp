import Image from 'next/image'
import { cn } from '@/features/ui'
import React from 'react'

interface CharacterImageProps {
  src?: string
  alt: string
  className?: string
  containerClassName?: string
}

export function CharacterImage({ src, alt, className, containerClassName }: CharacterImageProps) {
  return (
    <div
      className={cn('relative aspect-square md:aspect-[3/4] overflow-hidden', containerClassName)}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={300}
          height={400}
          className={cn('w-full h-full object-cover object-top md:object-center', className)}
        />
      ) : (
        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
          <span className="text-4xl">🧙‍♂️</span>
        </div>
      )}
    </div>
  )
}
