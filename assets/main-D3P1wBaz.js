import{f,a as d,B as p,E as g,s as k,I as _,r as E}from"./catalog-hero-C2lQXuC1.js";const m=document.querySelector("#weekly-trends-list"),l=document.getElementById("upcoming-card");let u={};(async()=>u=await f())();function M(t){return t.slice(0,3)}function $(t){const n=t.map(o=>{const{id:a,title:e,poster_path:r,release_date:c,vote_average:s,genre_ids:i}=o,y=c?c.slice(0,4):"N/A",h=r?`${_}/w500${r}`:"https://via.placeholder.com/395x574?text=No+Image",v=(i==null?void 0:i.map(w=>u[w]).join(", "))||"";return`
      <li class="weekly-card" data-id="${a}" data-rating="${s}">
        <div class="weekly-card__image-wrapper">
          <img src="${h}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${v} | ${y}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");m.innerHTML=n,document.querySelectorAll(".weekly-card").forEach(o=>{const a=parseFloat(o.dataset.rating),e=o.querySelector(".weekly-card__rating");E(a,e)})}async function L(){try{const t=await d(p,g.TRENDING_WEEK),n=M(t.results);$(n)}catch(t){m.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function S(){const t=new Date,n=t.getFullYear(),o=t.getMonth(),a=new Date(n,o,1).toISOString().split("T")[0],e=new Date(n,o+1,0).toISOString().split("T")[0];return{start:a,end:e}}async function T(){try{const{start:t,end:n}=S(),a=(await d(p,g.UPCOMING_MOVIES)).results.filter(s=>s.release_date>=t&&s.release_date<=n);if(!a.length){l.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=a[Math.floor(Math.random()*a.length)],r=e.backdrop_path?`${_}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",c=e.genre_ids.map(s=>u[s]||"Unknown").join(", ");l.innerHTML=`
      <img class="upcoming__img" src="${r}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${c}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
      </div>
    `}catch(t){l.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{L(),T()});m.addEventListener("click",async t=>{const n=t.target.closest(".weekly-card");if(!n)return;const o=Number(n.dataset.id);if(o)try{const e=(await d(p,g.TRENDING_WEEK)).results.find(r=>r.id===o);e&&k(e)}catch(a){console.error("Modal error:",a)}});(()=>{const t=document.querySelector('[data-modal-open="footer"]'),n=document.querySelector('[data-modal-close="footer"]'),o=document.querySelector('[data-modal="footer"]');t.addEventListener("click",a),n.addEventListener("click",a),o.addEventListener("click",e=>{e.target===o&&a()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!o.classList.contains("is-hidden")&&a()});function a(){o.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-D3P1wBaz.js.map
