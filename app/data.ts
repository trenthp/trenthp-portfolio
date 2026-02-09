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
    name: '2.3 → 4.7+ App Store Turnaround',
    description:
      'Diagnosed a failing app as an organizational problem, not a UI problem. Built the team, strategy, and process to turn it around. +35% retention, +40% DAU.',
    link: '#case-study',
    video: '/images/projects/app-store-turnaround.png',
    id: 'project-app-turnaround',
    slug: 'app-store-turnaround',
    category: 'work',
  },
  {
    name: 'Turning a CEO-Level Crisis into a New Way of Working',
    description:
      'Used a high-pressure moment to prove that designers who get closer to code ship faster. Proved it myself first, then scaled it. 50% faster prototype-to-test cycles.',
    link: '#case-study',
    video: '/images/projects/ai-empowered-design.png',
    id: 'project-ai-design',
    slug: 'ceo-crisis-new-way-of-working',
    category: 'work',
  },
  {
    name: 'Group Nom',
    description:
      'Built a collaborative restaurant discovery app from zero to live product, solo. Product strategy, design, brand, and full-stack development. Pivoted the data model mid-build when the original approach hit a wall.',
    link: '#case-study',
    video: '/images/projects/groupNom/groupNom_slide-2a.png',
    id: 'project-group-nom',
    slug: 'group-nom',
    category: 'side',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'OPTAVIA',
    title: 'Director of Product Design',
    start: '2020',
    end: 'Present',
    link: '#',
    id: 'work1',
  },
  {
    company: 'Overstock',
    title: 'Lead UX Product Designer',
    start: '2020',
    end: '2018',
    link: '#',
    id: 'work2',
  },
  {
    company: 'Surge',
    title: 'Sr. UX / Product Designer',
    start: '2014',
    end: '2018',
    link: '#',
    id: 'work3',
  },
  {
    company: 'Army National Guard',
    title: 'Human Intelligence Collector',
    start: '2010',
    end: '2016',
    link: '#',
    id: 'work4',
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
  {
    label: 'GitHub',
    link: 'https://github.com/trenthp',
  },
  {
    label: 'Resume',
    link: 'https://drive.google.com/file/d/1hvOF73viXociM_Z52LZsPC6vBYv1t8ga/view?usp=sharing',
  },
]

export const EMAIL = 'trentpetersen@gmail.com'
export const LINKEDIN = 'linkedin.com/in/trenthp'
