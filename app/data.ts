type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'OPTAVIA Coach Experience',
    description:
      'Transformed coach mobile app through user-centered redesign, achieving industry-leading 4.9 rating. Led end-to-end product strategy, user research, and UI execution.',
    link: '#',
    video:
      'https://via.placeholder.com/640x360?text=OPTAVIA+Coach+App',
    id: 'project1',
  },
  {
    name: 'Client App Redesign',
    description: 'Led comprehensive product transformation increasing app rating from 2.3 to 4.7. Established design systems, conducted user research, and drove cross-functional collaboration.',
    link: '#',
    video:
      'https://via.placeholder.com/640x360?text=Client+App+Redesign',
    id: 'project2',
  },
  {
    name: 'Emerging Technology Integration',
    description: 'Pioneered adoption of AI-powered features and conversational UI patterns. Created compelling prototypes and northstar visions for next-generation product experiences.',
    link: '#',
    video:
      'https://via.placeholder.com/640x360?text=AI+Integration',
    id: 'project3',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'OPTAVIA',
    title: 'Director of Product Design',
    start: '2020',
    end: 'Present',
    link: 'https://optavia.com',
    id: 'work1',
  },
  {
    company: 'Various Organizations',
    title: 'Senior Product Design Leadership',
    start: '2012',
    end: '2020',
    link: '#',
    id: 'work2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/trenthp',
  },
  {
    label: 'Email',
    link: 'mailto:trentpetersen@gmail.com',
  },
]

export const EMAIL = 'trentpetersen@gmail.com'
