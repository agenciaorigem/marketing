const enter=document.querySelector('.enter');
let leaving=false;
enter.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
 event.preventDefault();if(leaving)return;leaving=true;
 document.body.classList.add('leaving');
 window.setTimeout(()=>window.location.assign(enter.href),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:650);
});
window.addEventListener('pageshow',()=>{leaving=false;document.body.classList.remove('leaving');});
