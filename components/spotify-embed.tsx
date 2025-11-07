'use client'

import { useEffect } from 'react'

type SpotifyEmbedProps = {
  albumId: string
}

export function SpotifyEmbed({ albumId }: SpotifyEmbedProps) {
  useEffect(() => {
    // Load Spotify embed script
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/ePlatform.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="my-8">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
