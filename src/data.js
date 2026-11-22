import brandLogo from '../img/memoticon-facundo-sosa.svg'

import bootstrapLogo from '../img/skills-logos/bootstrap.svg'
import cssLogo from '../img/skills-logos/css.svg'
import djangoLogo from '../img/skills-logos/django.svg'
import dockerLogo from '../img/skills-logos/docker.svg'
import expressLogo from '../img/skills-logos/express.svg'
import gitLogo from '../img/skills-logos/git.svg'
import htmlLogo from '../img/skills-logos/html.svg'
import javascriptLogo from '../img/skills-logos/javascript.svg'
import langchainLogo from '../img/skills-logos/langchain.svg'
import langgraphLogo from '../img/skills-logos/langgraph.svg'
import mongodbLogo from '../img/skills-logos/mongodb.svg'
import mysqlLogo from '../img/skills-logos/mysql.svg'
import nextjsLogo from '../img/skills-logos/nextjs.svg'
import nodejsLogo from '../img/skills-logos/nodejs.svg'
import phpLogo from '../img/skills-logos/php.svg'
import postgresqlLogo from '../img/skills-logos/postgresql.svg'
import prismaLogo from '../img/skills-logos/prisma.svg'
import pythonLogo from '../img/skills-logos/python.svg'
import rabbitmqLogo from '../img/skills-logos/rabbitmq.svg'
import reactLogo from '../img/skills-logos/react.svg'
import typescriptLogo from '../img/skills-logos/typescript.svg'

import easybookThumb from '../img/projects/easybook.png'
import itinerariaThumb from '../img/projects/itineraria/miniatura_itineraria.png'
import veterinariaThumb from '../img/projects/veterinaria-sananton/miniatura_sananton.png'

export { brandLogo }

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/facundo-sosa-bianciotto-3a0656216/',
  github: 'https://github.com/facundososab',
}

