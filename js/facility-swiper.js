/* =========================================================
   시설 사진 슬라이드 (.sub-facility__swiper) : 강의시설 등
   - 사진이 여러 장인 시설만 사용 (기존 사이트 touchSlider 대체)
   - 이전 / 다음 버튼 + 현재 장수(1 / 3) 표시
========================================================= */

(function () {
  "use strict";

  if (typeof Swiper === "undefined") return;

  document.querySelectorAll(".sub-facility__swiper").forEach(function (el) {
    new Swiper(el, {
      loop: true,
      speed: 500,

      navigation: {
        prevEl: el.querySelector(".sub-facility__swiper-prev"),
        nextEl: el.querySelector(".sub-facility__swiper-next")
      },

      pagination: {
        el: el.querySelector(".sub-facility__swiper-page"),
        type: "fraction"
      },

      a11y: {
        enabled: true,
        prevSlideMessage: "이전 사진",
        nextSlideMessage: "다음 사진",
        slideLabelMessage: "{{index}} / {{slidesLength}}"
      }
    });
  });
})();
