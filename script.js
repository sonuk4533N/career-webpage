// Modal open/close and simple form validation
(function(){
  const modal = document.getElementById('applyModal');
  const form = document.getElementById('applyForm');
  const openTriggers = document.querySelectorAll('.open-apply, .job-card button');
  const closeTriggers = document.querySelectorAll('[data-close]');
  const messages = modal ? modal.querySelector('.form-messages') : null;

  function openModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    const first = modal.querySelector('input[type="text"]');
    if(first) first.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });

  // Close when clicking overlay
  document.addEventListener('click', (e) => {
    if(e.target.classList && e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  // Simple validation and fake submit
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const post = form.querySelector('#post');
      let errs = [];
      if(!name.value.trim()) errs.push('Please enter your name.');
      if(!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) errs.push('Please enter a valid email.');
      if(!post.value.trim()) errs.push('Please enter the post you are applying for.');

      if(errs.length){
        if(messages) messages.textContent = errs.join(' ');
        return;
      }

      if(messages) messages.textContent = 'Application submitted — thank you!';
      form.reset();
      setTimeout(closeModal, 1200);
    });
  }
})();
