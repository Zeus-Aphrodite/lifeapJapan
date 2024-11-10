// ハンバーガーメニュー

if ($(window).width() <= 768) {
  $('.__cat-ttl').click(function() {
    const answer = $(this).parent('.__sade-cat').children('.__cat-body');
    const icon = $(this).parents('.__sade-cat').children('.__item-collapse__mark');
    if (answer.css('max-height') === '0px') {
      answer.css('max-height', answer.prop('scrollHeight') + 'px');
      answer.css('padding-top', '16px');
      icon.addClass('open');
    } else {
      answer.css('max-height', '0');
      answer.css('padding-top', '0');
      icon.removeClass('open');
    }
  });
}


$(function() {
  $(".hamburger-menu-icon-wrap").click(function(){
    $('.hamburger-menu-line').toggleClass('open'); 
    $('.hamburger-menu').toggleClass('no-display');

    if ($('.hamburger-menu-line').hasClass('open')) {
      bodyFixedOn();
      $('.header-search-wrap').toggleClass('hidden');
    }
    else {
      bodyFixedOff();
      $('.header-search-wrap').toggleClass('hidden');
    }
  });
});

$(function() {
  $('.modal-close').click(function() {
    $('.hamburger-menu-line').removeClass('open');
    $('.hamburger-menu').addClass('no-display');
    $('.header-search-menu-wrap').addClass('no-display');
    $('.header-menu-wrap').removeClass('no-display');
    $('.modal-mask').addClass('no-display');
    bodyFixedOff();
  });
});


$(function() {
  $(".open-modal-btn").click(function(){
    $('.header-search-menu-wrap').toggleClass('no-display');
    $('.hamburger-menu').toggleClass('hidden');
    $('.hamburger-menu').removeClass('no-display');
    
    if (!$('.header-search-menu-wrap').hasClass('no-display')) {
      bodyFixedOn();
      $('.header-menu-wrap').addClass('no-display');
      $('.modal-mask').removeClass('no-display');
    }
    else {
      bodyFixedOff();
      $('.header-menu-wrap').removeClass('no-display');
      $('.modal-mask').addClass('no-display');
    }
  });
});



$(document).ready(function() {
  // Initialize the slider
  $('.__main-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Autoscroll every second
    responsive: [
        {
            breakpoint: 768,  // At 768px or greater
            settings: {
                slidesToShow: 2,  // Show only one slide
                slidesToScroll: 1  // Ensure scrolling only one slide
            }
        }
    ]
  });



  // Custom next button for Slick slider
  $('.__slider-next').on('click', function(e) {
      e.preventDefault();  // Prevent the default anchor click behavior
      $('.__main-slider').slick('slickNext');  // Move to the next slide
  });
  // Custom next button for Slick slider
  $('.__slider-before').on('click', function(e) {
    e.preventDefault();  // Prevent the default anchor click behavior
    $('.__main-slider').slick('slickPrev');  // Move to the previous slide
  });



  

});


$(document).ready(function() {
  function initSlick() {
      if ($(window).width() <= 768 && !$('.badge-slider').hasClass('slick-initialized')) {
          $('.badge-slider').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              autoplay: true,
              autoplaySpeed: 1000 // Autoscroll every second
          });
      } else if ($(window).width() > 768 && $('.badge-slider').hasClass('slick-initialized')) {
          $('.badge-slider').slick('unslick');
      }
  }

  // Initialize or destroy Slick based on the window size
  initSlick();
  
  // Recheck on window resize
  $(window).resize(initSlick);



  
}); 

document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 3;  // Display 3 items per page
  const newsItems = document.querySelectorAll(".__news-nav");
  const totalItems = newsItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = 1;

  function showPage(page) {
      newsItems.forEach((item, index) => {
          item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'block' : 'none';
      });
      updatePaginationControls();
  }

  function updatePaginationControls() {
      const pageNumbers = document.querySelector(".page-numbers");
      pageNumbers.innerHTML = "";
      
      for (let i = 1; i <= totalPages; i++) {
          const pageSpan = document.createElement("span");
          pageSpan.textContent = i;
          pageSpan.classList.add(i === currentPage ? "active" : "");
          pageSpan.addEventListener("click", () => {
              currentPage = i;
              showPage(currentPage);
          });
          pageNumbers.appendChild(pageSpan);
      }

      document.querySelector(".prev-page").disabled = currentPage === 1;
      document.querySelector(".next-page").disabled = currentPage === totalPages;
  }

  document.querySelector(".prev-page").addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
      }
  });

  document.querySelector(".next-page").addEventListener("click", () => {
      if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
      }
  });

  // Initialize the view to show only the first 3 items on load
  showPage(currentPage);
});
