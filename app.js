// Cambia este número por tu WhatsApp comercial (código de país + área + número, sin + ni espacios)
const WHATSAPP_NUMBER = '5492235269826';
const WHATSAPP_DEFAULT_MSG = 'Hola, vi la página de CajaRápida y quiero conocer más sobre el sistema offline.';

const ticket = [];
let selectedMethod = 'Efectivo';
let isOffline = true;

const ticketList = document.getElementById('ticketList');
const ticketTotal = document.getElementById('ticketTotal');
const posFeedback = document.getElementById('posFeedback');

function formatArs(num) {
  return `$${num.toLocaleString('es-AR')}`;
}

function renderTicket() {
  if (!ticket.length) {
    ticketList.innerHTML = '<li class="ticket-empty">Toca un producto arriba para simular un cobro</li>';
    ticketTotal.textContent = '$0';
    return;
  }

  ticketList.innerHTML = ticket
    .map((item) => `<li><span>${item.name}</span><span class="mono">${formatArs(item.price)}</span></li>`)
    .join('');

  const total = ticket.reduce((sum, i) => sum + i.price, 0);
  ticketTotal.textContent = formatArs(total);
}

document.querySelectorAll('.prod-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    ticket.push({
      name: btn.dataset.name,
      price: Number(btn.dataset.price)
    });
    posFeedback.textContent = '';
    renderTicket();
  });
});

document.getElementById('btnClearTicket').addEventListener('click', () => {
  ticket.length = 0;
  posFeedback.textContent = '';
  renderTicket();
});

document.querySelectorAll('.pay-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedMethod = btn.dataset.method;
    document.querySelectorAll('.pay-btn').forEach((b) => b.classList.toggle('active', b === btn));
  });
});

document.getElementById('toggleOffline').addEventListener('click', (e) => {
  isOffline = !isOffline;
  const btn = e.currentTarget;
  btn.classList.toggle('offline', isOffline);
  btn.setAttribute('aria-pressed', String(isOffline));
  document.getElementById('netLabel').textContent = isOffline
    ? 'Modo Offline activo'
    : 'Simular con Wi-Fi';
});

document.getElementById('btnConfirmSale').addEventListener('click', () => {
  if (!ticket.length) {
    posFeedback.textContent = 'Agrega al menos un producto para probar el cobro.';
    return;
  }
  const total = ticket.reduce((sum, i) => sum + i.price, 0);
  const modeText = isOffline ? 'guardado localmente sin internet' : 'guardado localmente';
  posFeedback.textContent = `Cobro de ${formatArs(total)} (${selectedMethod}) ${modeText} en 0.02s.`;
  ticket.length = 0;
  renderTicket();
});

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`;
document.getElementById('ctaHeroWa').href = waUrl;
document.getElementById('ctaBottomWa').href = waUrl;
