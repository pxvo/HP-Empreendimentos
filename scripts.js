const CotacaoSystem = {
  config: {
    steps: 3,
    whatsAppNumber: "5595984243642" // Seu número
  },
  state: {
    currentStep: 0,
    data: { nome: "", telefone: "", mensagem: "" }
  },
  iniciar() {
    this.createModal();
    this.showStep();
  },
  createModal() {
    const modal = `
      <div id="cotacaoModal" class="cotacao-modal">
        <div class="cotacao-container">
          <div class="cotacao-header">
            <h3>Atendimento HP Empreendimentos</h3>
            <button onclick="CotacaoSystem.closeModal()">X</button>
          </div>
          <div class="chat-messages"></div>
          <div class="chat-input-area"></div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modal);
  },
  showStep() {
    const steps = [
      () => this.askInput("nome", "Olá! Para começar, qual é o seu nome?"),
      () => this.askInput("telefone", "Perfeito, agora me diga seu telefone para contato:"),
      () => this.askInput("mensagem", "Por fim, descreva o tipo de imóvel/orçamento que procura:")
    ];
    steps[this.state.currentStep]();
  },
  askInput(field, question) {
    document.querySelector(".chat-messages").innerHTML += `<p><b>HP:</b> ${question}</p>`;
    document.querySelector(".chat-input-area").innerHTML = `
      <input type="text" id="chatInput" placeholder="Digite aqui..." />
      <button onclick="CotacaoSystem.saveAnswer('${field}')">Enviar</button>
    `;
  },
  saveAnswer(field) {
    const value = document.getElementById("chatInput").value.trim();
    if (!value) return;
    this.state.data[field] = value;
    document.querySelector(".chat-messages").innerHTML += `<p><b>Você:</b> ${value}</p>`;
    this.state.currentStep++;
    if (this.state.currentStep < this.config.steps) {
      this.showStep();
    } else {
      this.finish();
    }
  },
  finish() {
    const { nome, telefone, mensagem } = this.state.data;
    const texto = `Olá, sou ${nome}.%0ATelefone: ${telefone}%0AImóvel/Orçamento: ${mensagem}`;
    const url = `https://wa.me/${this.config.whatsAppNumber}?text=${texto}`;
    document.querySelector(".chat-input-area").innerHTML = `
      <a href="${url}" target="_blank" class="whatsapp-btn">Enviar para WhatsApp</a>
    `;
  },
  closeModal() {
    document.getElementById("cotacaoModal").remove();
    this.state = { currentStep: 0, data: { nome: "", telefone: "", mensagem: "" } };
  }
};
