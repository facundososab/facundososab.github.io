const projects = [
  {
    title: 'San Anton Veterinary Clinic',
    description:
      'Veterinary management system with a login feature that customizes views, functionalities, and permissions based on user roles.',
    technologies: ['html', 'css', 'bootstrap', 'php', 'mysql'],
    image: 'img/proyects/veterinaria-sananton/miniatura_sananton.png',
    homepage_image: 'img/proyects/veterinaria-sananton/homepage_sananton.png',
  },
  {
    title: 'ItinerarIA',
    description:
      'AI-driven travel itinerary generator using Gemini, creating customized travel plans based on individual preferences.',
    technologies: [
      'html',
      'css',
      'tailwind',
      'typescript',
      'react',
      'nodejs',
      'express',
      'mongodb',
      'docker',
    ],
    image: 'img/proyects/itineraria/miniatura_itineraria.png',
    homepage_image: 'img/proyects/itineraria/homepage_itineraria.png',
  },
]

const skills = [
  { name: 'HTML', logo: 'html.svg' },
  { name: 'CSS', logo: 'css.svg' },
  { name: 'JavaScript', logo: 'javascript.svg' },
  { name: 'TypeScript', logo: 'typescript.svg' },
  { name: 'React', logo: 'react.svg' },
  { name: 'Node.js', logo: 'nodejs.svg' },
  { name: 'Express', logo: 'express.svg' },
  { name: 'MongoDB', logo: 'mongodb.svg' },
  { name: 'MySQL', logo: 'mysql.svg' },
  { name: 'Git', logo: 'git.svg' },
  { name: 'Bootstrap', logo: 'bootstrap.svg' },
  { name: 'PHP', logo: 'php.svg' },
  { name: 'Docker', logo: 'docker.svg' },
]

function createProjectCard(project) {
  const card = document.createElement('div')
  card.className = 'col-md-6 mb-4'
  card.innerHTML = `
    <div class="project-card" style="background-image: url('${
      project.image
    }');">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-technologies">
          <h4>Technologies:</h4>
          <div class="d-flex flex-wrap gap-2">
            ${project.technologies
              .map(
                (tech) =>
                  `<img src="img/skills-logos/${tech}.svg" alt="${tech} logo" class="skill-logo" />`
              )
              .join('')}
          </div>
        </div>
        <a href="#" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#modal-${project.title
          .toLowerCase()
          .replace(/\s+/g, '-')}">View more</a>
      </div>
      <div class="project-info-mobile">
        <h3>${project.title}</h3>
        <a href="#" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#modal-${project.title
          .toLowerCase()
          .replace(/\s+/g, '-')}">View details</a>
      </div>
    </div>
  `
  return card
}

