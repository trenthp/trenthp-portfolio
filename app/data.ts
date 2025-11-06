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
    link: 'https://optavia.com',
    video:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&h=360&fit=crop',
    id: 'project1',
  },
  {
    name: 'Client App Redesign',
    description: 'Led comprehensive product transformation increasing app rating from 2.3 to 4.7. Established design systems, conducted user research, and drove cross-functional collaboration.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1522869635100-ce9f1db0a47c?w=640&h=360&fit=crop',
    id: 'project2',
  },
  {
    name: 'Emerging Technology Integration',
    description: 'Pioneered adoption of AI-powered features and conversational UI patterns. Created compelling prototypes and northstar visions for next-generation product experiences.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1699681336851-eda00f6e4c01?w=640&h=360&fit=crop',
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
    description: 'Design and artificial intelligence are increasingly intertwined, driving innovation across industries. Exploring the future of design engineering.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features and improve discoverability.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-2',
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
