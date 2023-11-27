
const hero=document.querySelector('.hero');
const monster=document.querySelector('.monster');
const game_over=document.querySelector('.game-over');
const pause=document.querySelector('.pause');
let num=0,m=0;
let score=0;
const gameoveraudio=new Audio("gameover.mp3");
const background_music=new Audio("music.mp3");
const moveaudio=new Audio("move.mp3");
const play=(audio)=>{
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
        setTimeout(()=>{hero.classList.remove('jump')},1000)
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
    offsetx=Math.abs(dx-mx);
    offsety=Math.abs(dy-my);
    if(offsetx<40 && offsety<30){
       background_music.pause(); 
       play(gameoveraudio);
        console.log('game-over')
        monster.classList.remove('monster-move');
        game_over.style.visibility = 'visible';
        score=0;
    document.onkeydown=(e)=>
    {
        if(e.keyCode===13||e.keyCode===32){
            location.reload();
        }
    }

    }
    else if(offsetx<40 && offsety>30){
        score++;
        setTimeout(()=>{
            anidur=parseFloat(window.getComputedStyle(monster,null).getPropertyValue('animation-duration'));
        newdur=anidur-0.1;
         monster.style.animationDuration=newdur+'s';
        },1000)
    
    
    }
   


    document.querySelector('.score').innerHTML=`<p>Score: ${score}</p>`;
},100)

