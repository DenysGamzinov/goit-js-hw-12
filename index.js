import{a as c,S as m,i as n}from"./assets/vendor-DDdXnYQq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const s={form:document.querySelector(".form"),input:document.querySelector("#user-input"),button:document.querySelector(".search-button"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".load-button"),loader:document.querySelector("#loader")};async function d(o,t){s.loader.classList.add("loader"),c.defaults.baseURL="https://pixabay.com/api/";const a="42305784-5d55228baaa9a6392a5b2668b";c.defaults.params={key:a,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const{data:i}=await c.get();return s.loader.classList.remove("loader"),i}catch{iziToast.error({position:"topLeft",message:"Sorry, there is some problem. Please try again later."})}}let h=new m(".gallery a",{captions:!1});function y(o){if(o.hits.length===0)n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topLeft"});else{if(n.success({message:`A total of ${o.totalHits} images were successfully found`,position:"topLeft"}),o.totalHits>15){s.loadMore.classList.remove("is-hidden");let t=2;const a=Math.ceil(o.totalHits/15);s.loadMore.addEventListener("click",async()=>{if(t>a)return s.loadMore.classList.add("is-hidden"),n.error({position:"topLeft",message:"We're sorry, but you've reached the end of search results."});try{const e=await d(s.input.value.trim(),t);u(e),t+=1}catch{n.error({position:"topLeft",message:"Sorry, there is some problem. Please try again later."})}const i=s.gallery.firstElementChild.getBoundingClientRect().height;window.scrollBy({behavior:"smooth",top:i*2})})}u(o)}}function u(o){const t=o.hits.map(({webformatURL:a,largeImageURL:i,tags:e,likes:r,views:l,comments:p,downloads:f})=>`<li class="gallery-item">
        <a href="${i}">
          <img src="${a}" alt="${e}" title="${e}"/>
          <ul>
            <li>
              <h3>Likes</h3>
              <p>${r}</p>
            </li>
            <li>
              <h3>Vievs</h3>
              <p>${l}</p>
            </li>
            <li>
              <h3>Comments</h3>
              <p>${p}</p>
            </li>
            <li>
              <h3>Downloads</h3>
              <p>${f}</p>
            </li>
          </ul>
        </a></li>`).join("");s.gallery.insertAdjacentHTML("beforeend",t),h.refresh()}function g(o){o.preventDefault(),s.loadMore.classList.add("is-hidden"),s.gallery.innerHTML="";const t=s.input.value.trim();t!==""?d(t,1).then(y):n.error({message:"Sorry, the search bar is empty. Please try again!",position:"topLeft"})}s.form.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
