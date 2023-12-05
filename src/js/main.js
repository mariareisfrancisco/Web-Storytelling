import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
  let container = document.querySelector(".slider-track");

  let slider = gsap.to(".slider-track", {
    scrollTrigger: {
      trigger: ".horizontal-scroll",
      start: "top top", // Change the start point to better align with the top of the trigger
      end: "+=400%", // Change to a more specific distance for horizontal scroll
      pin: true,
      scrub: true,
      toggleActions: "play none none reverse",
    },
    //   x: -window.innerWidth * 0.75, // Adjust the horizontal scroll amount
    x: () =>
      -(container.scrollWidth - document.documentElement.clientWidth) -
      parseInt(window.getComputedStyle(container).marginLeft) -
      parseInt(window.getComputedStyle(container).marginRight) +
      "px",
    ease: "sine.inOut",
  });

  window.addEventListener("resize", () => {
    let progress = slider.totalProgress();
    slider.progress(0);
    slider.invalidate();
    slider.totalProgress(progress);
  });

  if (document.querySelector(".front-page")) {
    // Si on est sur la homepage

    var introScroll; // On déclare une variable commune aux deux animations

    setTimeout(function () {
      // On crée un délai de 5 ms
      if (window.scrollY === 0) {
        // Si la scrollbar n'est pas tout en haut (nombre de pixels scrollés ≠ 0)
        //scroll to 400 pixels down from the top
        introScroll = gsap.to(window, {
          delay: 2,
          duration: 5,
          scrollTo: { y: "#center", offsetY: 20 },
        });
      }
    }, 5); // 5 ms

    document.querySelector(".start-link").addEventListener("click", () => {
      document.querySelector("audio").play();
      introScroll = gsap.to(window, {
        duration: 7,
        scrollTo: { y: "#ticket", offsetY: -950 },
      });
    });

    document.addEventListener("wheel", function () {
      introScroll.kill(); // On annule l'animation
    });
  }
  gsap.from(".start-link", {
    opacity: 0,
  });

  gsap.to(".start-link", {
    opacity: 1,
  });
});
