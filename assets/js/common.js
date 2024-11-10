gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

$(window).on("load", function () {
  setTimeout(function () {
      const target = document.querySelectorAll(".js-io");
      const targetArray = Array.prototype.slice.call(target);
      const options = {
      root: null,
      rootMargin: "0% 0% -20% 0%",
      threshold: 0,
      };
      const observer = new IntersectionObserver(callback, options);
      targetArray.forEach((tgt) => {
      observer.observe(tgt);
      });

      function callback(entries) {
      entries.forEach(function (entry, i) {
          const target = entry.target;

          if (entry.isIntersecting && !target.classList.contains("_show")) {
          const delay = i * 100;
          setTimeout(function () {
              target.classList.add("_show");
          }, delay);
          }
      });
      }
  }, 400);
});

$(document).ready(function() {
  var browserWidth = $(window).width();

  if(browserWidth > '768') {
      gsap.utils.toArray('.js-plx').forEach(el => {
          const speed = el.getAttribute('data-plx-speed') * 10;
          gsap.set(el,{
              y: speed,
          });
      
          gsap.to(el,{
              y: -1 * speed,
              scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              scrub: 0.1,
              }
          })
      });
  }

  // loading
  const body = $("body");

  if (body.hasClass("front-page")) {

    $("body").addClass("is-loading");
    
    var imgLoad = imagesLoaded("body");
    
    var progressCnt = $(".c-preloader__progress .progress"),
     images = $("img").length,
     loadedCount = 0,
     loadingProgress = 0,
     loadingBar = $('.loading-bar span'),
     tlProgress = gsap.timeline();
    
    imgLoad.on("progress", function (instance, image) {
     loadProgress();
    });
    
    function loadProgress() {
     loadedCount++;
     loadingProgress = loadedCount / images;
    
     gsap.to(tlProgress, { progress: loadingProgress, duration: 1 });
    }
    
    var tlProgress = gsap.timeline({
     paused: true,
     onUpdate: countPercent,
     onComplete: loadComplete,
    });
    
    tlProgress.to(progressCnt, { width: "100%", duration: 1 });
    
    function countPercent() {
      var newPercent = (tlProgress.progress() * 100).toFixed();
      progressCnt.text(newPercent);
      loadingBar.css('width', newPercent + '%');
    }
    
    function loadComplete() {
      setTimeout(() => {
        $(".loading").addClass('hidden');
        setTimeout(() => {
          $('body').removeClass('is-loading');
          setTimeout(() => {
            $('.sec-fv-main-txt h2 span').addClass('_show');
            setTimeout(() => {
              $('.sec-fv-main-logo__wrap').addClass('_show');
              setTimeout(() => {
                $('.sec-fv-top-deco img').addClass('_show');
                setTimeout(() => {
                  $('.sec-fv-bottom-deco img').addClass('_show');
                  setTimeout(() => {
                    $('.header').addClass('loaded');
                    $('.scroll-down__wrap').addClass('_show');
                  }, 500);
                }, 200);
              }, 300);
            }, 800);
          }, 500);
        }, 200);
      }, 900);
    }
  } else {
    $('body').addClass('loaded');
    $('main').addClass('loaded');
  }
});


var case_swiper = new Swiper(".sec-news-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed:500,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024:{
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  }
});

$('.slide-navi-btns__left').click(function() {
  $('.swiper-button-prev').click();
});

$('.slide-navi-btns__right').click(function() {
  $('.swiper-button-next').click();
});