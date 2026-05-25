async function enviar() {

  // Captura os dados preenchidos pelo usuário
  const data = {
    tipo: document.getElementById("tipo").value,
    prioridade: document.getElementById("prioridade").value,
    operadora: document.getElementById("operadora").value,

    // Email fixo da operadora
    emailOperadora: "arthur.alj13@gmail.com",

    // Monta o assunto automaticamente
    assunto:
      "GETRAK / NEXCORP SERVIÇOS E TELECOMUNICAÇÕES S/A CNPJ: 06.349.959/0001-13 - " +
      document.getElementById("assunto").value,

    // Campo de anexo vazio
    anexo: "",

    // Descrição do chamado
    descricao: document.getElementById("mensagem").value,

    // Email em cópia
    copia: document.getElementById("copia").value
  };

  // Envia os dados para o Google Apps Script
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxdlmjDbr4E_aSGwUprJyhB0mf-ifH0r3Vk9dgRpF1HUwsj7eMokkXGupftKfORujNqlA/exec",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );

  // Converte a resposta para JSON
  const result = await response.json();

  // Exibe o protocolo gerado
  alert("Protocolo: " + result.protocolo);

  // =========================
  // LIMPAR CAMPOS DO FORMULÁRIO
  // =========================

  // Reseta os selects para a primeira opção
  document.getElementById("tipo").selectedIndex = 0;
  document.getElementById("prioridade").selectedIndex = 0;
  document.getElementById("operadora").selectedIndex = 0;

  // Limpa os campos de texto
  document.getElementById("assunto").value = "";
  document.getElementById("mensagem").value = "";
  document.getElementById("copia").value = "";
}