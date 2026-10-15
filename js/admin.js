(function () {
  "use strict";
  /* =========================================================
     PAGE DATA

     페이지 데이터는 여기에서만 관리

     status
     - progress : 수정 중
     - done     : 수정 완료

     a11y (접근성 검토, 생략 시 미검토)
     - progress : 검토 중
     - done     : 검토 완료
     a11yNote : 접근성 검토 메모 (선택, 문자열 또는 배열)
  ========================================================= */
  var PAGE_DATA = [
        {
      name: "샘플 - 기관소개(비전과 인재상)",
      path: "pages/samples/sub-sample01.html",
      note: ["기관소개 화면 샘플", "공통 탭(1차+2차, Figma 260916 sub_PC tab-wrap) 추가 및 반응형"],
      status: "done",
      date: "2026-10-01"
    },

    {
      name: "샘플 - 정보공개(정부포상 공개검증)",
      path: "pages/samples/sub-sample02.html",
      note: ["정보공개 화면 샘플"],
      status: "done",
      date: "2026-10-01"
    },

    {
      name: "샘플 - 공공데이터개방",
      path: "pages/samples/sub-sample03.html",
      note: ["공공데이터 화면 샘플"],
      status: "done",
      date: "2026-10-01"
    },

    {
      name: "메인페이지",
      path: "pages/main-ko.html",
      note: [
        "퍼블리싱 및 키보드 접근성 개선 완료",
        "header 추가"
      ],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "정보공개 - 정보공개목록(사전정보공표 목록)",
      path: "pages/info-disclosure/program-action.html",
      note: [
        "가데이터 사용한 반복적인 반응형 게시판 페이지 제작 완료",
      ],
      status: "done",
      a11y: "done",
      date: "2026-09-30"
    },
  
    {
      name: "정보공개 - 정보공개목록(정부포상 공개검증)",
      path: "pages/info-disclosure/board-action01.html",
      note: [
        "기존 사이트에 검색 바 옆에 있던 전체보기 왼쪽 셀렉트의 옵션으로 넣었습니다. 해당 전체보기 버튼이 필터링에서 제목, 내용을 포함한 전체 검색으로 생각되어 옵션안으로 넣는 방식으로 변경하였습니다."
      ],
      status: "done",
      a11y: "done",
      date: "2026-09-30"
    },
  
    {
      name: "정보공개 - 정보공개목록(문서공개목록 > 2014년 1월 이후)",
      path: "pages/info-disclosure/content-action.html",
      note: [
        "부서별 탭 기능 추가",
        "탭 활성화 시 가로 스크롤 이동",
        "키보드 접근성 개선"
      ],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "정보공개 - 기관운영정보(훈령·예규)",
      path: "pages/org-info/board-action02.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-01"
    },

    {
      name: "정보공개 - 기관운영정보(업무추진비)",
      path: "pages/org-info/board-action03.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-01"
    },

    {
      name: "정보공개 - 기관운영정보(예산/결산/계약)",
      path: "pages/org-info/board-action04.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-01"
    },

    {
      name: "정보공개 - 기관운영정보(업무정보)",
      path: "pages/info-disclosure/board-action05.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "소통마당 - 새소식(보도자료/언론보도)",
      path: "pages/communication/board-action06.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "소통마당 - 새소식(공고)",
      path: "pages/communication/board-action07.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "소통마당 - 새소식(자치인재원 News)",
      path: "pages/communication/board-action08.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "소통마당 - 새소식(공지사항)",
      path: "pages/communication/board-action09.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "소통마당 - 학습자료실(공통교재)",
      path: "pages/communication/board-action10.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "소통마당 - 지역상생발전",
      path: "pages/communication/content-action01.html",
      note: [],
      status: "done",
      date: "2026-10-06"
    },

    {
      name: "기관소개 - 연혁",
      path: "pages/about/content-action02.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "기관소개 - 비전과 인재상",
      path: "pages/about/content-action03.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - MI",
      path: "pages/about/content-action04.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "기관소개 - 60주년 로고",
      path: "pages/about/content-action05.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - 시도 교육원협력 > 교육발전협의회(운영개요)",
      path: "pages/exchange/content-action17.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 시도 교육원협력 > 교육발전협의회(개최현황)",
      path: "pages/exchange/content-action18.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 시도 교육원협력 > 교육발전협의회(협의회자료)",
      path: "pages/exchange/board-action11.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - 시도 교육원협력 > 사이버교육협의회",
      path: "pages/exchange/content-action19.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 시도 교육원협력 > 교육컨설팅",
      path: "pages/exchange/board-action12.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - HRD/발표대회 > HRD콘테스트(개최결과)",
      path: "pages/exchange/content-action20.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - HRD/발표대회 > HRD콘테스트(발표논문 및 교안)",
      path: "pages/exchange/board-action13.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - HRD/발표대회 > 정책연구 발표대회(대회개요)",
      path: "pages/exchange/content-action21.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - HRD/발표대회 > 정책연구 발표대회(개최결과)",
      path: "pages/exchange/board-action14.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - 민관협력 > 공공기관 협력",
      path: "pages/exchange/content-action22.html",
      note: [
        "탭 영역 스크롤 시 상단 고정(헤더 바로 아래)",
        "탭 클릭 시 해당 섹션으로 앵커 이동, 고정 탭에 가리지 않도록 위치 보정",
        "스크롤 위치에 따라 활성 탭 자동 변경"
      ],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 민관협력 > 민간기관 협력",
      path: "pages/exchange/content-action23.html",
      note: [
        "탭 영역 스크롤 시 상단 고정(헤더 바로 아래)",
        "탭 클릭 시 해당 섹션으로 앵커 이동, 고정 탭에 가리지 않도록 위치 보정",
        "스크롤 위치에 따라 활성 탭 자동 변경"
      ],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 민관협력 > 민관 협의체",
      path: "pages/exchange/content-action24.html",
      note: [
        "탭 영역 스크롤 시 상단 고정(헤더 바로 아래)",
        "탭 클릭 시 해당 섹션으로 앵커 이동, 고정 탭에 가리지 않도록 위치 보정",
        "스크롤 위치에 따라 활성 탭 자동 변경"
      ],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 국제교류협력 > 외국기관협력",
      path: "pages/exchange/content-action25.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 국제교류협력 > 국제기구활동(소개)",
      path: "pages/exchange/content-action26.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 국제교류협력 > 국제기구활동(자료실)",
      path: "pages/exchange/board-action15.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - 국제교류협력 > 세미나(한·중 세미나 대회개요)",
      path: "pages/exchange/content-action27.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "교류협력 - 국제교류협력 > 세미나(한·중 세미나 개최결과)",
      path: "pages/exchange/board-action16.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "교류협력 - 국제교류협력 > 세미나(LOGODI 글로벌 포럼)",
      path: "pages/exchange/board-action17.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 기관소개 > 인사말",
      path: "pages/about/content-action13.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 기관소개 > 인사말(역대원장)",
      path: "pages/about/content-action14.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 홍보관 > 홍보자료(홍보 동영상)",
      path: "pages/about/content-action15.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 조직안내 > 조직 및 직원(조직도)",
      path: "pages/about/content-action16.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 홍보관 > 홍보자료(브로슈어)",
      path: "pages/about/content-action06.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 홍보관 > 홍보자료(자치인재원 60년사)",
      path: "pages/about/content-action07.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 홍보관 > 홍보자료(국제교육협력 20년사)",
      path: "pages/about/content-action08.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 조직안내 > 조직 및 직원(직원검색)",
      path: "pages/about/content-action09.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 시설안내 > 시설현황(강의실대관)",
      path: "pages/about/content-action10.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "기관소개 - 시설안내 > 시설현황(지방행정역사관)",
      path: "pages/about/content-action11.html",
      note: [],
      status: "done",
      date: "2026-10-07"
    },

    {
      name: "기관소개 - 시설안내 > 주변안내(공공 및 편의시설안내)",
      path: "pages/about/content-action12.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },


    {
      name: "교육과정 - 교육과정유형 > 장기과정(고위정책과정)",
      path: "pages/education/content-action28.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 장기과정(고급리더과정)",
      path: "pages/education/content-action29.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 장기과정(중견리더과정)",
      path: "pages/education/content-action30.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 장기과정(글로벌리더과정)",
      path: "pages/education/content-action31.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 장기과정(여성리더양성과정)",
      path: "pages/education/content-action32.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 기본과정",
      path: "pages/education/content-action33.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 의정연수",
      path: "pages/education/content-action34.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육과정유형 > 외국공무원과정",
      path: "pages/education/content-action35.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "교육과정 - 교육과정유형 > 사이버교육",
      path: "pages/education/content-action36.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 선발/입교안내 > 교육생선발",
      path: "pages/education/content-action37.html",
      note: [],
      status: "done",
      date: "2026-10-15"
    },

    {
      name: "교육과정 - 선발/입교안내 > 과정별 입교안내",
      path: "pages/education/board-action18.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육훈련계획 > 월간 교육훈련계획(과정 상세)",
      path: "pages/education/content-action38.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 교육훈련계획 > 주간 교육훈련계획",
      path: "pages/education/board-action19.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 역량평가/역량교육 > 안내자료",
      path: "pages/education/content-action39.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "교육과정 - 의정연수 > 자료실",
      path: "pages/education/board-action20.html",
      note: [],
      status: "done",
      date: "2026-10-12"
    },

    {
      name: "기관소개 - 조직안내 > 교수진",
      path: "pages/about/content-action40.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "기관소개 - 시설안내 > 시설현황(강의시설 > 대강의실)",
      path: "pages/about/content-action41.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "기관소개 - 시설안내 > 시설현황(도서관)",
      path: "pages/about/content-action42.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "기관소개 - 시설안내 > 시설현황(인비전 스튜디오)",
      path: "pages/about/content-action43.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "기관소개 - 시설안내 > 주변안내(주변안내)",
      path: "pages/about/content-action44.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "기관소개 - 오시는 길",
      path: "pages/about/content-action45.html",
      note: [],
      status: "progress",
      date: "2026-10-14"
    },

    {
      name: "정보공개 - 공공데이터개방",
      path: "pages/info-disclosure/content-action46.html",
      note: [],
      status: "progress",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "정보공개 - 정보공개목록(문서공개목록 > 이전목록자료)",
      path: "pages/info-disclosure/board-action21.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

    {
      name: "정보공개 - 정보공개목록(문서공개목록 > 이전목록자료 상세)",
      path: "pages/info-disclosure/board-view01.html",
      note: [],
      status: "done",
      a11y: "done",
      date: "2026-10-15"
    },

  ];


  /* =========================================================
     DOM READY
  ========================================================= */
  document.addEventListener(
    "DOMContentLoaded",
    function () {


      /* =====================================================
         DOM
      ===================================================== */
      var pageList =
        document.getElementById("pageList");

      var emptyState =
        document.getElementById("emptyState");

      var statAll =
        document.getElementById("statAll");

      var statProgress =
        document.getElementById("statProgress");

      var statDone =
        document.getElementById("statDone");

      var searchInput =
        document.getElementById("pageSearch");

      var tabs =
        Array.prototype.slice.call(
          document.querySelectorAll(".admin-tab")
        );


      if (
        !pageList ||
        !emptyState ||
        !statAll ||
        !statProgress ||
        !statDone ||
        !searchInput
      ) {
        return;
      }


      /* =====================================================
         STATE
      ===================================================== */
      var state = {

        filter: "all",

        search: ""

      };


      /* =====================================================
         초성
      ===================================================== */
      var CHOSUNG = [

        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ"

      ];


      /* =====================================================
         한글 → 초성
      ===================================================== */
      function toChosung(str) {

        var result = "";

        for (
          var i = 0;
          i < str.length;
          i++
        ) {

          var code =
            str.charCodeAt(i);


          if (
            code >= 0xac00 &&
            code <= 0xd7a3
          ) {

            result +=
              CHOSUNG[
                Math.floor(
                  (code - 0xac00) /
                  (21 * 28)
                )
              ];

          } else {

            result +=
              str[i];

          }

        }

        return result;

      }


      /* =====================================================
         검색 문자열 정규화
      ===================================================== */
      function normalize(str) {

        return String(str || "")
          .replace(/\s+/g, "")
          .toLowerCase();

      }


      /* =====================================================
         초성만 입력했는지 확인
      ===================================================== */
      function isChosungOnly(str) {

        return /^[ㄱ-ㅎ]+$/.test(str);

      }


      /* =====================================================
         데이터 → 검색용 문자열 생성
      ===================================================== */
      function getSearchText(item) {

        var noteText = "";

        if (
          Array.isArray(item.note)
        ) {

          noteText =
            item.note.join(" ");

        } else {

          noteText =
            item.note || "";

        }


        return [
          item.name,
          item.path,
          noteText,
          getStatusLabel(item.status),
          getA11yLabel(item.a11y),
          item.date
        ].join(" ");

      }


      /* =====================================================
         검색어 일치 확인
      ===================================================== */
      function matchesKeyword(
        rowText,
        keyword
      ) {

        if (!keyword) {

          return true;

        }


        var normalizedText =
          normalize(rowText);


        /* 일반 검색 */
        if (
          normalizedText.indexOf(
            keyword
          ) !== -1
        ) {

          return true;

        }


        /* 초성 검색 */
        if (
          isChosungOnly(keyword)
        ) {

          var chosungText =
            normalize(
              toChosung(rowText)
            );

          return (
            chosungText.indexOf(
              keyword
            ) !== -1
          );

        }


        return false;

      }


      /* =====================================================
         STATUS TEXT
      ===================================================== */
      function getStatusLabel(status) {

        switch (status) {

          case "progress":
            return "수정 중";


          case "done":
            return "수정 완료";


          default:
            return "";

        }

      }


      /* =====================================================
         STATUS CLASS
      ===================================================== */
      function getStatusClass(status) {

        switch (status) {

          case "progress":
            return "badge-progress";


          case "done":
            return "badge-done";


          default:
            return "";

        }

      }


      /* =====================================================
         접근성 검토 TEXT / CLASS
      ===================================================== */
      function getA11yLabel(a11y) {

        switch (a11y) {

          case "progress":
            return "검토 중";


          case "done":
            return "검토 완료";


          default:
            return "미검토";

        }

      }


      function getA11yClass(a11y) {

        switch (a11y) {

          case "progress":
            return "badge-progress";


          case "done":
            return "badge-done";


          default:
            return "badge-pending";

        }

      }


      /* =====================================================
         NOTE 생성
      ===================================================== */
      function createNoteContent(
        container,
        note
      ) {

        /*
         * note가 배열이면
         *
         * [
         *   "첫 번째 수정사항",
         *   "두 번째 수정사항"
         * ]
         *
         * 각 데이터 사이에 <br> 삽입
         */
        if (
          Array.isArray(note)
        ) {

          note.forEach(
            function (
              text,
              index
            ) {

              var textNode =
                document.createTextNode(
                  text
                );

              container.appendChild(
                textNode
              );


              if (
                index <
                note.length - 1
              ) {

                container.appendChild(
                  document.createElement(
                    "br"
                  )
                );

              }

            }
          );

          return;

        }


        container.textContent =
          note || "";

      }


      /* =====================================================
         TR 생성
      ===================================================== */
      function createRow(item) {

        var tr =
          document.createElement("tr");


        tr.setAttribute(
          "data-status",
          item.status
        );


        /* -------------------------------------------------
           페이지
        ------------------------------------------------- */
        var pageCell =
          document.createElement("td");

        pageCell.className =
          "page-cell";


        var pageName =
          document.createElement(
            "strong"
          );

        pageName.textContent =
          item.name;


        var pageLink =
          document.createElement(
            "a"
          );

        pageLink.href =
          new URL(
            item.path,
            new URL("../", window.location.href)
          ).href;

        pageLink.target =
          "_blank";

        pageLink.rel =
          "noopener noreferrer";

        pageLink.textContent =
          "/" +
          item.path.replace(
            /^\/+/,
            ""
          );


        pageCell.appendChild(
          pageName
        );

        pageCell.appendChild(
          pageLink
        );


        /* -------------------------------------------------
           수정사항
        ------------------------------------------------- */
        var noteCell =
          document.createElement("td");

        noteCell.className =
          "note-cell";


        createNoteContent(
          noteCell,
          item.note
        );


        /* -------------------------------------------------
           상태
        ------------------------------------------------- */
        var statusCell =
          document.createElement("td");

        statusCell.className =
          "status-cell";


        var badge =
          document.createElement(
            "span"
          );

        badge.className =
          "badge " +
          getStatusClass(
            item.status
          );

        badge.textContent =
          getStatusLabel(
            item.status
          );


        statusCell.appendChild(
          badge
        );


        /* -------------------------------------------------
           접근성 검토
        ------------------------------------------------- */
        var a11yCell =
          document.createElement("td");

        a11yCell.className =
          "a11y-cell";


        var a11yBadge =
          document.createElement(
            "span"
          );

        a11yBadge.className =
          "badge " +
          getA11yClass(
            item.a11y
          );

        a11yBadge.textContent =
          getA11yLabel(
            item.a11y
          );


        a11yCell.appendChild(
          a11yBadge
        );


        if (item.a11yNote) {

          var a11yNote =
            document.createElement(
              "p"
            );

          a11yNote.className =
            "a11y-note";

          createNoteContent(
            a11yNote,
            item.a11yNote
          );

          a11yCell.appendChild(
            a11yNote
          );

        }


        /* -------------------------------------------------
           날짜
        ------------------------------------------------- */
        var dateCell =
          document.createElement("td");

        dateCell.className =
          "date-cell";

        dateCell.textContent =
          item.date;


        /* -------------------------------------------------
           TR 조립
        ------------------------------------------------- */
        tr.appendChild(
          pageCell
        );

        tr.appendChild(
          noteCell
        );

        tr.appendChild(
          statusCell
        );

        tr.appendChild(
          a11yCell
        );

        tr.appendChild(
          dateCell
        );


        return tr;

      }


      /* =====================================================
         통계
      ===================================================== */
      function renderStats() {

        var allCount =
          PAGE_DATA.length;


        var progressCount =
          PAGE_DATA.filter(
            function (item) {

              return (
                item.status ===
                "progress"
              );

            }
          ).length;


        var doneCount =
          PAGE_DATA.filter(
            function (item) {

              return (
                item.status ===
                "done"
              );

            }
          ).length;


        statAll.textContent =
          allCount;

        statProgress.textContent =
          progressCount;

        statDone.textContent =
          doneCount;

      }


      /* =====================================================
         현재 조건에 맞는 데이터 반환
      ===================================================== */
      function getFilteredData() {

        var keyword =
          normalize(
            state.search.trim()
          );


        return PAGE_DATA.filter(
          function (item) {


            /* ---------------------------------------------
               상태 필터
            --------------------------------------------- */
            var matchesFilter =

              state.filter === "all" ||

              item.status ===
              state.filter;


            /* ---------------------------------------------
               검색 필터
            --------------------------------------------- */
            var searchText =
              getSearchText(item);


            var matchesSearch =
              matchesKeyword(
                searchText,
                keyword
              );


            return (
              matchesFilter &&
              matchesSearch
            );

          }
        );

      }


      /* =====================================================
         TABLE 렌더링
      ===================================================== */
      function renderTable() {

        var filteredData =
          getFilteredData();


        /*
         * 기존 데이터 제거
         */
        pageList.innerHTML = "";


        /*
         * 검색 결과 없음
         */
        if (
          filteredData.length === 0
        ) {

          emptyState.hidden =
            false;

          return;

        }


        emptyState.hidden =
          true;


        /*
         * DocumentFragment 사용
         *
         * 행을 하나씩 DOM에 삽입하는 것보다
         * 한 번에 넣는 방식
         */
        var fragment =
          document.createDocumentFragment();


        filteredData.forEach(
          function (item) {

            fragment.appendChild(
              createRow(item)
            );

          }
        );


        pageList.appendChild(
          fragment
        );

      }


      /* =====================================================
         전체 화면 렌더링
      ===================================================== */
      function render() {

        renderStats();

        renderTable();

      }


      /* =====================================================
         TAB FILTER
      ===================================================== */
      tabs.forEach(
        function (tab) {

          tab.addEventListener(
            "click",
            function () {


              tabs.forEach(
                function (item) {

                  var isActive =
                    item === tab;


                  item.classList.toggle(
                    "is-active",
                    isActive
                  );


                  item.setAttribute(
                    "aria-pressed",
                    isActive
                      ? "true"
                      : "false"
                  );

                }
              );


              state.filter =
                tab.getAttribute(
                  "data-filter"
                );


              renderTable();

            }
          );

        }
      );


      /* =====================================================
         SEARCH
      ===================================================== */
      searchInput.addEventListener(
        "input",
        function () {

          state.search =
            searchInput.value;


          renderTable();

        }
      );


      /* =====================================================
         INIT
      ===================================================== */
      render();

    }
  );

})();
