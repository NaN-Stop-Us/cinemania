import{f as u,B as y,E as d,a as _,I as f,r as b}from"./assets/catalog-hero-CJalPfBW.js";import"./assets/vendor-DGDcxXwr.js";const L=document.getElementById("searchInput"),O=document.getElementById("yearFilter"),C=document.getElementById("searchBtn"),m=document.getElementById("movieResults"),h=document.getElementById("noResult");let p=1,E=1;document.addEventListener("DOMContentLoaded",async()=>{try{const e=await u(y,d.UPCOMING_MOVIES,{page:p});E=e.total_pages,g(e.results),S(p,E)}catch(e){h.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",e)}});let i={};document.addEventListener("DOMContentLoaded",async()=>{try{i=await _();const e=await u(y,d.UPCOMING_MOVIES);g(e.results)}catch(e){m.innerHTML="<p>Film verileri yüklenemedi.</p>",console.error("Hata:",e)}});async function M(){const e=L.value.trim(),t=O.value;if(e)try{const n=await u(y,d.SEARCH_MOVIES,{query:e,year:t});g(n.results)}catch(n){h.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Search fetch hatası:",n)}}C.addEventListener("click",M);L.addEventListener("keydown",e=>{e.key==="Enter"&&M()});function S(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=(a,v,I=!1)=>{const c=document.createElement("button");return c.textContent=a,c.className="page-btn",I&&c.classList.add("active"),c.addEventListener("click",()=>{v!==p&&(p=v,$(v))}),c};e>1&&(n.appendChild(s("⏮",1)),n.appendChild(s("‹",e-1)));const l=3,r=Math.max(1,e-1),o=Math.min(t,r+l-1);for(let a=r;a<=o;a++)n.appendChild(s(String(a).padStart(2,"0"),a,a===e));if(o<t){const a=document.createElement("span");a.textContent="...",a.style.color="#aaa",n.appendChild(a),n.appendChild(s(String(t).padStart(2,"0"),t))}e<t&&(n.appendChild(s("›",e+1)),n.appendChild(s("⏭",t)))}async function $(e){try{const t=await u(y,d.UPCOMING_MOVIES,{page:e});g(t.results),S(e,t.total_pages)}catch(t){h.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",t)}}function B(e){var o;const t=document.getElementById("movie-detail-modal"),n=`${f}${d.IMG_W500}${e.poster_path}`,s=((o=e.genre_ids)==null?void 0:o.map(a=>i==null?void 0:i[a]).join(", "))||"N/A";t.innerHTML=`
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
          <p><strong>Genre:</strong> <span>${s}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${e.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `,t.classList.add("active");const l=a=>{a.key==="Escape"&&r()};document.addEventListener("keydown",l);function r(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",l)}t.querySelector(".close-span-btn-details").addEventListener("click",r),t.querySelector(".detail-overlay").addEventListener("click",r)}function g(e){if(m.innerHTML="",!e||e.length===0){h.innerHTML="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";return}e.forEach(t=>{const n=document.createElement("div");n.classList.add("movie-card"),n.innerHTML=`
      <img src="${t.poster_path?f+"/w500"+t.poster_path:"https://via.placeholder.com/500x750?text=No+Image"}" alt="${t.title}" />
      <h3>${t.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${x(t.genre_ids)}</span>
        <span class="year-text">${t.release_date?t.release_date.split("-")[0]:"Unknown"}</span>
      </div>
    `;const s=n.querySelector(".star-container");b(t.vote_average,s),n.addEventListener("click",()=>{B(t)}),m.appendChild(n)})}function x(e=[]){return Array.isArray(e)?e.map(t=>i[t]).filter(Boolean).slice(0,2).join(", "):""}
//# sourceMappingURL=catalog.js.map