function createProjectModal(project) {
  const modal = document.createElement('div')
  modal.className = 'modal fade'
  modal.id = `modal-${project.title.toLowerCase().replace(/\s+/g, '-')}`
  modal.setAttribute('tabindex', '-1')
  modal.setAttribute('aria-labelledby', `${project.title}ModalLabel`)
  modal.setAttribute('aria-hidden', 'true')

  modal.innerHTML = `
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${project.title}ModalLabel">${
    project.title
  }</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${project.homepage_image}" alt="${
    project.title
  } Homepage" class="img-fluid w-100">
          <p class="mt-3">${project.description}</p>
          <div class="project-technologies mt-3">
            <h6>Technologies:</h6>
            <div class="d-flex flex-wrap gap-2">
              ${project.technologies
                .map(
                  (tech) =>
                    `<img src="img/skills-logos/${tech}.svg" alt="${tech} logo" class="skill-logo" />`
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  return modal
}

function createSkillItem(skill) {
  const item = document.createElement('div')
  item.className = 'skill-item'
  item.innerHTML = `
    <img src="img/skills-logos/${skill.logo}" alt="${skill.name}" class="skill-logo">
    <span class="skill-name">${skill.name}</span>
  `
  return item
}

function loadProjects() {
  const projectList = document.getElementById('project-list')
  const modalContainer = document.createElement('div')
  modalContainer.id = 'modal-container'
  document.body.appendChild(modalContainer)

  projects.forEach((project) => {
    projectList.appendChild(createProjectCard(project))
    modalContainer.appendChild(createProjectModal(project))
  })
}

function loadSkills() {
  const skillContainer = document.querySelector('.skill-container')
  skills.forEach((skill) => {
    skillContainer.appendChild(createSkillItem(skill))
  })
}

emailjs.init('SQwjMcWHR-RWQZs0O') // Inicializar EmailJS

function sendEmails(formData) {
  // Enviar el correo a mi
  const sendToYou = emailjs.send('service_604rk54', 'template_hsaguau', {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'facundososadev@gmail.com',
    subject: 'Mensaje desde portfolio',
  })

  // Enviar el correo al remitente (informándole que su mensaje fue enviado)
  const sendToSender = emailjs.send('service_604rk54', 'template_j2wgpsq', {
    from_name: formData.name,
    from_email: 'facundososadev@gmail.com',
    to_email: formData.email, // El correo del remitente
    subject: '¡Mensaje recibido!', // Asunto del correo
    message: formData.message, // Mensaje que se le enviará al remitente
  })

  return Promise.all([sendToYou, sendToSender])
}

function validateForm() {
  const form = document.getElementById('contact-form')
  const messageTextarea = document.getElementById('message')
  const charCount = document.getElementById('charCount')
  const formSuccess = document.getElementById('form-success')
  const formError = document.getElementById('form-error')
  const formSubmitBtn = document.getElementById('submit-btn')
  const loader = document.getElementById('loader')

  messageTextarea.addEventListener('input', function () {
    const currentLength = this.value.length
    charCount.textContent = `${currentLength} / 255`
  })

  form.addEventListener(
    'submit',
    function (event) {
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity() && messageTextarea.value.length <= 255) {
        formSubmitBtn.style.display = 'none'
        loader.style.display = 'block'
        const formData = {
          name: form.querySelector('input[id="name"]').value,
          email: form.querySelector('input[id="email"]').value,
          message: messageTextarea.value,
        }

        // Send the emails
        sendEmails(formData)
          .then(function (response) {
            loader.style.display = 'none'
            console.log('Email sent successfully:', response)
            form.reset()
            charCount.textContent = '0 / 255'
            form.classList.remove('was-validated')
            formSuccess.style.display = 'block'
            formError.style.display = 'none'
            setTimeout(() => {
              formSuccess.style.display = 'none'
              formSubmitBtn.style.display = 'block'
            }, 3000)
          })
          .catch(function (error) {
            loader.style.display = 'none'
            console.error('Error sending email:', error)
            formError.style.display = 'block'
            formSuccess.style.display = 'none'
            setTimeout(() => {
              formError.style.display = 'none'
              formSubmitBtn.style.display = 'block'
            }, 3000)
          })
      } else {
        if (messageTextarea.value.length > 255) {
          messageTextarea.setCustomValidity(
            'Message must not exceed 255 characters'
          )
        } else {
          messageTextarea.setCustomValidity('')
        }
      }

      form.classList.add('was-validated')
    },
    false
  )
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjects()
  loadSkills()
  validateForm()

  const savedTheme = localStorage.getItem('theme') || 'dark'
  setTheme(savedTheme)
  updateThemeToggleButton(savedTheme)

  const themeToggle = document.getElementById('theme-toggle')
  themeToggle.addEventListener('click', toggleTheme)
})

// Theme toggle functionality
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.body.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'dark'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  updateThemeToggleButton(newTheme)
  updateMenuToggleButton(newTheme)
}

function updateThemeToggleButton(theme) {
  const toggleButton = document.getElementById('theme-toggle')
  toggleButton.innerHTML =
    theme === 'dark'
      ? '<i class="bi bi-moon-fill"></i>'
      : '<i class="bi bi-sun-fill"></i>'
}

// function updateMenuToggleButton(theme) {
//   const menuToggleButton = document.querySelector('.navbar-toggler')
//   theme === 'dark'
//     ? menuToggleButton.style.setProperty(
//         '--bs-navbar-toggler-icon-bg',
//         "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
//       )
//     : menuToggleButton.style.setProperty(
//         '--bs-navbar-toggler-icon-bg',
//         "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
//       )
// }

// Cerrar el menú cuando se hace clic fuera de él
const navbarToggler = document.querySelector('.navbar-toggler')
const navbarCollapse = document.querySelector('.navbar-collapse')
document.addEventListener('click', function (e) {
  if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
    navbarCollapse.classList.remove('show')
  }
})

// Resaltar la sección activa y cerrar el menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    // Eliminar la clase 'active' de todos los enlaces
    navLinks.forEach((navLink) => navLink.classList.remove('active'))
    // Añadir la clase 'active' al enlace clickeado
    this.classList.add('active')
    // Cerrar el menú si está abierto
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show')
    }
  })
})

const sections = document.querySelectorAll('section')
window.addEventListener('scroll', () => {
  let currentSection = ''
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120 // Ajuste por el offset de la navbar
    const sectionHeight = section.clientHeight
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute('id')
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active')
    }
  })
})
