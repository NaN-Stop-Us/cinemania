import{a as p}from"./vendor-DGDcxXwr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("theme-toggle"),t=document.body;localStorage.getItem("theme")==="light"?t.classList.add("light-theme"):(t.classList.remove("light-theme"),localStorage.setItem("theme","dark")),e.addEventListener("click",()=>{t.classList.toggle("light-theme");const s=t.classList.contains("light-theme");localStorage.setItem("theme",s?"light":"dark")})});const v="ed2682fe1cd0ecc2efbcdeb7464c5ffd",g="https://api.themoviedb.org/3",f="https://image.tmdb.org/t/p",l={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function h(e,t,o={}){try{return(await p.get(`${e}${t}`,{params:{api_key:v,language:"en-US",page:1,...o}})).data}catch(s){throw console.error("Error fetching data:",s),s}}async function y(){try{const e=await p.get(`${g}${l.GENRE_LIST}`,{params:{api_key:v,language:"en-US"}}),t={};return e.data.genres.forEach(o=>{t[o.id]=o.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let d={};(async()=>d=await y())();const c=document.querySelector("#catalog-hero"),i=document.getElementById("trailer-modal");function b(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function E(e){try{const o=(await h(g,l.MOVIE_VIDEOS(e))).results.find(s=>s.type==="Trailer"&&s.site==="YouTube");return o?`https://www.youtube.com/embed/${o.key}`:null}catch{return null}}function L(e){i.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,i.classList.add("active"),i.querySelector(".overlay").addEventListener("click",u),i.querySelector(".close-span-btn").addEventListener("click",u)}function u(){i.classList.remove("active"),i.innerHTML=""}function I(e){const t=Math.round(e)/2,o=Math.floor(t),s=t%1>=.5,r=5-o-(s?1:0);let a="";for(let n=0;n<o;n++)a+='<img src="img/starfull.svg" alt="Full Star" class="star-icon" />';s&&(a+='<img src="img/starhalf.svg" alt="Half Star" class="star-icon" />');for(let n=0;n<r;n++)a+='<img src="img/starempty.svg" alt="Empty Star" class="star-icon" />';return a}async function S(){try{const e=await h(g,l.POPULAR_MOVIES),t=b(e.results),o=`${f}${l.IMG_W1280}${t.backdrop_path}`;c.style.backgroundImage=`url('${o}')`,c.innerHTML=`
  <div class="catalog-hero-overlay"></div>
  <div class="catalog-hero-content">
    <h1>${t.title}</h1>
    <div class="stars">${I(t.vote_average)}</div>
    <p>${t.overview}</p>
    <div class="buttons">
      <button class="watch-trailer">Watch Trailer</button>
      <button class="more-details">More Details</button>
    </div>
  </div>
`,c.querySelector(".more-details").addEventListener("click",()=>{M(t)}),c.querySelector(".watch-trailer").addEventListener("click",async()=>{const s=await E(t.id);s?L(s):(i.innerHTML=`
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
`,i.classList.add("active"),i.querySelector(".close-span-btn").addEventListener("click",u),i.querySelector(".overlay").addEventListener("click",u))})}catch(e){console.error("Catalog hero error:",e)}}S();function M(e){var n;const t=document.getElementById("movie-detail-modal"),o=`${f}${l.IMG_W500}${e.poster_path}`,s=((n=e.genre_ids)==null?void 0:n.map(m=>d==null?void 0:d[m]).join(", "))||"N/A";t.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${o}" alt="${e.title}" class="detail-poster" />
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

          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const r=m=>{m.key==="Escape"&&a()};document.addEventListener("keydown",r);function a(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",r)}t.querySelector(".close-span-btn-details").addEventListener("click",a),t.querySelector(".detail-overlay").addEventListener("click",a)}
//# sourceMappingURL=main-DWBfQIHo.js.map
