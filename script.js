document.addEventListener("DOMContentLoaded", () => {
  // Atualiza automaticamente o ano do rodapé.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Checkout ainda não configurado.
  // Não solicitar pagamento antes da aprovação do e-book.
  const buyButton = document.querySelector(".buy-button");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      alert(
        "O e-book está em preparação para o lançamento. " +
        "Em breve, a compra estará disponível!"
      );
    });
  }

  // Fecha outras perguntas quando uma FAQ é aberta.
  const questions = document.querySelectorAll(".faq details");

  questions.forEach((question) => {
    question.addEventListener("toggle", () => {
      if (!question.open) return;

      questions.forEach((other) => {
        if (other !== question) {
          other.open = false;
        }
      });
    });
  });
});