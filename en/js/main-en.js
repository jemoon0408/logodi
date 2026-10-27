(function () {
  "use strict";

  var ICON_PATH = "../img/icons/";

  /* 모바일 메뉴 토글 */
  var header = document.querySelector(".en-header");
  var menuToggle = document.querySelector(".en-menu-toggle");

  if (header && menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  /* LOGODI News 모바일 스와이퍼 */
  var newsSwiperEl = document.querySelector(".en-news-swiper");

  if (newsSwiperEl && window.Swiper) {
    var pad2 = function (n) {
      return String(n).padStart(2, "0");
    };

    var newsSwiper = new Swiper(newsSwiperEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },

      pagination: {
        el: ".en-news-ctrl .page",
        type: "fraction",
        formatFractionCurrent: pad2,
        formatFractionTotal: pad2,
        renderFraction: function (currentClass, totalClass) {
          return '<b class="' + currentClass + '"></b> / <span class="' + totalClass + '"></span>';
        }
      },

      navigation: {
        prevEl: ".news-prev",
        nextEl: ".news-next"
      }
    });

    var newsPlayBtn = document.querySelector(".news-play");
    var newsPlaying = true;

    if (newsPlayBtn) {
      newsPlayBtn.addEventListener("click", function () {
        if (newsPlaying) {
          newsSwiper.autoplay.stop();
          newsPlayBtn.innerHTML = '<img src="' + ICON_PATH + 'swiper-play.png" alt="">';
          newsPlayBtn.setAttribute("aria-label", "Play news");
        } else {
          newsSwiper.autoplay.start();
          newsPlayBtn.innerHTML = '<img src="' + ICON_PATH + 'swiper-pause.png" alt="">';
          newsPlayBtn.setAttribute("aria-label", "Pause news");
        }

        newsPlaying = !newsPlaying;
      });
    }
  }

  /* 배너 롤링 : 국문 배너모음과 동일 */
  var bannerSwiperEl = document.querySelector(".en-banner-swiper");

  if (bannerSwiperEl && window.Swiper) {
    var bannerSwiper = new Swiper(bannerSwiperEl, {
      loop: true,
      spaceBetween: 40,
      slidesPerView: "auto",

      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },

      navigation: {
        prevEl: ".banner-prev",
        nextEl: ".banner-next"
      }
    });

    var bannerPlayBtn = document.querySelector(".banner-play");
    var bannerPlaying = true;

    if (bannerPlayBtn) {
      bannerPlayBtn.addEventListener("click", function () {
        if (bannerPlaying) {
          bannerSwiper.autoplay.stop();
          bannerPlayBtn.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i>';
          bannerPlayBtn.setAttribute("aria-label", "Play banner");
        } else {
          bannerSwiper.autoplay.start();
          bannerPlayBtn.innerHTML = '<i class="fa-solid fa-pause" aria-hidden="true"></i>';
          bannerPlayBtn.setAttribute("aria-label", "Pause banner");
        }

        bannerPlaying = !bannerPlaying;
      });
    }
  }

  /* Media Center 영상 : 박스 안에서 바로 재생 */
  var videoBox = document.querySelector(".en-video");
  var videoTrigger = document.querySelector(".en-video-trigger");

  if (videoBox && videoTrigger) {
    var videoMedia = videoBox.querySelector(".en-video-media");
    var youtubeId = videoTrigger.getAttribute("data-youtube-id");

    videoTrigger.addEventListener("click", function (e) {
      e.preventDefault();

      if (!youtubeId || videoBox.classList.contains("is-playing")) {
        return;
      }

      videoMedia.innerHTML =
        '<iframe src="https://www.youtube.com/embed/' +
        youtubeId +
        '?autoplay=1&rel=0"' +
        ' title="LOGODI promotional video"' +
        ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen"' +
        " allowfullscreen></iframe>";

      videoBox.classList.add("is-playing");
    });
  }

  /* 맨 위로 이동 */
  var topBtn = document.querySelector(".en-top-btn");

  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });

      var main = document.getElementById("main-content");
      if (main) {
        main.focus({ preventScroll: true });
      }
    });
  }
})();
