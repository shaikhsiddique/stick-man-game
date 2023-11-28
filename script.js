
const hero=document.querySelector('.hero');
const monster=document.querySelector('.monster');
const monster2=document.querySelector('.monster2');
const game_over=document.querySelector('.game-over');
const pause=document.querySelector('.pause');
const stone=document.querySelector('.stone');
let num=0,m=0,gameover=false,stonetime=2000;
let score=0;
const gameoveraudio=new Audio("gameover.mp3");
const background_music=new Audio("music.mp3");
const moveaudio=new Audio("move.mp3");
const play=(audio)=>{
    if(game_over==true){
    return 0;
    }
    audio.play();
}

document.onkeydown=(e)=>{
    if(e.keyCode===77){
        if(m===0){
            background_music.pause();
            m=1;
        }
        else{
            background_music.play();
            m=0;
        }
    }
    if(e.keyCode===37){
        dx=parseInt(window.getComputedStyle(hero,null).getPropertyValue('left'));
        if(dx<40){
            return 0;
        }
        hero.style.left= dx- 30 + 'px';
        
        moveaudio.play();
    }
    if(e.keyCode===39){
        if(dx>1220){
            return 0;
        }
        dx=parseInt(window.getComputedStyle(hero,null).getPropertyValue('left'));
        hero.style.left= dx+ 50 + 'px';
        moveaudio.play();
    }
    if(e.keyCode===38){
        console.log('jump');
        hero.classList.add('jump');
        setTimeout(()=>{hero.classList.remove('jump')},800)
        moveaudio.play();
    }
    if(e.keyCode===13||e.keyCode===32){
        if(num===0){
        pause.style.visibility = 'visible';
        monster.classList.remove('monster-move');
        num=1;
        background_music.pause();
        }
        else{
            pause.style.visibility = 'hidden';
            monster.classList.add('monster-move');
            num=0;
            background_music.play();
        }
        
    }
   console.log(e.keyCode)
   
}
 play(background_music);

setInterval(()=>{
   
    dx=parseInt(window.getComputedStyle(hero,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(hero,null).getPropertyValue('top'));
    mx=parseInt(window.getComputedStyle(monster,null).getPropertyValue('left'));
    my=parseInt(window.getComputedStyle(monster,null).getPropertyValue('top'));
    mx2=parseInt(window.getComputedStyle(monster2,null).getPropertyValue('left'));
    my2=parseInt(window.getComputedStyle(monster2,null).getPropertyValue('top'));
    sx=parseInt(window.getComputedStyle(stone,null).getPropertyValue('left'));
    sy=parseInt(window.getComputedStyle(stone,null).getPropertyValue('top'));



    offsetx=Math.abs(dx-mx);
    offsety=Math.abs(dy-my);
    offsetx2=Math.abs(dx-mx2);
    offsety2=Math.abs(dy-my2);

    offsetstonex=Math.abs(dx-sx);
    offsetstoney=Math.abs(dy-sy);




    if(offsetx<40 && offsety<30 || offsetstonex<30 && offsetstoney<20 || score>30 && offsetx2<40 &&offsety2<30){
       background_music.pause(); 
        play(gameoveraudio);
        console.log('game-over')
        monster.classList.remove('monster-move');
        monster2.classList.remove('monster-move');
        stone.classList.remove('stone');
        game_over.style.visibility = 'visible';
        score=0;
        gameover=true;
        
    document.onkeydown=(e)=>
    {
        if(e.keyCode===13||e.keyCode===32){
            location.reload();
        }
    }
    

    }
    else if(offsetx<40 && offsety>30 || offsetx2<40 &&offsety2>30 ){
        score++;
        setTimeout(()=>{
            anidur=parseFloat(window.getComputedStyle(monster,null).getPropertyValue('animation-duration'));
            newdur=anidur-0.1;
            monster.style.animationDuration=newdur+'s';
            newdur=anidur;
            monster2.style.animationDuration=newdur+'s';
           
         
        },1000)
    
    
    }
    if(score>30){
        
        monster2.style.visibility='visible'
        monster2.classList.add('monster-move');
        
    }
    
    
    document.querySelector('.score').innerHTML=`<p>Score: ${score}</p>`;

},100)

setInterval(()=>{
    stonex=parseInt(Math.random()*Math.random()*1500);
    stone.style.left=stonex+'px'; 

},2000)