import {Game} from "./game.js";
const canvas=document.getElementById("game");
const game=new Game(canvas);
const $=id=>document.getElementById(id);

function start(load=false){$("menu").classList.add("hidden");$("hud").classList.remove("hidden");$("mobile").classList.toggle("hidden",innerWidth>800);game.start(load)}
document.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{
  const a=b.dataset.action;
  if(a==="new")start(false);
  if(a==="continue")start(true);
  if(a==="controls")alert("A/D or arrows: move · Space/W: jump · J: sword · K: magic · E: interact · I: inventory · Esc: pause");
  if(a==="resume"){game.state="playing";$("pause").classList.add("hidden")}
  if(a==="save"){game.save();game.toast("Game saved.")}
  if(a==="menu"){location.reload()}
  if(a==="closeInventory"){$("inventory").classList.add("hidden");game.state="playing"}
  if(a==="respawn"){$("death").classList.add("hidden");game.respawn();$("hud").classList.remove("hidden")}
}));
const keys={}; addEventListener("keydown",e=>{keys[e.code]=true;if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault();if(e.code==="KeyI"&&!e.repeat)game.toggleInventory();if(e.code==="Escape"&&!e.repeat)game.togglePause();if(e.code==="Enter"&&!e.repeat)game.advanceDialog()}); addEventListener("keyup",e=>keys[e.code]=false);
document.querySelectorAll("#mobile [data-key]").forEach(b=>{b.onpointerdown=()=>keys[b.dataset.key]=true;b.onpointerup=()=>keys[b.dataset.key]=false;b.onpointercancel=()=>keys[b.dataset.key]=false});
game.keys=keys; game.ui={$};
game.loop();