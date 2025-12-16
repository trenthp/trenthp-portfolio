'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function SpinningLogo() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setRotation(360)
  }, [])

  const handleClick = () => {
    setRotation((prev) => prev + 360)
  }

  return (
    <div
      className="flex justify-center mt-0 mb-0 cursor-pointer select-none"
      onClick={handleClick}
      title="Click to spin!"
    >
      <div className="relative w-[200px] h-[200px]">
        <Image
          src="/images/projects/groupNom/logo_groupNom_outside.svg"
          alt="Group Nom text ring"
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-in-out"
          style={{ transform: `rotate(${-rotation}deg)`, margin: 0 }}
        />
        <Image
          src="/images/projects/groupNom/logo_groupNom_inside.svg"
          alt="Group Nom logo - click to spin"
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-in-out"
          style={{ transform: `rotate(${rotation}deg)`, margin: 0 }}
        />
      </div>
    </div>
  )
}
