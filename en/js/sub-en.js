(function () {
  "use strict";

  /* 페이지 내 탭(data-tab-hash) : 주소 #해시 ↔ 탭 ↔ 위치 3Depth 연동 (Partners 국가 탭) */
  var hashTabs = Array.prototype.slice.call(document.querySelectorAll(".preinfo__tab[data-tab-hash]"));
  var syncing = false;

  var findHashTab = function (hash) {
    var key = (hash || "").replace(/^#/, "").toLowerCase();

    return hashTabs.filter(function (tab) {
      return tab.getAttribute("data-tab-hash") === key;
    })[0];
  };

  /* 위치 select 중 해당 #해시 option 을 가진 것을 선택 상태로 (커스텀 UI 는 change 로 갱신) */
  var syncLocation = function (hash) {
    document.querySelectorAll(".sub-location-select__native").forEach(function (select) {
      var option = Array.prototype.filter.call(select.options, function (item) {
        return item.value === hash;
      })[0];

      if (!option || option.selected) return;

      option.selected = true;
      syncing = true;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncing = false;
    });
  };

  hashTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var hash = "#" + tab.getAttribute("data-tab-hash");

      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }

      syncLocation(hash);
    });
  });

  var openHashTab = function () {
    var tab = findHashTab(window.location.hash);
    if (tab) tab.click();
  };

  window.addEventListener("hashchange", openHashTab);
  openHashTab();

  /* 위치 메뉴 : 선택한 option의 value(URL)로 이동, #해시는 같은 페이지 탭 열기 */
  document.querySelectorAll(".sub-location-select__native").forEach(function (select) {
    select.addEventListener("change", function () {
      var url = select.value;

      if (syncing || !url || url === "#") return;

      var tab = url.charAt(0) === "#" && findHashTab(url);

      if (tab) {
        tab.click();
        return;
      }

      window.location.href = url;
    });
  });

  /* Q&A 아코디언 : 질문 버튼 클릭 시 답변 열기/닫기 */
  document.querySelectorAll(".en-faq__button").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".en-faq__item");
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      var open = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
      if (answer) answer.hidden = !open;
    });
  });
})();
