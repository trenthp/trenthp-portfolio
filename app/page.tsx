'use client'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import Link from 'next/link'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EMAIL,
  SOCIAL_LINKS,
  LINKEDIN,
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
        <div className="flex-1">
          <p>
            Product Design Leader with 12+ years of experience building and mentoring teams to deliver complex B2C/B2B digital products. Proven record of increasing user engagement. Skilled in translating business ambiguity and emerging technologies into clear, actionable product visions. Seeking to team with others looking to build the future of immersive and intelligent applications.
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
        <h3 className="mb-5 text-lg font-medium">Work Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.filter((p) => p.category === 'work').map((project) => (
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
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <ProjectVideo src={project.video} />
                  </div>
                  <div>
                    <h4 className="font-base font-[450]">
                      {project.name}
                    </h4>
                    <p className="text-sm">
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
        <h3 className="mb-5 text-lg font-medium">Side Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.filter((p) => p.category === 'side').map((project) => (
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
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <ProjectVideo src={project.video} />
                  </div>
                  <div>
                    <h4 className="font-base font-[450]">
                      {project.name}
                    </h4>
                    <p className="text-sm">
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
        <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl p-4 card-bg"
            >
              <div className="flex w-full flex-row gap-6">
                <p className="w-32 shrink-0">
                  {job.start} - {job.end}
                </p>
                <div>
                  <h4 className="font-normal">
                    {job.title}
                  </h4>
                  <p>
                    {job.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <br />
          <p className="mb-5">
            View full work history at{' '}
            <a className="underline" href={`https://${LINKEDIN}`} target="_blank" rel="noopener noreferrer">
              {LINKEDIN}
            </a>
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5">
          Feel free to contact me at{' '}
          <a className="underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
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
