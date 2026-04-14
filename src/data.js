export const technologyCatalog = {
  html: { name: 'HTML', logo: 'html.svg' },
  css: { name: 'CSS', logo: 'css.svg' },
  javascript: { name: 'JavaScript', logo: 'javascript.svg' },
  typescript: { name: 'TypeScript', logo: 'typescript.svg' },
  react: { name: 'React', logo: 'react.svg' },
  nodejs: { name: 'Node.js', logo: 'nodejs.svg' },
  express: { name: 'Express', logo: 'express.svg' },
  mongodb: { name: 'MongoDB', logo: 'mongodb.svg' },
  mysql: { name: 'MySQL', logo: 'mysql.svg' },
  git: { name: 'Git', logo: 'git.svg' },
  bootstrap: { name: 'Bootstrap', logo: 'bootstrap.svg' },
  php: { name: 'PHP', logo: 'php.svg' },
  python: { name: 'Python', logo: 'python.svg' },
  docker: { name: 'Docker', logo: 'docker.svg' },
}

export const projects = [
  {
    id: 'project-veterinaria-san-anton',
    badge: 'Project 1',
    title: 'Veterinaria San Anton',
    description:
      'Streamlines veterinary clinic operations by managing appointments, patients, and services in a centralized system.',
    technologies: ['php', 'mysql', 'html', 'css', 'bootstrap'],
    image: 'img/proyects/veterinaria-sananton/miniatura_sananton.png',
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
    image: 'img/proyects/itineraria/miniatura_itineraria.png',
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
