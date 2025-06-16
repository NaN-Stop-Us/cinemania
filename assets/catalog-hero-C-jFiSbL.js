import{a as y}from"./vendor-DGDcxXwr.js";const h="ed2682fe1cd0ecc2efbcdeb7464c5ffd",f="https://api.themoviedb.org/3",L="https://image.tmdb.org/t/p",p={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function b(e,t,a={}){try{return(await y.get(`${e}${t}`,{params:{api_key:h,language:"en-US",page:1,...a}})).data}catch(s){throw console.error("Error fetching data:",s),s}}async function _(){try{const e=await y.get(`${f}${p.GENRE_LIST}`,{params:{api_key:h,language:"en-US"}}),t={};return e.data.genres.forEach(a=>{t[a.id]=a.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let u={};(async()=>u=await _())();const d=document.querySelector("#catalog-hero"),o=document.getElementById("trailer-modal");function M(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function I(e){try{const a=(await b(f,p.MOVIE_VIDEOS(e))).results.find(s=>s.type==="Trailer"&&s.site==="YouTube");return a?`https://www.youtube.com/embed/${a.key}`:null}catch{return null}}function $(e){o.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,o.classList.add("active"),o.querySelector(".overlay").addEventListener("click",v),o.querySelector(".close-span-btn").addEventListener("click",v)}function v(){o.classList.remove("active"),o.innerHTML=""}function w(e,t){if(typeof e!="number"||e<0||e>10){console.error("Rating must be a number between 0 and 10");return}const a=`
    <svg class="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="#F87719" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`,s=`
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
`,r=`
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`,i=e/2,c=Math.floor(i),l=i%1>=.5?1:0,E=5-c-l;t.innerHTML="";const g=n=>{const m=document.createElement("div");m.innerHTML=n.trim();const S=m.firstElementChild;t.appendChild(S)};for(let n=0;n<c;n++)g(a);l&&g(s);for(let n=0;n<E;n++)g(r)}async function G(){try{const e=await b(f,p.POPULAR_MOVIES),t=M(e.results),a=`${L}${p.IMG_W1280}${t.backdrop_path}`;d.style.backgroundImage=`url('${a}')`,d.innerHTML=`
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
    `;const s=d.querySelector(".stars");w(t.vote_average,s),d.querySelector(".more-details").addEventListener("click",()=>{k(t)}),d.querySelector(".watch-trailer").addEventListener("click",async()=>{const r=await I(t.id);r?$(r):(o.innerHTML=`
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
        `,o.classList.add("active"),o.querySelector(".close-span-btn").addEventListener("click",v),o.querySelector(".overlay").addEventListener("click",v))})}catch(e){console.error("Catalog hero error:",e)}}G();function k(e){var c;const t=document.getElementById("movie-detail-modal"),a=`${L}${p.IMG_W500}${e.poster_path}`,s=((c=e.genre_ids)==null?void 0:c.map(l=>u==null?void 0:u[l]).join(", "))||"N/A";t.innerHTML=`
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
          <p><strong>Genre:</strong> <span>${s}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const r=l=>{l.key==="Escape"&&i()};document.addEventListener("keydown",r);function i(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",r)}t.querySelector(".close-span-btn-details").addEventListener("click",i),t.querySelector(".detail-overlay").addEventListener("click",i)}const T=Object.freeze(Object.defineProperty({__proto__:null,renderStarRating:w},Symbol.toStringTag,{value:"Module"}));export{f as B,p as E,L as I,_ as a,T as c,b as f,w as r};
//# sourceMappingURL=catalog-hero-C-jFiSbL.js.map
