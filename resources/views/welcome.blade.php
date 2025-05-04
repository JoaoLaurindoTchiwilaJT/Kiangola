<!DOCTYPE html>
<html lang="pt">
<head>
  <!-- Conteúdo do head permanece o mesmo -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="KIANGOLA - Portal líder de empregos em Angola. Encontre as melhores oportunidades profissionais do mercado angolano.">
  <title>KIANGOLA - Portal de Empregos em Angola</title>
  <link rel="shortcut icon" href="/images/Angola.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/index.css">
</head>
<body>

  <!-- Header permanece o mesmo -->
  <header>
      <div class="logo">
        <img src="/images/Angola.png" alt="Bandeira de Angola"> KIANGOLA-EMPREGOS
       </div>
      
        <nav id="mainNav">
            <ul>
                <li><a href="index.html">Início</a></li>
                <li><a href="#sobre">Sobre Nós</a></li>
            </ul>
        </nav>
        <div class="hamburger" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
  </header>
    
  <main>
    <section class="banner">
      <div class="banner-content">
        <h1>Encontre o emprego ideal para você em Angola</h1>
        <p>Conectamos profissionais qualificados às melhores oportunidades do mercado angolano. Comece sua carreira dos sonhos hoje.</p>
      </div>
    </section>
  
    <section class="search-bar">
      <input type="text" id="search" placeholder="Digite cargo, empresa ou localização...">
      <button onclick="handleSearch()"><i class="fas fa-search"></i> Pesquisar</button>
    </section>
    
    @if (isset($error))
        <div id="offline-message" style="display: none; background: #ffdddd; color: #a94442; padding: 15px; text-align: center; font-weight: bold;">
          ⚠ Sem conexão com a internet. Algumas funcionalidades podem não funcionar.
        </div>
    @endif

    <section class="featured-section">
      <h2 class="section-title">Vagas em Destaque</h2>
      <div class="job-list" id="featuredJobs">
      
      @if (count($data) > 0)
        <!-- As vagas serão carregadas dinamicamente via JavaScript -->
        @foreach($data as $job)
          <div class="job-card">
            <div class="job-header">
              <div class="company-logo"><i class="fas fa-building"></i></div>
              <div class="job-id">
                <input type="hidden" class="jobIds" value="{{ $job['id'] }}">
              </div>
              <div class="job-details">
                <h3>{{ $job['title'] }}</h3>
                <p class="company-name">{{ $job['company'] }}</p>
                <p class="job-location"><i class="fas fa-map-marker-alt"></i> {{ $job['location'] }}</p>
              </div>
            </div>
            <div class="job-description">
              <p>{{ Str::words($job['description'], 100, '...') }}</p>
            </div>
            <div class="job-actions">
              <button class="btn-details" data-job-id="{{ $job['id'] }}">Ver Detalhes</button>
            </div>
          </div>
        @endforeach
      @else
          <!-- Caso não haja dados -->
          <p>Não há vagas disponíveis no momento.</p>
      @endif
      </div>
    </section>
      
    <div class="loader" style="display: none;">
      <i class="fas fa-spinner fa-spin"></i> A carregar vagas...
    </div>
        
    <div class="no-jobs" style="display: none;">
      <i class="fas fa-exclamation-circle"></i> Nenhuma vaga encontrada com os termos de pesquisa. Tente palavras-chave diferentes.
    </div> 
  </main>  

  <!-- Seção Sobre e Footer permanecem os mesmos -->
  <section id="sobre" class="sobre">
    <!-- Conteúdo existente... -->
    <h2>Sobre o Kiangola-Empregos</h2>
    <p>
      O <strong>Kiangola-Empregos</strong> é um portal dedicado a conectar talentos com oportunidades no mercado de trabalho angolano.
      Nosso objetivo é facilitar a busca por empregos e contribuir para o crescimento profissional dos candidatos.
    </p>
  
    <h2>Conheça os Criadores</h2>
    <div class="sobre-container">
      <div class="sobre-card">
        <img src="/images/Kivota.jpg" alt="Criador 1">
        <h3>Carlos Quivota</h3>
        <p>Economista - Jurista</p>
      </div>
      <div class="sobre-card">
        <img src="/images/joão.jpg" alt="Criador 2">
        <h3> João Tchiwila</h3>
        <p>Desenvolvedor de Software & Técnico de Informática</p>
      </div>
    </div>
  </section>
  

  <footer>
    <!-- Conteúdo existente... -->
    <div class="footer-content">
      <div class="footer-column">
        <h3>KIANGOLA</h3>
        <p>Portal líder de empregos em Angola, conectando profissionais qualificados às melhores oportunidades do mercado angolano.</p>
        <div class="social-links">
          <a href="https://www.facebook.com/Economistadospobres.carlosquivota" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/carlos_kivota?igsh=MTE0emoxaWJndGpzNg" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/groups/9583026" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://whatsapp.com/channel/0029VaAQkenAjPXHjsx5aR29" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>        
      </div>
      
      <div class="footer-column">
        <h3>Links Úteis</h3>
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="#sobre">Sobre Nós</a></li>
        </ul>
      </div>
          
      <div class="footer-column">
        <h3>Contato</h3>
        <ul>
          <li><i class="fas fa-map-marker-alt"></i> Luanda, Angola</li>
          <li><i class="fas fa-phone"></i> +244 936 579 225</li>
        </ul>
      </div>
    </div>
    
    <div class="copyright">
      &copy; 2025 KIANGOLA - Todos os direitos reservados
    </div>
  </footer>

  <!-- Modal para exibir os detalhes da vaga -->
  <div id="jobModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeJobModal()">&times;</span>
  
      <div class="modal-company">
        <div class="modal-company-logo">
          <i class="fas fa-building"></i>
        </div>
        <div class="modal-company-info">
          <h4 id="modalCompanyName">Nome da Empresa</h4>
          <p id="modalIndustry">Setor da Empresa</p>
        </div>
      </div>
  
      <h2 id="modalJobTitle"></h2>
      <p id="modalJobLocation"></p>
      <div id="modalJobDescription"></div>
  
      <!-- Requisitos -->
      <h3>Requisitos:</h3>
      <ul id="modalJobRequirements"></ul>
  
      <!-- Benefícios -->
      <h3>Benefícios:</h3>
      <ul id="modalJobBenefits"></ul>
  
      <!-- Tags -->
      <h3>Tags:</h3>
      <div id="modalJobTags" class="tags-container"></div>
  
      <div class="modal-actions">
        <button class="btn-save" id="saveJob">
          <i class="far fa-bookmark"></i> Guardar
        </button>
      </div>
    </div>
  </div> 
  
  <!-- Importante: Adicionar os dados como variável JavaScript -->
  <script>
    // Expõe os dados de empregos para o JavaScript
    window.jobsData = @json($data);
  </script>
  
  <!-- Carregar o script -->
  <script src="/js/script.js"></script>
  <script>
    // Adiciona event listeners para todos os botões de detalhes após o carregamento da página
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
          const jobId = this.getAttribute('data-job-id');
          openJobModalById(jobId);
        });
      });
    });
  </script>
</body>
</html>