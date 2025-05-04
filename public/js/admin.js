const api = "http://localhost:3000";

// Gerenciamento de tags
let tags = [];

function addTag() {
    const tagInput = document.getElementById('tagInput');
    const tagValue = tagInput.value.trim();
    if (tagValue && !tags.includes(tagValue)) {
        tags.push(tagValue);
        renderTags();
        tagInput.value = '';
    }
}

function renderTags() {
    const tagList = document.getElementById('tagList');
    tagList.innerHTML = tags.map((tag, index) => `
        <div class="tag-item">
            ${tag}
            <span class="tag-remove" onclick="removeTag(${index})">×</span>
        </div>
    `).join('');
}

function removeTag(index) {
    tags.splice(index, 1);
    renderTags();
}

// Processamento de dados para banco
function processJobSubmission(event) {
    event.preventDefault();

    const jobData = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('jobCompany').value,
        location: document.getElementById('jobLocation').value,
        industry: document.getElementById('jobIndustry').value,
        description: processDescription(),
        requisitos: processRequirements(),
        beneficios: processBenefits(),
        tags: tags,
        data_cadastro: new Date().toISOString(),
        status: 'ATIVO'
    };

    sendToDatabase(jobData);
    showDatabasePreview(jobData);
}

function processDescription() {
    return document.getElementById('jobDescription').value.replace(/\n/g, ' ').trim();
}

function processRequirements() {
    return document.getElementById('jobRequirements').value.split('\n').filter(req => req.trim() !== '').map(req => req.trim());
}

function processBenefits() {
    return document.getElementById('jobBenefits').value.split('\n').filter(ben => ben.trim() !== '').map(ben => ben.trim());
}

// Função para enviar os dados para a API
function sendToDatabase(jobData) {
    fetch(`${api}/kiangola/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Vaga criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao criar vaga!');
    });
}

// Mostrar preview dos dados enviados
function showDatabasePreview(jobData) {
    const previewSection = document.getElementById('previewSection');
    const databasePreview = document.getElementById('databasePreview');
    previewSection.style.display = 'block';
    databasePreview.textContent = JSON.stringify(jobData, null, 2);
}
