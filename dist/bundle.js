(()=>{var e={639:()=>{const e={container:null,title:{0:"Action (set A)",1:"Action (set B)",2:"Action (set C)",3:"Adjective",4:"Animal (set A)",5:"Animal (set B)",6:"Clothes",7:"Emotion"},images:{0:"../src/assets/images/categories/actionA.jpg",1:"../src/assets/images/categories/actionB.jpg",2:"../src/assets/images/categories/actionC.jpg",3:"../src/assets/images/categories/adjective.jpg",4:"../src/assets/images/categories/animalA.jpg",5:"../src/assets/images/categories/animalB.jpg",6:"../src/assets/images/categories/clothes.jpg",7:"../src/assets/images/categories/emotion.jpg"},isHeadPage:!0,init(){this.container||(this.container=document.createElement("div"),this.container.className="wrapper",document.querySelector(".container").appendChild(this.container));for(const e in this.title){const t=document.createElement("div");t.className="card",t.setAttribute("data-number",`${e}`);const s=document.createElement("div");s.className="card__image";const n=document.createElement("img");n.src=`${this.images[e]}`,s.append(n);const r=document.createElement("span");r.className="card__name",r.innerText=`${this.title[e]}`,t.appendChild(s),t.appendChild(r),this.container.appendChild(t)}const e=document.querySelectorAll(".card");for(const t of e)t.addEventListener("click",(()=>{this.removeContent(),this.setContentCards(t.getAttribute("data-number"))}))},removeContent(){const e=this.container.querySelectorAll(".card");for(const t of e)this.container.removeChild(t);const t=this.container.querySelectorAll(".card-word");for(const e of t)this.container.removeChild(e)},setContentCards(e){this.isHeadPage=!1;const t=new XMLHttpRequest;t.open("GET","../src/js/cards.json"),t.send(),t.onload=()=>{const r=JSON.parse(t.response);for(const t in r[e]){const n=document.createElement("div");n.className="card-word";const o=document.createElement("div");o.className="card-word__front",o.setAttribute("data-number",`${t}`),o.setAttribute("data-name",`${r[e][t].word}`);const a=document.createElement("div");a.className="card-word__front-image";const i=document.createElement("img");i.src=`../src/${r[e][t].image}`,a.append(i);const c=document.createElement("span");c.className="card-word__front-name",c.innerText=`${r[e][t].word}`,o.addEventListener("click",(e=>{"reverse-button"!==e.target.className&&s.toggleOff&&this.toVoice(o.getAttribute("data-number"))}));const l=document.createElement("div");l.className="reverse-button",l.setAttribute("data-number",`${t}`),l.addEventListener("click",(()=>{this.reverseCard(l.getAttribute("data-number"))})),o.appendChild(a),o.appendChild(c),o.appendChild(l);const d=document.createElement("div");d.className="card-word__back";const m=document.createElement("div");m.className="card-word__back-image";const u=document.createElement("img");u.src=`../src/${r[e][t].image}`,m.append(u);const h=document.createElement("span");h.className="card-word__back-name",h.innerText=`${r[e][t].translation}`,d.appendChild(m),d.appendChild(h),n.appendChild(o),n.appendChild(d),this.container.appendChild(n)}n.countClicks()}},reverseCard(e){const t=document.querySelectorAll(".card-word"),s=document.querySelectorAll(".card-word__front"),n=document.querySelectorAll(".card-word__back");s[e].style.transform="rotateY(180deg)",n[e].style.transform="rotateY(360deg)",t[e].addEventListener("mouseleave",(()=>{s[e].style.transform="rotateY(0deg)",n[e].style.transform="rotateY(180deg)"}))},toVoice(e){const t=document.querySelectorAll(".card-word__front-name"),s=document.createElement("audio"),n=document.createElement("source");n.src=`../src/assets/sounds/${t[e].innerText}.mp3`,s.append(n),s.play()}};e.init();const t={button:null,boxStars:null,currentWords:{},rating:[],correctAnswer:null,wrongAnswer:null,soundWin:null,soundLose:null,init(){this.button=document.createElement("div"),this.button.classList.add("button-play","disabled");const e=document.createElement("span");e.innerText="PLAY",this.button.append(e),this.boxStars=document.createElement("div"),this.boxStars.className="box-stars",this.correctAnswer=document.createElement("audio");const t=document.createElement("source");t.src="../src/assets/sounds/correct.mp3",this.correctAnswer.append(t),this.wrongAnswer=document.createElement("audio");const s=document.createElement("source");s.src="../src/assets/sounds/error.mp3",this.wrongAnswer.append(s),this.soundWin=document.createElement("audio");const n=document.createElement("source");n.src="../src/assets/sounds/success.mp3",this.soundWin.append(n),this.soundLose=document.createElement("audio");const r=document.createElement("source");r.src="../src/assets/sounds/failure.mp3",this.soundLose.append(r),document.querySelector(".container").appendChild(this.button),document.querySelector(".container").appendChild(this.boxStars),this.button.addEventListener("click",(()=>{this.currentWords=[],this.play()}))},setPlayingWords(){const e=document.querySelectorAll(".card-word__front-name");for(let t=0;t<8;t+=1)this.currentWords[t]=e[t].innerText},play(){this.setPlayingWords();const e=[...Array(8).keys()].sort((()=>Math.random()-.5));let t=0,s=0;const n=()=>{const s=document.createElement("audio"),n=document.createElement("source");n.src=`../src/assets/sounds/${this.currentWords[e[t]]}.mp3`,s.append(n),s.play()},r=document.querySelectorAll(".card-word__front");for(const o of r)o.addEventListener("click",(()=>{if(+o.getAttribute("data-number")===e[t]){const e=document.createElement("img");e.src="../src/assets/icons/star-win.svg",this.boxStars.appendChild(e),this.correctAnswer.play(),o.style.filter="blur(5px)",t+=1,t<8&&setTimeout((()=>n()),500);const r=o.getAttribute("data-name");let a=JSON.parse(localStorage.getItem(`${r}`));a.correct+=1,localStorage.setItem(`${r}`,`${JSON.stringify(a)}`),8===t&&0===s?(setTimeout((()=>{const e=document.querySelector(".container .wrapper");for(;e.firstChild;)e.removeChild(e.firstChild);this.button.classList.add("disabled");const t=document.createElement("div");t.className="win-image";const s=document.createElement("span");s.className="win-title",s.innerText="Congratulations. You won!";const n=document.createElement("img"),r=["mask.jpg","stark.jpg","stark2.jpg","youDidIt.png"];r.sort((()=>Math.random()-.5)),n.src=`../src/assets/images/endGame/${r[0]}`,t.append(n),e.appendChild(s),e.appendChild(t),this.soundWin.play()}),500),this.clearFinalScreen()):8===t&&(setTimeout((()=>{const e=document.querySelector(".container .wrapper");for(;e.firstChild;)e.removeChild(e.firstChild);this.button.classList.add("disabled");const t=document.createElement("div");t.className="win-image";const s=document.createElement("span");s.className="win-title",s.innerText="Sorry. You lost(: Train and try again!";const n=document.createElement("img"),r=["lose1","lose2","lose3","lose4","lose5"];r.sort((()=>Math.random()-.5)),n.src=`../src/assets/images/endGame/${r[0]}.jpg`,t.append(n),e.appendChild(s),e.appendChild(t),this.soundLose.play()}),500),this.clearFinalScreen())}else{const n=this.currentWords[e[t]];let r=JSON.parse(localStorage.getItem(`${n}`));r.wrong+=1,localStorage.setItem(`${n}`,`${JSON.stringify(r)}`);const o=document.createElement("img");o.src="../src/assets/icons/star.svg",this.boxStars.appendChild(o),this.wrongAnswer.play(),s+=1}}));n()},clearFinalScreen(){setTimeout((()=>{const s=document.querySelector(".container");for(;s.firstChild;)s.removeChild(s.firstChild);e.container=null,e.init(),t.init()}),2500)},makeVisibleButton(){e.isHeadPage||s.toggleOff?t.button.classList.add("disabled"):t.button.classList.remove("disabled")}};t.init();const s={switchBox:null,toggle:null,titlePlay:null,titleTrain:null,toggleOff:!0,init(){this.switchBox=document.createElement("div"),this.switchBox.className="switch",this.toggle=document.createElement("div"),this.toggle.className="toggle",this.titlePlay=document.createElement("span"),this.titlePlay.className="play",this.titlePlay.innerText="play",this.titleTrain=document.createElement("span"),this.titleTrain.classList.add("train","hidden"),this.titleTrain.innerText="train",this.switchBox.appendChild(this.toggle),this.switchBox.appendChild(this.titlePlay),this.switchBox.appendChild(this.titleTrain),document.querySelector(".header .wrapper").appendChild(this.switchBox),this.toggle.addEventListener("click",(()=>{this.titlePlay.classList.toggle("hidden"),this.titleTrain.classList.toggle("hidden");const e=document.querySelectorAll(".card-word");if(this.toggleOff){this.toggle.style.transform="translateX(80px)",this.toggleOff=!1,t.makeVisibleButton();for(const t of e)t.style.height="200px"}else{this.toggle.style.transform="translateX(0)",this.toggleOff=!0,t.button.classList.add("disabled");for(const t of e)t.style.height="280px"}}))}};s.init();const n={setLocalStorage(){const e=new XMLHttpRequest;e.open("GET","../src/js/cards.json"),e.send();const t=[];e.onload=()=>{const s=JSON.parse(e.response);for(const e of s)for(const s of e)t.push(s);for(const e of t){const t={word:e.word,translation:e.translation,category:e.category,clicks:0,correct:0,wrong:0,percent:0};localStorage.getItem(`${e.word}`)||localStorage.setItem(`${e.word}`,`${JSON.stringify(t)}`)}}},countClicks(){const e=document.querySelectorAll(".card-word__front");for(const t of e)t.addEventListener("click",(()=>{const e=t.getAttribute("data-name");let n=JSON.parse(localStorage.getItem(`${e}`));s.toggleOff&&(n.clicks+=1,localStorage.setItem(`${e}`,`${JSON.stringify(n)}`))}))}};n.setLocalStorage();const r={burgerBox:null,firstLIne:null,secondLine:null,thirdLine:null,buttonOff:!0,init(){this.burgerBox=document.createElement("div"),this.burgerBox.className="burger-menu__button",this.firstLIne=document.createElement("div"),this.firstLIne.className="first-line",this.secondLine=document.createElement("div"),this.secondLine.className="second-line",this.thirdLine=document.createElement("div"),this.thirdLine.className="third-line",this.burgerBox.appendChild(this.firstLIne),this.burgerBox.appendChild(this.secondLine),this.burgerBox.appendChild(this.thirdLine),this.burgerBox.addEventListener("click",(()=>{this.buttonOff?(this.firstLIne.style.transform="translateY(13px) rotate(45deg)",this.secondLine.style.transform="translateX(-40px)",this.thirdLine.style.transform="translateY(-13px) rotate(-45deg)",document.querySelector(".burger-menu").style.transform="translateX(0)",this.buttonOff=!1):(this.firstLIne.style.transform="translateY(0) rotate(0)",this.secondLine.style.transform="translateX(0)",this.thirdLine.style.transform="translateY(0) rotate(0)",document.querySelector(".burger-menu").style.transform="translateX(-320px)",this.buttonOff=!0)})),document.querySelector(".header .wrapper").prepend(this.burgerBox),document.querySelector(".burger-menu")}},o=document.querySelectorAll(".navigation-item");for(const s of o)s.addEventListener("click",(()=>{e.removeContent(),"main"===s.getAttribute("data-number")?(e.isHeadPage=!0,t.makeVisibleButton(),e.init()):e.setContentCards(s.getAttribute("data-number"))}));document.querySelector(".title").addEventListener("click",(()=>{e.isHeadPage=!0,t.makeVisibleButton(),e.removeContent(),e.init()})),r.init()}},t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";s(639)})()})();