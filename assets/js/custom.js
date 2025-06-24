(function ($) {
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(
      MorphSVGPlugin,
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      TextPlugin,
      SplitText
    );
  }
  // gsap code here!
  ("use strict");

  const isRTL = document.documentElement.dir === "rtl" ? true : false;
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap?.from(".faq-title", {
      scrollTrigger: {
        trigger: ".faq-area",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap?.from(".faq-item", {
      scrollTrigger: {
        trigger: ".faq-area",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.2,
    });

    // Accordion behavior with animation
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains("open");

        // Close all others
        document.querySelectorAll(".faq-answer.open").forEach((el) => {
          gsap?.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
          el.classList.remove("open");
        });

        if (!isOpen) {
          answer.classList.add("open");
          gsap?.set(answer, { height: "auto" });
          gsap?.from(answer, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });

    // Optional: Animate shapes once on load
    gsap?.to(".shape-style1", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    gsap?.to(".shape-style2", {
      x: isRTL ? -15 : 15,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });

    gsap?.to(".shape-style3", {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
    });

    // 6. Tilt effect on video (vanilla)
    const video = document.querySelector(".testimonial-area video");
    if (video) {
      video.addEventListener("mousemove", (e) => {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        gsap?.to(video, {
          rotationY: percentX * 5,
          rotationX: -percentY * 5,
          transformPerspective: 800,
          transformOrigin: "center",
          duration: 0.3,
        });
      });

      video.addEventListener("mouseleave", () => {
        gsap?.to(video, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    }
    // 3. Floating separators
    gsap?.to(".testimonial-area .separator-line img", {
      y: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    document.querySelectorAll(".separator-line").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const line = el.querySelector("#line");
          if (line) {
            gsap?.to(line, {
              duration: 1.5,
              ease: "power2.inOut",
              morphSVG: "M0,10 Q300,40 600,10",
            });
          }
        },
      });
    });

    // 5. Typing effect for title
    document.querySelectorAll(".title span").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const split = isRTL
            ? new SplitText(el, { type: "words" })
            : new SplitText(el, { type: "chars" });
          gsap?.from(split.chars, {
            opacity: 0,
            x: isRTL ? -30 : 30,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.04,
          });
        },
      });
    });

    // Pin the section and scroll horizontally through cards
    const splitTitle = isRTL
      ? new SplitText(".service-area .title", { type: "words" })
      : new SplitText(".service-area .title", { type: "chars" });
    const cards = document.querySelectorAll(".icon-box-item");

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".service-area",
          pin: true,
          scrub: true,
          snap: 1 / (cards.length - 1),
          end: "+=" + cards.length + window.innerHeight,
        },
      })
      .from(splitTitle.chars, {
        opacity: 0,
        y: 40,
        start: "top top",
        stagger: 0.1,
        ease: "power2.out",
      })
      .from(".desc", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });
    cards.forEach((card, i) => {
      tl.to(card, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      // Hide previous card
      // if (i > 0) {
      //   tl.to(
      //     cards[i - 1],
      //     {
      //       x: "-100%",
      //       opacity: 0,
      //       duration: 0.3,
      //       ease: "power1.in",
      //     },
      //     i
      //   );
      // }
    });

    // Mouse move
    const elements = document.querySelectorAll(".mouse-move");

    window.addEventListener("mousemove", (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / innerWidth;
      const offsetY = (e.clientY - innerHeight / 2) / innerHeight;

      elements.forEach((el) => {
        const strength = el.dataset.strength || 30;
        gsap?.to(el, {
          x: offsetX * strength,
          y: offsetY * strength,
          z: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Get the path
    const path = document.querySelector(".circle path");

    // Get total length of path
    const length = path?.getTotalLength();

    // Set up initial stroke-dash
    if (length) {
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
    gsap?.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: path,
        start: "top 80%", // animation starts when path hits 80% of viewport height
        end: "bottom 60%",
        scrub: true,
      },
    });

    gsap?.to(".testimonial-area .separator-line img", {
      y: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    
  }

  function animateSlide($slide) {
    if (typeof gsap !== "undefined" && gsap.registerPlugin) {
      const tl = gsap?.timeline({ defaults: { ease: "power2.out" } });
      gsap?.set($slide.find(".admi-logo-path-1"), {
        clipPath: "inset(0 100% 0 0)",
      });
      gsap?.set($slide.find(".admi-logo-path-2"), {
        clipPath: "inset(0 100% 0 0)",
      });
      tl.from($slide.find(".tittle-wrp h2"), {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          $slide.find(".subtitle-content"),
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        )
        .from(
          $slide.find("p"),
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.6"
        )
        .from(
          $slide.find("a.btn"),
          {
            opacity: 0,
            y: 100,
            duration: 0.5,
          },
          "-=1"
        )
        .from(
          $slide.find(".thumb img"),
          {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          $slide.find(".admi-logo .admi-logo-path-1"),
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.5"
        )
        .to(
          $slide.find(".admi-logo .admi-logo-path-2"),
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.5"
        );
    }
  }

  const swiper = new Swiper(".home-slider-container", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    // navigation: {
    //   nextEl: '.home-slider-container .swiper-button-next',
    //   prevEl: '.home-slider-container .swiper-button-prev',
    // },
    on: {
      afterinit: function () {
        const $firstSlide = $(".swiper-slide-active");
        animateSlide($firstSlide);
      },
      slideChangeTransitionStart: function () {
        animateSlide($(this.slides[this.activeIndex]));
      },
    },
  });

  // Preloader
  function stylePreloader() {
    $("body").addClass("preloader-deactive");
  }

  // Background Image
  $("[data-bg-img]").each(function () {
    $(this).css("background-image", "url(" + $(this).data("bg-img") + ")");
  });
  // Background Color
  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).data("bg-color"));
  });

  // Off Canvas JS
  var canvasWrapper = $(".off-canvas-wrapper");
  $(".btn-menu").on("click", function () {
    canvasWrapper.addClass("active");
    $("body").addClass("fix");
  });

  $(".close-action > .btn-close, .off-canvas-overlay").on("click", function () {
    canvasWrapper.removeClass("active");
    $("body").removeClass("fix");
  });

  //Responsive Slicknav JS
  $(".main-menu").slicknav({
    appendTo: ".res-mobile-menu",
    closeOnClick: true,
    removeClasses: true,
    closedSymbol: '<i class="icon_plus"></i>',
    openedSymbol: '<i class="icon_minus-06"></i>',
  });

  // Swipper Slider JS
  // var homeSlider = new Swiper('.home-slider-container', {
  //   slidesPerView : 1,
  //   loop: true,
  //   spaceBetween : 30,
  //   autoplay: {
  //     delay: 2500,
  //     disableOnInteraction: false,
  //   },
  //   effect: 'fade',
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   navigation: {
  //     nextEl: '.home-slider-container .swiper-button-next',
  //     prevEl: '.home-slider-container .swiper-button-prev',
  //   }
  // });

  var teamSlider = new Swiper(".team-slider-container", {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    control: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },

      992: {
        slidesPerView: 3,
      },

      768: {
        slidesPerView: 2,
        centeredSlides: false,
      },

      576: {
        slidesPerView: 1,
      },

      0: {
        slidesPerView: 1,
      },
    },
  });
  $(".team-slider-container").hover(
    function () {
      this.swiper.autoplay.stop();
    },
    function () {
      this.swiper.autoplay.start();
    }
  );

  var portfolioSlider = new Swiper(".portfolio-slider-container", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".portfolio-slider-container .swiper-button-next",
      prevEl: ".portfolio-slider-container .swiper-button-prev",
    },
    breakpoints: {
      1800: {
        slidesPerView: "auto",
        spaceBetween: 50,
      },
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
      },

      992: {
        slidesPerView: 3,
      },

      768: {
        slidesPerView: 2,
        centeredSlides: false,
      },

      576: {
        slidesPerView: 1,
      },

      0: {
        slidesPerView: 1,
      },
    },
  });

  $(".portfolio-slider-container").hover(
    function () {
      this.swiper.autoplay.stop();
    },
    function () {
      this.swiper.autoplay.start();
    }
  );

  var testimonialSlider = new Swiper(".testimonial-slider-container", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".testimonial-slider-container .swiper-button-next",
      prevEl: ".testimonial-slider-container .swiper-button-prev",
    },
    // on: {
    //   afterinit: function () {
    //     const $firstSlide = $(".swiper-slide-active");
    //     animateTestimonialSlide($firstSlide);
    //   },
    //   slideChangeTransitionStart: function () {
    //     animateTestimonialSlide($(this.slides[this.activeIndex]));
    //   },
    // },
  });

 

  // Progress Bar JS
  var skillsBar = $(".progress-bar-line");
  skillsBar.appear(function () {
    skillsBar.each(function (index, elem) {
      var elementItem = $(elem),
        skillBarAmount = elementItem.data("percent");
      elementItem.animate({ width: skillBarAmount }, 90);
      elementItem
        .closest(".progress-item")
        .find(".percent")
        .text(skillBarAmount);
      elementItem
        .closest(".progress-item")
        .find(".progress-info")
        .css("width", skillBarAmount);
    });
  });

  //Parallax Motion Animation
  $(".scene").each(function () {
    new Parallax($(this)[0]);
  });

  // Isotope and data filter
  function isotopePortfolio() {
    var $grid = $(".portfolio-grid").isotope({
      itemSelector: ".portfolio-item",
      masonry: {
        columnWidth: 1,
      },
    });
    // Isotope filter Menu
    $(".portfolio-filter-menu").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
      $gridMasonry.isotope({ filter: filterValue });
      $masonryGrid.isotope({ filter: filterValue });
      var filterMenuactive = $(".portfolio-filter-menu button");
      filterMenuactive.removeClass("active");
      $(this).addClass("active");
    });
  }

  //Video Popup
  $(".play-video-popup").fancybox();

  // Scroll Top Hide Show
  var varWindow = $(window);
  varWindow.on("scroll", function () {
    if ($(this).scrollTop() > 250) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }

    // Sticky Header
  });

  // Ajax Contact Form JS
  var form = $("#contact-form");
  var formMessages = $(".form-message");

  $(form).submit(function (e) {
    e.preventDefault();
    var formData = form.serialize();
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("alert alert-danger");
        $(formMessages).addClass("alert alert-success fade show");

        // Set the message text.
        formMessages.html(
          "<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>"
        );
        formMessages.append(response);

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("alert alert-success");
        $(formMessages).addClass("alert alert-danger fade show");

        // Set the message text.
        if (data.responseText !== "") {
          formMessages.html(
            "<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>"
          );
          formMessages.append(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occurred and your message could not be sent."
          );
        }
      });
  });

  //Counter JS
  var counterId = $(".counter-animate");
  if (counterId.length) {
    counterId.counterUp({
      delay: 10,
      time: 1000,
    });
  }

  //Tilt Animation
  $(".tilt-animation").tilt({
    base: window,
    reset: !0,
    scale: 1.04,
    reverse: !1,
    max: 15,
    perspective: 3e3,
    speed: 4e3,
  });

  //Scroll To Top
  $(".scroll-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Reveal Footer JS
  let revealId = $(".reveal-footer"),
    footerHeight = revealId.outerHeight(),
    windowWidth = $(window).width(),
    windowHeight = $(window).outerHeight();

  if (windowWidth > 991 && windowHeight > footerHeight) {
    $(".site-wrapper-reveal").css({
      "margin-bottom": footerHeight + "px",
    });
  }

  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  varWindow.on("load", function () {
    AOS.init({
      once: true,
    });
    stylePreloader();
    isotopePortfolio();
  });
})(window.jQuery);
