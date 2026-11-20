/* ==========================================
   VÉRTICE EDITORIAL
   VÉRTICE LOVE — VOLUME 01

   FUNCIONALIDADES:
   - Checkout Kiwify
   - Contador regressivo
   - Encerramento da promoção
   - Perguntas frequentes
   - Ano automático no rodapé
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // CONFIGURAÇÕES DA PROMOÇÃO
  // ========================================

  const CHECKOUT_URL = "https://pay.kiwify.com.br/Uoh1XbF";

  // Encerramento: 20/12/2026 às 23h59
  // Horário de Brasília (UTC-3)

  const PROMOTION_END = new Date(
    "2026-12-20T23:59:00-03:00"
  ).getTime();


  // ========================================
  // ANO AUTOMÁTICO NO RODAPÉ
  // ========================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ========================================
  // ELEMENTOS DA OFERTA
  // ========================================

  const buyButton = document.getElementById(
    "offer-buy-button"
  );

  const countdown = document.getElementById(
    "countdown"
  );

  const expiredMessage = document.getElementById(
    "offer-expired-message"
  );

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const priceBox = document.querySelector(".price");

  const countdownDescription = document.querySelector(
    ".countdown-description"
  );

  let countdownInterval = null;


  // ========================================
  // FUNÇÃO AUXILIAR
  // ========================================

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }


  // ========================================
  // ENCERRAMENTO DA PROMOÇÃO
  // ========================================

  function endPromotion() {

    // Remove o preço promocional anunciado
    if (priceBox) {
      priceBox.innerHTML = `
        <p class="price-description">
          A oferta especial de lançamento terminou.
          Consulte o valor atualizado no checkout.
        </p>
      `;
    }

    // Atualiza o contador
    if (countdown) {
      countdown.innerHTML = `
        <strong>
          OFERTA ENCERRADA
        </strong>
      `;
    }

    // Atualiza a descrição
    if (countdownDescription) {
      countdownDescription.textContent =
        "O período promocional foi encerrado.";
    }

    // Atualiza o botão
    if (buyButton) {

      buyButton.textContent =
        "CONSULTAR PREÇO ATUAL →";

      buyButton.href = CHECKOUT_URL;

    }

    // Exibe a mensagem de encerramento
    if (expiredMessage) {
      expiredMessage.hidden = false;
    }

    // Interrompe o contador
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }

  }


  // ========================================
  // CONTADOR REGRESSIVO
  // ========================================

  function updateCountdown() {

    const now = Date.now();

    const difference = PROMOTION_END - now;

    // Se o prazo terminou
    if (difference <= 0) {
      endPromotion();
      return;
    }

    // Calcula o tempo restante
    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    // Atualiza os números na página
    if (daysElement) {
      daysElement.textContent = formatNumber(days);
    }

    if (hoursElement) {
      hoursElement.textContent = formatNumber(hours);
    }

    if (minutesElement) {
      minutesElement.textContent = formatNumber(minutes);
    }

    if (secondsElement) {
      secondsElement.textContent = formatNumber(seconds);
    }

  }


  // ========================================
  // INICIALIZAÇÃO DO CONTADOR
  // ========================================

  if (countdown) {

    updateCountdown();

    countdownInterval = setInterval(
      updateCountdown,
      1000
    );

  }


  // ========================================
  // CHECKOUT KIWIFY
  // ========================================

  if (buyButton) {

    buyButton.href = CHECKOUT_URL;

  }


  // ========================================
  // PERGUNTAS FREQUENTES (FAQ)
  // ========================================

  const questions = document.querySelectorAll(
    ".faq details"
  );

  questions.forEach((question) => {

    question.addEventListener("toggle", () => {

      if (!question.open) {
        return;
      }

      questions.forEach((other) => {

        if (other !== question) {
          other.open = false;
        }

      });

    });

  });

});