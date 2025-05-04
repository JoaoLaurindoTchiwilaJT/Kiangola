// Variável global para armazenar todos os dados de empregos
let allJobsData = [];

document.addEventListener('DOMContentLoaded', function() {
  // Carrega os dados iniciais
  initializeJobsData();
  
  const searchInput = document.getElementById('search');

  // Configura event listeners para busca
  searchInput.addEventListener('input', debounce(handleSearch, 300));
  searchInput.addEventListener('blur', checkExactMatch);
});

// Inicializa os dados de empregos a partir da variável blade
function initializeJobsData() {
  try {
    // Os dados já foram renderizados na view pelo Laravel
    if (typeof window.jobsData !== 'undefined') {
      allJobsData = window.jobsData;
    }
  } catch (error) {
    console.error('Erro ao inicializar dados de empregos:', error);
    allJobsData = [];
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Função para lidar com a pesquisa e filtragem
function handleSearch() {
  const searchTerm = document.getElementById('search').value.trim().toLowerCase();
  const loader = document.querySelector('.loader');
  const noJobsMessage = document.querySelector('.no-jobs');
  const allJobsSection = document.getElementById('featuredJobs');

  // Mostrar loader e esconder mensagem de "sem vagas"
  loader.style.display = 'block';
  noJobsMessage.style.display = 'none';
  
  // Se o termo de pesquisa estiver vazio, mostrar todas as vagas
  if (!searchTerm) {
    loader.style.display = 'none';
    displayJobs(allJobsData, allJobsSection);
    return;
  }
  
  // Filtrar vagas localmente com base no termo de pesquisa
  const filteredJobs = filterJobs(searchTerm);
  
  loader.style.display = 'none';
  
  if (filteredJobs.length === 0) {
    showNotFoundMessage(noJobsMessage);
    allJobsSection.innerHTML = ''; // Limpa a seção de vagas
  } else {
    displayJobs(filteredJobs, allJobsSection);
  }
}

// Função para filtrar empregos baseado no termo de busca
function filterJobs(searchTerm) {
  if (!searchTerm) return allJobsData;
  
  return allJobsData.filter(job => {
    const title = job.title?.toLowerCase() || '';
    const company = job.company?.toLowerCase() || '';
    const location = job.location?.toLowerCase() || '';
    const description = job.description?.toLowerCase() || '';
    
    // Busca em todos os campos relevantes
    return title.includes(searchTerm) || 
           company.includes(searchTerm) || 
           location.includes(searchTerm) ||
           description.includes(searchTerm);
  });
}

// Função para verificar correspondência exata quando o usuário terminar de digitar
function checkExactMatch() {
  const searchTerm = document.getElementById('search').value.trim().toLowerCase();
  
  if (!searchTerm) return;
  
  const noJobsMessage = document.querySelector('.no-jobs');
  const allJobsSection = document.getElementById('featuredJobs');
  
  // Verificar se o termo digitado é exatamente igual a algum título
  const exactMatch = allJobsData.find(job => 
    job.title.toLowerCase() === searchTerm
  );
  
  // Se houver correspondência exata, mostrar apenas essa vaga específica
  if (exactMatch) {
    allJobsSection.innerHTML = '';
    noJobsMessage.style.display = 'none';
    displayJobs([exactMatch], allJobsSection);
  }
}

// Função para mostrar a mensagem "Vaga não encontrada" com atraso
function showNotFoundMessage(noJobsMessage) {
  setTimeout(() => {
    noJobsMessage.style.display = 'block';
    noJobsMessage.innerHTML = `<i class="fas fa-search"></i> Vaga não encontrada`;
  }, 500);
}

// Função para exibir as vagas na interface
function displayJobs(jobs, container) {
  container.innerHTML = '';
  
  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    
    jobCard.innerHTML = `
      <div class="job-header">
        <div class="company-logo"><i class="fas fa-building"></i></div>
        <div class="job-id">
          <input type="hidden" class="jobIds" value="${job.id}">
        </div>
        <div class="job-details">
          <h3>${job.title}</h3>
          <p class="company-name">${job.company}</p>
          <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
        </div>
      </div>
      <div class="job-description">
        <p>${truncateText(job.description, 100)}</p>
      </div>
      <div class="job-actions">
        <button class="btn-details" data-job-id="${job.id}">Ver Detalhes</button>
      </div>
    `;
    
    container.appendChild(jobCard);
  });
  
  // Adiciona event listeners para todos os botões de detalhes
  document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', function() {
      const jobId = this.getAttribute('data-job-id');
      openJobModalById(jobId);
    });
  });
}

// Função auxiliar para truncar texto
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Função para abrir o modal com base no ID do job
function openJobModalById(jobId) {
  try {
    // Procurar o job pelo ID nos dados armazenados
    const job = findJobById(jobId);
    
    if (!job) {
      throw new Error('Vaga não encontrada');
    }
    
    // Preencher o modal com os dados do job
    document.getElementById('modalJobTitle').textContent = job.title;
    document.getElementById('modalCompanyName').textContent = job.company;
    document.getElementById('modalIndustry').textContent = job.industry || 'Não especificado';
    document.getElementById('modalJobLocation').textContent = job.location;
    document.getElementById('modalJobDescription').innerHTML = `<p>${job.description}</p>`;

    // Exibir requisitos
    const requisitosList = document.getElementById('modalJobRequirements');
    requisitosList.innerHTML = ''; 
    if (job.requisitos && Array.isArray(job.requisitos)) {
      job.requisitos.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req.requisitos_job;
        requisitosList.appendChild(li);
      });
    }

    // Exibir benefícios
    const beneficiosList = document.getElementById('modalJobBenefits');
    beneficiosList.innerHTML = '';
    if (job.beneficios && Array.isArray(job.beneficios)) {
      job.beneficios.forEach(ben => {
        const li = document.createElement('li');
        li.textContent = ben.beneficios_job;
        beneficiosList.appendChild(li);
      });
    }

    // Exibir tags
    const tagsContainer = document.getElementById('modalJobTags');
    tagsContainer.innerHTML = '';
    if (job.tags && Array.isArray(job.tags)) {
      job.tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag.tags_job;
        tagsContainer.appendChild(li);
      });
    }

    document.getElementById('jobModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao buscar detalhes da vaga:', error);
    alert('Não foi possível carregar os detalhes desta vaga. Por favor, tente novamente mais tarde.');
  }
}

// Função auxiliar para encontrar um job pelo ID
function findJobById(jobId) {
  return allJobsData.find(job => job.id == jobId);
}

function closeJobModal() {
  document.getElementById('jobModal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('jobModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

// Função para buscar empregos (pode ser usada para recarregar os dados ou implementar paginação)
function fetchJobs() {
  handleSearch(); // Por enquanto apenas refaz a pesquisa com os dados já carregados
}

  function updateOnlineStatus() {
    const message = document.getElementById('offline-message');
    if (!navigator.onLine) {
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Verifica o status no carregamento da página
  window.addEventListener('load', updateOnlineStatus);

