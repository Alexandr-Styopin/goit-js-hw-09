const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}const e=new class{constuctor(){this.intervalId=null,this.isActive=!1}start(){if(this.isActive)return;this.isActive=!0;n();this.intervalId=setInterval((()=>{const e=n();t.body.style.backgroundColor=e}),1e3)}stop(){clearInterval(this.intervalId),this.isActive=!1}};t.startBtn.addEventListener("click",(function(t){e.start()})),t.stopBtn.addEventListener("click",(function(t){e.stop()}));
//# sourceMappingURL=01-color-switcher.b9231a35.js.map
