import{a as h}from"./vendor-DGDcxXwr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-toggle"),t=document.body;localStorage.getItem("theme")==="light"&&t.classList.add("light-theme"),e.addEventListener("click",()=>{t.classList.toggle("light-theme");const r=t.classList.contains("light-theme");localStorage.setItem("theme",r?"light":"dark")})});const y="ed2682fe1cd0ecc2efbcdeb7464c5ffd",v="https://api.themoviedb.org/3",L="https://image.tmdb.org/t/p",p={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function b(e,t,a={}){try{return(await h.get(`${e}${t}`,{params:{api_key:y,language:"en-US",page:1,...a}})).data}catch(r){throw console.error("Error fetching data:",r),r}}async function S(){try{const e=await h.get(`${v}${p.GENRE_LIST}`,{params:{api_key:y,language:"en-US"}}),t={};return e.data.genres.forEach(a=>{t[a.id]=a.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let u={};(async()=>u=await S())();const d=document.querySelector("#catalog-hero"),n=document.getElementById("trailer-modal");d?G():console.log("Catalog hero element not found, skipping initialization");function I(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function M(e){try{const a=(await b(v,p.MOVIE_VIDEOS(e))).results.find(r=>r.type==="Trailer"&&r.site==="YouTube");return a?`https://www.youtube.com/embed/${a.key}`:null}catch{return null}}function _(e){n.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,n.classList.add("active"),n.querySelector(".overlay").addEventListener("click",g),n.querySelector(".close-span-btn").addEventListener("click",g)}function g(){n.classList.remove("active"),n.innerHTML=""}function O(e,t){if(typeof e!="number"||e<0||e>10){console.error("Rating must be a number between 0 and 10");return}const a=`
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
</svg>`,o=e/2,i=Math.floor(o),c=o%1>=.5?1:0,w=5-i-c;t.innerHTML="";const f=l=>{const m=document.createElement("div");m.innerHTML=l.trim();const E=m.firstElementChild;t.appendChild(E)};for(let l=0;l<i;l++)f(a);c&&f(r);for(let l=0;l<w;l++)f(s)}async function G(){try{const e=await b(v,p.POPULAR_MOVIES),t=I(e.results),a=`${L}${p.IMG_W1280}${t.backdrop_path}`;d.style.backgroundImage=`url('${a}')`,d.innerHTML=`
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
    `;const r=d.querySelector(".stars");O(t.vote_average,r),d.querySelector(".more-details").addEventListener("click",()=>{$(t)}),d.querySelector(".watch-trailer").addEventListener("click",async()=>{const s=await M(t.id);s?_(s):(n.innerHTML=`
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
        `,n.classList.add("active"),n.querySelector(".close-span-btn").addEventListener("click",g),n.querySelector(".overlay").addEventListener("click",g))})}catch(e){console.error("Catalog hero error:",e)}}function $(e){var i;const t=document.getElementById("movie-detail-modal"),a=`${L}${p.IMG_W500}${e.poster_path}`,r=((i=e.genre_ids)==null?void 0:i.map(c=>u==null?void 0:u[c]).join(", "))||"N/A";t.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${a}" alt="${e.title}" class="detail-poster" />
        <div class="detail-info">
          <h2>${e.title}</h2>
          <p><strong>Vote / Votes:</strong>
            <span class="value-box">${e.vote_average.toFixed(1)}</span> /
            <span class="value-box">${e.vote_count}</span>
          </p>
          <p><strong>Popularity:</strong> <span>${e.popularity.toFixed(1)}</span></p>
          <p><strong>Genre:</strong> <span>${r}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const s=c=>{c.key==="Escape"&&o()};document.addEventListener("keydown",s);function o(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",s)}t.querySelector(".close-span-btn-details").addEventListener("click",o),t.querySelector(".detail-overlay").addEventListener("click",o)}export{v as B,p as E,L as I,b as a,S as f,O as r,$ as s};
//# sourceMappingURL=catalog-hero-Cc6sBTQF.js.map
