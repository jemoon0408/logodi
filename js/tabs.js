(function () {
  "use strict";

  function initPreinfoTabs() {
    var tabList = document.querySelector(".preinfo__tabs");

    if (!tabList) {
      return;
    }

    var tabs = Array.prototype.slice.call(
      tabList.querySelectorAll(".preinfo__tab")
    );

    var panels = Array.prototype.slice.call(
      document.querySelectorAll(".preinfo__tabpanel")
    );

    if (!tabs.length) {
      return;
    }


    /* =========================================================
       탭 위치로 가로 스크롤 이동
    ========================================================= */
    function moveScrollToTab(tab, behavior) {
      var containerRect = tabList.getBoundingClientRect();
      var tabRect = tab.getBoundingClientRect();

      var targetScrollLeft =
        tabList.scrollLeft +
        (tabRect.left - containerRect.left) +
        (tabRect.width / 2) -
        (containerRect.width / 2);

      var maxScrollLeft =
        tabList.scrollWidth - tabList.clientWidth;

      targetScrollLeft = Math.max(
        0,
        Math.min(targetScrollLeft, maxScrollLeft)
      );

      tabList.scrollTo({
        left: targetScrollLeft,
        behavior: behavior || "smooth"
      });
    }


    /* =========================================================
       탭 활성화
    ========================================================= */
    function activateTab(tab, options) {
      options = options || {};

      var targetId = tab.getAttribute("aria-controls");


      /* -------------------------
         TAB 상태 변경
      ------------------------- */
      tabs.forEach(function (item) {
        var isActive = item === tab;

        item.classList.toggle(
          "is-active",
          isActive
        );

        item.setAttribute(
          "aria-selected",
          isActive ? "true" : "false"
        );

        /*
         * 중요
         *
         * 기존에는 비활성 탭을 -1로 만들어서
         * Tab 키 접근이 불가능했음.
         *
         * 모든 탭을 Tab 키로 접근할 수 있도록
         * tabindex="0" 유지.
         */
        item.setAttribute(
          "tabindex",
          "0"
        );
      });


      /* -------------------------
         TAB PANEL 변경
      ------------------------- */
      panels.forEach(function (panel) {
        var isActive =
          panel.id === targetId;

        panel.classList.toggle(
          "is-active",
          isActive
        );

        panel.hidden = !isActive;
      });


      /* -------------------------
         포커스 이동
      ------------------------- */
      if (options.focus) {
        tab.focus({
          preventScroll: true
        });
      }


      /* -------------------------
         활성 탭 위치로 가로 스크롤 이동
      ------------------------- */
      requestAnimationFrame(function () {
        moveScrollToTab(
          tab,
          options.behavior || "smooth"
        );
      });
    }


    /* =========================================================
       각각의 탭 이벤트
    ========================================================= */
    tabs.forEach(function (tab, index) {

      /*
       * 모든 탭을
       * Tab 키로 접근 가능하게 함
       */
      tab.setAttribute(
        "tabindex",
        "0"
      );


      /* =====================================================
         클릭
      ===================================================== */
      tab.addEventListener(
        "click",
        function () {

          activateTab(
            tab,
            {
              behavior: "smooth"
            }
          );

        }
      );


      /* =====================================================
         포커스
         
         Tab / Shift + Tab으로
         해당 버튼에 포커스가 들어왔을 때도
         가로 스크롤이 따라감
      ===================================================== */
      tab.addEventListener(
        "focus",
        function () {

          requestAnimationFrame(function () {

            moveScrollToTab(
              tab,
              "smooth"
            );

          });

        }
      );


      /* =====================================================
         키보드
      ===================================================== */
      tab.addEventListener(
        "keydown",
        function (event) {
          var nextIndex;


          /* -----------------------------------------
             오른쪽 방향키
          ----------------------------------------- */
          if (event.key === "ArrowRight") {

            event.preventDefault();

            nextIndex =
              (index + 1) % tabs.length;

            activateTab(
              tabs[nextIndex],
              {
                focus: true,
                behavior: "smooth"
              }
            );

            return;
          }


          /* -----------------------------------------
             왼쪽 방향키
          ----------------------------------------- */
          if (event.key === "ArrowLeft") {

            event.preventDefault();

            nextIndex =
              (index - 1 + tabs.length) %
              tabs.length;

            activateTab(
              tabs[nextIndex],
              {
                focus: true,
                behavior: "smooth"
              }
            );

            return;
          }


          /* -----------------------------------------
             Home
             첫 번째 탭
          ----------------------------------------- */
          if (event.key === "Home") {

            event.preventDefault();

            activateTab(
              tabs[0],
              {
                focus: true,
                behavior: "smooth"
              }
            );

            return;
          }


          /* -----------------------------------------
             End
             마지막 탭
          ----------------------------------------- */
          if (event.key === "End") {

            event.preventDefault();

            activateTab(
              tabs[tabs.length - 1],
              {
                focus: true,
                behavior: "smooth"
              }
            );

            return;
          }


          /*
           * Tab / Shift + Tab은
           * preventDefault 하지 않음.
           *
           * 모든 탭이 tabindex="0"이므로
           * 브라우저 기본 Tab 순서대로
           *
           * 전체
           * ↓
           * 행정지원과
           * ↓
           * 기획협력과
           * ↓
           * ...
           *
           * 순서대로 이동.
           *
           * 마지막 탭 이후에는
           * 다음 포커스 가능한 요소로 이동.
           */
        }
      );

    });


    /* =========================================================
       최초 활성화
    ========================================================= */
    var initialTab =
      tabList.querySelector(
        ".preinfo__tab.is-active"
      ) || tabs[0];

    activateTab(
      initialTab,
      {
        behavior: "auto"
      }
    );


    /* =========================================================
       반응형 변경 후에도
       활성 탭 위치 유지
    ========================================================= */
    var resizeTimer;

    window.addEventListener(
      "resize",
      function () {

        clearTimeout(
          resizeTimer
        );

        resizeTimer =
          setTimeout(
            function () {

              var activeTab =
                tabList.querySelector(
                  ".preinfo__tab.is-active"
                );

              if (!activeTab) {
                return;
              }

              moveScrollToTab(
                activeTab,
                "auto"
              );

            },
            100
          );

      }
    );

  }


  /* =========================================================
     실행
  ========================================================= */
  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initPreinfoTabs
    );

  } else {

    initPreinfoTabs();

  }

})();