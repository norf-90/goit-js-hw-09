const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let n=null;function e(t){document.body.style.backgroundColor=t()}function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}document.body.style.transition="background-color 500ms",t.startBtn.addEventListener("click",(function(){n=setInterval(e,1e3,o),t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),isStarted=!1,t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.2182dc43.js.map
