'use client'

type SpotifyEmbedProps = {
  albumId: string
}

export function SpotifyEmbed({ albumId }: SpotifyEmbedProps) {
  return (
    <div className="my-8">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
