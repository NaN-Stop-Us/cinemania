import{f as y,B as p,E as g,s as v,a as _,I as f}from"./catalog-hero-rI4l445E.js";const u=document.querySelector("#weekly-trends-list");function h(e){return e.slice(0,3)}function L(e){const o=e.map(a=>{const{id:t,title:n,poster_path:r,release_date:i,vote_average:l}=a,s=i?i.slice(0,4):"N/A",c=r?`${f}/w500${r}`:"https://via.placeholder.com/395x574?text=No+Image";return`
      <li class="weekly-card" data-id="${t}">
        <div class="weekly-card__image-wrapper">
          <img src="${c}" alt="${n}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${n}</h3>
          <p class="weekly-card__meta">${s} | ⭐ ${l.toFixed(1)}</p>
        </div>
      </li>
    `}).join("");u.innerHTML=o}async function S(){try{const e=await y(p,g.TRENDING_WEEK),o=h(e.results);L(o)}catch(e){u.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",e)}}u.addEventListener("click",async e=>{const o=e.target.closest(".weekly-card");if(!o)return;const a=Number(o.dataset.id);if(a)try{const n=(await y(p,g.TRENDING_WEEK)).results.find(r=>r.id===a);n&&v(n)}catch(t){console.error("Modal error:",t)}});const m=document.getElementById("upcoming-card");function b(){const e=new Date,o=e.getFullYear(),a=e.getMonth(),t=new Date(o,a,1).toISOString().split("T")[0],n=new Date(o,a+1,0).toISOString().split("T")[0];return{start:t,end:n}}function M(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(a=>a.id===e)}function w(e,o){const a="myLibrary";let t=JSON.parse(localStorage.getItem(a))||[];t.find(r=>r.id===e.id)?(t=t.filter(r=>r.id!==e.id),o.textContent="Add to My Library"):(t.push(e),o.textContent="Remove from My Library"),localStorage.setItem(a,JSON.stringify(t))}function k(e,o){const t=(JSON.parse(localStorage.getItem("myLibrary"))||[]).find(n=>n.id===e);o.textContent=t?"Remove from My Library":"Add to My Library"}async function E(){try{const{start:e,end:o}=b(),a=await y(p,g.UPCOMING_MOVIES),t=await _(),n=a.results.filter(d=>d.release_date>=e&&d.release_date<=o);if(!n.length){m.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const r=n[Math.floor(Math.random()*n.length)],i=r.backdrop_path?`${f}/original${r.backdrop_path}`:"https://via.placeholder.com/800x450",l=r.genre_ids.map(d=>t[d]||"Unknown").join(", "),s=M(r.id);m.innerHTML=`
      <img class="upcoming__img" src="${i}" alt="${r.title}" />
      <div class="upcoming__info">
        <h3>${r.title}</h3>
        <p><strong>Release date:</strong> <span>${r.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${r.vote_average.toFixed(1)}</span> / <span>${r.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${r.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${l}</p>
        <p><strong>ABOUT</strong></p>
        <p>${r.overview}</p>
        <button class="upcoming__btn">${s?"Remove from My Library":"Add to My Library"}</button>
      </div>
    `;const c=m.querySelector(".upcoming__btn");c.addEventListener("click",()=>w(r,c)),k(r.id,c)}catch(e){m.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(e)}}document.addEventListener("DOMContentLoaded",()=>{S(),E()});document.addEventListener("click",e=>{var i,l;const o=e.target.closest(".add-library");if(!o)return;const t=(l=(i=document.getElementById("movie-detail-modal").querySelector("h2"))==null?void 0:i.textContent)==null?void 0:l.trim();if(!t)return;const n=JSON.parse(localStorage.getItem("myLibrary"))||[];if(n.find(s=>s.title===t)){const s=n.filter(c=>c.title!==t);localStorage.setItem("myLibrary",JSON.stringify(s)),o.textContent="Add to My Library"}else{const s={title:t};n.push(s),localStorage.setItem("myLibrary",JSON.stringify(n)),o.textContent="Remove from My Library"}});(()=>{const e=document.querySelector("[data-modal-open]"),o=document.querySelector("[data-modal-close]"),a=document.querySelector("[data-modal]");e.addEventListener("click",t),o.addEventListener("click",t),a.addEventListener("click",n=>{n.target===a&&t()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&!a.classList.contains("is-hidden")&&t()});function t(){a.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-BTVjl0ze.js.map
