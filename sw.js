if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let c={};const t=e=>i(e,l),o={module:{uri:l},exports:c,require:t};s[l]=Promise.all(n.map((e=>o[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-e57821c9"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_...all_.ca9d5278.js",revision:null},{url:"assets/_...all_.e8ca79c2.css",revision:null},{url:"assets/404.5414d111.js",revision:null},{url:"assets/404.d40d9366.css",revision:null},{url:"assets/index.46c8835b.js",revision:null},{url:"assets/index.d31070e2.css",revision:null},{url:"assets/virtual_pwa-register.c074f2ff.js",revision:null},{url:"assets/vscode.5d27fd8c.css",revision:null},{url:"assets/vscode.b6354bb3.js",revision:null},{url:"index.html",revision:"f99ec10aa3f3d13c043490dad5dca7f4"},{url:"favicon.svg",revision:"fd480326ce2f9db2043fceedae54cb67"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"c23543b0c5c9cf6438b654b6340b0bcc"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
