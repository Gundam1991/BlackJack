const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],r=["A","K","Q","J"];let n=[];const a=document.querySelector("#btnNuevo"),o=document.querySelector("#btnPedir"),l=document.querySelector("#btnDetener"),s=document.querySelectorAll(".divCartas"),d=document.querySelectorAll("small"),c=(t=2)=>{e=u(),n=[];for(let e=0;e<t;e++)n.push(0);d.forEach((e=>e.innerText=0)),s.forEach((e=>e.innerHTML="")),o.disabled=!1,l.disabled=!1},u=()=>{e=[];for(let r=2;r<=10;r++)for(let n of t)e.push(r+n);for(let n of t)for(let t of r)e.push(t+n);return e=_.shuffle(e)},i=()=>{if(0===e.length)throw"No hay cartas";return e.pop()},f=(e,t)=>(n[t]=n[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),d[t].innerText=n[t],n[t]),h=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),s[t].append(r)},m=e=>{let t=0;do{const e=i();t=f(e,n.length-1),h(e,n.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=n;setTimeout((()=>{t===e?alert("Nadie gana :( "):e>21?alert("Computadora gana"):t>21?alert("Jugador Gana"):alert("Computadora Gana")}),100)})()};return o.addEventListener("click",(()=>{const e=i(),t=f(e,0);h(e,0),(t>21||21===t)&&(o.disabled=!0,l.disabled=!0,m(t))})),l.addEventListener("click",(()=>{o.disabled=!0,l.disabled=!0,m(n[0])})),a.addEventListener("click",(()=>{c()})),{nuevoJuego:c}})();