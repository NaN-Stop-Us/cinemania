import{f as F,a as E,B as b,E as $,s as C,I as x,i as I,r as D,b as G,c as L}from"./footer-jHw531ic.js";let M=document.querySelector("#weekly-trends-list"),_=document.getElementById("upcoming-card"),S={};(async()=>S=await F())();function H(t){return t.slice(0,3)}function q(t){const a=t.map(n=>{const{id:r,title:e,poster_path:o,release_date:l,vote_average:c,genre_ids:s}=n,i=l?l.slice(0,4):"N/A",p=o?`${x}/w500${o}`:"https://via.placeholder.com/395x574?text=No+Image",g=(s==null?void 0:s.map(w=>S[w]).join(", "))||"";return`
      <li class="weekly-card" data-id="${r}" data-rating="${c}">
        <div class="weekly-card__image-wrapper">
          <img src="${p}" alt="${e}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${e}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${g} | ${i}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `}).join("");M.innerHTML=a,document.querySelectorAll(".weekly-card").forEach(n=>{const r=parseFloat(n.dataset.rating),e=n.querySelector(".weekly-card__rating");L(r,e)})}async function P(){try{const t=await E(b,$.TRENDING_WEEK),a=H(t.results);q(a)}catch(t){M.innerHTML='<p style="color:red;">Failed to load movies 😢</p>',console.error("Fetch error:",t)}}function U(){const t=new Date,a=t.getFullYear(),n=t.getMonth(),r=new Date(a,n,1).toISOString().split("T")[0],e=new Date(a,n+1,0).toISOString().split("T")[0];return{start:r,end:e}}async function j(){try{const{start:t,end:a}=U(),r=(await E(b,$.UPCOMING_MOVIES)).results.filter(i=>i.release_date>=t&&i.release_date<=a);if(!r.length){_.innerHTML='<p class="upcoming__info">No upcoming movies found this month.</p>';return}const e=r[Math.floor(Math.random()*r.length)],o=e.backdrop_path?`${x}/original${e.backdrop_path}`:"https://via.placeholder.com/800x450",l=e.genre_ids.map(i=>S[i]||"Unknown").join(", "),c=I(e.id);_.innerHTML=`
      <img class="upcoming__img" src="${o}" alt="${e.title}" />
      <div class="upcoming__info">
        <h3>${e.title}</h3>
        <p><strong>Release date:</strong> <span>${e.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${e.vote_average.toFixed(1)}</span> / <span>${e.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${e.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${l}</p>
        <p><strong>ABOUT</strong></p>
        <p>${e.overview}</p>
        <button class="add-library" data-id="${e.id}">
            ${c?"Remove from My Library":"Add to My Library"} </button>
      </div>
    `;const s=_.querySelector(".add-library");s.addEventListener("click",()=>{I(e.id)?(D(e.id),s.textContent="Add to My Library"):(G(e),s.textContent="Remove from My Library"),typeof onLibraryChange=="function"&&onLibraryChange()})}catch(t){_.innerHTML='<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>',console.error(t)}}document.addEventListener("DOMContentLoaded",()=>{P(),j()});M.addEventListener("click",async t=>{const a=t.target.closest(".weekly-card");if(!a)return;const n=Number(a.dataset.id);if(n)try{const e=(await E(b,$.TRENDING_WEEK)).results.find(o=>o.id===n);e&&C(e)}catch(r){console.error("Modal error:",r)}});let f={};F().then(t=>{f=t,y(!0)});const O="myLibrary",v=document.getElementById("library-film-list"),k=document.getElementById("empty-library"),h=document.getElementById("load-more-btn");let T=[],d=0;const A=9;function y(t=!1,a=null){t&&(T=JSON.parse(localStorage.getItem(O))||[],d=0,v.innerHTML="");const n=a||T,r=document.querySelector(".genre-container");if(n.length===0){k.classList.remove("hidden"),v.innerHTML=`<div class="library-container"><p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
    <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
    </div>`,h.style.display="none",r&&(r.style.display="none");return}k.classList.add("hidden"),r&&(r.style.display=""),k.classList.add("hidden"),n.slice(d,d+A).forEach(o=>{const{title:l,poster_path:c,release_date:s,vote_average:i,genre_ids:p,genres:g}=o,w=s?s.slice(0,4):"N/A",B=c?`https://image.tmdb.org/t/p/w500${c}`:"https://via.placeholder.com/395x574?text=No+Image",R=Array.isArray(g)&&g.length?g.join(", "):Array.isArray(p)&&p.length?p.map(u=>f[u]||u).join(", "):"",m=document.createElement("li");if(m.className="weekly-card",m.innerHTML=`
      <div class="weekly-card__image-wrapper">
        <img class="weekly-card__image" src="${B}" alt="${l}">
        <div class="weekly-card__overlay"></div>
      </div>
      <div class="weekly-card__info">
        <h3 class="weekly-card__title">${l}</h3>
        <div class="weekly-card__meta-row">
          <p class="weekly-card__meta">${R} | ${w}</p>
          <div class="weekly-card__rating"></div>
        </div>
      </div>
    `,typeof L=="function"){const u=m.querySelector(".weekly-card__rating");L(i,u)}m.addEventListener("click",()=>{C(o,()=>y(!0))}),v.appendChild(m)}),d+=A,d<n.length?h.style.display="block":h.style.display="none"}document.addEventListener("DOMContentLoaded",()=>{y(!0)});h.addEventListener("click",()=>{y()});const N=document.getElementById("genre-filter");N.addEventListener("change",()=>{const t=N.value,a=JSON.parse(localStorage.getItem(O))||[];if(t==="Genre"){y(!0);return}const n=a.filter(r=>Array.isArray(r.genres)&&r.genres.includes(t)?!0:Array.isArray(r.genre_ids)&&f?r.genre_ids.some(e=>f[e]===t):!1);d=0,v.innerHTML="",y(!1,n)});
//# sourceMappingURL=main-CSxl8Ojr.js.map
