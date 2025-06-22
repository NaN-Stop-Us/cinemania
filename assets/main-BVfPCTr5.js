import{f as C,a as b,B as $,E as M,I as F,i as T,r as D,b as G,s as x,c as O}from"./footer-DLG_b0B6.js";const v=document.querySelector("#weekly-trends-list"),_=document.getElementById("upcoming-card");v&&_&&document.addEventListener("DOMContentLoaded",()=>{U(),j()});let S={};(async()=>S=await C())();const H=window.innerWidth;function q(t){return H<=767?t.slice(0,1):t.slice(0,3)}function P(t){const n=t.map(a=>{const{id:r,title:e,poster_path:o,release_date:y,vote_average:c,genre_ids:s}=a,l=y?y.slice(0,4):"N/A",L=o?`${F}/w500${o}`:"https://via.placeholder.com/395x574?text=No+Image",k=(s==null?void 0:s.map(d=>S[d]).join(", "))||"";return`
      <li class="weekly-card" data-id="${r}" data-rating="${c}">
        <div class="weekly-card__image-wrapper">
          <img src="${L}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${k} | ${l}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");v.innerHTML=n,document.querySelectorAll(".weekly-card").forEach(a=>{const r=parseFloat(a.dataset.rating),e=a.querySelector(".weekly-card__rating");O(r,e)})}async function U(){try{const t=await b($,M.TRENDING_WEEK),n=q(t.results);P(n)}catch(t){v.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function W(){const t=new Date,n=t.getFullYear(),a=t.getMonth(),r=new Date(n,a,1).toISOString().split("T")[0],e=new Date(n,a+1,0).toISOString().split("T")[0];return{start:r,end:e}}async function j(){try{const{start:t,end:n}=W(),r=(await b($,M.UPCOMING_MOVIES)).results.filter(l=>l.release_date>=t&&l.release_date<=n);if(!r.length){_.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=r[Math.floor(Math.random()*r.length)],o=e.backdrop_path?`${F}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",y=e.genre_ids.map(l=>S[l]||"Unknown").join(", "),c=T(e.id);_.innerHTML=`
      <img class="upcoming__img" src="${o}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${y}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library" data-id="${e.id}">
            ${c?"Remove from My Library":"Add to My Library"} </button>
      </div>
    `;const s=_.querySelector(".add-library");s.addEventListener("click",()=>{T(e.id)?(D(e.id),s.textContent="Add to My Library"):(G(e),s.textContent="Remove from My Library"),typeof onLibraryChange=="function"&&onLibraryChange()})}catch(t){_.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}v&&v.addEventListener("click",async t=>{const n=t.target.closest(".weekly-card");if(!n)return;const a=Number(n.dataset.id);if(a)try{const e=(await b($,M.TRENDING_WEEK)).results.find(o=>o.id===a);e&&x(e)}catch(r){console.error("Modal error:",r)}});const B="myLibrary",i=document.getElementById("library-film-list"),h=document.getElementById("empty-library"),m=document.getElementById("load-more-btn"),E=document.getElementById("genre-filter"),f=document.querySelector(".genre-container");let w={},A=[],p=[],g=0;const N=9;C().then(t=>{w=t,u(!0)});function u(t=!1){if(t&&(A=JSON.parse(localStorage.getItem(B))||[],p=A,g=0,i&&(i.innerHTML="")),p.length===0){h&&h.classList.add("hidden"),i&&(i.innerHTML=`
        <li class="empty-message only-message">
          <p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
          <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
        </li>`,i.classList.add("only-empty")),m&&(m.style.display="none"),f&&(f.style.display="none");return}i&&i.classList.remove("only-empty"),h&&h.classList.add("hidden"),f&&(f.style.display=""),p.slice(g,g+N).forEach(a=>{const{title:r,poster_path:e,release_date:o,vote_average:y,genre_ids:c,genres:s}=a,l=o?o.slice(0,4):"N/A",L=e?`https://image.tmdb.org/t/p/w500${e}`:"https://via.placeholder.com/395x574?text=No+Image",k=Array.isArray(s)&&s.length?s.join(", "):Array.isArray(c)&&c.length?c.map(I=>w[I]||I).join(", "):"",d=document.createElement("li");d.className="weekly-card",d.innerHTML=`
      <div class="weekly-card__image-wrapper">
        <img class="weekly-card__image" src="${L}" alt="${r}">
        <div class="weekly-card__overlay"></div>
      </div>
      <div class="weekly-card__info">
        <h3 class="weekly-card__title">${r}</h3>
        <div class="weekly-card__meta-row">
          <p class="weekly-card__meta">${k} | ${l}</p>
          <div class="weekly-card__rating"></div>
        </div>
      </div>
    `;const R=d.querySelector(".weekly-card__rating");O(y,R),d.addEventListener("click",()=>{x(a,()=>u(!0))}),i.appendChild(d)}),g+=N,m&&(m.style.display=g<p.length?"block":"none")}m&&m.addEventListener("click",()=>{u()});E&&E.addEventListener("change",()=>{const t=E.value,n=JSON.parse(localStorage.getItem(B))||[];if(t==="Genre"){p=n,u(!0);return}p=n.filter(r=>Array.isArray(r.genres)&&r.genres.includes(t)?!0:Array.isArray(r.genre_ids)&&w?r.genre_ids.some(e=>w[e]===t):!1),g=0,i&&(i.innerHTML=""),u()});document.addEventListener("DOMContentLoaded",()=>{u(!0)});
//# sourceMappingURL=main-BVfPCTr5.js.map
