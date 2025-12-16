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
    name: 'Group Nom',
    description:
      'Building a collaborative restaurant discovery app from scratch. Exploring what becomes possible when AI-native development meets strong product and design thinking.',
    link: '#case-study',
    video: '/images/projects/groupNom/groupNom_slide-2a.png',
    id: 'project-group-nom',
    slug: 'group-nom',
    category: 'side',
  },
  {
    name: 'Building an AI-Empowered Design Team',
    description:
      'Strategic program to solve a high-visibility product crisis by integrating AI into our design workflow. Resolved CEO-level issues, launched major features, and cut design/dev cycle time by 50%.',
    link: '#case-study',
    video: '/images/projects/ai-empowered-design.png',
    id: 'project-ai-design',
    slug: 'building-ai-empowered-design-team',
    category: 'work',
  },
  {
    name: '2.3 → 4.7+ App Store Turnaround',
    description:
      'Complete strategic overhaul of flagship B2C mobile application. Transformed a 2.3-star app into 4.7+ star brand asset, driving +35% user retention and +40% daily active users.',
    link: '#case-study',
    video: '/images/projects/app-store-turnaround.png',
    id: 'project-app-turnaround',
    slug: 'app-store-turnaround',
    category: 'work',
  },
  {
    name: 'My Leadership Philosophy',
    description:
      'How I design teams, strategies, and products that thrive in complexity. Core principles for building empowered, high-performing teams that deliver great results.',
    link: '#case-study',
    video: '/images/projects/leadership-philosophy.png',
    id: 'project-leadership',
    slug: 'leadership-philosophy',
    category: 'work',
  },
  {
    name: 'Tool Building with AI',
    description:
      'Building a visual mapping tool that connects user needs to interface design using JTBD and Elements of UX frameworks.',
    link: '#case-study',
    video: '/images/projects/layers-mapping.mp4',
    id: 'tool-building-ai',
    slug: 'tool-building-ai',
    category: 'side',
  },
  {
    name: 'Explorations in Spatial Computing & AR + AI',
    description:
      'Research and development sprint exploring spatial design foundations. Developed conceptual framework for spatial design system and functional WebXR prototype to test principles with AI workflows.',
    link: '#case-study',
    video: '/images/projects/spatial-computing-ar.png',
    id: 'project-spatial-ar',
    slug: 'spatial-computing-ar',
    category: 'side',
  },
  {
    name: 'Musical Exploration with AI',
    description:
      'Exploring the intersection of music and artificial intelligence. Producing an EP leveraging AI tools to create, experiment, and innovate in sound design and composition.',
    link: '#case-study',
    video: '/images/projects/a notion EP.png',
    id: 'project-musical-ai',
    slug: 'musical-exploration-ai',
    category: 'side',
  },
  {
    name: 'Prior IC Work',
    description:
      'A peek at my portfolio from prior agency and freelance engagements of SaaS and Enterprise applications.',
    link: 'https://trenthp.github.io/portfolio/index.html',
    video: '/images/projects/icWork.mp4',
    id: 'ic-work',
    slug: 'ic-work',
    category: 'work',
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
    label: 'Instagram',
    link: 'https://instagram.com/trenthp',
  },
  {
    label: 'Resume',
    link: 'https://drive.google.com/file/d/1hvOF73viXociM_Z52LZsPC6vBYv1t8ga/view?usp=sharing',
  },
]

export const EMAIL = 'trentpetersen@gmail.com'
export const LINKEDIN = 'linkedin.com/in/trenthp'
