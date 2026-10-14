(function () {
	"use strict";

	function updatePreinfoPagination() {
		var paginations = document.querySelectorAll(".preinfo-pagination");
		var isMobile = window.matchMedia("(max-width: 480px)").matches;

		paginations.forEach(function (pagination) {
			var pages = Array.from(
				pagination.querySelectorAll(".preinfo-pagination__page")
			);

			/* 기존 ... 제거 */
			pagination.querySelectorAll(".preinfo-pagination__ellipsis").forEach(function (ellipsis) {
				ellipsis.remove();
			});

			/* PC에서는 전체 페이지 번호 표시 */
			pages.forEach(function (page) {
				page.style.display = "";
			});

			if (!isMobile || pages.length <= 5) {
				return;
			}

			var activeIndex = pages.findIndex(function (page) {
				return page.classList.contains("is-active") ||
					page.getAttribute("aria-current") === "page";
			});

			if (activeIndex === -1) {
				activeIndex = 0;
			}

			var total = pages.length;
			var visibleIndexes = [];

			/*
				현재 페이지가 앞쪽일 때
				1 2 3 ... 마지막
			*/
			if (activeIndex <= 2) {
				visibleIndexes = [0, 1, 2, total - 1];
			}

			/*
				현재 페이지가 뒤쪽일 때
				1 ... 끝-2 끝-1 끝
			*/
			else if (activeIndex >= total - 3) {
				visibleIndexes = [
					0,
					total - 3,
					total - 2,
					total - 1
				];
			}

			/*
				현재 페이지가 중간일 때
				1 ... 현재 ... 마지막
			*/
			else {
				visibleIndexes = [
					0,
					activeIndex,
					total - 1
				];
			}

			pages.forEach(function (page, index) {
				if (!visibleIndexes.includes(index)) {
					page.style.display = "none";
				}
			});

			var visiblePages = visibleIndexes
				.slice()
				.sort(function (a, b) {
					return a - b;
				});

			for (var i = 0; i < visiblePages.length - 1; i++) {
				var currentIndex = visiblePages[i];
				var nextIndex = visiblePages[i + 1];

				if (nextIndex - currentIndex > 1) {
					var ellipsis = document.createElement("span");

					ellipsis.className = "preinfo-pagination__ellipsis";
					ellipsis.textContent = "...";
					ellipsis.setAttribute("aria-hidden", "true");

					pages[nextIndex].before(ellipsis);
				}
			}
		});
	}

	document.addEventListener("DOMContentLoaded", updatePreinfoPagination);

	window.addEventListener("resize", function () {
		updatePreinfoPagination();
	});
})();