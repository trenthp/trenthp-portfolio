'use client'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import Link from 'next/link'
import {
  PROJECTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

const SPOTLIGHT_COLORS = {
  light: { from: '#858585', via: '#959595', to: '#b8b8b8' },
  dark: { from: '#606060', via: '#787878', to: '#909090' },
  sepia: { from: '#9d6f35', via: '#b8934e', to: '#d4a45f' },
  blue: { from: '#8fa3d8', via: '#b0c4ff', to: '#d4e4ff' },
}

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  const isImage = src.match(/\.(png|jpg|jpeg|gif|webp)$/i)

  if (isImage) {
    return (
      <img
        src={src}
        alt="Project"
        className="aspect-video w-full rounded-xl object-cover object-top"
      />
    )
  }

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      className="aspect-video w-full rounded-xl object-cover object-top"
    />
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  // Check if link is external (starts with http://, https://, or mailto:)
  const isExternal = link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:')
  const isMailto = link.startsWith('mailto:')

  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target={isExternal && !isMailto ? '_blank' : undefined}
        rel={isExternal && !isMailto ? 'noopener noreferrer' : undefined}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-gray-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sepia:bg-amber-200 sepia:text-amber-900 sepia:hover:bg-amber-900 sepia:hover:text-amber-100 blue:bg-blue-300 blue:text-blue-50 blue:hover:bg-blue-800 blue:hover:text-blue-100"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (mounted && theme && theme in SPOTLIGHT_COLORS ? theme : 'light') as keyof typeof SPOTLIGHT_COLORS
  const spotlightColors = SPOTLIGHT_COLORS[currentTheme]

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1 space-y-4">
          <p className="md:text-lg">
            I&apos;m a product leader with deep roots in design and a growing practice in code. I figure out what the real problem is, then do whatever it takes to solve it: strategy, design, development, or all of the above. I run{' '}
            <a href="https://madcatter.studio/" target="_blank" rel="noopener noreferrer" className="underline">Mad Catter Studio</a>, where I help organizations build the right things faster.
          </p>
          <p className="md:text-lg">
            12+ years shipping B2C and B2B products. Most recently leading product design at Optavia, where I took a 2.3-star app to 4.7+, built a design organization from zero, and introduced AI-powered workflows that cut prototype-to-test cycles in half.
          </p>
          <p className="md:text-lg">
            Through Mad Catter Studio, I partner with teams that need someone who can think strategically and ship personally with strategy, design, and code under one roof.
          </p>
        </div>
        <br />
        <div className="flex flex-wrap items-center justify-start gap-2 sm:space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium md:text-xl">Work</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {PROJECTS.map((project) => (
            <Link
              key={project.name}
              href={project.link.startsWith('http') ? project.link : `/projects/${project.slug}`}
              target={project.link.startsWith('http') ? '_blank' : undefined}
              rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="relative overflow-hidden rounded-2xl p-[1px]"
            >
              <Spotlight
                size={200}
                fromColor={spotlightColors.from}
                viaColor={spotlightColors.via}
                toColor={spotlightColors.to}
              />
              <div className="card-bg relative h-full w-full rounded-[15px] p-4">
                <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-6 lg:items-center">
                  <div className="relative rounded-lg overflow-hidden lg:w-1/2 lg:shrink-0">
                    <ProjectVideo src={project.video} />
                  </div>
                  <div>
                    <h4 className="font-base font-[450]">
                      {project.name}
                    </h4>
                    <p className="text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium md:text-xl">About Me</h3>
        <div className="space-y-4">
          <p>
            I work the way I do because I&apos;ve never been comfortable staying in one lane. I&apos;ve always cared about strategy, design, and how things get built. For most of my career, the tools limited what one person could actually execute. That&apos;s changed. AI removed the ceiling, and the way I&apos;ve always thought about product work is now the way I can actually operate. That&apos;s the foundation Mad Catter Studio is built on.
          </p>
          <p>
            The common thread across my work is this: I look for the real problem underneath the surface request, I figure out the fastest path to solving it, and I do the work myself when that&apos;s what it takes. Sometimes that means building a team from scratch and shifting a company&apos;s mindset. Sometimes it means writing prototype code that ships to production. Usually it means several things at once.
          </p>
          <p>
            I lead with deep curiosity. The most useful questions are &ldquo;why?&rdquo; and &ldquo;what else?&rdquo; Why, because surface-level requests usually hide the real problem. What else, because there&apos;s almost always more to the story, and being exhaustive in the work is how you avoid solving the wrong thing. I build teams where everyone is encouraged to ask both.
          </p>
          <p>
            I care about the people I work with, and I believe a healthy, empowered team is the only way to build something worth using. I hire for curiosity, craft, and collaboration. I mentor by giving people autonomy and real ownership. I partner across functions by building shared understanding, not by protecting territory.
          </p>
          <p>
            When I&apos;m not working on products, I&apos;m adventuring with my kids and exploring whatever catches my attention: AR/VR, 3D printing, video games, art, concerts, waves, and sand.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium md:text-xl">Connect</h3>
        <p className="mb-5">
          For work inquiries, visit{' '}
          <a className="underline" href="https://madcatter.studio/" target="_blank" rel="noopener noreferrer">
            madcatter.studio
          </a>
          . For everything else, reach out at{' '}
          <a className="underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center justify-start gap-2 sm:space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
