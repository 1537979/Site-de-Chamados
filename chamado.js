async function enviar() {
      const data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        tipo: "Teste",
        prioridade: "Alta",
        operadora: "Operadora X",
        emailOperadora: "teste@email.com",
        assunto: "Teste",
        anexo: "",
        descricao: "Teste de envio",
        copia: ""
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbxdlmjDbr4E_aSGwUprJyhB0mf-ifH0r3Vk9dgRpF1HUwsj7eMokkXGupftKfORujNqlA/exec", {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      alert("Protocolo: " + result.protocolo);
    }