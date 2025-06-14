import{a as v}from"./vendor-DGDcxXwr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-toggle"),t=document.body;localStorage.getItem("theme")==="light"?t.classList.add("light-theme"):(t.classList.remove("light-theme"),localStorage.setItem("theme","dark")),e.addEventListener("click",()=>{t.classList.toggle("light-theme");const o=t.classList.contains("light-theme");localStorage.setItem("theme",o?"light":"dark")})});const f="ed2682fe1cd0ecc2efbcdeb7464c5ffd",m="https://api.themoviedb.org/3",h="https://image.tmdb.org/t/p",d={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function y(e,t,r={}){try{return(await v.get(`${e}${t}`,{params:{api_key:f,language:"en-US",page:1,...r}})).data}catch(o){throw console.error("Error fetching data:",o),o}}async function b(){try{const e=await v.get(`${m}${d.GENRE_LIST}`,{params:{api_key:f,language:"en-US"}}),t={};return e.data.genres.forEach(r=>{t[r.id]=r.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let u={};(async()=>u=await b())();const l=document.querySelector("#catalog-hero"),i=document.getElementById("trailer-modal");function E(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function L(e){try{const r=(await y(m,d.MOVIE_VIDEOS(e))).results.find(o=>o.type==="Trailer"&&o.site==="YouTube");return r?`https://www.youtube.com/embed/${r.key}`:null}catch{return null}}function I(e){i.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,i.classList.add("active"),i.querySelector(".overlay").addEventListener("click",p),i.querySelector(".close-span-btn").addEventListener("click",p)}function p(){i.classList.remove("active"),i.innerHTML=""}async function g(e){const r=await(await fetch(e)).text(),s=new DOMParser().parseFromString(r,"image/svg+xml").documentElement;return s.classList.add("star-icon"),s}async function S(e){const t=Math.round(e)/2,r=Math.floor(t),o=t%1>=.5,s=5-r-(o?1:0),a=document.createElement("div");a.classList.add("star-icons");for(let n=0;n<r;n++){const c=await g("./img/star-full.svg");a.appendChild(c)}if(o){const n=await g("./img/star-half.svg");a.appendChild(n)}for(let n=0;n<s;n++){const c=await g("./img/star-empty.svg");a.appendChild(c)}return a}async function w(){try{const e=await y(m,d.POPULAR_MOVIES),t=E(e.results),r=`${h}${d.IMG_W1280}${t.backdrop_path}`;l.style.backgroundImage=`url('${r}')`,l.innerHTML=`
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
    `;const o=l.querySelector(".stars"),s=await S(t.vote_average);o.appendChild(s),l.querySelector(".more-details").addEventListener("click",()=>{M(t)}),l.querySelector(".watch-trailer").addEventListener("click",async()=>{const a=await L(t.id);a?I(a):(i.innerHTML=`
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
        `,i.classList.add("active"),i.querySelector(".close-span-btn").addEventListener("click",p),i.querySelector(".overlay").addEventListener("click",p))})}catch(e){console.error("Catalog hero error:",e)}}w();function M(e){var n;const t=document.getElementById("movie-detail-modal"),r=`${h}${d.IMG_W500}${e.poster_path}`,o=((n=e.genre_ids)==null?void 0:n.map(c=>u==null?void 0:u[c]).join(", "))||"N/A";t.innerHTML=`
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
          <p><strong>Genre:</strong> <span>${o}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const s=c=>{c.key==="Escape"&&a()};document.addEventListener("keydown",s);function a(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",s)}t.querySelector(".close-span-btn-details").addEventListener("click",a),t.querySelector(".detail-overlay").addEventListener("click",a)}
//# sourceMappingURL=main-C7to_0st.js.map
