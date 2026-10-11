(function(){
var OPEN={1:[8.5,17],2:[8.5,17],3:[8.5,17],4:[8.5,17],5:[8.5,17],6:[8.5,14],0:null};
var DAYS=['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];
function hh(n){var h=Math.floor(n),m=Math.round((n-h)*60);return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')}
var now=new Date(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,t=OPEN[d];
document.querySelectorAll('#uren tr').forEach(function(r){if(+r.dataset.day===d)r.classList.add('today')});
var msg,open=false;
if(t&&cur>=t[0]&&cur<t[1]){open=true;msg='Nu open, tot '+hh(t[1])}
else if(t&&cur<t[0]){msg='Gesloten, we openen vandaag om '+hh(t[0])}
else{var k=d,add=0;do{k=(k+1)%7;add++}while(!OPEN[k]);msg='Gesloten, we openen '+(add===1?'morgen':DAYS[k].toLowerCase())+' om '+hh(OPEN[k][0])}
var st=document.getElementById('status');if(st)st.innerHTML='<i class="dot'+(open?'':' closed')+'" aria-hidden="true"></i>'+msg;
var s2=document.getElementById('status2');if(s2)s2.textContent=msg;
var td=document.getElementById('today');if(td)td.textContent=t?DAYS[d]+': '+hh(t[0])+' - '+hh(t[1]):'Vandaag zijn we gesloten';
/* menu: zoeken + actieve rubriek */
var q=document.getElementById('q');if(!q)return;
var cnt=document.getElementById('count');
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
q.addEventListener('input',function(){
 var v=norm(q.value.trim()),n=0;
 document.querySelectorAll('.it').forEach(function(e){var m=!v||e.dataset.s.indexOf(v)>-1;e.classList.toggle('hide',!m);if(m)n++});
 document.querySelectorAll('.grp').forEach(function(g){g.classList.toggle('hide',!g.querySelector('.it:not(.hide)'))});
 document.querySelectorAll('section.cat').forEach(function(s){s.classList.toggle('hide',!s.querySelector('.it:not(.hide)'))});
 cnt.textContent=v?(n?n+(n===1?' resultaat':' resultaten'):'Niets gevonden, vraag het gerust aan de toog'):'';
});
var links=[].slice.call(document.querySelectorAll('#idx a'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
 document.querySelectorAll('section.cat').forEach(function(s){io.observe(s)});
}
})();
