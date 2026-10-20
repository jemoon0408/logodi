(function () {
  "use strict";

  var origin = "지방자치인재개발원, 전북특별자치도 완주군 이서면 반교로 150";
  var facilityLinks = document.querySelectorAll(".sub-place-link");

  facilityLinks.forEach(function (link) {
    var row = link.closest("tr");
    var cells = row ? row.querySelectorAll("td") : [];
    var nameCell = link.closest("td");
    var nameIndex = Array.prototype.indexOf.call(cells, nameCell);
    var addressCell = cells[nameIndex + 1];

    if (!row || !addressCell) {
      throw new Error("시설 주소를 찾을 수 없습니다: " + link.textContent.trim());
    }

    var destination = [
      link.textContent.trim(),
      addressCell.textContent.trim().replace(/\s+/g, " ")
    ].join(", ");
    var directionsUrl = new URL("https://www.google.com/maps/dir/");

    directionsUrl.searchParams.set("api", "1");
    directionsUrl.searchParams.set("origin", origin);
    directionsUrl.searchParams.set("destination", destination);
    directionsUrl.searchParams.set("travelmode", "driving");

    link.href = directionsUrl.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", link.textContent.trim() + " 길찾기 (새 창)");
  });
}());
