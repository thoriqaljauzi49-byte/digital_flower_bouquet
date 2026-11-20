const bouquet = document.getElementById("bouquet");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const statusText = document.getElementById("statusText");

// Menggambar buket dari karakter teks, bukan gambar bitmap.
const W = 51, H = 34;
const blank = () => Array.from({length:H}, () => Array.from({length:W}, () => null));
const grid = blank();
const put = (x,y,ch,color) => {
  x=Math.round(x); y=Math.round(y);
  if (x>=0 && x<W && y>=0 && y<H) grid[y][x]={ch,color};
};
const line = (x1,y1,x2,y2,ch,color) => {
  const steps=Math.max(Math.abs(x2-x1),Math.abs(y2-y1),1);
  for(let i=0;i<=steps;i++){const t=i/steps;put(x1+(x2-x1)*t,y1+(y2-y1)*t,ch,color);}
};

// Batang dibuat lebih dulu agar rangkaian bunga tampak menyatu.
const flowerSpecs = [
  {x:10,y:8,c:"#ff78b7",center:"#ffe5a6",petal:"✿"},
  {x:25,y:5,c:"#f5a1d1",center:"#fff0b0",petal:"✿"},
  {x:40,y:8,c:"#ff5f68",center:"#ffe3a0",petal:"✿"},
  {x:17,y:15,c:"#ffca55",center:"#fff0a8",petal:"✿"},
  {x:34,y:15,c:"#a98bff",center:"#fff0b0",petal:"✿"}
];
flowerSpecs.forEach((f,i)=>{
  const sx=f.x+(25-f.x)*.42;
  line(f.x,f.y+5,sx,25,"│","#5cdb91");
});
function ellipseLeaf(cx,cy,rx,ry,color,flip=1){
  for(let y=-ry;y<=ry;y++) for(let x=-rx;x<=rx;x++){
    const d=(x*x)/(rx*rx)+(y*y)/(ry*ry);
    if(d<=1.12 && d>=.35) put(cx+x*flip,cy+y, (Math.abs(x)%2?"╱":"╲"),color);
  }
}
flowerSpecs.forEach((f,i)=>{
  const stemX=f.x+(25-f.x)*.42;
  if(i%2===0){ ellipseLeaf(stemX-3,19,4,2,"#70e69a",-1); }
  else { ellipseLeaf(stemX+3,21,4,2,"#70e69a",1); }
});

// Kelopak bunga dengan lingkaran karakter yang berlapis.
flowerSpecs.forEach((f,idx)=>{
  for(let y=-5;y<=5;y++) for(let x=-7;x<=7;x++){
    const d=Math.sqrt((x*x)/1.35+y*y);
    if(d>2.0 && d<5.35){
      const edge=(Math.sin(Math.atan2(y,x)*5)+1)/2;
      if(edge>.10) put(f.x+x,f.y+y,["✿","*","+","✧"][Math.abs(x+y+idx)%4],f.c);
    }
  }
  for(let y=-1;y<=1;y++) for(let x=-2;x<=2;x++){
    if(x*x+y*y<=3) put(f.x+x,f.y+y,"●",f.center);
  }
});

// Kertas pembungkus berbentuk kerucut dan pita.
for(let y=22;y<=30;y++){
  const half=3+Math.floor((y-22)*.72);
  for(let x=25-half;x<=25+half;x++){
    const edge=(x===25-half||x===25+half);
    if(edge || (y%2===0 && (x+y)%4===0)) put(x,y,edge?"╱":"·","#e9d7df");
  }
}
line(19,25,31,25,"━","#ff8dbd");
put(18,25,"◀","#ff8dbd"); put(32,25,"▶","#ff8dbd");
line(25,26,22,30,"╲","#f6a2c8"); line(25,26,28,30,"╱","#f6a2c8");
line(25,30,25,33,"│","#65dc91");
for(let x=23;x<=27;x++) put(x,31,"·","#65dc91");
put(24,33,"✦","#f6a2c8"); put(26,33,"✦","#f6a2c8");

const rows = grid.map(row=>row.map(cell=>cell || {ch:" ",color:"transparent"}));
let timer = null;
function stopAnimation(){ if(timer){clearTimeout(timer);timer=null;} }
function renderInstant(){
  stopAnimation();
  bouquet.innerHTML = rows.map(row=>row.map(c=>`<span class="char show" style="color:${c.color}">${c.ch}</span>`).join("")).join("\n");
}
function bloom(){
  stopAnimation();
  bouquet.innerHTML="";
  statusText.textContent="A little flower magic is unfolding…";
  let rowIndex=0;
  function nextRow(){
    if(rowIndex>=H){statusText.textContent="A bouquet, made just for you. ♥";timer=null;return;}
    const row=document.createElement("span");
    row.className="art-row";
    row.innerHTML=rows[rowIndex].map(c=>`<span class="char" style="color:${c.color}">${c.ch}</span>`).join("");
    bouquet.appendChild(row);
    // Animasi per baris agar tetap ringan di layar ponsel.
    requestAnimationFrame(()=>row.querySelectorAll(".char").forEach((el,i)=>setTimeout(()=>el.classList.add("show"),i*3)));
    bouquet.appendChild(document.createTextNode("\n"));
    rowIndex++;
    timer=setTimeout(nextRow,95);
  }
  nextRow();
}
startBtn.addEventListener("click",bloom);
replayBtn.addEventListener("click",bloom);
renderInstant();
setTimeout(bloom,500);


const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

// Fungsi untuk tombol Play / Pause
function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicBtn.innerText = "🎵 Putar Musik";
    isPlaying = false;
  } else {
    music.play();
    musicBtn.innerText = "⏸️ Jeda Musik";
    isPlaying = true;
  }
}

// Otomatis memutar musik saat pengunjung pertama kali klik di mana saja pada halaman
document.body.addEventListener("click", function () {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      if (musicBtn) musicBtn.innerText = "⏸️ Jeda Musik";
    }).catch(err => console.log("Menunggu interaksi user:", err));
  }
}, { once: true });