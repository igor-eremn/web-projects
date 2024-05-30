document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.content');
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.getAttribute('data-section');
        sections.forEach(section => {
          if (section.id === target) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  });
  