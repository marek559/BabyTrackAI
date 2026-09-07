// Intersection Observer fade-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:0.08, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // FAQ — single-open accordion (optional, comment out to allow multiple)
  document.querySelectorAll('details.q').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        document.querySelectorAll('details.q').forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });

  // Form — send the application to Formspree and show the existing confirmation.
  const form = document.getElementById('signup');
  const errorMessage = document.getElementById('form-error');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const contact = form.elements['contact'].value.trim();
    const dob = form.elements['dob'].value.trim();
    if (!name || !contact || !dob) {
      form.querySelectorAll('input[required]').forEach(i => {
        if (!i.value.trim()) i.style.borderColor = '#c0392b';
        i.addEventListener('input', () => i.style.borderColor = '', { once:true });
      });
      return;
    }

    errorMessage.hidden = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree request failed');

      form.style.display = 'none';
      const thanks = document.getElementById('thanks');
      thanks.classList.add('show');
      const r = thanks.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top - 120, behavior:'smooth' });
    } catch (error) {
      errorMessage.hidden = false;
      console.error('Nie udało się wysłać formularza:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
