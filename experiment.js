// let forestSlide = document.querySelector(".forest");

// window.addEventListener("scroll",()=>{
//     console.log(forestExp);
// })  ONE WAY OF DOING IT BUT IT IS NOT THAT GOOD AS IT INVOKES FUNCTION MANY TIMES

// window.addEventListener("scroll", ()=>{
//     console.log(window.innerHeight);
//     console.log(forestExp.getBoundingClientRect().top);
// })

// WE CAN DO IT THIS WAY ALSO IF YOU DO NOT WANT TO USE ANY EXTERNAL LIBRARY

// ---------------USING OBSERVER--------------

// let options = {
//     threshold: 0.9
// }

// let Observer = new IntersectionObserver(fun,options);

// function fun(entries){
//     entries.forEach(entry=>{console.log(entry)})
// }

// Observer.observe(forestSlide);


// ======USING EXTERNAL LIBRARY {SCROLLMAGIC}=========

// <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
// <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>

// scrollmagic uses external scripts to work so you can daa them at the bottom to work

const controller = new ScrollMagic.Controller();

const exploreScene = new ScrollMagic.Scene({
    triggerElement: '.fashion',
    triggerHook: 0.1
})
.addIndicators()
.addTo(controller);