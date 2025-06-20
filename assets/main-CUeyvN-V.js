import{f as k,a as l,B as d,E as p,s as u,I as y,r as $}from"./footer-CiCLqGMo.js";const g=document.querySelector("#weekly-trends-list"),c=document.getElementById("upcoming-card");let _={};(async()=>_=await k())();function M(t){return t.slice(0,3)}function E(t){const r=t.map(n=>{const{id:a,title:e,poster_path:s,release_date:i,vote_average:m,genre_ids:o}=n,h=i?i.slice(0,4):"N/A",v=s?`${y}/w500${s}`:"https://via.placeholder.com/395x574?text=No+Image",w=(o==null?void 0:o.map(f=>_[f]).join(", "))||"";return`
      <li class="weekly-card" data-id="${a}" data-rating="${m}">
        <div class="weekly-card__image-wrapper">
          <img src="${v}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${w} | ${h}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");g.innerHTML=r,document.querySelectorAll(".weekly-card").forEach(n=>{const a=parseFloat(n.dataset.rating),e=n.querySelector(".weekly-card__rating");$(a,e)})}async function S(){try{const t=await l(d,p.TRENDING_WEEK),r=M(t.results);E(r)}catch(t){g.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function T(){const t=new Date,r=t.getFullYear(),n=t.getMonth(),a=new Date(r,n,1).toISOString().split("T")[0],e=new Date(r,n+1,0).toISOString().split("T")[0];return{start:a,end:e}}async function L(){try{const{start:t,end:r}=T(),a=(await l(d,p.UPCOMING_MOVIES)).results.filter(o=>o.release_date>=t&&o.release_date<=r);if(!a.length){c.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=a[Math.floor(Math.random()*a.length)],s=e.backdrop_path?`${y}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",i=e.genre_ids.map(o=>_[o]||"Unknown").join(", ");c.innerHTML=`
      <img class="upcoming__img" src="${s}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${i}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library">Add to My Library</button>
      </div>
    `,c.querySelector(".add-library").addEventListener("click",()=>u(e))}catch(t){c.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{S(),L()});g.addEventListener("click",async t=>{const r=t.target.closest(".weekly-card");if(!r)return;const n=Number(r.dataset.id);if(n)try{const e=(await l(d,p.TRENDING_WEEK)).results.find(s=>s.id===n);e&&u(e)}catch(a){console.error("Modal error:",a)}});
//# sourceMappingURL=main-CUeyvN-V.js.map
