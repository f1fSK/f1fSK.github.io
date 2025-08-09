lucide.createIcons()
const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()
const io = new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('show')), { threshold:.15 })
document.querySelectorAll('.reveal').forEach(el=>io.observe(el))
document.querySelectorAll('.work').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--x', (e.clientX - rect.left)+'px')
    card.style.setProperty('--y', (e.clientY - rect.top)+'px')
  })
})
const gate = document.getElementById('gate')
const enter = document.getElementById('enter')
const term = document.getElementById('term-code')
const lines = [
  "-- f1f.lua",
  "local function boot()",
  "  print('loading resources...')",
  "  Citizen.Wait(300)",
  "  print('opening website...')",
  "end",
  "boot()"
]
let started = false
function typeLines(idx=0, char=0){
  if(idx >= lines.length){ setTimeout(()=>document.body.classList.add('open'), 300); return }
  const line = lines[idx]
  term.textContent += line.slice(0, char) + (char ? "" : "") + (char >= line.length ? "\n" : "")
  if(char < line.length){
    setTimeout(()=>{ term.textContent = term.textContent.slice(0, -(char?0:0)); typeLines(idx, char+1) }, 18)
  } else {
    setTimeout(()=>typeLines(idx+1,0), 120)
  }
}
function startGate(){
  if(started) return
  started = true
  typeLines()
}
gate.addEventListener('click', startGate)
enter.addEventListener('click', startGate)
const c = document.getElementById('bg')
const d = c.getContext('2d')
let w, h, pr = window.devicePixelRatio||1
function resize(){
  w = c.width = innerWidth*pr
  h = c.height = innerHeight*pr
  c.style.width = innerWidth+'px'
  c.style.height = innerHeight+'px'
}
resize()
addEventListener('resize', resize)
const dots = Array.from({length: 90}, ()=>({
  x: Math.random()*w,
  y: Math.random()*h,
  vx: (Math.random()-.5)*0.2*pr,
  vy: (Math.random()-.5)*0.2*pr,
  r: Math.random()*1.8*pr+0.4*pr
}))
function tick(){
  d.clearRect(0,0,w,h)
  d.globalCompositeOperation = 'lighter'
  dots.forEach(p=>{
    p.x += p.vx
    p.y += p.vy
    if(p.x<0||p.x>w) p.vx*=-1
    if(p.y<0||p.y>h) p.vy*=-1
    d.beginPath()
    d.arc(p.x,p.y,p.r,0,Math.PI*2)
    d.fillStyle = 'rgba(124,92,255,0.08)'
    d.fill()
  })
  for(let i=0;i<dots.length;i++){
    for(let j=i+1;j<dots.length;j++){
      const a = dots[i], b = dots[j]
      const dx = a.x-b.x, dy = a.y-b.y
      const dist2 = dx*dx+dy*dy
      if(dist2<9000*pr){
        d.beginPath()
        d.moveTo(a.x,a.y)
        d.lineTo(b.x,b.y)
        d.strokeStyle = 'rgba(0,224,255,0.05)'
        d.lineWidth = 1*pr
        d.stroke()
      }
    }
  }
  requestAnimationFrame(tick)
}
tick()
