/* =========================================================
   영상 재생 (.sub-video[data-video-player]) : 홍보 동영상 등

   - 대표 영상(.sub-video__main) 썸네일 클릭 → 같은 자리에 <video> 재생
   - 목록(.sub-video__list) 영상 클릭 → 대표 영역 제목/설명/영상 교체 후 재생
   - 각 링크 href 는 실제 영상 주소 (스크립트가 동작하지 않으면 영상 파일로 이동)

   링크 data 속성
   - data-video-src : 영상 주소 (href 와 같음)
   - data-poster    : 썸네일
   - data-title     : 제목
   - data-desc      : 설명 (줄바꿈은 \n)
========================================================= */

(function () {
  "use strict";

  document.querySelectorAll(".sub-video[data-video-player]").forEach(function (section) {
    var main = section.querySelector(".sub-video__main");
    var titleEl = section.querySelector(".sub-video__intro-title");
    var descEl = section.querySelector(".sub-video__intro p");
    var listLinks = section.querySelectorAll(".sub-video__list .sub-video__link");

    if (!main) return;

    var current = {
      src: "",
      poster: "",
      title: titleEl ? titleEl.textContent.trim() : ""
    };

    var mainLink = main.querySelector(".sub-video__link");

    if (mainLink) {
      current.src = mainLink.getAttribute("data-video-src") || mainLink.getAttribute("href");
      current.poster = mainLink.getAttribute("data-poster") || "";

      mainLink.addEventListener("click", function (event) {
        event.preventDefault();
        play(current);
      });
    }

    /* 대표 영역에 <video> 를 만들어 재생 */
    function play(video) {
      var box = document.createElement("div");
      box.className = "sub-video__thumb sub-video__thumb--player";

      var player = document.createElement("video");
      player.className = "sub-video__player";
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
      player.preload = "metadata";
      player.src = video.src;
      if (video.poster) player.poster = video.poster;
      player.setAttribute("title", video.title);
      player.textContent = "브라우저가 영상 재생을 지원하지 않습니다.";

      box.appendChild(player);
      main.innerHTML = "";
      main.appendChild(box);

      player.focus();
      var playing = player.play();
      if (playing && typeof playing.catch === "function") {
        playing.catch(function () {});
      }
    }

    function setIntro(video) {
      if (titleEl) titleEl.textContent = video.title;
      if (!descEl) return;

      descEl.textContent = "";
      (video.desc || "").split("\n").forEach(function (line, index) {
        if (index > 0) descEl.appendChild(document.createElement("br"));
        descEl.appendChild(document.createTextNode(line));
      });
    }

    listLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        current = {
          src: link.getAttribute("data-video-src") || link.getAttribute("href"),
          poster: link.getAttribute("data-poster") || "",
          title: link.getAttribute("data-title") || "",
          desc: (link.getAttribute("data-desc") || "").replace(/\\n/g, "\n")
        };

        listLinks.forEach(function (other) {
          other.classList.toggle("is-active", other === link);
          if (other === link) {
            other.setAttribute("aria-current", "true");
          } else {
            other.removeAttribute("aria-current");
          }
        });

        setIntro(current);
        play(current);

        if (main.getBoundingClientRect().top < 0) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  });
})();
