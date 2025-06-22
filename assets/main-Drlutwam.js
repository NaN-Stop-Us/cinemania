import{f as F,a as $,B as M,E as S,I as C,i as T,r as D,b as G,s as x,c as b}from"./footer-Cotf54s0.js";const h=document.querySelector("#weekly-trends-list"),v=document.getElementById("upcoming-card");h&&v&&document.addEventListener("DOMContentLoaded",()=>{P(),j()});let I={};(async()=>I=await F())();function H(t){return t.slice(0,3)}function q(t){const a=t.map(n=>{const{id:r,title:e,poster_path:i,release_date:l,vote_average:y,genre_ids:s}=n,o=l?l.slice(0,4):"N/A",u=i?`${C}/w500${i}`:"https://via.placeholder.com/395x574?text=No+Image",_=(s==null?void 0:s.map(L=>I[L]).join(", "))||"";return`
      <li class="weekly-card" data-id="${r}" data-rating="${y}">
        <div class="weekly-card__image-wrapper">
          <img src="${u}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${_} | ${o}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");h.innerHTML=a,document.querySelectorAll(".weekly-card").forEach(n=>{const r=parseFloat(n.dataset.rating),e=n.querySelector(".weekly-card__rating");b(r,e)})}async function P(){try{const t=await $(M,S.TRENDING_WEEK),a=H(t.results);q(a)}catch(t){h.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function U(){const t=new Date,a=t.getFullYear(),n=t.getMonth(),r=new Date(a,n,1).toISOString().split("T")[0],e=new Date(a,n+1,0).toISOString().split("T")[0];return{start:r,end:e}}async function j(){try{const{start:t,end:a}=U(),r=(await $(M,S.UPCOMING_MOVIES)).results.filter(o=>o.release_date>=t&&o.release_date<=a);if(!r.length){v.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=r[Math.floor(Math.random()*r.length)],i=e.backdrop_path?`${C}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",l=e.genre_ids.map(o=>I[o]||"Unknown").join(", "),y=T(e.id);v.innerHTML=`
      <img class="upcoming__img" src="${i}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${l}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library" data-id="${e.id}">
            ${y?"Remove from My Library":"Add to My Library"} </button>
      </div>
    `;const s=v.querySelector(".add-library");s.addEventListener("click",()=>{T(e.id)?(D(e.id),s.textContent="Add to My Library"):(G(e),s.textContent="Remove from My Library"),typeof onLibraryChange=="function"&&onLibraryChange()})}catch(t){v.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}h&&h.addEventListener("click",async t=>{const a=t.target.closest(".weekly-card");if(!a)return;const n=Number(a.dataset.id);if(n)try{const e=(await $(M,S.TRENDING_WEEK)).results.find(i=>i.id===n);e&&x(e)}catch(r){console.error("Modal error:",r)}});let k={};F().then(t=>{k=t,m(!0)});const O="myLibrary",c=document.getElementById("library-film-list"),p=document.getElementById("empty-library"),d=document.getElementById("load-more-btn");let A=[],g=0;const N=9;function m(t=!1,a=null){t&&(A=JSON.parse(localStorage.getItem(O))||[],g=0,c&&(c.innerHTML=""));const n=a||A,r=document.querySelector(".genre-container");if(n.length===0){p&&p.classList.add("hidden"),c&&(c.innerHTML=`<div class="library-container"><p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
        <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
        </div>`),d&&(d.style.display="none"),r&&(r.style.display="none");return}p&&p.classList.add("hidden"),r&&(r.style.display=""),p&&p.classList.add("hidden"),n.slice(g,g+N).forEach(i=>{const{title:l,poster_path:y,release_date:s,vote_average:o,genre_ids:u,genres:_}=i,L=s?s.slice(0,4):"N/A",B=y?`https://image.tmdb.org/t/p/w500${y}`:"https://via.placeholder.com/395x574?text=No+Image",R=Array.isArray(_)&&_.length?_.join(", "):Array.isArray(u)&&u.length?u.map(w=>k[w]||w).join(", "):"",f=document.createElement("li");if(f.className="weekly-card",f.innerHTML=`
      <div class="weekly-card__image-wrapper">
        <img class="weekly-card__image" src="${B}" alt="${l}">
        <div class="weekly-card__overlay"></div>
      </div>
      <div class="weekly-card__info">
        <h3 class="weekly-card__title">${l}</h3>
        <div class="weekly-card__meta-row">
          <p class="weekly-card__meta">${R} | ${L}</p>
          <div class="weekly-card__rating"></div>
        </div>
      </div>
    `,typeof b=="function"){const w=f.querySelector(".weekly-card__rating");b(o,w)}f.addEventListener("click",()=>{x(i,()=>m(!0))}),c&&c.appendChild(f)}),g+=N,d&&(g<n.length?d.style.display="block":d.style.display="none")}document.addEventListener("DOMContentLoaded",()=>{m(!0)});d&&d.addEventListener("click",()=>{m()});const E=document.getElementById("genre-filter");E&&E.addEventListener("change",()=>{const t=E.value,a=JSON.parse(localStorage.getItem(O))||[];if(t==="Genre"){m(!0);return}const n=a.filter(r=>Array.isArray(r.genres)&&r.genres.includes(t)?!0:Array.isArray(r.genre_ids)&&k?r.genre_ids.some(e=>k[e]===t):!1);g=0,c.innerHTML="",m(!1,n)});
//# sourceMappingURL=main-Drlutwam.js.map
