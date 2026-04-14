import bootstrapLogo from '../img/skills-logos/bootstrap.svg'
import cssLogo from '../img/skills-logos/css.svg'
import dockerLogo from '../img/skills-logos/docker.svg'
import expressLogo from '../img/skills-logos/express.svg'
import gitLogo from '../img/skills-logos/git.svg'
import htmlLogo from '../img/skills-logos/html.svg'
import javascriptLogo from '../img/skills-logos/javascript.svg'
import mongodbLogo from '../img/skills-logos/mongodb.svg'
import mysqlLogo from '../img/skills-logos/mysql.svg'
import nodejsLogo from '../img/skills-logos/nodejs.svg'
import phpLogo from '../img/skills-logos/php.svg'
import pythonLogo from '../img/skills-logos/python.svg'
import reactLogo from '../img/skills-logos/react.svg'
import typescriptLogo from '../img/skills-logos/typescript.svg'

import itinerariaThumb from '../img/projects/itineraria/miniatura_itineraria.png'
import veterinariaThumb from '../img/projects/veterinaria-sananton/miniatura_sananton.png'

export const technologyCatalog = {
  html: { name: 'HTML', logo: htmlLogo },
  css: { name: 'CSS', logo: cssLogo },
  javascript: { name: 'JavaScript', logo: javascriptLogo },
  typescript: { name: 'TypeScript', logo: typescriptLogo },
  react: { name: 'React', logo: reactLogo },
  nodejs: { name: 'Node.js', logo: nodejsLogo },
  express: { name: 'Express', logo: expressLogo },
  mongodb: { name: 'MongoDB', logo: mongodbLogo },
  mysql: { name: 'MySQL', logo: mysqlLogo },
  git: { name: 'Git', logo: gitLogo },
  bootstrap: { name: 'Bootstrap', logo: bootstrapLogo },
  php: { name: 'PHP', logo: phpLogo },
  python: { name: 'Python', logo: pythonLogo },
  docker: { name: 'Docker', logo: dockerLogo },
}

export const projects = [
  {
    id: 'project-veterinaria-san-anton',
    badge: 'Project 1',
    title: 'Veterinaria San Anton',
    description:
      'Streamlines veterinary clinic operations by managing appointments, patients, and services in a centralized system.',
    technologies: ['php', 'mysql', 'html', 'css', 'bootstrap'],
    image: veterinariaThumb,
    imageWidth: 3428,
    imageHeight: 1914,
    githubUrl: 'https://github.com/facundososab/VeterinariaSanAnton',
  },
  {
    id: 'project-itineraria',
    badge: 'Project 2',
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
    githubUrl: 'https://github.com/TomasSanchezMachado/itinerarIA-Backend',
  },
  {
    id: 'project-drone-routes-optimization',
    badge: 'Project 3',
    title: 'Drone Routes Optimization',
    description:
      'Optimizes drone delivery routes using genetic algorithms to improve efficiency and reduce operational costs. Awarded 2nd place in the research track at CONAIISI 2026 (National Congress of Information Systems Engineering)🏆.',
    technologies: ['python'],
    image: null,
    imageWidth: null,
    imageHeight: null,
    githubUrl: 'https://github.com/facundososab/drone-routes-optimization',
  },
]

export const coreSkills = [
  'Business requirements analysis',
  'Software architecture and system design',
  'Data modeling',
  'Design patterns & Clean Architecture',
  'Scalable system design',
  'Complex problem solving',
  'Process optimization',
  'End-to-end product development',
]

export const skills = Object.entries(technologyCatalog).map(
  ([id, technology]) => ({
    id,
    ...technology,
  }),
)
