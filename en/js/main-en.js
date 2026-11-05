(function () {
  "use strict";

  var ICON_PATH = "../img/icons/";

  /* 헤더 메가메뉴 : 국문 js/header.js 와 동일한 동작
     - PC : 1Depth hover/focus 시 풀다운, Tab 으로 하위메뉴 순회 후 다음 1Depth
     - MO : 햄버거 → 전체메뉴(좌측 1Depth / 우측 2Depth) */
  var header = document.querySelector(".en-header");
  var megaMenu = document.getElementById("enMegaMenu");
  var menuToggle = header && header.querySelector(".en-menu-toggle");

  if (header && megaMenu && menuToggle) {
    var topLinks = header.querySelectorAll(".en-gnb a[data-menu-index]");
    var panels = megaMenu.querySelectorAll("[data-menu-panel]");
    var mobileButtons = megaMenu.querySelectorAll("[data-mobile-menu-index]");
    var mobileClose = megaMenu.querySelector(".mobile-menu-close");
    var menuTitle = document.getElementById("enMegaMenuTitle");
    var desktopMedia = window.matchMedia("(min-width: 769px)");
    var selectedIndex = 0;
    var closeTimer = null;

    /* 2026-11-05 : PC 햄버거 = 사이트맵 (국문 js/header.js 와 동일)
       - 사이트맵 아닌 페이지 : 클릭 → sitemap.html
       - 사이트맵 페이지 : X 아이콘, 클릭 → 메인
       - 키보드로 누른 경우 이동한 페이지에서도 햄버거(X)에 포커스 유지 */
    var sitemapContent = document.querySelector(".sitemap-page-content");
    var sitemapLink = document.querySelector(".en-sitemap");
    var TOGGLE_FOCUS_KEY = "logodiEnMenuToggleFocus";

    var isDesktop = function () {
      return desktopMedia.matches;
    };

    var updateToggle = function () {
      var open = header.classList.contains("menu-open");
      var sitemapIsOpen = isDesktop() && !!sitemapContent;

      menuToggle.classList.toggle("is-close", sitemapIsOpen || (!isDesktop() && open));

      if (isDesktop()) {
        menuToggle.setAttribute("aria-expanded", sitemapIsOpen ? "true" : "false");
        menuToggle.setAttribute("aria-label", sitemapIsOpen ? "Close sitemap" : "Sitemap");
        menuToggle.setAttribute("aria-controls", sitemapContent ? "sitemap-page-content" : "enMegaMenu");
      } else {
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
        menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menuToggle.setAttribute("aria-controls", "enMegaMenu");
      }
    };

    var restoreToggleFocus = function () {
      var shouldFocus = false;

      try {
        shouldFocus = window.sessionStorage.getItem(TOGGLE_FOCUS_KEY) === "1";
        window.sessionStorage.removeItem(TOGGLE_FOCUS_KEY);
      } catch (error) {}

      if (shouldFocus && isDesktop()) {
        document.documentElement.classList.add("kbd-nav");
        menuToggle.focus();
      }
    };

    var clearCloseTimer = function () {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    var getPanelLinks = function (index) {
      var panel = megaMenu.querySelector('[data-menu-panel="' + index + '"]');

      return panel ? Array.prototype.slice.call(panel.querySelectorAll("a[href]")) : [];
    };

    var selectMenu = function (index) {
      var isOpen = header.classList.contains("menu-open");

      selectedIndex = Number(index);

      if (menuTitle && topLinks[selectedIndex]) {
        menuTitle.textContent = topLinks[selectedIndex].textContent;
      }

      panels.forEach(function (panel) {
        panel.classList.toggle("is-active", Number(panel.getAttribute("data-menu-panel")) === selectedIndex);
      });

      topLinks.forEach(function (link) {
        var active = isOpen && Number(link.getAttribute("data-menu-index")) === selectedIndex;

        link.classList.toggle("is-active", active);
        link.setAttribute("aria-expanded", String(active));
      });

      mobileButtons.forEach(function (button) {
        button.classList.toggle("is-active", Number(button.getAttribute("data-mobile-menu-index")) === selectedIndex);
      });
    };

    var openMegaMenu = function (index) {
      clearCloseTimer();

      header.classList.add("menu-open");
      megaMenu.setAttribute("aria-hidden", "false");
      megaMenu.removeAttribute("inert");

      document.body.classList.toggle("menu-is-open", !isDesktop());
      updateToggle();

      selectMenu(typeof index === "undefined" ? selectedIndex : index);
    };

    var closeMegaMenu = function (returnFocus) {
      clearCloseTimer();

      header.classList.remove("menu-open");
      document.body.classList.remove("menu-is-open");
      megaMenu.setAttribute("aria-hidden", "true");
      megaMenu.setAttribute("inert", "");

      updateToggle();

      selectMenu(selectedIndex);

      if (returnFocus) {
        menuToggle.focus();
      }
    };

    var scheduleDesktopClose = function () {
      if (!isDesktop() || !header.classList.contains("menu-open")) return;

      clearCloseTimer();

      closeTimer = window.setTimeout(function () {
        if (!header.matches(":hover") && !header.contains(document.activeElement)) {
          closeMegaMenu(false);
        }
      }, 120);
    };

    topLinks.forEach(function (link) {
      var index = Number(link.getAttribute("data-menu-index"));

      link.addEventListener("mouseenter", function () {
        if (isDesktop()) openMegaMenu(index);
      });

      link.addEventListener("focus", function () {
        if (isDesktop()) openMegaMenu(index);
      });

      /* 1Depth 에서 Tab → 해당 하위메뉴 첫 항목, Shift+Tab → 이전 하위메뉴 마지막 항목 */
      link.addEventListener("keydown", function (event) {
        if (!isDesktop() || event.key !== "Tab") return;

        if (!event.shiftKey) {
          var links = getPanelLinks(index);

          event.preventDefault();
          openMegaMenu(index);

          if (links.length) {
            links[0].focus();
          } else if (topLinks[index + 1]) {
            topLinks[index + 1].focus();
          } else {
            closeMegaMenu(false);
            menuToggle.focus();
          }

          return;
        }

        if (index > 0) {
          var prevLinks = getPanelLinks(index - 1);

          event.preventDefault();
          openMegaMenu(index - 1);
          (prevLinks.length ? prevLinks[prevLinks.length - 1] : topLinks[index - 1]).focus();
          return;
        }

        closeMegaMenu(false);
      });
    });

    /* 하위메뉴 마지막 항목 Tab → 다음 1Depth, 첫 항목 Shift+Tab → 현재 1Depth */
    megaMenu.addEventListener("keydown", function (event) {
      if (!isDesktop() || event.key !== "Tab") return;

      var panel = event.target.closest("[data-menu-panel]");
      if (!panel) return;

      var index = Number(panel.getAttribute("data-menu-panel"));
      var links = getPanelLinks(index);

      if (event.shiftKey && event.target === links[0]) {
        event.preventDefault();
        topLinks[index].focus();
      } else if (!event.shiftKey && event.target === links[links.length - 1]) {
        event.preventDefault();

        if (topLinks[index + 1]) {
          topLinks[index + 1].focus();
        } else {
          closeMegaMenu(false);
          menuToggle.focus();
        }
      }
    });

    header.addEventListener("mouseenter", function () {
      if (isDesktop()) clearCloseTimer();
    });

    header.addEventListener("mouseleave", scheduleDesktopClose);

    header.addEventListener("focusout", function () {
      if (!isDesktop()) return;

      window.setTimeout(function () {
        if (!header.contains(document.activeElement) && !header.matches(":hover")) {
          closeMegaMenu(false);
        }
      }, 0);
    });

    menuToggle.addEventListener("click", function (event) {
      if (isDesktop()) {
        if (event.detail === 0) {
          try {
            window.sessionStorage.setItem(TOGGLE_FOCUS_KEY, "1");
          } catch (error) {}
        }

        if (sitemapContent) {
          var homeLink = header.querySelector(".en-logo a");
          if (homeLink) window.location.assign(homeLink.href);
          return;
        }

        if (sitemapLink) window.location.assign(sitemapLink.href);
        return;
      }

      if (header.classList.contains("menu-open")) {
        closeMegaMenu(false);
      } else {
        openMegaMenu(selectedIndex);
      }
    });

    if (mobileClose) {
      mobileClose.addEventListener("click", function () {
        closeMegaMenu(true);
      });
    }

    mobileButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        selectMenu(button.getAttribute("data-mobile-menu-index"));
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("menu-open")) {
        closeMegaMenu(true);
      }
    });

    desktopMedia.addEventListener("change", function () {
      closeMegaMenu(false);
    });

    /* 현재 페이지가 속한 1Depth 를 기본 선택 */
    var currentLink = header.querySelector('.en-gnb a[aria-current="page"]');

    selectMenu(currentLink ? currentLink.getAttribute("data-menu-index") : 0);
    updateToggle();
    restoreToggleFocus();
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

  /* 2026-11-05 : 본문 바로가기 (국문 js/include.js · js/main.js 와 동일)
     - 서브 : LNB·탭을 건너뛰고 본문(.sub-content__main)으로 이동 + 포커스
     - 메인 : #main-content 로 이동 + 포커스 */
  var skipLink = document.querySelector(".skip-link");

  if (skipLink) {
    var skipTarget = document.querySelector(".sub-content__main");

    if (skipTarget) {
      if (!skipTarget.id) skipTarget.id = "sub-content-main";
      skipTarget.setAttribute("tabindex", "-1");
      skipLink.setAttribute("href", "#" + skipTarget.id);
    } else {
      skipTarget = document.querySelector(skipLink.getAttribute("href"));
    }

    skipLink.addEventListener("click", function (event) {
      if (!skipTarget) return;

      event.preventDefault();
      skipTarget.focus({ preventScroll: true });
      skipTarget.scrollIntoView();
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
