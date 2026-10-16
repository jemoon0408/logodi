(function () {
  "use strict";

  function setActive(list, link) {
    list.querySelectorAll(".sub-tab2__item").forEach(function (item) {
      var active = item === link;
      item.classList.toggle("is-active", active);

      if (active) {
        item.setAttribute("aria-current", "location");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (list.scrollWidth > list.clientWidth) {
      var listRect = list.getBoundingClientRect();
      var linkRect = link.getBoundingClientRect();
      var left = list.scrollLeft + linkRect.left - listRect.left -
        (list.clientWidth - linkRect.width) / 2;

      list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }

  function initStickyTabs() {
    document.querySelectorAll(".sub-tab-wrap--sticky").forEach(function (wrap) {
      var list = wrap.querySelector(".sub-tab2__list");

      if (!list) {
        return;
      }

      var items = Array.prototype.slice.call(
        list.querySelectorAll(".sub-tab2__item[href^='#']")
      ).map(function (link) {
        return {
          link: link,
          target: document.getElementById(link.getAttribute("href").slice(1))
        };
      }).filter(function (item) {
        return item.target;
      });

      if (!items.length) {
        return;
      }

      var current = null;

      function activate(link) {
        current = link;
        setActive(list, link);
      }

      /* 고정되는 요소 : 2차 탭 (묶음은 display: contents) */
      var bar = wrap.querySelector(".sub-tab2") || wrap;

      /* 고정 헤더(sticky top) + 2차 탭 높이 + 여유 */
      function getOffset() {
        var top = parseFloat(window.getComputedStyle(bar).top) || 0;
        return top + bar.offsetHeight + 20;
      }

      function updateOffset() {
        var offset = getOffset() + "px";
        items.forEach(function (item) {
          item.target.style.scrollMarginTop = offset;
        });
      }

      /* 실제로 고정된 상태인지 (현재 위치 = sticky top) → 그림자 등 */
      function updateStuck() {
        var top = parseFloat(window.getComputedStyle(bar).top) || 0;
        var stuck = Math.abs(bar.getBoundingClientRect().top - top) < 1;
        bar.classList.toggle("is-stuck", stuck);
      }

      function updateActive() {
        updateStuck();
        var line = getOffset() + 10;
        var active = items[0];

        items.forEach(function (item) {
          if (item.target.getBoundingClientRect().top <= line) {
            active = item;
          }
        });

        if (active.link !== current) {
          activate(active.link);
        }
      }

      list.addEventListener("click", function (event) {
        var link = event.target.closest(".sub-tab2__item[href^='#']");
        if (link && list.contains(link)) {
          activate(link);
        }
      });

      window.addEventListener("scroll", updateActive, { passive: true });
      window.addEventListener("resize", updateOffset);
      updateOffset();

      var initialLink = (location.hash && list.querySelector(
        ".sub-tab2__item[href='" + location.hash + "']"
      )) || list.querySelector(".sub-tab2__item.is-active") || items[0].link;
      activate(initialLink);
      updateActive();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStickyTabs);
  } else {
    initStickyTabs();
  }
})();