import{a as f,B as L,E as u,f as O,I as C,c as _,i as I,r as $,b as H}from"./assets/footer-DLG_b0B6.js";import"./assets/vendor-DDD7fsZd.js";const c=document.getElementById("searchInput"),T=document.getElementById("yearFilter"),P=document.getElementById("searchBtn"),w=document.getElementById("movieResults"),E=document.getElementById("noResult");let m=1,S=1;document.addEventListener("DOMContentLoaded",()=>{W()});document.addEventListener("DOMContentLoaded",async()=>{try{const e=await f(L,u.UPCOMING_MOVIES,{page:m});S=e.total_pages,M(e.results),x(m,S)}catch(e){E.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",e)}});let y={};document.addEventListener("DOMContentLoaded",async()=>{try{y=await O();const e=await f(L,u.UPCOMING_MOVIES);M(e.results)}catch(e){w.innerHTML="<p>Film verileri yüklenemedi.</p>",console.error("Hata:",e)}});async function k(){const e=c.value.trim(),t=T.value;if(e)try{const n=await f(L,u.SEARCH_MOVIES,{query:e,year:t});M(n.results)}catch(n){E.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Search fetch hatası:",n)}}const b=document.getElementById("clearBtn");c.addEventListener("input",()=>{b.style.display=c.value?"block":"none"});b.addEventListener("click",()=>{c.value="",b.style.display="none",c.focus()});const d=document.getElementById("yearFilter");d.addEventListener("change",function(){for(let t=0;t<d.options.length;t++)d.options[t].style.color="white";for(let t of d.options)t.style.color="",t.style.fontWeight="",t.style.fontSize="";const e=d.options[d.selectedIndex];e.style.color="#F87719",e.style.fontWeight="500",e.style.fontSize="24px"});P.addEventListener("click",k);c.addEventListener("keydown",e=>{e.key==="Enter"&&k()});function x(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=(a,r,h=!1,p=!1,B=!1)=>{const i=document.createElement("button");return B?i.innerHTML=a:i.textContent=a,p?i.className="nav-btn":(i.className="page-btn",h&&i.classList.add("active")),i.addEventListener("click",async()=>{if(r!==m){m=r;try{const g=await f(L,u.UPCOMING_MOVIES,{page:r});M(g.results),x(r,g.total_pages)}catch(g){E.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",g)}}}),i};e>1&&n.appendChild(s(`<svg class= "svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.9375 1.125L1.0625 9L8.9375 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,e-1,!1,!0,!0));const o=3,v=Math.max(1,e-1),l=Math.min(t,v+o-1);for(let a=v;a<=l;a++)n.appendChild(s(String(a).padStart(2,"0"),a,a===e,!1));if(l<t){const a=document.createElement("span");a.textContent="...",a.style.color="#aaa",n.appendChild(a),n.appendChild(s(String(t).padStart(2,"0"),t,!1,!1))}e<t&&n.appendChild(s(`<svg class="svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.0625 1.125L8.9375 9L1.0625 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,e+1,!1,!0,!0))}function F(e,t){var h;window.currentModalMovie=e;const n=document.getElementById("movie-detail-modal"),s=`${C}${u.IMG_W500}${e.poster_path}`,o=((h=e.genre_ids)==null?void 0:h.map(p=>y==null?void 0:y[p]).join(", "))||"N/A",v=I(e.id);n.innerHTML=`
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${s}" alt="${e.title}" class="detail-poster" />
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
          <button class="add-library" data-id="${e.id}">
            ${v?"Remove from My Library":"Add to My Library"} </button>
        </div>
      </div>
    </div>
  `,n.classList.add("active");const l=n.querySelector(".add-library");l.addEventListener("click",()=>{I(e.id)?($(e.id),l.textContent="Add to My Library"):(H(e),l.textContent="Remove from My Library")});const a=p=>{p.key==="Escape"&&r()};document.addEventListener("keydown",a);function r(){n.classList.remove("active"),n.innerHTML="",document.removeEventListener("keydown",a)}n.querySelector(".close-span-btn-details").addEventListener("click",r),n.querySelector(".detail-overlay").addEventListener("click",r)}function M(e){if(w.innerHTML="",!e||e.length===0){pagination.innerHTML="",E.innerHTML="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";return}e.forEach(t=>{const n=document.createElement("div");n.classList.add("movie-card"),n.innerHTML=`
      <div class="movie-poster">
        <img src="${t.poster_path?C+"/w500"+t.poster_path:"https://via.placeholder.com/500x750?text=No+Image"}" alt="${t.title}" />
      </div>
      
      <div class="movie-info">
        <div class="movie-header">
          <h3 class="movie-title">${t.title}</h3>
          
        </div>
        
        <div class="movie-details">
          <div class="genre-year">
            <span class="genre-text">${N(t.genre_ids)}</span>
              <span class="separator">|</span>
              <span class="year-text">${t.release_date?t.release_date.split("-")[0]:"Unknown"}</span>
          </div>
            <div class="star-container"></div>
        </div>
        
      </div>
    `;const s=n.querySelector(".star-container");_(t.vote_average,s),n.addEventListener("click",()=>{F(t)}),w.appendChild(n)})}function N(e=[]){return Array.isArray(e)?e.map(t=>y[t]).filter(Boolean).slice(0,2).join(", "):""}function W(e=new Date().getFullYear(),t=1980){const n=document.getElementById("yearFilter");for(let s=e;s>=t;s--){const o=document.createElement("option");o.value=s,o.textContent=s,n.appendChild(o)}}
//# sourceMappingURL=catalog.js.map
