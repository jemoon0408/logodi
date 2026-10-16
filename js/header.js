
    //  HEADER 메뉴 이벤트&액션 / 접근성 JS 추가 2026-09-17 

    (function () {
      "use strict";

      var header = document.getElementById("siteHeader");
      var menu = document.getElementById("megaMenu");
      var toggle = header && header.querySelector(".menu-toggle");
      var mobileClose = menu && menu.querySelector(".mobile-menu-close");
      var backdrop = document.querySelector(".menu-backdrop");
      var topLinks = header && header.querySelectorAll(".gnb a[data-menu-index]");
      var mobileMenuButtons = menu && menu.querySelectorAll("[data-mobile-menu-index]");
      var panels = menu && menu.querySelectorAll("[data-menu-panel]");
      var groupToggles = menu && menu.querySelectorAll(".mega-menu-group-toggle");
      var heading = document.getElementById("megaMenuTitle");
      var labels = ["정보공개", "교육과정", "교류협력", "소통마당", "기관소개"];
      var desktopMedia = window.matchMedia("(min-width: 877px)");
      var selectedIndex = 0;
      var closeTimer = null;

      if (!header || !menu || !toggle) return;

      function isDesktop() {
        return desktopMedia.matches;
      }

      function clearCloseTimer() {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
      }

      function showBackdrop() {
        if (backdrop && isDesktop()) backdrop.hidden = false;
      }

      function hideBackdrop() {
        if (backdrop) backdrop.hidden = true;
      }

      function getPanel(index) {
        return menu.querySelector('[data-menu-panel="' + index + '"]');
      }

      function getPanelFocusables(index) {
        var panel = getPanel(index);
        if (!panel) return [];

        return Array.prototype.slice.call(
          panel.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter(function (element) {
          if (element.closest('[hidden]')) return false;

          var style = window.getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden") return false;

          return element.getClientRects().length > 0;
        });
      }

      function focusFirstPanelItem(index) {
        var focusables = getPanelFocusables(index);

        if (focusables.length) {
          focusables[0].focus();
          return true;
        }

        return false;
      }

      function focusLastPanelItem(index) {
        var focusables = getPanelFocusables(index);

        if (focusables.length) {
          focusables[focusables.length - 1].focus();
          return true;
        }

        return false;
      }

      function selectMenu(index) {
        var selected = Number(index);
        if (!Number.isInteger(selected) || selected < 0 || selected >= labels.length) return;

        selectedIndex = selected;

        if (heading) heading.textContent = labels[selected];

        panels.forEach(function (panel) {
          panel.classList.toggle(
            "is-active",
            Number(panel.getAttribute("data-menu-panel")) === selected
          );
        });

        topLinks.forEach(function (link) {
          var active = Number(link.getAttribute("data-menu-index")) === selected;

          link.classList.toggle(
            "is-active",
            active && header.classList.contains("menu-open")
          );

          link.setAttribute(
            "aria-expanded",
            active && header.classList.contains("menu-open") ? "true" : "false"
          );
        });

        mobileMenuButtons.forEach(function (button) {
          button.classList.toggle(
            "is-active",
            Number(button.getAttribute("data-mobile-menu-index")) === selected
          );
        });
      }

      function openMegaMenu(index) {
        clearCloseTimer();

        if (typeof index !== "undefined") {
          selectMenu(index);
        }

        header.classList.add("menu-open");
        menu.setAttribute("aria-hidden", "false");
        menu.removeAttribute("inert");

        if (isDesktop()) {
          document.body.classList.remove("menu-is-open");
          showBackdrop();

          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "전체메뉴");
          toggle.removeAttribute("aria-controls");
        } else {
          document.body.classList.add("menu-is-open");
          hideBackdrop();

          toggle.setAttribute("aria-expanded", "true");
          toggle.setAttribute("aria-label", "전체메뉴 닫기");
          toggle.setAttribute("aria-controls", "megaMenu");
        }

        selectMenu(selectedIndex);
      }

      function closeMegaMenu(returnFocus) {
        clearCloseTimer();

        header.classList.remove("menu-open");
        document.body.classList.remove("menu-is-open");

        menu.setAttribute("aria-hidden", "true");
        menu.setAttribute("inert", "");

        topLinks.forEach(function (link) {
          link.classList.remove("is-active");
          link.setAttribute("aria-expanded", "false");
        });

        if (isDesktop()) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "전체메뉴");
          toggle.removeAttribute("aria-controls");
        } else {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "전체메뉴 열기");
          toggle.setAttribute("aria-controls", "megaMenu");
        }

        hideBackdrop();

        if (returnFocus) {
          toggle.focus();
        }
      }

      function scheduleDesktopClose() {
        if (!isDesktop() || !header.classList.contains("menu-open")) return;

        clearCloseTimer();

        closeTimer = window.setTimeout(function () {
          var active = document.activeElement;

          if (!header.matches(":hover") && !header.contains(active)) {
            closeMegaMenu(false);
          }
        }, 120);
      }

      topLinks.forEach(function (link, index) {
        link.addEventListener("mouseenter", function () {
          if (!isDesktop()) return;

          var focusedLink = document.activeElement;
          if (
            focusedLink !== link &&
            Array.prototype.indexOf.call(topLinks, focusedLink) !== -1
          ) {
            focusedLink.blur();
          }

          openMegaMenu(link.getAttribute("data-menu-index"));
        });

        link.addEventListener("focus", function () {
          if (!isDesktop()) return;

          openMegaMenu(link.getAttribute("data-menu-index"));
        });

        /*
         * PC 키보드 접근성
         *
         * 1Depth에 포커스
         *   ↓ Tab
         * 해당 1Depth의 풀다운 하위메뉴를 처음부터 끝까지 순회
         *   ↓ Tab
         * 다음 1Depth로 이동
         *
         * Shift + Tab은 위 순서의 반대로 이동한다.
         */
        link.addEventListener("keydown", function (event) {
          if (!isDesktop() || event.key !== "Tab") return;

          var currentIndex = Number(link.getAttribute("data-menu-index"));

          if (!event.shiftKey) {
            event.preventDefault();

            openMegaMenu(currentIndex);

            if (!focusFirstPanelItem(currentIndex)) {
              if (topLinks[currentIndex + 1]) {
                topLinks[currentIndex + 1].focus();
              } else {
                closeMegaMenu(false);
                toggle.focus();
              }
            }

            return;
          }

          if (currentIndex > 0) {
            event.preventDefault();

            var previousIndex = currentIndex - 1;

            openMegaMenu(previousIndex);

            if (!focusLastPanelItem(previousIndex)) {
              topLinks[previousIndex].focus();
            }

            return;
          }

          /*
           * 첫 번째 1Depth에서 Shift + Tab이면
           * 기본 브라우저 순서에 따라 로고 등 이전 요소로 이동하도록 한다.
           */
          closeMegaMenu(false);
        });
      });

      /*
       * 풀다운 하위메뉴 안에서 Tab 순서를 제어한다.
       *
       * - 마지막 하위메뉴에서 Tab
       *   → 다음 1Depth
       *
       * - 첫 번째 하위메뉴에서 Shift + Tab
       *   → 현재 1Depth
       */
      menu.addEventListener("keydown", function (event) {
        if (!isDesktop() || event.key !== "Tab") return;

        var panel = event.target.closest("[data-menu-panel]");
        if (!panel || !panel.classList.contains("is-active")) return;

        var panelIndex = Number(panel.getAttribute("data-menu-panel"));
        var focusables = getPanelFocusables(panelIndex);

        if (!focusables.length) return;

        var firstItem = focusables[0];
        var lastItem = focusables[focusables.length - 1];

        if (event.shiftKey && event.target === firstItem) {
          event.preventDefault();

          if (topLinks[panelIndex]) {
            topLinks[panelIndex].focus();
          }

          return;
        }

        if (!event.shiftKey && event.target === lastItem) {
          event.preventDefault();

          var nextIndex = panelIndex + 1;

          if (topLinks[nextIndex]) {
            topLinks[nextIndex].focus();
          } else {
            closeMegaMenu(false);
            toggle.focus();
          }
        }
      });

      header.addEventListener("mouseenter", function () {
        if (isDesktop()) {
          clearCloseTimer();
        }
      });

      header.addEventListener("mouseleave", function () {
        scheduleDesktopClose();
      });

      menu.addEventListener("focusin", function () {
        if (isDesktop()) {
          clearCloseTimer();
        }
      });

      menu.addEventListener("focusout", function () {
        if (!isDesktop()) return;

        window.setTimeout(function () {
          if (
            !header.contains(document.activeElement) &&
            !header.matches(":hover")
          ) {
            closeMegaMenu(false);
          }
        }, 0);
      });

      /*
       * PC: 햄버거는 현재 아이콘만 유지하고 클릭 동작 없음.
       * MO: 기존 모바일 전체메뉴는 그대로 동작.
       */
      toggle.addEventListener("click", function () {
        if (isDesktop()) {
          closeMegaMenu(false);
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

      mobileMenuButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          selectMenu(button.getAttribute("data-mobile-menu-index"));
        });
      });

      groupToggles.forEach(function (button) {
        button.addEventListener("click", function () {
          if (isDesktop()) return;

          var group = button.closest(".mega-menu-group");
          if (!group) return;

          var willOpen = !group.classList.contains("is-open");

          group.classList.toggle("is-open", willOpen);
          button.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
          );

          var title = group.querySelector(".mega-menu-group-title");
          var titleText = title
            ? title.textContent.trim()
            : "하위메뉴";

          button.setAttribute(
            "aria-label",
            titleText +
              (willOpen
                ? " 하위메뉴 접기"
                : " 하위메뉴 펼치기")
          );
        });
      });

      if (backdrop) {
        backdrop.addEventListener("click", function () {
          closeMegaMenu(false);
        });
      }

      document.addEventListener("keydown", function (event) {
        if (
          event.key === "Escape" &&
          header.classList.contains("menu-open")
        ) {
          closeMegaMenu(true);
        }
      });

      desktopMedia.addEventListener("change", function () {
        closeMegaMenu(false);
        selectMenu(0);

        if (isDesktop()) {
          toggle.removeAttribute("aria-controls");
          toggle.setAttribute("aria-label", "전체메뉴");
        } else {
          toggle.setAttribute("aria-controls", "megaMenu");
          toggle.setAttribute("aria-label", "전체메뉴 열기");
        }
      });

      if (isDesktop()) {
        toggle.removeAttribute("aria-controls");
        toggle.setAttribute("aria-label", "전체메뉴");
      } else {
        toggle.setAttribute("aria-controls", "megaMenu");
        toggle.setAttribute("aria-label", "전체메뉴 열기");
      }

      selectMenu(0);
    }());