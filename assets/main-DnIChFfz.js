import{f,a as m,B as g,E as p,s as w,I as _,r as S}from"./catalog-hero-B4WMw9bb.js";const u=document.querySelector("#weekly-trends-list");let v={};(async()=>v=await f())();function M(e){return e.slice(0,3)}function b(e){const n=e.map(o=>{const{id:t,title:r,poster_path:a,release_date:i,vote_average:l,genre_ids:s}=o,c=i?i.slice(0,4):"N/A",d=a?`${_}/w500${a}`:"https://via.placeholder.com/395x574?text=No+Image",h=(s==null?void 0:s.map(L=>v[L]).join(", "))||"";return`
      <li class="weekly-card" data-id="${t}" data-rating="${l}">
        <div class="weekly-card__image-wrapper">
          <img src="${d}" alt="${r}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${r}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${h} | ${c}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");u.innerHTML=n,document.querySelectorAll(".weekly-card").forEach(o=>{const t=parseFloat(o.dataset.rating),r=o.querySelector(".weekly-card__rating");S(t,r)})}async function k(){try{const e=await m(g,p.TRENDING_WEEK),n=M(e.results);b(n)}catch(e){u.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",e)}}u.addEventListener("click",async e=>{const n=e.target.closest(".weekly-card");if(!n)return;const o=Number(n.dataset.id);if(o)try{const r=(await m(g,p.TRENDING_WEEK)).results.find(a=>a.id===o);r&&w(r)}catch(t){console.error("Modal error:",t)}});const y=document.getElementById("upcoming-card");function E(){const e=new Date,n=e.getFullYear(),o=e.getMonth(),t=new Date(n,o,1).toISOString().split("T")[0],r=new Date(n,o+1,0).toISOString().split("T")[0];return{start:t,end:r}}function I(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(o=>o.id===e)}function $(e,n){const o="myLibrary";let t=JSON.parse(localStorage.getItem(o))||[];t.find(a=>a.id===e.id)?(t=t.filter(a=>a.id!==e.id),n.textContent="Add to My Library"):(t.push(e),n.textContent="Remove from My Library"),localStorage.setItem(o,JSON.stringify(t))}function N(e,n){const t=(JSON.parse(localStorage.getItem("myLibrary"))||[]).find(r=>r.id===e);n.textContent=t?"Remove from My Library":"Add to My Library"}async function x(){try{const{start:e,end:n}=E(),o=await m(g,p.UPCOMING_MOVIES),t=await f(),r=o.results.filter(d=>d.release_date>=e&&d.release_date<=n);if(!r.length){y.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const a=r[Math.floor(Math.random()*r.length)],i=a.backdrop_path?`${_}/original${a.backdrop_path}`:"https://via.placeholder.com/800x450",l=a.genre_ids.map(d=>t[d]||"Unknown").join(", "),s=I(a.id);y.innerHTML=`
      <img class="upcoming__img" src="${i}" alt="${a.title}" />
      <div class="upcoming__info">
        <h3>${a.title}</h3>
        <p><strong>Release date:</strong> <span>${a.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${a.vote_average.toFixed(1)}</span> / <span>${a.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${a.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${l}</p>
        <p><strong>ABOUT</strong></p>
        <p>${a.overview}</p>
        <button class="upcoming__btn">${s?"Remove from My Library":"Add to My Library"}</button>
      </div>
    `;const c=y.querySelector(".upcoming__btn");c.addEventListener("click",()=>$(a,c)),N(a.id,c)}catch(e){y.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(e)}}document.addEventListener("DOMContentLoaded",()=>{k(),x()});document.addEventListener("click",e=>{var i,l;const n=e.target.closest(".add-library");if(!n)return;const t=(l=(i=document.getElementById("movie-detail-modal").querySelector("h2"))==null?void 0:i.textContent)==null?void 0:l.trim();if(!t)return;const r=JSON.parse(localStorage.getItem("myLibrary"))||[];if(r.find(s=>s.title===t)){const s=r.filter(c=>c.title!==t);localStorage.setItem("myLibrary",JSON.stringify(s)),n.textContent="Add to My Library"}else{const s={title:t};r.push(s),localStorage.setItem("myLibrary",JSON.stringify(r)),n.textContent="Remove from My Library"}});(()=>{const e=document.querySelector('[data-modal-open="footer"]'),n=document.querySelector('[data-modal-close="footer"]'),o=document.querySelector('[data-modal="footer"]');e.addEventListener("click",t),n.addEventListener("click",t),o.addEventListener("click",r=>{r.target===o&&t()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!o.classList.contains("is-hidden")&&t()});function t(){o.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-DnIChFfz.js.map
