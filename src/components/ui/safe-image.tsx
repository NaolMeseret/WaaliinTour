"use client"

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined
  fallbackSrc?: string
}

export function SafeImage({ 
  src, 
  fallbackSrc = "/images (2).jpg", 
  alt, 
  className, 
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (src) {
      setImgSrc(src)
      setError(false)
    }
  }, [src])

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      className={cn(className, error && "opacity-50 grayscale")}
      onError={() => {
        setImgSrc(fallbackSrc)
        setError(true)
      }}
    />
  )
}
