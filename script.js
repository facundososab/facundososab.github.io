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

emailjs.init('SQwjMcWHR-RWQZs0O') // Initialize emailjs with the user id

function sendEmails(formData) {
  // Send the email to me
  return emailjs.send('service_604rk54', 'template_hsaguau', {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'facundososadev@gmail.com',
    subject: 'Facundo Sosa - Web Developer & Designer',
  })
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
      formSubmitBtn.style.display = 'none'
      loader.style.display = 'block'
      if (form.checkValidity() && messageTextarea.value.length <= 255) {
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
})
