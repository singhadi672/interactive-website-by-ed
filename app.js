function addSlideScene(){
    let controller = new ScrollMagic.Controller();
    let slides = document.querySelectorAll(".slide");
    let logo = document.querySelector("#logo");
    let pageScene;
    slides.forEach((slide,index,slides)=>{
        let revealImg = slide.querySelector('#reveal-img');
        let img = slide.querySelector('img');
        let revealText = slide.querySelector('#reveal-text');
        // gsap
        const slideT1 = gsap.timeline({
            defaults:{duration:1,ease:'power2.inOut'}
        })
        
        slideT1.fromTo(revealImg,{x:"0%"},{x:"100%"});
        slideT1.fromTo(img,{scale:2},{scale:1},'-=1');
        slideT1.fromTo(revealText,{x:"0%"},{x:"100%"},'-=0.75');

        let slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook:0.25,
            reverse:false
            
        }).addTo(controller).setTween(slideT1);

        let nextSlide = slides.length-1===index?'next':slides[index+1];
        const pageT1 = gsap.timeline();
        pageT1.fromTo(nextSlide,{y:'0%'},{y:'50%'})
        pageT1.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0.5});
        pageT1.fromTo(nextSlide,{y:'50%'},{y:'0%'})

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration:'100%',
            triggerHook:0
        }).setTween(pageT1).setPin(slide,{pushFollowers:false}).addTo(controller);
    });
}

function cursor(e){
    let cursor = document.querySelector('.cursor');
    cursor.style.top = e.pageY +'px';
    cursor.style.left = e.pageX +'px';
}

function activeCursor(e){
    let cursor = document.querySelector('.cursor');
    let cursorText = document.querySelector('.cursor-text');
    console.log(e.target);
    if(e.target.id==='logo-burger'||e.target.id==='logo'){
        cursor.classList.add('cursor-active');
    }else{
        cursor.classList.remove('cursor-active');
    }

    if(e.target.classList.contains('explore')){
        cursor.classList.add('explore-active');
        cursorText.innerHTML='Tap';

    }
    else{
        cursor.classList.remove('explore-active');
        cursorText.innerHTML = "";
    }
}

window.addEventListener("mousemove",cursor);
window.addEventListener("mouseover",activeCursor);

let burger = document.querySelector('#logo-burger');
burger.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('active')){
        e.target.classList.add('active');
        gsap.to('#line1',0.5,{rotate:45,y:5,background:"black"});
        gsap.to('#logo',0.5,{color:"black"});
        gsap.to('#line2',0.5,{rotate:-45,y:-5,background:"black"});
        gsap.to('.nav-bar',1,{clipPath: 'circle(2500px at 50% -10%)'});
        document.body.classList.add('hide');
    }else{
        e.target.classList.remove('active');
        gsap.to('#line1',0.5,{rotate:0,y:0,background:"white"})
        gsap.to('#logo',0.5,{color:"white"})
        gsap.to('#line2',0.5,{rotate:0,y:0,background:"white"})
        gsap.to('.nav-bar',0.8,{clipPath: 'circle(50px at 50% -10%)'})
        document.body.classList.remove('hide');
    }
})

barba.init({
    views:[
        {
            namespace:'home',
            beforeEnter(){
                addSlideScene();
                logo.href = "./index.html";
            },
            beforeLeave(){
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            }
        },
        {
            namespace:'fashion',
            beforeEnter(){
                logo.href = "../index.html";
            }
        }
    ],

    transitions:[
        {
            leave({current,next}){
                let done = this.async();
                const t1 = gsap.timeline({defaults:{ease:"power2.inOut"}});
                t1.fromTo(current.container,0.75,{opacity:1},{opacity:0});
                t1.fromTo('.swipe',0.5,{x:'-100%'},{x:'0%',onComplete:done},)
            },
            enter({current,next}){
                let done = this.async();
                window.scrollTo(0,0);
                const t1 = gsap.timeline({defaults:{ease:"power2.inOut"}});
                t1.fromTo('.swipe',0.5,{x:'0%'},{x:'100%',stagger:0.25,onComplete:done})
                t1.fromTo(next.container,0.75,{opacity:0},{opacity:1})
            }
        }

    ]
})

