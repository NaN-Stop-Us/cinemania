import{a as _}from"./vendor-DGDcxXwr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-toggle"),t=document.body;localStorage.getItem("theme")==="light"&&t.classList.add("light-theme"),e.addEventListener("click",()=>{t.classList.toggle("light-theme");const a=t.classList.contains("light-theme");localStorage.setItem("theme",a?"light":"dark")})});const O="ed2682fe1cd0ecc2efbcdeb7464c5ffd",p="https://api.themoviedb.org/3",E="https://image.tmdb.org/t/p",d={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function u(e,t,n={}){try{return(await _.get(`${e}${t}`,{params:{api_key:O,language:"en-US",page:1,...n}})).data}catch(a){throw console.error("Error fetching data:",a),a}}async function $(){try{const e=await _.get(`${p}${d.GENRE_LIST}`,{params:{api_key:O,language:"en-US"}}),t={};return e.data.genres.forEach(n=>{t[n.id]=n.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let y={};(async()=>y=await $())();const m=document.querySelector("#catalog-hero"),c=document.getElementById("trailer-modal");function C(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function P(e){try{const n=(await u(p,d.MOVIE_VIDEOS(e))).results.find(a=>a.type==="Trailer"&&a.site==="YouTube");return n?`https://www.youtube.com/embed/${n.key}`:null}catch{return null}}function U(e){c.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,c.classList.add("active"),c.querySelector(".overlay").addEventListener("click",f),c.querySelector(".close-span-btn").addEventListener("click",f)}function f(){c.classList.remove("active"),c.innerHTML=""}function k(e,t){if(typeof e!="number"||e<0||e>10){console.error("Rating must be a number between 0 and 10");return}const n=`
    <svg class="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="#F87719" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`,a=`
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
</svg>`,r=e/2,i=Math.floor(r),o=r%1>=.5?1:0,g=5-i-o;t.innerHTML="";const v=l=>{const w=document.createElement("div");w.innerHTML=l.trim();const H=w.firstElementChild;t.appendChild(H)};for(let l=0;l<i;l++)v(n);o&&v(a);for(let l=0;l<g;l++)v(s)}async function B(){try{const e=await u(p,d.POPULAR_MOVIES),t=C(e.results),n=`${E}${d.IMG_W1280}${t.backdrop_path}`;m.style.backgroundImage=`url('${n}')`,m.innerHTML=`
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
    `;const a=m.querySelector(".stars");k(t.vote_average,a),m.querySelector(".more-details").addEventListener("click",()=>{V(t)}),m.querySelector(".watch-trailer").addEventListener("click",async()=>{const s=await P(t.id);s?U(s):(c.innerHTML=`
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
        `,c.classList.add("active"),c.querySelector(".close-span-btn").addEventListener("click",f),c.querySelector(".overlay").addEventListener("click",f))})}catch(e){console.error("Catalog hero error:",e)}}B();function V(e){var i;const t=document.getElementById("movie-detail-modal"),n=`${E}${d.IMG_W500}${e.poster_path}`,a=((i=e.genre_ids)==null?void 0:i.map(o=>y==null?void 0:y[o]).join(", "))||"N/A";t.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${n}" alt="${e.title}" class="detail-poster" />
        <div class="detail-info">
          <h2>${e.title}</h2>
          <p><strong>Vote / Votes:</strong>
            <span class="value-box">${e.vote_average.toFixed(1)}</span> /
            <span class="value-box">${e.vote_count}</span>
          </p>
          <p><strong>Popularity:</strong> <span>${e.popularity.toFixed(1)}</span></p>
          <p><strong>Genre:</strong> <span>${a}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const s=o=>{o.key==="Escape"&&r()};document.addEventListener("keydown",s);function r(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",s)}t.querySelector(".close-span-btn-details").addEventListener("click",r),t.querySelector(".detail-overlay").addEventListener("click",r)}const T=document.getElementById("searchInput"),N=document.getElementById("yearFilter"),A=document.getElementById("searchBtn"),M=document.getElementById("movieResults"),b=document.getElementById("noResult");let L=1,I=1;document.addEventListener("DOMContentLoaded",async()=>{try{const e=await u(p,d.UPCOMING_MOVIES,{page:L});I=e.total_pages,S(e.results),G(L,I)}catch(e){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",e)}});let h={};document.addEventListener("DOMContentLoaded",async()=>{try{h=await $();const e=await u(p,d.UPCOMING_MOVIES);S(e.results)}catch(e){M.innerHTML="<p>Film verileri yüklenemedi.</p>",console.error("Hata:",e)}});async function x(){const e=T.value.trim(),t=N.value;if(e){currentQuery=e,currentYear=t;try{const n=await u(p,d.SEARCH_MOVIES,{query:e,year:t});S(n.results)}catch(n){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Search fetch hatası:",n)}}}A.addEventListener("click",x);T.addEventListener("keydown",e=>{e.key==="Enter"&&x()});function G(e,t){const n=document.getElementById("pagination");n.innerHTML="";const a=(o,g,v=!1)=>{const l=document.createElement("button");return l.textContent=o,l.className="page-btn",v&&l.classList.add("active"),l.addEventListener("click",()=>{g!==L&&(L=g,F(g))}),l};e>1&&(n.appendChild(a("⏮",1)),n.appendChild(a("‹",e-1)));const s=3,r=Math.max(1,e-1),i=Math.min(t,r+s-1);for(let o=r;o<=i;o++)n.appendChild(a(String(o).padStart(2,"0"),o,o===e));if(i<t){const o=document.createElement("span");o.textContent="...",o.style.color="#aaa",n.appendChild(o),n.appendChild(a(String(t).padStart(2,"0"),t))}e<t&&(n.appendChild(a("›",e+1)),n.appendChild(a("⏭",t)))}async function F(e){try{const t=await u(p,d.UPCOMING_MOVIES,{page:e});S(t.results),G(e,t.total_pages)}catch(t){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",t)}}function R(e){var i;const t=document.getElementById("movie-detail-modal"),n=`${E}${d.IMG_W500}${e.poster_path}`,a=((i=e.genre_ids)==null?void 0:i.map(o=>h==null?void 0:h[o]).join(", "))||"N/A";t.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${n}" alt="${e.title}" class="detail-poster" />
        <div class="detail-info">
          <h2>${e.title}</h2>
          <p><strong>Vote / Votes:</strong>
            <span class="value-box">${e.vote_average.toFixed(1)}</span> /
            <span class="value-box">${e.vote_count}</span>
          </p>
          <p><strong>Popularity:</strong> <span>${e.popularity.toFixed(1)}</span></p>
          <p><strong>Genre:</strong> <span>${a}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const s=o=>{o.key==="Escape"&&r()};document.addEventListener("keydown",s);function r(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",s)}t.querySelector(".close-span-btn-details").addEventListener("click",r),t.querySelector(".detail-overlay").addEventListener("click",r)}function S(e){if(M.innerHTML="",!e||e.length===0){b.innerHTML="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";return}e.forEach(t=>{const n=document.createElement("div");n.classList.add("movie-card"),n.innerHTML=`
      <img src="${t.poster_path?E+"/w500"+t.poster_path:"https://via.placeholder.com/500x750?text=No+Image"}" alt="${t.title}" />
      <h3>${t.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${q(t.genre_ids)}</span>
        <span class="year-text">${t.release_date?t.release_date.split("-")[0]:"Unknown"}</span>
      </div>
    `;const a=n.querySelector(".star-container");k(t.vote_average,a),n.addEventListener("click",()=>{R(t)}),M.appendChild(n)})}function q(e=[]){return Array.isArray(e)?e.map(t=>h[t]).filter(Boolean).slice(0,2).join(", "):""}(()=>{const e=document.querySelector("[data-modal-open]"),t=document.querySelector("[data-modal-close]"),n=document.querySelector("[data-modal]");e.addEventListener("click",a),t.addEventListener("click",a),n.addEventListener("click",s=>{s.target===n&&a()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&!n.classList.contains("is-hidden")&&a()});function a(){n.classList.toggle("is-hidden")}})();
//# sourceMappingURL=main-kwkW57o_.js.map