export const navItems = [
  { href: '#about', label: 'About me' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export const aboutParagraphs = [
  'I am a Systems Analyst and currently in my final year of a Systems Engineering degree. I am passionate about technology, especially its ability to create innovative solutions that generate real value and solve real-world problems.',
  'I am particularly interested in focusing my professional career on software architecture and system design, building robust and scalable solutions by applying software engineering principles and best practices such as Clean Architecture. My goal is to develop maintainable, decoupled systems that can evolve over time.',
  'In my projects, I approach development end-to-end: from business requirements analysis and problem understanding, to architecture design, data modeling, and business logic implementation. I enjoy transforming ideas and needs into well-structured technical solutions.',
  'I am especially motivated by solving complex problems, optimizing processes, and designing efficient and reliable systems in real-world environments where technology has a tangible impact.',
  'I consider myself a curious, creative, and proactive person, with strong critical thinking skills and a continuous learning mindset, which allows me to quickly adapt to new challenges and technologies.',
]

export const technologyCatalog = {
  html: { name: 'HTML', logo: htmlLogo },
  css: { name: 'CSS', logo: cssLogo },
  javascript: { name: 'JavaScript', logo: javascriptLogo },
  typescript: { name: 'TypeScript', logo: typescriptLogo },
  react: { name: 'React', logo: reactLogo },
  nextjs: { name: 'Next.js', logo: nextjsLogo, darkInvert: true },
  nodejs: { name: 'Node.js', logo: nodejsLogo },
  express: { name: 'Express', logo: expressLogo, darkInvert: true },
  mongodb: { name: 'MongoDB', logo: mongodbLogo },
  mysql: { name: 'MySQL', logo: mysqlLogo },
  postgresql: { name: 'PostgreSQL', logo: postgresqlLogo },
  prisma: { name: 'Prisma', logo: prismaLogo, darkInvert: true },
  git: { name: 'Git', logo: gitLogo },
  bootstrap: { name: 'Bootstrap', logo: bootstrapLogo },
  php: { name: 'PHP', logo: phpLogo },
  python: { name: 'Python', logo: pythonLogo },
  django: { name: 'Django', logo: djangoLogo },
  docker: { name: 'Docker', logo: dockerLogo },
  rabbitmq: { name: 'RabbitMQ', logo: rabbitmqLogo },
  langchain: { name: 'LangChain', logo: langchainLogo, darkInvert: true },
  langgraph: { name: 'LangGraph', logo: langgraphLogo, darkInvert: true },
}

export const projects = [
  {
    id: 'project-easybook',
    featured: true,
    title: 'Easybook',
    description:
      'SaaS platform for accommodations that automates guest support and booking management using AI agents integrated with WhatsApp, with payments processed through Mercado Pago.',
    technologies: [
      'typescript',
      'nodejs',
      'nextjs',
      'postgresql',
      'prisma',
      'rabbitmq',
      'langgraph',
    ],
    image: easybookThumb,
    imageWidth: null,
    imageHeight: null,
    websiteUrl: 'https://easybook.com.ar',
    githubUrl: null,
  },
  {
    id: 'project-veterinaria-san-anton',
    title: 'Veterinaria San Anton',
    description:
      'Streamlines veterinary clinic operations by managing appointments, patients, and services in a centralized system.',
    technologies: ['php', 'mysql', 'html', 'css', 'bootstrap'],
    image: veterinariaThumb,
    imageWidth: 3428,
    imageHeight: 1914,
    websiteUrl: null,
    githubUrl: 'https://github.com/facundososab/VeterinariaSanAnton',
  },
  {
    id: 'project-itineraria',
    title: 'ItinerarIA',
    description:
      'Generates personalized itineraries using AI, integrating user preferences, activities, and external services into a unified platform.',
    technologies: [
      'typescript',
      'nodejs',
      'express',
      'mongodb',
      'react',
      'html',
      'css',
      'docker',
    ],
    image: itinerariaThumb,
    imageWidth: 3428,
    imageHeight: 1914,
    websiteUrl: null,
    githubUrl: 'https://github.com/TomasSanchezMachado/itinerarIA-Backend',
  },
  {
    id: 'project-rapidfood',
    tag: 'SaaS',
    title: 'RapidFood',
    description:
      'SaaS platform for restaurants that automates customer support and food order management through AI agents on WhatsApp, with Mercado Pago integration for payment processing.',
    technologies: ['python', 'django', 'langgraph', 'rabbitmq'],
    image: null,
    imageWidth: null,
    imageHeight: null,
    websiteUrl: null,
    githubUrl: null,
  },
  {
    id: 'project-drone-routes-optimization',
    award: 'CONAIISI 2026 · 2nd Place Research Track',
    title: 'Drone Routes Optimization',
    description:
      'Optimizes drone delivery routes using genetic algorithms to improve efficiency and reduce operational costs. Awarded 2nd place in the research track at CONAIISI 2026 (National Congress of Information Systems Engineering)🏆.',
    technologies: ['python'],
    image: null,
    imageWidth: null,
    imageHeight: null,
    websiteUrl: null,
    githubUrl: 'https://github.com/facundososab/drone-routes-optimization',
  },
]

export const coreSkills = [
  'Business requirements analysis',
  'Software architecture and system design',
  'Data modeling',
  'Design patterns & Clean Architecture',
  'Scalable system design',
  'AI agent architecture and LLM orchestration',
  'Complex problem solving',
  'Process optimization',
  'End-to-end product development',
]

export const skillGroups = [
  {
    category: 'languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'HTML', 'CSS'],
  },
  {
    category: 'frameworks_runtime',
    items: [
      'Next.js',
      'React',
      'Node.js',
      'Express',
      'Django',
      'LangChain',
      'LangGraph',
      'Bootstrap',
    ],
  },
  {
    category: 'databases_tooling',
    items: ['PostgreSQL', 'Prisma', 'MySQL', 'MongoDB', 'RabbitMQ', 'Docker', 'Git'],
  },
]

export const skills = Object.entries(technologyCatalog).map(
  ([id, technology]) => ({
    id,
    ...technology,
  }),
)
