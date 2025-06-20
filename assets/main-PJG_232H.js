import{f as k,a as p,B as g,E as y,s as $,I as h,i as u,b as M,c as L,r as E}from"./footer-DPzAl7vK.js";const m=document.querySelector("#weekly-trends-list"),d=document.getElementById("upcoming-card");let _={};(async()=>_=await k())();function b(t){return t.slice(0,3)}function S(t){const r=t.map(n=>{const{id:a,title:e,poster_path:s,release_date:c,vote_average:l,genre_ids:o}=n,i=c?c.slice(0,4):"N/A",v=s?`${h}/w500${s}`:"https://via.placeholder.com/395x574?text=No+Image",w=(o==null?void 0:o.map(f=>_[f]).join(", "))||"";return`
      <li class="weekly-card" data-id="${a}" data-rating="${l}">
        <div class="weekly-card__image-wrapper">
          <img src="${v}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${w} | ${i}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");m.innerHTML=r,document.querySelectorAll(".weekly-card").forEach(n=>{const a=parseFloat(n.dataset.rating),e=n.querySelector(".weekly-card__rating");E(a,e)})}async function T(){try{const t=await p(g,y.TRENDING_WEEK),r=b(t.results);S(r)}catch(t){m.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function I(){const t=new Date,r=t.getFullYear(),n=t.getMonth(),a=new Date(r,n,1).toISOString().split("T")[0],e=new Date(r,n+1,0).toISOString().split("T")[0];return{start:a,end:e}}async function N(){try{const{start:t,end:r}=I(),a=(await p(g,y.UPCOMING_MOVIES)).results.filter(i=>i.release_date>=t&&i.release_date<=r);if(!a.length){d.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=a[Math.floor(Math.random()*a.length)],s=e.backdrop_path?`${h}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",c=e.genre_ids.map(i=>_[i]||"Unknown").join(", "),l=u(e.id);d.innerHTML=`
      <img class="upcoming__img" src="${s}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${c}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library" data-id="${e.id}">
            ${l?"Remove from My Library":"Add to My Library"} </button>
      </div>
    `;const o=d.querySelector(".add-library");o.addEventListener("click",()=>{u(e.id)?(M(e.id),o.textContent="Add to My Library"):(L(e),o.textContent="Remove from My Library"),typeof onLibraryChange=="function"&&onLibraryChange()})}catch(t){d.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{T(),N()});m.addEventListener("click",async t=>{const r=t.target.closest(".weekly-card");if(!r)return;const n=Number(r.dataset.id);if(n)try{const e=(await p(g,y.TRENDING_WEEK)).results.find(s=>s.id===n);e&&$(e)}catch(a){console.error("Modal error:",a)}});
//# sourceMappingURL=main-PJG_232H.js.map
