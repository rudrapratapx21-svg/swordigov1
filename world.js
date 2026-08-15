export class World{
 constructor(){this.width=9000;this.platforms=[]}
 build(){this.platforms=[];const R=(x,y,w,h,t=1)=>this.platforms.push({x,y,w,h,t});for(let x=0;x<this.width;x+=600)R(x,610,600,110);const sections=[[0,560,520],[580,500,380],[1040,540,330],[1450,450,420],[1950,520,480],[2500,440,500],[3100,520,380],[3550,410,520],[4200,500,420],[4700,430,520],[5300,530,430],[5800,450,520],[6400,390,500],[6950,510,480],[7500,420,550],[8100,500,900]];sections.forEach(a=>R(...a,2));for(let x=260;x<8500;x+=430)R(x,Math.max(260,430-Math.sin(x*.01)*80),170,24,4)}
 groundY(x){let best=610;for(const p of this.platforms)if(x>=p.x&&x<=p.x+p.w)best=Math.min(best,p.y);return best}
 draw(c,cam){const g=c.createLinearGradient(0,0,0,720);g.addColorStop(0,"#081526");g.addColorStop(.58,"#182d2b");g.addColorStop(1,"#06090d");c.fillStyle=g;c.fillRect(0,0,1280,720);
 for(let layer=0;layer<3;layer++){c.fillStyle=["#152c43","#1c3a31","#213c2d"][layer];for(let i=0;i<22;i++){let x=i*180-(cam.x*[.13,.28,.45][layer]%180);let h=100+(i%5)*34;c.beginPath();c.moveTo(x,500);c.lineTo(x+90,500-h);c.lineTo(x+180,500);c.fill()}}
 c.fillStyle="#303936";for(const p of this.platforms){const x=p.x-cam.x;if(x+p.w<0||x>1280)continue;c.fillRect(x,p.y-cam.y,p.w,p.h);c.fillStyle=p.t===4?"#69745d":"#555752";c.fillRect(x,p.y-cam.y,p.w,7);c.fillStyle="#303936"}
 const moonX=1040-cam.x*.05;c.fillStyle="#d9cfac";c.globalAlpha=.65;c.beginPath();c.arc(moonX,100,42,0,7);c.fill();c.globalAlpha=1}
 drawCoin(c,o,cam){c.fillStyle="#e1bd59";c.beginPath();c.arc(o.x-cam.x,o.y-cam.y,9+Math.sin(performance.now()/150)*2,0,7);c.fill();c.fillStyle="#fff0ad";c.fillRect(o.x-2-cam.x,o.y-5-cam.y,3,8)}
 drawChest(c,o,cam){c.fillStyle=o.open?"#46382b":"#765331";c.fillRect(o.x-cam.x,o.y-cam.y,42,30);c.fillStyle="#d6b961";c.fillRect(o.x+17-cam.x,o.y+10-cam.y,7,9)}
 drawNPC(c,n,cam){c.fillStyle="#8a6548";c.fillRect(n.x-cam.x,n.y-cam.y,30,55);c.fillStyle="#d7c19a";c.beginPath();c.arc(n.x+15-cam.x,n.y-6-cam.y,13,0,7);c.fill()}
 drawCheckpoint(c,o,cam){c.fillStyle=o.active?"#65c7d9":"#6b6671";c.fillRect(o.x-cam.x,o.y-cam.y,12,58);c.fillStyle=o.active?"#b6f2ff":"#aaa";c.beginPath();c.arc(o.x+6-cam.x,o.y-5-cam.y,13,0,7);c.fill()}
 drawProjectile(c,p,cam){c.fillStyle=p.boss?"#b23862":"#63cfff";c.shadowBlur=16;c.shadowColor=c.fillStyle;c.beginPath();c.arc(p.x-cam.x,p.y-cam.y,8,0,7);c.fill();c.shadowBlur=0}}
