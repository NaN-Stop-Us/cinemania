import{a as g,B as m,E as u,f as x,I,r as C}from"./assets/catalog-hero-Cc6sBTQF.js";import"./assets/loadFooter-CwYynZul.js";import"./assets/vendor-DGDcxXwr.js";const c=document.getElementById("searchInput"),_=document.getElementById("yearFilter"),$=document.getElementById("searchBtn"),L=document.getElementById("movieResults"),f=document.getElementById("noResult");let v=1,w=1;document.addEventListener("DOMContentLoaded",()=>{P()});document.addEventListener("DOMContentLoaded",async()=>{try{const e=await g(m,u.UPCOMING_MOVIES,{page:v});w=e.total_pages,E(e.results),k(v,w)}catch(e){f.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",e)}});let p={};document.addEventListener("DOMContentLoaded",async()=>{try{p=await x();const e=await g(m,u.UPCOMING_MOVIES);E(e.results)}catch(e){L.innerHTML="<p>Film verileri yüklenemedi.</p>",console.error("Hata:",e)}});async function S(){const e=c.value.trim(),t=_.value;if(e)try{const n=await g(m,u.SEARCH_MOVIES,{query:e,year:t});E(n.results)}catch(n){f.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Search fetch hatası:",n)}}const M=document.getElementById("clearBtn");c.addEventListener("input",()=>{M.style.display=c.value?"block":"none"});M.addEventListener("click",()=>{c.value="",M.style.display="none",c.focus()});const l=document.getElementById("yearFilter");l.addEventListener("change",function(){for(let t=0;t<l.options.length;t++)l.options[t].style.color="white";for(let t of l.options)t.style.color="",t.style.fontWeight="",t.style.fontSize="";const e=l.options[l.selectedIndex];e.style.color="#F87719",e.style.fontWeight="500",e.style.fontSize="24px"});$.addEventListener("click",S);c.addEventListener("keydown",e=>{e.key==="Enter"&&S()});function k(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=(a,y,B=!1,O=!1,b=!1)=>{const o=document.createElement("button");return b?o.innerHTML=a:o.textContent=a,O?o.className="nav-btn":(o.className="page-btn",B&&o.classList.add("active")),o.addEventListener("click",async()=>{if(y!==v){v=y;try{const h=await g(m,u.UPCOMING_MOVIES,{page:y});E(h.results),k(y,h.total_pages)}catch(h){f.innerHTML="<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>",console.error("Upcoming fetch hatası:",h)}}}),o};e>1&&n.appendChild(s(`<svg class= "svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.9375 1.125L1.0625 9L8.9375 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,e-1,!1,!0,!0));const r=3,i=Math.max(1,e-1),d=Math.min(t,i+r-1);for(let a=i;a<=d;a++)n.appendChild(s(String(a).padStart(2,"0"),a,a===e,!1));if(d<t){const a=document.createElement("span");a.textContent="...",a.style.color="#aaa",n.appendChild(a),n.appendChild(s(String(t).padStart(2,"0"),t,!1,!1))}e<t&&n.appendChild(s(`<svg class="svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.0625 1.125L8.9375 9L1.0625 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,e+1,!1,!0,!0))}function H(e){var d;const t=document.getElementById("movie-detail-modal"),n=`${I}${u.IMG_W500}${e.poster_path}`,s=((d=e.genre_ids)==null?void 0:d.map(a=>p==null?void 0:p[a]).join(", "))||"N/A";t.innerHTML=`
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
  `,t.classList.add("active");const r=a=>{a.key==="Escape"&&i()};document.addEventListener("keydown",r);function i(){t.classList.remove("active"),t.innerHTML="",document.removeEventListener("keydown",r)}t.querySelector(".close-span-btn-details").addEventListener("click",i),t.querySelector(".detail-overlay").addEventListener("click",i)}function E(e){if(L.innerHTML="",!e||e.length===0){pagination.innerHTML="",f.innerHTML="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";return}e.forEach(t=>{const n=document.createElement("div");n.classList.add("movie-card"),n.innerHTML=`
      <img src="${t.poster_path?I+"/w500"+t.poster_path:"https://via.placeholder.com/500x750?text=No+Image"}" alt="${t.title}" />
      <h3>${t.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${T(t.genre_ids)}</span>
        <span class="year-text">${t.release_date?t.release_date.split("-")[0]:"Unknown"}</span>
      </div>
    `;const s=n.querySelector(".star-container");C(t.vote_average,s),n.addEventListener("click",()=>{H(t)}),L.appendChild(n)})}function T(e=[]){return Array.isArray(e)?e.map(t=>p[t]).filter(Boolean).slice(0,2).join(", "):""}function P(e=new Date().getFullYear(),t=1980){const n=document.getElementById("yearFilter");for(let s=e;s>=t;s--){const r=document.createElement("option");r.value=s,r.textContent=s,n.appendChild(r)}}
//# sourceMappingURL=catalog.js.map
