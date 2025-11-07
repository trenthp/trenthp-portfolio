type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
  slug: string
  category: 'work' | 'side'
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
    name: 'Building an AI-Empowered Design Team',
    description:
      'Strategic program to solve a high-visibility product crisis by integrating AI into our design workflow. Resolved CEO-level issues, launched major features, and cut design/dev cycle time by 50%.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1699681336851-eda00f6e4c01?w=640&h=360&fit=crop',
    id: 'project-ai-design',
    slug: 'building-ai-empowered-design-team',
    category: 'work',
  },
  {
    name: '2.3 → 4.7+ App Store Turnaround',
    description:
      'Complete strategic overhaul of flagship B2C mobile application. Transformed a 2.3-star app into 4.7+ star brand asset, driving +35% user retention and +40% daily active users.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1522869635100-ce9f1db0a47c?w=640&h=360&fit=crop',
    id: 'project-app-turnaround',
    slug: 'app-store-turnaround',
    category: 'work',
  },
  {
    name: 'Self-Driven Explorations in Spatial Computing & AR',
    description:
      'Research and development sprint exploring spatial design foundations. Developed conceptual framework for spatial design system and functional WebXR prototype to test principles.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1699681336851-eda00f6e4c01?w=640&h=360&fit=crop',
    id: 'project-spatial-ar',
    slug: 'spatial-computing-ar',
    category: 'work',
  },
  {
    name: 'My Leadership Philosophy',
    description:
      'How I design teams, strategies, and products that thrive in complexity. Core principles for building empowered, high-performing teams that deliver great results.',
    link: '#case-study',
    video:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=360&fit=crop',
    id: 'project-leadership',
    slug: 'leadership-philosophy',
    category: 'work',
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
