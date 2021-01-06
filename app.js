function addSlideScene(){
    let controller = new ScrollMagic.Controller();
    let slides = document.querySelectorAll(".slide");
    let pageScene;
    slides.forEach((slide,index,slides)=>{
        let revealImg = slide.querySelector('#reveal-img');
        let img = slide.querySelector('img');
        let revealText = slide.querySelector('#reveal-text');
        //gsap
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
            
        }).addTo(controller).addIndicators({name:"slide"}).setTween(slideT1);

        let nextSlide = slides.length-1===index?'next':slides[index+1];
        const pageT1 = gsap.timeline();
        pageT1.fromTo(nextSlide,{y:'0%'},{y:'50%'})
        pageT1.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0.5});
        pageT1.fromTo(nextSlide,{y:'50%'},{y:'0%'})

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration:'100%',
            triggerHook:0
        }).addIndicators({indent:200,name:"page",colorStart:"white"}).setTween(pageT1).setPin(slide,{pushFollowers:false}).addTo(controller);
    });
}

addSlideScene();