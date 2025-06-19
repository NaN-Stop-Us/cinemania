import{f,a as g,B as y,E as p,s as w,I as v}from"./catalog-hero-Dmcl_nyy.js";const u=document.querySelector("#weekly-trends-list");let _={};(async()=>_=await f())();function M(t){return t.slice(0,3)}function S(t){const a=Math.floor(t/2),n=t%2>=1?1:0,r=5-a-n;let o="";for(let e=0;e<a;e++)o+='<img src="../img/star-full.svg" alt="full star" class="star-icon" />';n&&(o+='<img src="../img/star-half.svg" alt="half star" class="star-icon" />');for(let e=0;e<r;e++)o+='<img src="../img/star-empty.svg" alt="empty star" class="star-icon" />';return o}function b(t){const a=t.map(n=>{const{id:r,title:o,poster_path:e,release_date:i,vote_average:l,genre_ids:s}=n,c=i?i.slice(0,4):"N/A",d=e?`${v}/w500${e}`:"https://via.placeholder.com/395x574?text=No+Image",h=(s==null?void 0:s.map(L=>_[L]).join(", "))||"";return`
      <li class="weekly-card" data-id="${r}">
  <div class="weekly-card__image-wrapper">
    <img src="${d}" alt="${o}" class="weekly-card__image" />
    <div class="weekly-card__overlay"></div>
  </div>
  <div class="weekly-card__info">
    <h3 class="weekly-card__title">${o}</h3>
    <div class="weekly-card__meta-row">
      <p class="weekly-card__meta">${h} | ${c}</p>
      <div class="weekly-card__rating">
        ${S(l)}
      </div>
    </div>
  </div>
</li>


    `}).join("");u.innerHTML=a}async function k(){try{const t=await g(y,p.TRENDING_WEEK),a=M(t.results);b(a)}catch(t){u.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}u.addEventListener("click",async t=>{const a=t.target.closest(".weekly-card");if(!a)return;const n=Number(a.dataset.id);if(n)try{const o=(await g(y,p.TRENDING_WEEK)).results.find(e=>e.id===n);o&&w(o)}catch(r){console.error("Modal error:",r)}});const m=document.getElementById("upcoming-card");function E(){const t=new Date,a=t.getFullYear(),n=t.getMonth(),r=new Date(a,n,1).toISOString().split("T")[0],o=new Date(a,n+1,0).toISOString().split("T")[0];return{start:r,end:o}}function I(t){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(n=>n.id===t)}function $(t,a){const n="myLibrary";let r=JSON.parse(localStorage.getItem(n))||[];r.find(e=>e.id===t.id)?(r=r.filter(e=>e.id!==t.id),a.textContent="Add to My Library"):(r.push(t),a.textContent="Remove from My Library"),localStorage.setItem(n,JSON.stringify(r))}function N(t,a){const r=(JSON.parse(localStorage.getItem("myLibrary"))||[]).find(o=>o.id===t);a.textContent=r?"Remove from My Library":"Add to My Library"}async function x(){try{const{start:t,end:a}=E(),n=await g(y,p.UPCOMING_MOVIES),r=await f(),o=n.results.filter(d=>d.release_date>=t&&d.release_date<=a);if(!o.length){m.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=o[Math.floor(Math.random()*o.length)],i=e.backdrop_path?`${v}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",l=e.genre_ids.map(d=>r[d]||"Unknown").join(", "),s=I(e.id);m.innerHTML=`
      <img class="upcoming__img" src="${i}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${l}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="upcoming__btn">${s?"Remove from My Library":"Add to My Library"}</button>
      </div>
    `;const c=m.querySelector(".upcoming__btn");c.addEventListener("click",()=>$(e,c)),N(e.id,c)}catch(t){m.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{k(),x()});document.addEventListener("click",t=>{var i,l;const a=t.target.closest(".add-library");if(!a)return;const r=(l=(i=document.getElementById("movie-detail-modal").querySelector("h2"))==null?void 0:i.textContent)==null?void 0:l.trim();if(!r)return;const o=JSON.parse(localStorage.getItem("myLibrary"))||[];if(o.find(s=>s.title===r)){const s=o.filter(c=>c.title!==r);localStorage.setItem("myLibrary",JSON.stringify(s)),a.textContent="Add to My Library"}else{const s={title:r};o.push(s),localStorage.setItem("myLibrary",JSON.stringify(o)),a.textContent="Remove from My Library"}});(()=>{const t=document.querySelector('[data-modal-open="footer"]'),a=document.querySelector('[data-modal-close="footer"]'),n=document.querySelector('[data-modal="footer"]');t.addEventListener("click",r),a.addEventListener("click",r),n.addEventListener("click",o=>{o.target===n&&r()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!n.classList.contains("is-hidden")&&r()});function r(){n.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-BRVRyKhD.js.map
