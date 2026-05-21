async function enviar() {
      const data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        tipo: document.getElementById("tipo").value,
        prioridade: document.getElementById("prioridade").value,
        operadora: document.getElementById("operadora").value,
        emailOperadora: "arthur.alj13@gmail.com",
        assunto: "GETRAK / NEXCORP SERVIÇOS E TELECOMUNICAÇÕES S/A CNPJ: 06.349.959/0001-13 - " + document.getElementById("assunto").value,
        anexo: "",
        descricao: document.getElementById("descricao").value,
        copia: document.getElementById("copia").value
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbxdlmjDbr4E_aSGwUprJyhB0mf-ifH0r3Vk9dgRpF1HUwsj7eMokkXGupftKfORujNqlA/exec", {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      alert("Protocolo: " + result.protocolo);
    }