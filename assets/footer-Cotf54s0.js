import{a as b}from"./vendor-DDD7fsZd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-toggle"),t=document.body;localStorage.getItem("theme")==="light"&&t.classList.add("light-theme"),e.addEventListener("click",()=>{t.classList.toggle("light-theme");const r=t.classList.contains("light-theme");localStorage.setItem("theme",r?"light":"dark")})});window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("menu-btn"),t=document.getElementById("nav"),o=document.getElementById("fog");e.addEventListener("click",()=>{t.classList.toggle("shown"),o.classList.toggle("active")})});const E="ed2682fe1cd0ecc2efbcdeb7464c5ffd",y="https://api.themoviedb.org/3",S="https://image.tmdb.org/t/p",p={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function w(e,t,o={}){try{return(await b.get(`${e}${t}`,{params:{api_key:E,language:"en-US",page:1,...o}})).data}catch(r){throw console.error("Error fetching data:",r),r}}async function M(){try{const e=await b.get(`${y}${p.GENRE_LIST}`,{params:{api_key:E,language:"en-US"}}),t={};return e.data.genres.forEach(o=>{t[o.id]=o.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}const g="myLibrary";function _(e){const t=JSON.parse(localStorage.getItem(g))||[];t.some(o=>o.id===e.id)||(t.push(e),localStorage.setItem(g,JSON.stringify(t)))}function O(e){let t=JSON.parse(localStorage.getItem(g))||[];t=t.filter(o=>o.id!==e),localStorage.setItem(g,JSON.stringify(t))}function L(e){return(JSON.parse(localStorage.getItem(g))||[]).some(o=>o.id===e)}let m={};(async()=>m=await M())();const u=document.querySelector("#catalog-hero"),l=document.getElementById("trailer-modal");u?T():console.log("Catalog hero element not found, skipping initialization");function k(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function $(e){try{const o=(await w(y,p.MOVIE_VIDEOS(e))).results.find(r=>r.type==="Trailer"&&r.site==="YouTube");return o?`https://www.youtube.com/embed/${o.key}`:null}catch{return null}}function G(e){l.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,l.classList.add("active"),l.querySelector(".overlay").addEventListener("click",v),l.querySelector(".close-span-btn").addEventListener("click",v)}function v(){l.classList.remove("active"),l.innerHTML=""}function x(e,t){if(typeof e!="number"||e<0||e>10){console.error("Rating must be a number between 0 and 10");return}const o=`
    <svg class="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="#F87719" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`,r=`
    <svg class="star-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.1719 7.3125H1.125L6.0469 10.6875L4.1484 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#half-star-stroke)" stroke-linejoin="round"/>
  <path d="M9 1.6875V12.7969L4.1484 16.3125L6.0469 10.6875L1.125 7.3125H7.1719L9 1.6875Z" fill="url(#half-star-fill)"/>
  <defs>
    <linearGradient id="half-star-stroke" x1="3.0488" y1="2.7325" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="half-star-fill" x1="2.0869" y1="2.7325" x2="12.1506" y2="9.4775" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>
`,s=`
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`,n=e/2,i=Math.floor(n),c=n%1>=.5?1:0,f=5-i-c;t.innerHTML="";const d=a=>{const h=document.createElement("div");h.innerHTML=a.trim();const I=h.firstElementChild;t.appendChild(I)};for(let a=0;a<i;a++)d(o);c&&d(r);for(let a=0;a<f;a++)d(s)}async function T(){try{const e=await w(y,p.POPULAR_MOVIES),t=k(e.results),o=`${S}${p.IMG_W1280}${t.backdrop_path}`;u.style.backgroundImage=`url('${o}')`,u.innerHTML=`
      <div class="catalog-hero-overlay"></div>
      <div class="catalog-hero-content">
        <h1>${t.title}</h1>
        <div class="stars"></div>
        <p>${t.overview}</p>
        <div class="buttons">
          <button class="watch-trailer">Watch Trailer</button>
          <button class="more-details">More Details</button>
        </div>
      </div>
    `;const r=u.querySelector(".stars");x(t.vote_average,r),u.querySelector(".more-details").addEventListener("click",()=>{N(t)}),u.querySelector(".watch-trailer").addEventListener("click",async()=>{const s=await $(t.id);s?G(s):(l.innerHTML=`
          <div class="overlay"></div>
          <div class="iframe-container not-found">
            <button class="close-span-btn" aria-label="Close trailer">
              <span>&times;</span>
            </button>
            <div class="not-found-message">
              <div class="not-found-text">
                <h2>OOPS...</h2>
                <p>We are very sorry!<br>But we couldn't find the trailer.</p>
              </div>
              <div class="not-found-img-wrapper">
                <img src="./img/sorryImg.png" alt="Not Found" class="not-found-img">
              </div>
            </div>
          </div>
        `,l.classList.add("active"),l.querySelector(".close-span-btn").addEventListener("click",v),l.querySelector(".overlay").addEventListener("click",v))})}catch(e){console.error("Catalog hero error:",e)}}function N(e,t){var d;const o=document.getElementById("movie-detail-modal"),r=`${S}${p.IMG_W500}${e.poster_path}`,s=((d=e.genre_ids)==null?void 0:d.map(a=>m==null?void 0:m[a]).join(", "))||"N/A",n=L(e.id);o.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${r}" alt="${e.title}" class="detail-poster" />
        <div class="detail-info">
          <h2>${e.title}</h2>
          <p><strong>Vote / Votes:</strong>
            <span class="value-box">${e.vote_average.toFixed(1)}</span> /
            <span class="value-box">${e.vote_count}</span>
          </p>
          <p><strong>Popularity:</strong> <span>${e.popularity.toFixed(1)}</span></p>
          <p><strong>Genre:</strong> <span>${s}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
           <button class="add-library" data-id="${e.id}">
            ${n?"Remove from My Library":"Add to My Library"} </button>
        </div>
      </div>
    </div>
  `,o.classList.add("active");const i=o.querySelector(".add-library");i.addEventListener("click",()=>{L(e.id)?(O(e.id),i.textContent="Add to My Library"):(_(e),i.textContent="Remove from My Library"),typeof t=="function"&&t()});function c(){o.classList.remove("active"),o.innerHTML="",document.removeEventListener("keydown",f)}const f=a=>{a.key==="Escape"&&c()};document.addEventListener("keydown",f),o.querySelector(".close-span-btn-details").addEventListener("click",c),o.querySelector(".detail-overlay").addEventListener("click",c)}(()=>{const e=document.querySelector('[data-modal-open="footer"]'),t=document.querySelector('[data-modal-close="footer"]'),o=document.querySelector('[data-modal="footer"]');e.addEventListener("click",r),t.addEventListener("click",r),o.addEventListener("click",s=>{s.target===o&&r()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&!o.classList.contains("is-hidden")&&r()});function r(){o.classList.toggle("is-hidden")}})();export{y as B,p as E,S as I,w as a,_ as b,x as c,M as f,L as i,O as r,N as s};
//# sourceMappingURL=footer-Cotf54s0.js.map
