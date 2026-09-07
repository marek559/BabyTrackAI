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

  // Form — visual prototype: show thanks message
  const form = document.getElementById('signup');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // very light validation
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
    form.style.display = 'none';
    const thanks = document.getElementById('thanks');
    thanks.classList.add('show');
    const r = thanks.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top - 120, behavior:'smooth' });
  });
