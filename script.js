// small enhancement scripts
document.addEventListener('DOMContentLoaded', function(){
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
  // simple smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'}) }
    })
  })
});
