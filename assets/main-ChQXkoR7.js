import{f as k,a as d,B as l,E as p,s as y,I as _,r as E}from"./catalog-hero-Cc6sBTQF.js";const g=document.querySelector("#weekly-trends-list"),i=document.getElementById("upcoming-card");let m={};(async()=>m=await k())();function M(t){return t.slice(0,3)}function $(t){const o=t.map(n=>{const{id:a,title:e,poster_path:s,release_date:c,vote_average:u,genre_ids:r}=n,v=c?c.slice(0,4):"N/A",h=s?`${_}/w500${s}`:"https://via.placeholder.com/395x574?text=No+Image",w=(r==null?void 0:r.map(f=>m[f]).join(", "))||"";return`
      <li class="weekly-card" data-id="${a}" data-rating="${u}">
        <div class="weekly-card__image-wrapper">
          <img src="${h}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${w} | ${v}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");g.innerHTML=o,document.querySelectorAll(".weekly-card").forEach(n=>{const a=parseFloat(n.dataset.rating),e=n.querySelector(".weekly-card__rating");E(a,e)})}async function L(){try{const t=await d(l,p.TRENDING_WEEK),o=M(t.results);$(o)}catch(t){g.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function S(){const t=new Date,o=t.getFullYear(),n=t.getMonth(),a=new Date(o,n,1).toISOString().split("T")[0],e=new Date(o,n+1,0).toISOString().split("T")[0];return{start:a,end:e}}async function T(){try{const{start:t,end:o}=S(),a=(await d(l,p.UPCOMING_MOVIES)).results.filter(r=>r.release_date>=t&&r.release_date<=o);if(!a.length){i.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=a[Math.floor(Math.random()*a.length)],s=e.backdrop_path?`${_}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",c=e.genre_ids.map(r=>m[r]||"Unknown").join(", ");i.innerHTML=`
      <img class="upcoming__img" src="${s}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${c}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library">Add to My Library</button>
      </div>
    `,i.querySelector(".add-library").addEventListener("click",()=>y(e))}catch(t){i.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{L(),T()});g.addEventListener("click",async t=>{const o=t.target.closest(".weekly-card");if(!o)return;const n=Number(o.dataset.id);if(n)try{const e=(await d(l,p.TRENDING_WEEK)).results.find(s=>s.id===n);e&&y(e)}catch(a){console.error("Modal error:",a)}});(()=>{const t=document.querySelector('[data-modal-open="footer"]'),o=document.querySelector('[data-modal-close="footer"]'),n=document.querySelector('[data-modal="footer"]');t.addEventListener("click",a),o.addEventListener("click",a),n.addEventListener("click",e=>{e.target===n&&a()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!n.classList.contains("is-hidden")&&a()});function a(){n.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-ChQXkoR7.js.map
