// Número de WhatsApp comercial (código de país + área + número, sin + ni espacios)
const WHATSAPP_NUMBER = '5492235269826';
const WHATSAPP_DEFAULT_MSG = 'Hola, vi la página de CajaRápida y quiero conocer más sobre el sistema offline.';

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`;
const ctaHeroWa = document.getElementById('ctaHeroWa');
const ctaBottomWa = document.getElementById('ctaBottomWa');
if (ctaHeroWa) ctaHeroWa.href = waUrl;
if (ctaBottomWa) ctaBottomWa.href = waUrl;
