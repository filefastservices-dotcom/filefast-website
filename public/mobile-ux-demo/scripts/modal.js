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
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  // This is a UI prototype: intentionally do not transmit, store, or track entered details.
  error.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Checking…';
  form.hidden = true;
  success.hidden = false;
  success.querySelector('h3').textContent = 'Demo completed';
  success.querySelector('p').textContent = 'This is a preview only. No enquiry was sent and no details were saved.';
  submitButton.disabled = false;
  submitButton.textContent = 'Preview form';
});
document.getElementById('dismissSticky').addEventListener('click', () => { stickyDismissed = true; document.getElementById('stickyCta').hidden = true; });
window.addEventListener('scroll', () => { const sticky = document.getElementById('stickyCta'); sticky.hidden = stickyDismissed || window.scrollY <= 420; }, {passive:true});
