const ambient=document.querySelector('.ambience');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let animation, start=0;
function frame(time){if(document.hidden||reduced.matches)return; if(time-start>60){const t=time/1000;ambient.style.setProperty('--rx',(20+Math.sin(t/14)*17+Math.sin(t/31)*5)+'%');ambient.style.setProperty('--ry',(65+Math.cos(t/18)*20)+'%');ambient.style.setProperty('--gx',(75+Math.sin(t/21)*18)+'%');ambient.style.setProperty('--gy',(30+Math.sin(t/27)*24)+'%');start=time;}animation=requestAnimationFrame(frame);}
function motion(){cancelAnimationFrame(animation);if(!reduced.matches&&!document.hidden)animation=requestAnimationFrame(frame);}
motion();reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',motion);

const form=document.querySelector('#briefing-form');
function buildMessage(){
 return '*BRIEFING E ESTRATÉGIAS — ORIGEM*\n\n'+Array.from(form.querySelectorAll('fieldset')).map(section=>{
  const heading=section.querySelector('legend').textContent.trim();
  const answers=Array.from(section.querySelectorAll('input,textarea')).map(field=>{
   const label=section.querySelector('label[for="'+field.id+'"]').textContent.replace(/\s*\*$/,'').trim();
   return '*'+label+'*\n'+(field.value.trim()||'Não informado.');
  });
  return '*'+heading.toUpperCase()+'*\n\n'+answers.join('\n\n');
 }).join('\n\n──────────\n\n');
}
document.querySelector('a[href="#briefing"]').addEventListener('click',()=>{document.querySelector('#q1-1').focus({preventScroll:true});});
form.addEventListener('submit',event=>{
 event.preventDefault();
 for(const field of form.querySelectorAll('[required]')){field.setCustomValidity(field.value.trim()?'':'Preencha este campo.');if(!field.reportValidity())return;}
 const url='https://wa.me/553591644403?text='+encodeURIComponent(buildMessage());
 const retry=document.querySelector('#retry');retry.href=url;retry.hidden=false;
 window.open(url,'_blank','noopener,noreferrer');
 document.querySelector('#status').textContent='No WhatsApp, confira suas respostas e toque em enviar. Se a mensagem não aparecer completa, copie as respostas pelo botão acima e cole na conversa.';
});
form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
document.querySelector('#copy-answers').addEventListener('click',async()=>{
 const message=buildMessage();let copied=false;
 try{await navigator.clipboard.writeText(message);copied=true;}catch{
  const temp=document.createElement('textarea');temp.value=message;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();copied=document.execCommand('copy');temp.remove();
 }
 document.querySelector('#status').textContent=copied?'Respostas copiadas. Cole a mensagem na conversa com a Origem no WhatsApp.':'Não foi possível copiar automaticamente. Tente novamente ou use o botão de finalizar.';
});
