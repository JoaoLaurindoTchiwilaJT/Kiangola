<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KIANGOLA-EMPREGOS - Painel Administrativo</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="container">
        <div class="admin-panel">
            <div class="panel-header">
                <h1>
                    <i class="fas fa-briefcase"></i> 
                    KIANGOLA-EMPREGOS - Cadastro de Vagas
                </h1>
            </div>

            <form id="jobForm" onsubmit="return processJobSubmission(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Título da Vaga</label>
                        <input type="text" id="jobTitle" required>
                    </div>
                    <div class="form-group">
                        <label>Empresa</label>
                        <input type="text" id="jobCompany" required>
                    </div>
                    <div class="form-group">
                        <label>Localização</label>
                        <input type="text" id="jobLocation" required>
                    </div>
                    <div class="form-group">
                        <label>Indústria</label>
                        <input type="text" id="jobIndustry" required>
                    </div>
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label>Tags</label>
                    <div class="tag-container">
                        <input type="text" id="tagInput" class="tag-input" placeholder="Adicionar tag">
                        <button type="button" class="btn" onclick="addTag()">
                            <i class="fas fa-plus"></i> Adicionar
                        </button>
                    </div>
                    <div id="tagList" class="tag-list"></div>
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label>Descrição Geral</label>
                    <textarea id="jobDescription" rows="5" required></textarea>
                </div>

                <div class="form-grid" style="margin-top: 20px;">
                    <div class="form-group">
                        <label>Requisitos (um por linha)</label>
                        <textarea id="jobRequirements" rows="5" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Benefícios (um por linha)</label>
                        <textarea id="jobBenefits" rows="5" required></textarea>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <button type="submit" class="btn">
                        <i class="fas fa-save"></i> Salvar Vaga
                    </button>
                </div>
            </form>

            <!-- <div id="previewSection" class="preview-section" style="display:none;">
                <h2>Dados para Banco de Dados</h2>
                <pre id="databasePreview"></pre>
            </div> -->
        </div>
    </div>
    <script src="../js/admin.js"></script>
</body>
</html>