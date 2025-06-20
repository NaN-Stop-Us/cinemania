import{f as M,r as f,s as x}from"./assets/footer-DPzAl7vK.js";import"./assets/main-PJG_232H.js";import"./assets/vendor-DDD7fsZd.js";let c={};M().then(t=>{c=t,n(!0)});const S="myLibrary",i=document.getElementById("library-film-list"),g=document.getElementById("empty-library"),o=document.getElementById("load-more-btn");let w=[],r=0;const L=9;function n(t=!1,d=null){t&&(w=JSON.parse(localStorage.getItem(S))||[],r=0,i.innerHTML="");const a=d||w,e=document.querySelector(".genre-container");if(a.length===0){g.classList.remove("hidden"),i.innerHTML=`<div class="library-container"><p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
    <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
    </div>`,o.style.display="none",e&&(e.style.display="none");return}g.classList.add("hidden"),e&&(e.style.display=""),g.classList.add("hidden"),a.slice(r,r+L).forEach(u=>{const{title:v,poster_path:_,release_date:h,vote_average:b,genre_ids:y,genres:m}=u,E=h?h.slice(0,4):"N/A",A=_?`https://image.tmdb.org/t/p/w500${_}`:"https://via.placeholder.com/395x574?text=No+Image",I=Array.isArray(m)&&m.length?m.join(", "):Array.isArray(y)&&y.length?y.map(l=>c[l]||l).join(", "):"",s=document.createElement("li");if(s.className="weekly-card",s.innerHTML=`
      <div class="weekly-card__image-wrapper">
        <img class="weekly-card__image" src="${A}" alt="${v}">
        <div class="weekly-card__overlay"></div>
      </div>
      <div class="weekly-card__info">
        <h3 class="weekly-card__title">${v}</h3>
        <div class="weekly-card__meta-row">
          <p class="weekly-card__meta">${I} | ${E}</p>
          <div class="weekly-card__rating"></div>
        </div>
      </div>
    `,typeof f=="function"){const l=s.querySelector(".weekly-card__rating");f(b,l)}s.addEventListener("click",()=>{x(u,()=>n(!0))}),i.appendChild(s)}),r+=L,r<a.length?o.style.display="block":o.style.display="none"}document.addEventListener("DOMContentLoaded",()=>{n(!0)});o.addEventListener("click",()=>{n()});const k=document.getElementById("genre-filter");k.addEventListener("change",()=>{const t=k.value,d=JSON.parse(localStorage.getItem(S))||[];if(t==="Genre"){n(!0);return}const a=d.filter(e=>Array.isArray(e.genres)&&e.genres.includes(t)?!0:Array.isArray(e.genre_ids)&&c?e.genre_ids.some(p=>c[p]===t):!1);r=0,i.innerHTML="",n(!1,a)});
//# sourceMappingURL=library.js.map
