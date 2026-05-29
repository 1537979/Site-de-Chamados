// =========================
// LIMPA ERRO DE UM CAMPO
// =========================

function limparErro(id) {
  const campo = document.getElementById(id);
  const erro  = document.getElementById("erro-" + id);
  if (!campo || !erro) return;
  campo.classList.remove("input-error");
  erro.style.display = "none";
}

// =========================
// MOSTRA ERRO DE UM CAMPO
// =========================

function mostrarErro(id) {
  const campo = document.getElementById(id);
  const erro  = document.getElementById("erro-" + id);
  if (!campo || !erro) return;
  campo.classList.add("input-error");
  erro.style.display = "block";
}

// =========================
// EVENTOS — LIMPA ERRO AO EDITAR
// =========================

["tipo", "prioridade", "operadora", "assunto", "copia", "mensagem"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  const evento = (el.tagName === "SELECT") ? "change" : "input";
  el.addEventListener(evento, () => limparErro(id));
});

// =========================
// VALIDAÇÃO INLINE
// =========================

function validarFormulario() {
  const campos = [
    { id: "tipo",       valor: document.getElementById("tipo").value },
    { id: "prioridade", valor: document.getElementById("prioridade").value },
    { id: "operadora",  valor: document.getElementById("operadora").value },
    { id: "assunto",    valor: document.getElementById("assunto").value.trim() },
    { id: "mensagem",   valor: document.getElementById("mensagem").value.trim() }
  ];

  let valido = true;

  campos.forEach(({ id, valor }) => {
    if (!valor) {
      mostrarErro(id);
      valido = false;
    } else {
      limparErro(id);
    }
  });

  return valido;
}

// =========================
// ENVIAR
// =========================

async function enviar() {

  // Valida antes de qualquer coisa
  if (!validarFormulario()) return;

  // =========================
  // CAPTURA DO ARQUIVO
  // =========================

  const arquivoInput = document.getElementById("anexo");
  const arquivo = arquivoInput.files[0];

  // =========================
  // VERIFICAÇÃO DE ANEXO MENCIONADO
  // =========================
 
  const mensagemTexto = document.getElementById("mensagem").value.toLowerCase();
  const assuntoTexto  = document.getElementById("assunto").value.toLowerCase();
  const mencionaAnexo = mensagemTexto.includes("anexo") || assuntoTexto.includes("anexo");
 
  if (mencionaAnexo && arquivoInput.files.length === 0) {
    const confirmar = confirm(
      "Você mencionou \"anexo\" mas não anexou nenhum arquivo.\n\nDeseja enviar o chamado mesmo assim?"
    );
    if (!confirmar) return;
  }
 
  let anexoBase64 = "";
  let nomeArquivo = "";
  let tipoArquivo = "";

  // LIMITADOR DE TAMANHO
  if (arquivo && arquivo.size > 2000000) {
    alert("Arquivo muito grande. Limite de 2MB.");
    return;
  }

  // Se existir arquivo
  if (arquivo) {
    nomeArquivo = arquivo.name;
    tipoArquivo = arquivo.type;
    const base64 = await converterBase64(arquivo);
    // Remove o prefixo: data:application/pdf;base64,
    anexoBase64 = base64.split(",")[1];
  }

  // =========================
  // DADOS DO FORMULÁRIO
  // =========================

  const data = {
    tipo:      document.getElementById("tipo").value,
    prioridade: document.getElementById("prioridade").value,
    operadora:  document.getElementById("operadora").value,

    emailOperadora: "arthur.leandro@getrak.com.br",

    assunto:
      "GETRAK / NEXCORP SERVIÇOS E TELECOMUNICAÇÕES S/A CNPJ: 06.349.959/0001-13 - " +
      document.getElementById("assunto").value,

    descricao: document.getElementById("mensagem").value,
    mensagem:  document.getElementById("mensagem").value,

    copia: document.getElementById("copia").value,

    nomeArquivo:  nomeArquivo,
    tipoArquivo:  arquivo ? arquivo.type : "",
    anexoBase64:  anexoBase64
  };

  // =========================
  // ENVIO
  // =========================

  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbx6_smzGw0lFnsPDb_0YvpeRnvxsqEme78Qq-0VFYKg-FYrOVIrLrsrMq0lSgodjmgTeQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(data)
      }
    );

    const resultado = await response.json();

    if (resultado.status === "ok") {
      alert("Chamado enviado com sucesso!\nProtocolo: " + resultado.protocolo);
    } else {
      alert("Erro ao enviar chamado: " + resultado.mensagem);
      return;
    }

  } catch (erro) {
    alert("Erro de conexão ao enviar o chamado. Tente novamente.");
    console.error(erro);
    return;
  }

  // =========================
  // LIMPA FORMULÁRIO
  // =========================

  document.getElementById("tipo").selectedIndex = 0;
  document.getElementById("prioridade").selectedIndex = 0;
  document.getElementById("operadora").selectedIndex = 0;

  document.getElementById("assunto").value  = "";
  document.getElementById("mensagem").value = "";
  document.getElementById("copia").value    = "";
  document.getElementById("anexo").value    = "";
}

// =========================
// CONVERTER BASE64
// =========================

function converterBase64(arquivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(arquivo);
    reader.onload  = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}