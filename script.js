// --- CONFIGURAÇÃO DA DICA INTERATIVA (LGPD) ---
const btnDica = document.getElementById('btnDica');
const dicas = [
    "Dica de Segurança: Empresas públicas e privadas legítimas nunca solicitam pagamentos imediatos via Pix para liberação de mercadorias retidas por SMS.",
    "Dica de Endereço: Sempre confira a URL antes de digitar dados. Sites oficiais do governo federal terminam estritamente em '.gov.br'.",
    "Dica de Privacidade: Sob as regras da LGPD, você tem o direito de saber quais empresas possuem seus dados. Se receber mensagens invasivas sem autorização, desconfie da origem da base de dados."
];

let dicaIndex = 0;
btnDica.addEventListener('click', () => {
    alert(dicas[dicaIndex]);
    dicaIndex = (dicaIndex + 1) % dicas.length;
});


// =========================================================================
// --- ALIMENTAÇÃO DINÂMICA DO EXEMPLO 1 (GOLPE DOS CORREIOS) ---
// =========================================================================

// IMAGEM DO EXEMPLO 1: Se o seu arquivo for .jpg, mude abaixo para golpe_correios.jpg
document.getElementById('espaco-imagem-1').innerHTML = `
    <img src="golpe_correios.png" alt="Mensagem SMS falsa dos Correios alertando sobre taxa pendente">
`;

document.getElementById('titulo-golpe-1').innerText = "Falso Alerta de Taxação Postal (Phishing via SMS)";
document.getElementById('desc-golpe-1').innerText = "Esta mensagem utiliza técnicas clássicas de engenharia social, apelando para a curiosidade e o senso de urgência (perda de um produto comprado) para induzir a vítima ao clique imediato.";

const listaPerigos1 = document.getElementById('perigos-golpe-1');
listaPerigos1.innerHTML = `
    <li>
        <strong>Uso de Domínio Enganoso (.app)</strong>
        Os canais de atendimento oficiais dos Correios operam exclusivamente sob domínios <code>.com.br</code> ou <code>.gov.br</code>. O link malicioso utiliza a extensão <code>correiostaxas.app</code> para tentar emular um aplicativo ou serviço móvel legítimo, mascarando um site falso projetado para roubo de dados.
    </li>
    <li>
        <strong>Coleta Ilegal de Dados e Fraude de Identidade (LGPD)</strong>
        Ao avançar pelo link, páginas fraudulentas exigem dados pessoais altamente críticos (como CPF, nome completo e chaves de acesso). De acordo com a LGPD, o tratamento desse tipo de dado exige bases legais estritas e consentimento legítimo. O intuito dos criminosos é usar as informações coletadas para a prática de roubo de identidade e estelionato financeiro.
    </li>
`;


// =========================================================================
// --- ALIMENTAÇÃO DINÂMICA DO EXEMPLO 2 (GOLPE DO WHATSAPP) ---
// =========================================================================

// 👇 AQUI QUE VOCÊ COLOCA O NOME DO ARQUIVO DA SEGUNDA IMAGEM 👇
// Se a imagem que você salvou terminar em .jpg, mude abaixo para "golpe_whatsapp.jpg"
document.getElementById('espaco-imagem-2').innerHTML = `
    <img src="golpe_whatsapp.png" alt="Mensagem fraudulenta induzindo a atualização falsa do WhatsApp">
`;

// Ativa o efeito visual de hover e borda vermelha no segundo card também
document.getElementById('espaco-imagem-2').closest('.card-golpe').classList.add('card-alerta');

document.getElementById('titulo-golpe-2').innerText = "Falsa Atualização de Aplicativo (Malware & Clonagem)";
document.getElementById('desc-golpe-2').innerText = "O golpe utiliza uma mensagem simulando uma notificação do próprio sistema do WhatsApp, alegando incompatibilidade de versão para forçar o usuário a clicar em um link externo perigoso.";

const listaPerigos2 = document.getElementById('perigos-golpe-2');
listaPerigos2.innerHTML = `
    <li>
        <strong>Instalação de Arquivos Maliciosos (Malware)</strong>
        Aplicativos legítimos como o WhatsApp são atualizados exclusivamente pelas lojas oficiais (Google Play Store ou Apple App Store). Links externos que prometem atualizações costumam baixar arquivos no formato <code>.apk</code> modificados, que instalam vírus capazes de espiar a tela do celular, ler mensagens e roubar senhas de banco.
    </li>
    <li>
        <strong>Invasão de Privacidade e Acesso Indevido (LGPD)</strong>
        A LGPD assegura a inviolabilidade dos seus dados pessoais e comunicações privadas. Ao clicar nesse link e instalar o arquivo falso, o usuário concede controle do aplicativo aos criminosos. Isso resulta no sequestro da conta do WhatsApp, permitindo que os golpistas se passem pela vítima para pedir dinheiro a familiares e roubar contatos de sua agenda.
    </li>
`;

// =========================================================================
// --- SISTEMA NATIVO DE SÍNTESE DE VOZ COM CONTROLES (PLAY/PAUSE/STOP) ---
// =========================================================================

const playerVoz = document.getElementById('player-voz');
const playerStatus = document.getElementById('player-status');
const btnPausarRetomar = document.getElementById('btn-pausar-retomar');

// Função auxiliar para configurar e disparar a fala
function dispararVoz(texto) {
    // Cancela qualquer fala anterior em execução
    window.speechSynthesis.cancel();

    if (!texto.trim()) return;

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;

    // Quando o robô começar a falar, exibe o player e reseta os botões
    utterance.onstart = () => {
        playerVoz.style.display = 'flex';
        playerStatus.innerText = '🗣️ Lendo texto...';
        btnPausarRetomar.innerText = '⏸️ Pausar';
    };

    // Quando o robô terminar de falar naturalmente, esconde o player
    utterance.onend = () => {
        playerVoz.style.display = 'none';
    };

    // Se ocorrer algum erro, garante que o painel feche
    utterance.onerror = () => {
        playerVoz.style.display = 'none';
    };

    window.speechSynthesis.speak(utterance);
}

// Dispara a leitura de um elemento simples pelo ID
function falarTexto(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        dispararVoz(elemento.innerText);
    }
}

// Dispara a leitura de uma seção inteira, limpando os botões internos
function falarSection(idConteiner) {
    const conteiner = document.getElementById(idConteiner);
    if (!conteiner) return;

    const clone = conteiner.cloneNode(true);
    const botoesParaRemover = clone.querySelectorAll('.btn-ouvir, .btn-interativo');
    botoesParaRemover.forEach(btn => btn.remove());

    dispararVoz(clone.innerText);
}

// Controla a pausa e a retomada do áudio
function alternarPausa() {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            playerStatus.innerText = '🗣️ Lendo texto...';
            btnPausarRetomar.innerText = '⏸️ Pausar';
        } else {
            window.speechSynthesis.pause();
            playerStatus.innerText = '⏸️ Leitura pausada';
            btnPausarRetomar.innerText = '▶️ Retomar';
        }
    }
}

// Para completamente o áudio e esconde a barra
function pararAudio() {
    window.speechSynthesis.cancel();
    playerVoz.style.display = 'none';
}
