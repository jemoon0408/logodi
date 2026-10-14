(function () {
  "use strict";


  /* =========================================================
     PROJECT ROOT

     sub-location-data.js
     /js/sub-location-data.js

    현재 페이지가
    /pages/info-disclosure/ 안에 있어도
     프로젝트 루트 기준으로 페이지 이동
  ========================================================= */

  const currentScript =
    document.currentScript;


  const PROJECT_ROOT_URL =
    currentScript
      ? new URL(
          "../",
          currentScript.src
        )
      : new URL(
          "../",
          window.location.href
        );


  /* =========================================================
     PROJECT URL
  ========================================================= */

  function getProjectURL(path) {

    if (!path) {
      return "";
    }


    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("//")
    ) {

      return path;

    }


    return new URL(
      path,
      PROJECT_ROOT_URL
    ).href;

  }



  /* =========================================================
     정보공개 메뉴 데이터


     구조


     [사이드 메뉴 - 1Depth]

     정보공개목록
     기관운영정보
     공공데이터개방
     정보공개청구


     ↓


     [SUB LOCATION]

     사이드에서 선택된 메뉴의
     하위메뉴만 하나의 SELECT로 표시


     예)

     사이드:
     정보공개목록

     SUB LOCATION:
     사전정보공표 목록
     문서공개목록
     정부포상 공개검증


     사이드:
     기관운영정보

     SUB LOCATION:
     훈령·예규
     업무추진비
     예산/결산/계약
     업무정보


     ★ sub-location에는 SELECT 1개만 사용
  ========================================================= */

  const INFO_MENU_DATA = [


    /* =========================================================
       정보공개목록
    ========================================================= */

    {
      value: "preinfo",

      label: "정보공개목록",

      /*
       * 사이드 메뉴 클릭 시
       * 대표 페이지
       */
      url:
        "pages/info-disclosure/program-action.html",

      children: [


        /* ========================= 사전정보공표 목록 ========================= */

        {
          value: "preinfo-list",

          label:
            "사전정보공표 목록",

          url:
            "pages/info-disclosure/program-action.html"
        },


        /* ========================= 문서공개목록 ========================= */

        {
          value:
            "document-list",

          label:
            "문서공개목록",
            
          url: "pages/info-disclosure/content-action.html"
        },


        /* ========================= 정부포상 공개검증 ========================= */

        {
          value:
            "government-award",

          label:
            "정부포상 공개검증",

          url:
            "pages/info-disclosure/board-action01.html"
        }


      ]
    },



    /* =========================================================
       기관운영정보
    ========================================================= */

    {
      value:
        "institution",

      label:
        "기관운영정보",

      /*
       * 사이드 메뉴 클릭 시
       * 대표 페이지
       */
      url:
        "pages/org-info/board-action02.html",

      children: [


        /* ========================= 훈령·예규 ========================= */

        {
          value:
            "rule",

          label:
            "훈령·예규",

          url:
            "pages/org-info/board-action02.html"
        },


        /* ========================= 업무추진비 ========================= */

        {
          value:
            "business-expense",

          label:
            "업무추진비",

          url: "pages/org-info/board-action03.html"
        },


        /* ========================= 예산/결산/계약 ========================= */

        {
          value:
            "budget",

          label:
            "예산/결산/계약",

          url: "pages/org-info/board-action04.html"
        },


        /* ========================= 업무정보 ========================= */

        {
          value:
            "business-info",

          label:
            "업무정보",

          url: "pages/info-disclosure/board-action05.html"
        }


      ]
    },



    /* =========================================================
       공공데이터개방
    ========================================================= */

    {
      value:
        "public-data",

      label:
        "공공데이터개방",

      /*
       * 실제 파일명 전달받지 않음
       */
      url: "",

      children: []
    },



    /* =========================================================
       정보공개청구
    ========================================================= */

    {
      value:
        "info-request",

      label:
        "정보공개청구",

      /*
       * 실제 파일명 전달받지 않음
       */
      url: "",

      children: []
    }


  ];



  /* =========================================================
     소통마당 메뉴 데이터


     [사이드 메뉴 - 1Depth]

     새소식
     학습자료실
     지역상생발전
     온라인민원
     국민행복제안
  ========================================================= */

  const COMMUNICATION_MENU_DATA = [


    /* =========================================================
       새소식
    ========================================================= */

    {
      value:
        "news",

      label:
        "새소식",

      url:
        "pages/communication/board-action06.html",

      children: [


        /* ========================= 보도자료/언론보도 ========================= */

        {
          value:
            "press-release",

          label:
            "보도자료/언론보도",

          url:
            "pages/communication/board-action06.html"
        },


        /* ========================= 공고 ========================= */

        {
          value:
            "announcement",

          label:
            "공고",

          url:
            "pages/communication/board-action07.html"
        },


        /* ========================= 자치인재원 News ========================= */

        {
          value:
            "logodi-news",

          label:
            "자치인재원 News",

          url:
            "pages/communication/board-action08.html"
        },


        /* ========================= 공지사항 ========================= */

        {
          value:
            "notice",

          label:
            "공지사항",

          url:
            "pages/communication/board-action09.html"
        }


      ]
    },



    /* =========================================================
       학습자료실
    ========================================================= */

    {
      value:
        "learning",

      label:
        "학습자료실",

      url:
        "pages/communication/board-action10.html",

      children: [


        /* ========================= 공통교재 ========================= */

        {
          value:
            "common-textbook",

          label:
            "공통교재",

          url:
            "pages/communication/board-action10.html"
        },


        /* ========================= 베스트강의 ========================= */

        {
          value:
            "best-lecture",

          label:
            "베스트강의",

          /*
           * 실제 파일명 전달받지 않음
           */
          url: ""
        },


        /* ========================= 책으로 읽는 명강의 ========================= */

        {
          value:
            "book-lecture",

          label:
            "책으로 읽는 명강의",

          url: ""
        },


        /* ========================= 학술자료실 & 연구용역 ========================= */

        {
          value:
            "research",

          label:
            "학술자료실 & 연구용역",

          url: ""
        }


      ]
    },



    /* =========================================================
       지역상생발전
    ========================================================= */

    {
      value:
        "regional-development",

      label:
        "지역상생발전",

      url:
        "pages/communication/content-action01.html",

      children: []
    },



    /* =========================================================
       온라인민원
    ========================================================= */

    {
      value:
        "online-civil",

      label:
        "온라인민원",

      url: "",

      children: [

        {
          value:
            "online-civil-apply",

          label:
            "온라인민원신청",

          url: ""
        },

        {
          value:
            "online-civil-my",

          label:
            "나의 민원보기",

          url: ""
        }

      ]
    },



    /* =========================================================
       국민행복제안
    ========================================================= */

    {
      value:
        "proposal",

      label:
        "국민행복제안",

      url: "",

      children: [

        {
          value:
            "proposal-apply",

          label:
            "국민행복제안 신청",

          url: ""
        }

      ]
    }


  ];



  /* =========================================================
     기관소개 메뉴 데이터


     [사이드 메뉴 - 1Depth]

     기관소개
     홍보관
     조직안내
     시설안내
     오시는 길
     주간식단
  ========================================================= */

  const ABOUT_MENU_DATA = [


    /* =========================================================
       기관소개
    ========================================================= */

    {
      value:
        "intro",

      label:
        "기관소개",

      url:
        "pages/about/content-action13.html",

      children: [


        /* ========================= 인사말 ========================= */

        {
          value:
            "greeting",

          label:
            "인사말",

          /*
           * 페이지 내 탭 : 인사말 / 역대원장
           */
          url:
            "pages/about/content-action13.html"
        },


        /* ========================= 연혁 ========================= */

        {
          value:
            "history",

          label:
            "연혁",

          url:
            "pages/about/content-action02.html"
        },


        /* ========================= 비전과 인재상 ========================= */

        {
          value:
            "vision",

          label:
            "비전과 인재상",

          url:
            "pages/about/content-action03.html"
        },


        /* ========================= MI ========================= */

        {
          value:
            "mi",

          label:
            "MI",

          url:
            "pages/about/content-action04.html"
        },


        /* ========================= 60주년 로고 ========================= */

        {
          value:
            "logo60",

          label:
            "60주년 로고",

          url:
            "pages/about/content-action05.html"
        }


      ]
    },



    /* =========================================================
       홍보관
       - 홍보자료 : 페이지 내 탭 (홍보 동영상 / 브로슈어 / 60년사 / 20년사)
    ========================================================= */

    {
      value: "pr",
      label: "홍보관",
      url: "pages/about/content-action06.html",
      children: [

        {
          value: "pr-materials",
          label: "홍보자료",
          url: "pages/about/content-action06.html"
        },

        {
          value: "photo-gallery",
          label: "포토갤러리",
          url: ""
        },

        {
          value: "newsletter",
          label: "소식지",
          url: ""
        },

        {
          value: "annual-report",
          label: "연보",
          url: ""
        }

      ]
    },



    /* =========================================================
       조직안내
       - 조직 및 직원 : 페이지 내 탭 (조직도 / 직원검색)
    ========================================================= */

    {
      value: "organization",
      label: "조직안내",
      url: "pages/about/content-action09.html",
      children: [

        {
          value: "org-staff",
          label: "조직 및 직원",
          url: "pages/about/content-action09.html"
        },

        {
          value: "professors",
          label: "교수진",
          url: "pages/about/content-action40.html"
        }

      ]
    },



    /* =========================================================
       시설안내
       - 시설현황 : 페이지 내 탭 (강의시설 ~ 인비전 스튜디오)
       - 주변안내 : 페이지 내 탭 (주변안내 / 공공 및 편의시설안내)
    ========================================================= */

    {
      value: "facility",
      label: "시설안내",
      url: "pages/about/content-action41.html",
      children: [

        {
          value: "facility-status",
          label: "시설현황",
          url: "pages/about/content-action41.html"
        },

        {
          value: "nearby",
          label: "주변안내",
          url: "pages/about/content-action44.html"
        }

      ]
    },



    /* =========================================================
       오시는 길 : content-action45 / 주간식단 (실제 파일명 전달받지 않음)
    ========================================================= */

    {
      value: "directions",
      label: "오시는 길",
      url: "pages/about/content-action45.html",
      children: []
    },

    {
      value: "weekly-menu",
      label: "주간식단",
      url: "",
      children: []
    }


  ];



  /* =========================================================
     교육과정 메뉴 데이터

     [사이드 메뉴 - 1Depth]
     교육과정소개 / 교육훈련계획 / 역량평가/역량교육 / 의정연수

     하위메뉴 안의 1차·2차 구분은 페이지 내 공통 탭(.sub-tab-wrap)으로 처리
     url 이 빈 값인 메뉴는 아직 페이지 미제작
  ========================================================= */

  const EDUCATION_MENU_DATA = [

    {
      value: "edu-intro",
      label: "교육과정소개",
      url: "pages/education/content-action28.html",
      children: [
        { value: "course-type", label: "교육과정유형", url: "pages/education/content-action28.html" },
        { value: "selection",   label: "선발/입교안내", url: "pages/education/content-action37.html" }
      ]
    },

    {
      value: "edu-plan",
      label: "교육훈련계획",
      url: "pages/education/content-action38.html",
      children: [
        { value: "annual",  label: "연간 교육훈련계획", url: "" },
        { value: "monthly", label: "월간 교육훈련계획", url: "pages/education/content-action38.html" },
        { value: "weekly",  label: "주간 교육훈련계획", url: "pages/education/board-action19.html" }
      ]
    },

    {
      value: "edu-competency",
      label: "역량평가/역량교육",
      url: "pages/education/content-action39.html",
      children: [
        { value: "understand", label: "역량에 대한 이해", url: "" },
        { value: "assessment", label: "역량평가",         url: "" },
        { value: "competency", label: "역량교육",         url: "" },
        { value: "guide",      label: "안내자료",         url: "pages/education/content-action39.html" }
      ]
    },

    {
      value: "edu-council",
      label: "의정연수",
      url: "pages/education/board-action20.html",
      children: [
        { value: "center", label: "의정연수센터 소개", url: "" },
        { value: "plan",   label: "교육운영계획",     url: "" },
        { value: "course", label: "교육과정안내",     url: "" },
        { value: "pds",    label: "자료실",           url: "pages/education/board-action20.html" }
      ]
    }

  ];



  /* =========================================================
     교류협력 메뉴 데이터

     [사이드 메뉴 - 1Depth]
     국내교류협력 / 국제교류협력

     하위메뉴 안의 1차·2차 구분은 페이지 내 공통 탭(.sub-tab-wrap)으로 처리
  ========================================================= */

  const EXCHANGE_MENU_DATA = [

    {
      value: "domestic",
      label: "국내교류협력",
      url: "pages/exchange/content-action17.html",
      children: [
        { value: "sido",    label: "시도 교육원협력", url: "pages/exchange/content-action17.html" },
        { value: "hrd",     label: "HRD/발표대회",   url: "pages/exchange/content-action20.html" },
        { value: "pp",      label: "민관협력",       url: "pages/exchange/content-action22.html" }
      ]
    },

    {
      value: "international",
      label: "국제교류협력",
      url: "pages/exchange/content-action25.html",
      children: [
        { value: "foreign",  label: "외국기관협력", url: "pages/exchange/content-action25.html" },
        { value: "intl-org", label: "국제기구활동", url: "pages/exchange/content-action26.html" },
        { value: "seminar",  label: "세미나",       url: "pages/exchange/content-action27.html" }
      ]
    }

  ];



  /* =========================================================
     대메뉴(섹션) 데이터

     페이지의 data-selected(1Depth 값)로
     어느 대메뉴에 속하는지 자동으로 찾는다.

     ★ 1Depth value는 섹션 간에 중복되지 않게 작성
  ========================================================= */

  const SUB_LOCATION_SECTIONS = [

    {
      value: "info",
      label: "정보공개",
      menus: INFO_MENU_DATA
    },

    {
      value: "education",
      label: "교육과정",
      menus: EDUCATION_MENU_DATA
    },

    {
      value: "exchange",
      label: "교류협력",
      menus: EXCHANGE_MENU_DATA
    },

    {
      value: "communication",
      label: "소통마당",
      menus: COMMUNICATION_MENU_DATA
    },

    {
      value: "about",
      label: "기관소개",
      menus: ABOUT_MENU_DATA
    }

  ];


  let currentSection =
    SUB_LOCATION_SECTIONS[0];



  /* =========================================================
     1Depth 값으로 섹션 찾기
  ========================================================= */

  function findSection(
    depth1Value
  ) {

    return (
      SUB_LOCATION_SECTIONS.find(
        function (section) {

          return section.menus.some(
            function (menu) {

              return (
                menu.value ===
                depth1Value
              );

            }
          );

        }
      ) || SUB_LOCATION_SECTIONS[0]
    );

  }



  /* =========================================================
     1Depth 메뉴 찾기
  ========================================================= */

  function getDepth1Menu(
    value
  ) {

    return (
      currentSection.menus.find(
        function (menu) {

          return (
            menu.value ===
            value
          );

        }
      ) || null
    );

  }



  /* =========================================================
     하위 메뉴 찾기
  ========================================================= */

  function getChildMenu(
    parentValue,
    childValue
  ) {

    const parentMenu =
      getDepth1Menu(
        parentValue
      );


    if (
      !parentMenu ||
      !Array.isArray(
        parentMenu.children
      )
    ) {

      return null;

    }


    return (
      parentMenu.children.find(
        function (menu) {

          return (
            menu.value ===
            childValue
          );

        }
      ) || null
    );

  }



  /* =========================================================
     OPTION 생성
  ========================================================= */

  function createOption(
    item,
    selectedValue
  ) {

    const option =
      document.createElement(
        "option"
      );


    option.value =
      item.value;


    option.textContent =
      item.label;


    if (item.url) {

      option.dataset.url =
        item.url;

    }


    if (
      item.value ===
      selectedValue
    ) {

      option.selected =
        true;

    }


    return option;

  }



  /* =========================================================
     OPTION 렌더링
  ========================================================= */

  function renderOptions(
    select,
    items,
    selectedValue
  ) {

    const fragment =
      document.createDocumentFragment();


    select.innerHTML =
      "";


    items.forEach(
      function (item) {

        fragment.appendChild(
          createOption(
            item,
            selectedValue
          )
        );

      }
    );


    select.appendChild(
      fragment
    );


    const selectedExists =
      items.some(
        function (item) {

          return (
            item.value ===
            selectedValue
          );

        }
      );


    /*
     * 현재 페이지에 해당하는
     * selected 값이 없으면
     * 첫 번째 메뉴 선택
     */
    if (
      !selectedExists &&
      select.options.length
    ) {

      select.selectedIndex =
        0;

    }

  }



  /* =========================================================
     CUSTOM SELECT REFRESH
  ========================================================= */

  function refreshCustomSelect(
    select
  ) {

    if (
      !select ||
      !window.SubLocationSelect ||
      typeof window.SubLocationSelect.refresh !==
        "function"
    ) {

      return;

    }


    window.SubLocationSelect.refresh(
      select
    );

  }



  /* =========================================================
     기존 2Depth SELECT 제거


     현재 HTML

     [1Depth SELECT]
     [2Depth SELECT]


     ↓


     변경 후

     [하위메뉴 SELECT]


     첫 번째 SELECT를
     하위메뉴 SELECT로 재사용한다.
  ========================================================= */

  function normalizeSubLocation() {

    const firstSelect =
      document.querySelector(
        '[data-sub-location-depth="1"]'
      );


    const secondSelect =
      document.querySelector(
        '[data-sub-location-depth="2"]'
      );


    if (!firstSelect) {

      return null;

    }


    /*
     * 기존 HTML에 설정된 값
     *
     * 첫 번째 SELECT
     * data-selected="preinfo"
     *
     * 두 번째 SELECT
     * data-selected="preinfo-list"
     *
     * 이 값들을 가져와서
     * 하나의 SELECT로 합친다.
     */

    const parentValue =
      firstSelect.dataset.selected ||
      "";


    const childValue =
      secondSelect
        ? secondSelect.dataset.selected || ""
        : firstSelect.dataset.current || "";


    /*
     * 기존 두 번째 SELECT 제거
     */
    if (secondSelect) {

      const secondWrapper =
        secondSelect.closest(
          "[data-sub-location-select]"
        );


      if (secondWrapper) {

        secondWrapper.remove();

      }

    }


    /*
     * 첫 번째 SELECT를
     * 하위메뉴 SELECT로 변경
     */

    firstSelect.removeAttribute(
      "data-sub-location-depth"
    );


    firstSelect.setAttribute(
      "data-sub-location-menu",
      ""
    );


    firstSelect.dataset.parent =
      parentValue;


    firstSelect.dataset.selected =
      childValue;


    firstSelect.setAttribute(
      "aria-label",
      "하위 메뉴 선택"
    );


    /*
     * LABEL도 변경
     */

    const wrapper =
      firstSelect.closest(
        "[data-sub-location-select]"
      );


    if (wrapper) {

      const label =
        wrapper.querySelector(
          "label"
        );


      if (label) {

        label.textContent =
          "하위 메뉴 선택";

      }

    }


    return {
      select:
        firstSelect,

      parentValue:
        parentValue,

      childValue:
        childValue
    };

  }



  /* =========================================================
     SUB LOCATION 렌더링


     사이드에서 선택된 1Depth의
     children만 표시
  ========================================================= */

  function renderSubLocation(
    select,
    parentValue,
    selectedValue
  ) {

    const parentMenu =
      getDepth1Menu(
        parentValue
      );


    if (!parentMenu) {

      return;

    }


    const wrapper =
      select.closest(
        "[data-sub-location-select]"
      );


    /*
     * 하위메뉴가 없으면
     * sub-location select 숨김
     */
    if (
      !Array.isArray(
        parentMenu.children
      ) ||
      !parentMenu.children.length
    ) {

      select.innerHTML =
        "";


      if (wrapper) {

        wrapper.hidden =
          true;

      }


      return;

    }


    if (wrapper) {

      wrapper.hidden =
        false;

    }


    renderOptions(
      select,
      parentMenu.children,
      selectedValue
    );


    refreshCustomSelect(
      select
    );

  }



  /* =========================================================
     SIDE MENU ACTIVE
  ========================================================= */

  function updateSideMenu(
    parentValue
  ) {

    const links =
      document.querySelectorAll(
        ".sub-lnb__menu [data-sub-lnb-value]"
      );


    links.forEach(
      function (link) {

        const isActive =
          (
            link.dataset.subLnbValue ===
            parentValue
          );


        link.classList.toggle(
          "is-active",
          isActive
        );


        if (isActive) {

          link.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          link.removeAttribute(
            "aria-current"
          );

        }

      }
    );

  }



  /* =========================================================
     SIDE MENU URL 연결
  ========================================================= */

  function updateSideMenuLinks() {

    const links =
      document.querySelectorAll(
        ".sub-lnb__menu [data-sub-lnb-value]"
      );


    links.forEach(
      function (link) {

        const menu =
          getDepth1Menu(
            link.dataset.subLnbValue
          );


        if (
          !menu ||
          !menu.url
        ) {

          return;

        }


        link.setAttribute(
          "href",
          getProjectURL(
            menu.url
          )
        );

      }
    );

  }



  /* =========================================================
     TITLE / BREADCRUMB
  ========================================================= */

  function updatePageInfo(
    parentValue,
    childValue
  ) {

    const parentMenu =
      getDepth1Menu(
        parentValue
      );


    const childMenu =
      getChildMenu(
        parentValue,
        childValue
      );


    /*
     * 3Depth(페이지 내 탭) 페이지 이름
     *
     * <main data-page-label="브로슈어"> 처럼 지정하면
     * 브레드크럼 마지막 / 본문 제목 / 문서 제목에
     * 하위메뉴 이름 대신 이 값을 사용
     */
    const pageLabelElement =
      document.querySelector(
        "[data-page-label]"
      );


    const pageLabel =
      pageLabelElement
        ? pageLabelElement.dataset.pageLabel
        : (childMenu ? childMenu.label : "");


    /* ========================= 서브 비주얼 대제목 ========================= */

    const visualTitle =
      document.querySelector(
        ".sub-visual__title"
      );


    if (visualTitle) {

      visualTitle.textContent =
        currentSection.label;

    }



    /* ========================= 사이드 제목 ========================= */

    const sideTitle =
      document.querySelector(
        ".sub-lnb__head h2"
      );


    if (sideTitle) {

      sideTitle.textContent =
        currentSection.label;

    }



    /* ========================= BREADCRUMB 1 ========================= */

    const breadcrumbDepth1 =
      document.querySelector(
        ".sub-visual__breadcrumb-depth--1"
      );


    if (breadcrumbDepth1) {

      breadcrumbDepth1.textContent =
        currentSection.label;

    }



    /* ========================= BREADCRUMB 2 ========================= */

    const breadcrumbDepth2 =
      document.querySelector(
        ".sub-visual__breadcrumb-depth--2 .sub-visual__breadcrumb-depth-text"
      );


    if (
      breadcrumbDepth2 &&
      parentMenu
    ) {

      breadcrumbDepth2.textContent =
        parentMenu.label;

    }



    /* ========================= BREADCRUMB 3 ========================= */

    const breadcrumbDepth3 =
      document.querySelector(
        ".sub-visual__breadcrumb-depth--3"
      );


    if (
      breadcrumbDepth3 &&
      pageLabel
    ) {

      breadcrumbDepth3.textContent =
        pageLabel;

    }



    /* ========================= CONTENT TITLE ========================= */

    const contentTitle =
      document.querySelector(
        ".sub-page-title h2"
      );


    if (
      contentTitle &&
      pageLabel
    ) {

      contentTitle.textContent =
        pageLabel;

    }



    /* ========================= DOCUMENT TITLE ========================= */

    if (pageLabel) {

      document.title =
        pageLabel +
        " | 지방자치인재개발원";

    }



    /* ========================= SIDE ACTIVE ========================= */

    updateSideMenu(
      parentValue
    );

  }



  /* =========================================================
     PAGE 이동
  ========================================================= */

  function goToMenu(
    menu
  ) {

    if (
      !menu ||
      !menu.url
    ) {

      return;

    }


    const targetURL =
      getProjectURL(
        menu.url
      );


    if (!targetURL) {

      return;

    }


    window.location.assign(
      targetURL
    );

  }



  /* =========================================================
     메뉴 URL 찾기
     - 메뉴에 url이 없으면 첫 번째로 url이 있는 하위메뉴 사용
  ========================================================= */

  function getMenuURL(menu) {

    if (!menu) {
      return "";
    }

    if (menu.url) {
      return menu.url;
    }

    if (Array.isArray(menu.children)) {

      const child =
        menu.children.find(function (item) {
          return !!item.url;
        });

      return child ? child.url : "";

    }

    return "";

  }


  function getSectionURL(section) {

    const menu =
      section.menus.find(function (item) {
        return !!getMenuURL(item);
      });

    return menu ? getMenuURL(menu) : "";

  }



  /* =========================================================
     SUB LOCATION : 대메뉴 / 1Depth / 2Depth SELECT 생성

     <div class="sub-location__menus">
       [대메뉴 SELECT] [1Depth SELECT] [2Depth SELECT]
     </div>

     - 하위메뉴가 없는 1Depth 는 2Depth SELECT 를 만들지 않음
     - 커스텀 UI 는 sub-location-common.js 가 생성
  ========================================================= */

  function createLocationSelect(id, depth, label, items, selectedValue) {

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "sub-location-select";

    wrapper.setAttribute(
      "data-sub-location-select",
      ""
    );


    const labelElement =
      document.createElement("label");

    labelElement.className =
      "sr-only";

    labelElement.setAttribute(
      "for",
      id
    );

    labelElement.textContent =
      label;


    const select =
      document.createElement("select");

    select.id =
      id;

    select.className =
      "sub-location-select__native";

    select.setAttribute(
      "data-sub-location-level",
      String(depth)
    );

    select.setAttribute(
      "aria-label",
      label
    );


    items.forEach(function (item) {

      const option =
        document.createElement("option");

      option.value =
        item.value;

      option.textContent =
        item.label;

      option.dataset.url =
        item.url || "";

      if (item.value === selectedValue) {
        option.selected = true;
      }

      select.appendChild(option);

    });


    wrapper.appendChild(labelElement);
    wrapper.appendChild(select);

    return wrapper;

  }


  function buildSubLocation(parentValue, childValue) {

    const container =
      document.querySelector(
        ".sub-location__menus"
      );

    if (!container) {
      return;
    }


    container.innerHTML =
      "";


    /* ---------- 대메뉴 ---------- */

    const sectionItems =
      SUB_LOCATION_SECTIONS.map(function (section) {
        return {
          value: section.value,
          label: section.label,
          url: getSectionURL(section)
        };
      });

    container.appendChild(
      createLocationSelect(
        "subLocationSection",
        0,
        "대메뉴 선택",
        sectionItems,
        currentSection.value
      )
    );


    /* ---------- 1Depth ---------- */

    const depth1Items =
      currentSection.menus.map(function (menu) {
        return {
          value: menu.value,
          label: menu.label,
          url: getMenuURL(menu)
        };
      });

    container.appendChild(
      createLocationSelect(
        "subLocationDepth1",
        1,
        "1단계 메뉴 선택",
        depth1Items,
        parentValue
      )
    );


    /* ---------- 2Depth ---------- */

    const parentMenu =
      getDepth1Menu(parentValue);

    if (
      parentMenu &&
      Array.isArray(parentMenu.children) &&
      parentMenu.children.length
    ) {

      container.appendChild(
        createLocationSelect(
          "subLocationDepth2",
          2,
          "2단계 메뉴 선택",
          parentMenu.children,
          childValue
        )
      );

    }


    /* ---------- 선택 시 페이지 이동 ---------- */

    container
      .querySelectorAll(".sub-location-select__native")
      .forEach(function (select) {

        select.addEventListener(
          "change",
          function () {

            const option =
              select.options[select.selectedIndex];

            const url =
              option ? option.dataset.url : "";

            if (url) {
              window.location.assign(
                getProjectURL(url)
              );
            }

          }
        );

      });

  }



  /* =========================================================
     LEFT MENU (sub-lnb) : 1Depth + 2Depth 아코디언
     (Figma 635:14750 "이게 진짜 메뉴임")

     - 하위메뉴가 있는 1Depth : 버튼(펼침/접힘)
     - 하위메뉴가 없는 1Depth : 링크
     - 현재 페이지가 속한 1Depth 는 펼친 상태로 시작
  ========================================================= */

  function buildSideMenu(parentValue, childValue) {

    const list =
      document.querySelector(
        ".sub-lnb__menu > ul"
      );

    if (!list) {
      return;
    }


    const nav =
      list.closest(".sub-lnb__menu");

    if (nav) {
      nav.classList.add("sub-lnb__menu--tree");
    }


    list.innerHTML =
      "";


    currentSection.menus.forEach(function (menu, index) {

      const item =
        document.createElement("li");

      item.className =
        "sub-lnb__item";

      const isCurrent =
        menu.value === parentValue;

      const hasChildren =
        Array.isArray(menu.children) &&
        menu.children.length > 0;


      if (!hasChildren) {

        const link =
          document.createElement("a");

        link.className =
          "sub-lnb__row";

        link.href =
          getMenuURL(menu)
            ? getProjectURL(getMenuURL(menu))
            : "#";

        link.textContent =
          menu.label;

        if (isCurrent) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        }

        item.appendChild(link);
        list.appendChild(item);

        return;

      }


      const panelId =
        "subLnbPanel" + (index + 1);

      const button =
        document.createElement("button");

      button.type =
        "button";

      button.className =
        "sub-lnb__row sub-lnb__toggle";

      button.setAttribute(
        "aria-expanded",
        isCurrent ? "true" : "false"
      );

      button.setAttribute(
        "aria-controls",
        panelId
      );

      button.innerHTML =
        "<span class=\"sub-lnb__label\"></span>" +
        "<span class=\"sub-lnb__icon\" aria-hidden=\"true\"></span>";

      button.querySelector(".sub-lnb__label").textContent =
        menu.label;

      if (isCurrent) {
        button.classList.add("is-active");
        item.classList.add("is-current");
      }


      const sub =
        document.createElement("ul");

      sub.className =
        "sub-lnb__sub";

      sub.id =
        panelId;

      sub.hidden =
        !isCurrent;


      menu.children.forEach(function (child) {

        const childItem =
          document.createElement("li");

        const link =
          document.createElement("a");

        link.className =
          "sub-lnb__sublink";

        link.href =
          child.url
            ? getProjectURL(child.url)
            : "#";

        link.textContent =
          child.label;

        if (isCurrent && child.value === childValue) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        }

        childItem.appendChild(link);
        sub.appendChild(childItem);

      });


      button.addEventListener(
        "click",
        function () {

          const open =
            button.getAttribute("aria-expanded") !== "true";

          button.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
          );

          sub.hidden =
            !open;

          item.classList.toggle("is-open", open);

        }
      );


      if (isCurrent) {
        item.classList.add("is-open");
      }

      item.appendChild(button);
      item.appendChild(sub);
      list.appendChild(item);

    });

  }



  /* =========================================================
     INIT
  ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      /*
       * 페이지 HTML 의 기존 표기
       * [data-sub-location-depth="1"] data-selected : 1Depth 값
       * [data-sub-location-depth="2"] data-selected : 2Depth 값
       */
      const depth1Select =
        document.querySelector(
          '[data-sub-location-depth="1"]'
        );

      const depth2Select =
        document.querySelector(
          '[data-sub-location-depth="2"]'
        );


      if (!depth1Select) {
        return;
      }


      const parentValue =
        depth1Select.dataset.selected || "";

      currentSection =
        findSection(parentValue);


      let childValue =
        depth2Select
          ? depth2Select.dataset.selected || ""
          : "";


      /* 2Depth 값이 없으면 첫 번째 하위메뉴로 간주 */
      const parentMenu =
        getDepth1Menu(parentValue);

      if (
        !childValue &&
        parentMenu &&
        Array.isArray(parentMenu.children) &&
        parentMenu.children.length
      ) {
        childValue = parentMenu.children[0].value;
      }


      buildSubLocation(
        parentValue,
        childValue
      );

      buildSideMenu(
        parentValue,
        childValue
      );

      updatePageInfo(
        parentValue,
        childValue
      );

    }
  );



  /* =========================================================
     외부 공개
  ========================================================= */

  window.SUB_LOCATION_SECTIONS =
    SUB_LOCATION_SECTIONS;


})();