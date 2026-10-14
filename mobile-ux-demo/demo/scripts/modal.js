const modal = document.getElementById('leadModal');
const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');
const email = document.getElementById('leadEmail');
const error = document.getElementById('formError');
const submitButton = form.querySelector('button[type="submit"]');
let returnFocus = null, stickyDismissed = false;
function openModal() { returnFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = 'hidden'; email.focus(); }
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (returnFocus && returnFocus.focus) returnFocus.focus(); }
document.querySelectorAll('#openLeadModal,[data-open-lead]').forEach(button => button.addEventListener('click', openModal));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') { closeModal(); return; }
  if (event.key === 'Tab') {
    const nodes = [...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href]')];
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  error.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('leadName').value.trim(),
        email: email.value.trim(),
        mobile: document.getElementById('leadMobile').value.trim(),
        serviceInterested: document.getElementById('leadService').value,
        source: 'mobile-ux-demo',
        website: document.getElementById('leadWebsite').value
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) throw new Error(result.error || 'We could not send your enquiry. Please try again or contact us by phone/WhatsApp.');
    form.hidden = true;
    success.hidden = false;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'lead_submitted', service: document.getElementById('leadService').value, source: 'mobile-ux-demo' });
  } catch (err) {
    error.textContent = err.message || 'Connection error. Please try again or contact us by phone/WhatsApp.';
    error.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send enquiry';
  }
});
document.getElementById('dismissSticky').addEventListener('click', () => { stickyDismissed = true; document.getElementById('stickyCta').hidden = true; });
window.addEventListener('scroll', () => { const sticky = document.getElementById('stickyCta'); sticky.hidden = stickyDismissed || window.scrollY <= 420; }, {passive:true});
