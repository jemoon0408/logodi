var projectRootURL = new URL("../", document.currentScript.src);

function getProjectIcon(fileName) {
  var iconURL = new URL("img/icons/" + fileName, projectRootURL).href;
  return '<img src="' + iconURL + '" alt="">';
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.documentElement.classList.add("kbd-nav");
    }
  });

  document.addEventListener("mousedown", function () {
    document.documentElement.classList.remove("kbd-nav");
  });


  document.addEventListener("mousedown", function (e) {
    var target = e.target.closest(
      "a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );

    if (target && document.activeElement !== target) {
      target.focus({ preventScroll: true });
    }
  });

  document.addEventListener("click", function (e) {
    var placeholder = e.target.closest('a[href="#"]');

    if (placeholder) {
      e.preventDefault();
    }
  });

  /* 본문 바로가기 - 해당 영역으로 스크롤 이동 후 focus */
  var skipLink = document.querySelector(".skip-link");

  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();

      var target = document.querySelector(
        skipLink.getAttribute("href")
      );

      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  }

  /* 모바일 GNB 토글 */
  var menuToggle = document.querySelector(".menu-toggle");
  var gnb = document.querySelector(".gnb");

  if (menuToggle && gnb) {
    menuToggle.addEventListener("click", function () {
      var isOpen = gnb.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });
  }

  /* 퀵메뉴 접기/펼치기 */
  var quickMenu = document.querySelector(".quick-menu");
  var quickMenuToggle = document.querySelector(".quick-menu-toggle");

  if (quickMenu && quickMenuToggle) {
    var quickMenuToggleText = quickMenuToggle.querySelector(
      ".quick-menu-toggle-text"
    );

    quickMenuToggle.addEventListener("click", function () {
      var isCollapsed = quickMenu.classList.toggle("is-collapsed");

      quickMenuToggle.setAttribute(
        "aria-expanded",
        isCollapsed ? "false" : "true"
      );

      if (quickMenuToggleText) {
        quickMenuToggleText.textContent = isCollapsed
          ? "펼치기"
          : "접기";
      }
    });
  }

  /* 입교안내 · 교육훈련일정 · 공고 탭 전환 */
  var noticeTabs = document.querySelectorAll(".notice-tab");
  var noticePanels = document.querySelectorAll(".notice-panel");

  noticeTabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      var target = tab.getAttribute("data-tab");

      noticeTabs.forEach(function (t) {
        var isActive = t === tab;

        t.classList.toggle("is-active", isActive);
        t.setAttribute(
          "aria-selected",
          isActive ? "true" : "false"
        );
      });

      noticePanels.forEach(function (panel) {
        panel.hidden =
          panel.getAttribute("data-panel") !== target;
      });
    });
  });

  /* POPUP ZONE Swiper */
  var popupSwiperEl = document.querySelector(".popup-swiper");

  if (popupSwiperEl && window.Swiper) {
    var pad2 = function (n) {
      return String(n).padStart(2, "0");
    };

    var popupSwiper = new Swiper(popupSwiperEl, {
      loop: true,
      watchSlidesProgress: true,
      spaceBetween: 16,
      slidesPerView: 2,
      slidesPerGroup: 2,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },

      pagination: {
        el: ".popup-zone .page",
        type: "fraction",
        formatFractionCurrent: pad2,
        formatFractionTotal: pad2
      },

      navigation: {
        prevEl: ".popup-zone .zone-prev",
        nextEl: ".popup-zone .zone-next"
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1
        },
        381: {
          slidesPerView: 2,
          slidesPerGroup: 2
        }
      }
    });

    var updatePopupSlidesFocusable = function () {
      popupSwiperEl
        .querySelectorAll(".swiper-slide")
        .forEach(function (slide) {
          var link = slide.querySelector("a");

          if (!link) {
            return;
          }

          if (slide.classList.contains("swiper-slide-visible")) {
            link.removeAttribute("tabindex");
            link.removeAttribute("aria-hidden");
          } else {
            link.setAttribute("tabindex", "-1");
            link.setAttribute("aria-hidden", "true");
          }
        });
    };

    updatePopupSlidesFocusable();
    popupSwiper.on(
      "slideChangeTransitionEnd",
      updatePopupSlidesFocusable
    );
    popupSwiper.on("breakpoint", updatePopupSlidesFocusable);

    var playBtn = document.querySelector(
      ".popup-zone .zone-play"
    );
    var playing = true;

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (playing) {
          popupSwiper.autoplay.stop();

          playBtn.innerHTML = getProjectIcon("swiper-play.png");
          playBtn.setAttribute(
            "aria-label",
            "슬라이드 재생"
          );
        } else {
          popupSwiper.autoplay.start();

          playBtn.innerHTML = getProjectIcon("swiper-pause.png");
          playBtn.setAttribute(
            "aria-label",
            "슬라이드 일시정지"
          );
        }

        playing = !playing;
      });
    }
  }

  /* 배너모음 Swiper */
  var bannerSwiperEl = document.querySelector(
    ".banner-swiper"
  );

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

    var bannerPlayBtn =
      document.querySelector(".banner-play");
    var bannerPlaying = true;

    if (bannerPlayBtn) {
      bannerPlayBtn.addEventListener("click", function () {
        if (bannerPlaying) {
          bannerSwiper.autoplay.stop();

          bannerPlayBtn.innerHTML = getProjectIcon("banner-play.png");
          bannerPlayBtn.setAttribute(
            "aria-label",
            "배너 재생"
          );
        } else {
          bannerSwiper.autoplay.start();

          bannerPlayBtn.innerHTML = getProjectIcon("banner-pause.png");
          bannerPlayBtn.setAttribute(
            "aria-label",
            "배너 일시정지"
          );
        }

        bannerPlaying = !bannerPlaying;
      });
    }
  }

  /* 새소식 모바일 스와이퍼 */
  var newsSwiperEl = document.querySelector(".news-swiper");

  if (newsSwiperEl && window.Swiper) {
    var newsPad2 = function (n) {
      return String(n).padStart(2, "0");
    };

    var newsSwiper = new Swiper(newsSwiperEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 2,

      breakpoints: {
        0: {
          slidesPerView: 1
        },
        481: {
          slidesPerView: 2
        }
      },

      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },

      pagination: {
        el: ".news .page",
        type: "fraction",
        formatFractionCurrent: newsPad2,
        formatFractionTotal: newsPad2
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

          newsPlayBtn.innerHTML = getProjectIcon("swiper-play.png");
          newsPlayBtn.setAttribute("aria-label", "소식 재생");
        } else {
          newsSwiper.autoplay.start();

          newsPlayBtn.innerHTML = getProjectIcon("swiper-pause.png");
          newsPlayBtn.setAttribute("aria-label", "소식 일시정지");
        }

        newsPlaying = !newsPlaying;
      });
    }

    window.addEventListener("resize", function () {
      newsSwiper.update();
    });
  }

  /*
   * 홍보마당 영상
   * 박스 안에서 바로 재생
   * 전체화면은 유튜브 플레이어 자체 버튼 사용
   */
  var promoVideoBox =
    document.querySelector(".promo-video");
  var promoVideoTrigger =
    document.querySelector(".promo-video-trigger");

  if (promoVideoBox && promoVideoTrigger) {
    var promoVideoMedia =
      promoVideoBox.querySelector(".promo-video-media");
    var youtubeId =
      promoVideoTrigger.getAttribute("data-youtube-id");

    if (youtubeId) {
      promoVideoTrigger.style.backgroundImage =
        "url('https://img.youtube.com/vi/" +
        youtubeId +
        "/hqdefault.jpg')";
    }

    promoVideoTrigger.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        if (
          !youtubeId ||
          promoVideoBox.classList.contains("is-playing")
        ) {
          return;
        }

        promoVideoMedia.innerHTML =
          '<iframe src="https://www.youtube.com/embed/' +
          youtubeId +
          '?autoplay=1&rel=0"' +
          ' title="지방자치인재개발원 홍보영상"' +
          ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen"' +
          " allowfullscreen></iframe>";

        promoVideoBox.classList.add("is-playing");
      }
    );
  }

  /* 맨 위로 이동 : js/include.js 에서 공통 처리 */
});