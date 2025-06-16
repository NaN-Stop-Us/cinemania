import"./assets/theme-C8VcN3hW.js";import{a as I}from"./assets/vendor-DGDcxXwr.js";const $="ed2682fe1cd0ecc2efbcdeb7464c5ffd",p="https://api.themoviedb.org/3",E="https://image.tmdb.org/t/p",d={POPULAR_MOVIES:"/movie/popular",UPCOMING_MOVIES:"/movie/upcoming",TRENDING_WEEK:"/trending/movie/week",TRENDING_DAY:"/trending/movie/day",SEARCH_MOVIES:"/search/movie",GENRE_LIST:"/genre/movie/list",MOVIE_DETAILS:e=>`/movie/${e}`,MOVIE_VIDEOS:e=>`/movie/${e}/videos`,IMG_ORIGINAL:"/original",IMG_W500:"/w500",IMG_W780:"/w780",IMG_W1280:"/w1280"};async function u(e,t,a={}){try{return(await I.get(`${e}${t}`,{params:{api_key:$,language:"en-US",page:1,...a}})).data}catch(n){throw console.error("Error fetching data:",n),n}}async function O(){try{const e=await I.get(`${p}${d.GENRE_LIST}`,{params:{api_key:$,language:"en-US"}}),t={};return e.data.genres.forEach(a=>{t[a.id]=a.name}),t}catch(e){return console.error("Error fetching genres:",e),{}}}let m={};(async()=>m=await O())();const g=document.querySelector("#catalog-hero"),c=document.getElementById("trailer-modal");function C(e){const t=Math.floor(Math.random()*e.length);return e[t]}async function U(e){try{const a=(await u(p,d.MOVIE_VIDEOS(e))).results.find(n=>n.type==="Trailer"&&n.site==="YouTube");return a?`https://www.youtube.com/embed/${a.key}`:null}catch{return null}}function P(e){c.innerHTML=`
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${e}" frameborder="0" allowfullscreen></iframe>
    </div>
  `,c.classList.add("active"),c.querySelector(".overlay").addEventListener("click",f),c.querySelector(".close-span-btn").addEventListener("click",f)}function f(){c.classList.remove("active"),c.innerHTML=""}function k(e,t){if(typeof e!="number"||e<0||e>10){console.error("Rating must be a number between 0 and 10");return}const a=`
    <svg class="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="#F87719" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`,n=`
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
`,i=`
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`,r=e/2,l=Math.floor(r),s=r%1>=.5?1:0,v=5-l-s;t.innerHTML="";const y=o=>{const w=document.createElement("div");w.innerHTML=o.trim();const H=w.firstElementChild;t.appendChild(H)};for(let o=0;o<l;o++)y(a);s&&y(n);for(let o=0;o<v;o++)y(i)}async function V(){try{const e=await u(p,d.POPULAR_MOVIES),t=C(e.results),a=`${E}${d.IMG_W1280}${t.backdrop_path}`;g.style.backgroundImage=`url('${a}')`,g.innerHTML=`
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
    `;const n=g.querySelector(".stars");k(t.vote_average,n),g.querySelector(".more-details").addEventListener("click",()=>{B(t)}),g.querySelector(".watch-trailer").addEventListener("click",async()=>{const i=await U(t.id);i?P(i):(c.innerHTML=`
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
        `,c.classList.add("active"),c.querySelector(".close-span-btn").addEventListener("click",f),c.querySelector(".overlay").addEventListener("click",f))})}catch(e){console.error("Catalog hero error:",e)}}V();function B(e){var l;const t=document.getElementById("movie-detail-modal"),a=`${E}${d.IMG_W500}${e.poster_path}`,n=((l=e.genre_ids)==null?void 0:l.map(s=>m==null?void 0:m[s]).join(", "))||"N/A";t.innerHTML=`
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
          <p><strong>Genre:</strong> <span>${n}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const i=s=>{s.key==="Escape"&&r()};document.addEventListener("keydown",i);function r(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",i)}t.querySelector(".close-span-btn-details").addEventListener("click",r),t.querySelector(".detail-overlay").addEventListener("click",r)}const x=document.getElementById("searchInput"),R=document.getElementById("yearFilter"),A=document.getElementById("searchBtn"),S=document.getElementById("movieResults"),b=document.getElementById("noResult");let L=1,_=1;document.addEventListener("DOMContentLoaded",async()=>{try{const e=await u(p,d.UPCOMING_MOVIES,{page:L});_=e.total_pages,M(e.results),G(L,_)}catch(e){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",e)}});let h={};document.addEventListener("DOMContentLoaded",async()=>{try{h=await O();const e=await u(p,d.UPCOMING_MOVIES);M(e.results)}catch(e){S.innerHTML="<p>Film verileri yüklenemedi.</p>",console.error("Hata:",e)}});async function T(){const e=x.value.trim(),t=R.value;if(e)try{const a=await u(p,d.SEARCH_MOVIES,{query:e,year:t});M(a.results)}catch(a){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Search fetch hatası:",a)}}A.addEventListener("click",T);x.addEventListener("keydown",e=>{e.key==="Enter"&&T()});function G(e,t){const a=document.getElementById("pagination");a.innerHTML="";const n=(s,v,y=!1)=>{const o=document.createElement("button");return o.textContent=s,o.className="page-btn",y&&o.classList.add("active"),o.addEventListener("click",()=>{v!==L&&(L=v,F(v))}),o};e>1&&(a.appendChild(n("⏮",1)),a.appendChild(n("‹",e-1)));const i=3,r=Math.max(1,e-1),l=Math.min(t,r+i-1);for(let s=r;s<=l;s++)a.appendChild(n(String(s).padStart(2,"0"),s,s===e));if(l<t){const s=document.createElement("span");s.textContent="...",s.style.color="#aaa",a.appendChild(s),a.appendChild(n(String(t).padStart(2,"0"),t))}e<t&&(a.appendChild(n("›",e+1)),a.appendChild(n("⏭",t)))}async function F(e){try{const t=await u(p,d.UPCOMING_MOVIES,{page:e});M(t.results),G(e,t.total_pages)}catch(t){b.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",t)}}function N(e){var l;const t=document.getElementById("movie-detail-modal"),a=`${E}${d.IMG_W500}${e.poster_path}`,n=((l=e.genre_ids)==null?void 0:l.map(s=>h==null?void 0:h[s]).join(", "))||"N/A";t.innerHTML=`
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
          <p><strong>Genre:</strong> <span>${n}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const i=s=>{s.key==="Escape"&&r()};document.addEventListener("keydown",i);function r(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",i)}t.querySelector(".close-span-btn-details").addEventListener("click",r),t.querySelector(".detail-overlay").addEventListener("click",r)}function M(e){if(S.innerHTML="",!e||e.length===0){b.innerHTML="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";return}e.forEach(t=>{const a=document.createElement("div");a.classList.add("movie-card"),a.innerHTML=`
      <img src="${t.poster_path?E+"/w500"+t.poster_path:"https://via.placeholder.com/500x750?text=No+Image"}" alt="${t.title}" />
      <h3>${t.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${W(t.genre_ids)}</span>
        <span class="year-text">${t.release_date?t.release_date.split("-")[0]:"Unknown"}</span>
      </div>
    `;const n=a.querySelector(".star-container");k(t.vote_average,n),a.addEventListener("click",()=>{N(t)}),S.appendChild(a)})}function W(e=[]){return Array.isArray(e)?e.map(t=>h[t]).filter(Boolean).slice(0,2).join(", "):""}
//# sourceMappingURL=catalog.js.map
