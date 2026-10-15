(function () {
  "use strict";

  const customSelects = new Map();

  let openedSelect = null;
  let selectSequence = 0;


  function getSelectedIndex(select) {
    if (select.selectedIndex >= 0) {
      return select.selectedIndex;
    }

    const options =
      Array.from(select.options);

    return options.findIndex(
      function (option) {
        return !option.disabled;
      }
    );
  }


  function getEnabledOptions(instance) {
    return instance.optionElements.filter(
      function (optionElement) {
        return (
          optionElement.getAttribute(
            "aria-disabled"
          ) !== "true"
        );
      }
    );
  }


  function updateButtonText(instance) {
    const selectedIndex =
      getSelectedIndex(
        instance.select
      );

    const selectedOption =
      instance.select.options[
        selectedIndex
      ];

    instance.text.textContent =
      selectedOption
        ? selectedOption.textContent.trim()
        : "";
  }


  function updateSelectedState(instance) {
    const selectedIndex =
      getSelectedIndex(
        instance.select
      );

    instance.optionElements.forEach(
      function (
        optionElement,
        index
      ) {
        const isSelected =
          index === selectedIndex;

        optionElement.setAttribute(
          "aria-selected",
          String(isSelected)
        );

        optionElement.classList.toggle(
          "is-selected",
          isSelected
        );
      }
    );

    updateButtonText(
      instance
    );
  }


  function closeCustomSelect(
    instance,
    returnFocus
  ) {
    if (!instance) {
      return;
    }

    instance.wrapper.classList.remove(
      "is-open"
    );

    instance.button.setAttribute(
      "aria-expanded",
      "false"
    );

    instance.list.hidden = true;

    if (
      openedSelect === instance
    ) {
      openedSelect = null;
    }

    if (returnFocus) {
      instance.button.focus();
    }
  }


  function closeOtherSelects(
    currentInstance
  ) {
    customSelects.forEach(
      function (instance) {
        if (
          instance !== currentInstance &&
          instance.button.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {
          closeCustomSelect(
            instance,
            false
          );
        }
      }
    );
  }


  function focusFirstOption(instance) {
    const options =
      getEnabledOptions(instance);

    if (options.length) {
      options[0].focus();
    }
  }


  function focusLastOption(instance) {
    const options =
      getEnabledOptions(instance);

    if (options.length) {
      options[
        options.length - 1
      ].focus();
    }
  }


  function focusSelectedOption(instance) {
    const selectedIndex =
      getSelectedIndex(
        instance.select
      );

    const selectedOption =
      instance.optionElements[
        selectedIndex
      ];

    if (
      selectedOption &&
      selectedOption.getAttribute(
        "aria-disabled"
      ) !== "true"
    ) {
      selectedOption.focus();

      selectedOption.scrollIntoView({
        block: "nearest"
      });

      return;
    }

    focusFirstOption(
      instance
    );
  }


  function openCustomSelect(
    instance,
    focusType
  ) {
    if (
      !instance ||
      instance.select.disabled ||
      !instance.optionElements.length
    ) {
      return;
    }

    closeOtherSelects(
      instance
    );

    instance.wrapper.classList.add(
      "is-open"
    );

    instance.button.setAttribute(
      "aria-expanded",
      "true"
    );

    instance.list.hidden = false;

    openedSelect = instance;

    requestAnimationFrame(
      function () {
        if (
          focusType === "first"
        ) {
          focusFirstOption(
            instance
          );

          return;
        }

        if (
          focusType === "last"
        ) {
          focusLastOption(
            instance
          );

          return;
        }

        focusSelectedOption(
          instance
        );
      }
    );
  }


  function toggleCustomSelect(
    instance
  ) {
    const isOpen =
      instance.button.getAttribute(
        "aria-expanded"
      ) === "true";

    if (isOpen) {
      closeCustomSelect(
        instance,
        false
      );

      return;
    }

    openCustomSelect(
      instance,
      "selected"
    );
  }


  function moveOptionFocus(
    instance,
    currentOption,
    direction
  ) {
    const options =
      getEnabledOptions(
        instance
      );

    if (!options.length) {
      return;
    }

    const currentIndex =
      options.indexOf(
        currentOption
      );

    let nextIndex =
      currentIndex +
      direction;

    if (nextIndex < 0) {
      nextIndex =
        options.length - 1;
    }

    if (
      nextIndex >=
      options.length
    ) {
      nextIndex = 0;
    }

    options[
      nextIndex
    ].focus();

    options[
      nextIndex
    ].scrollIntoView({
      block: "nearest"
    });
  }


  function selectOption(
    instance,
    optionElement
  ) {
    if (
      optionElement.getAttribute(
        "aria-disabled"
      ) === "true"
    ) {
      return;
    }

    const optionIndex =
      Number(
        optionElement.dataset.optionIndex
      );

    if (
      !instance.select.options[
        optionIndex
      ]
    ) {
      return;
    }

    instance.select.selectedIndex =
      optionIndex;

    updateSelectedState(
      instance
    );

    instance.select.dispatchEvent(
      new Event(
        "change",
        {
          bubbles: true
        }
      )
    );

    closeCustomSelect(
      instance,
      true
    );
  }


  function createOption(
    instance,
    nativeOption,
    index
  ) {
    const optionElement =
      document.createElement(
        "li"
      );

    optionElement.className =
      "sub-location-select__option";

    optionElement.id =
      instance.list.id +
      "-option-" +
      index;

    optionElement.setAttribute(
      "role",
      "option"
    );

    optionElement.setAttribute(
      "tabindex",
      nativeOption.disabled
        ? "-1"
        : "0"
    );

    optionElement.setAttribute(
      "aria-selected",
      String(
        nativeOption.selected
      )
    );

    optionElement.setAttribute(
      "aria-disabled",
      String(
        nativeOption.disabled
      )
    );

    optionElement.dataset.optionIndex =
      String(index);

    optionElement.textContent =
      nativeOption.textContent.trim();

    if (
      nativeOption.disabled
    ) {
      optionElement.classList.add(
        "is-disabled"
      );
    }

    return optionElement;
  }


  function renderOptions(instance) {
    instance.list.innerHTML = "";

    instance.optionElements = [];

    const fragment =
      document.createDocumentFragment();

    Array.from(
      instance.select.options
    ).forEach(
      function (
        nativeOption,
        index
      ) {
        const optionElement =
          createOption(
            instance,
            nativeOption,
            index
          );

        instance.optionElements.push(
          optionElement
        );

        fragment.appendChild(
          optionElement
        );
      }
    );

    instance.list.appendChild(
      fragment
    );

    instance.button.disabled =
      instance.select.disabled;

    instance.wrapper.classList.toggle(
      "is-disabled",
      instance.select.disabled
    );

    updateSelectedState(
      instance
    );
  }


  function handleButtonKeydown(
    event,
    instance
  ) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        openCustomSelect(
          instance,
          "selected"
        );

        break;


      case "ArrowUp":
        event.preventDefault();

        openCustomSelect(
          instance,
          "last"
        );

        break;


      case "Enter":
      case " ":
        event.preventDefault();

        toggleCustomSelect(
          instance
        );

        break;


      case "Home":
        event.preventDefault();

        openCustomSelect(
          instance,
          "first"
        );

        break;


      case "End":
        event.preventDefault();

        openCustomSelect(
          instance,
          "last"
        );

        break;


      case "Escape":
        if (
          instance.button.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {
          event.preventDefault();

          closeCustomSelect(
            instance,
            true
          );
        }

        break;
    }
  }


  function handleOptionKeydown(
    event,
    instance
  ) {
    const currentOption =
      event.target.closest(
        ".sub-location-select__option"
      );

    if (!currentOption) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        moveOptionFocus(
          instance,
          currentOption,
          1
        );

        break;


      case "ArrowUp":
        event.preventDefault();

        moveOptionFocus(
          instance,
          currentOption,
          -1
        );

        break;


      case "Home":
        event.preventDefault();

        focusFirstOption(
          instance
        );

        break;


      case "End":
        event.preventDefault();

        focusLastOption(
          instance
        );

        break;


      case "Enter":
      case " ":
        event.preventDefault();

        selectOption(
          instance,
          currentOption
        );

        break;


      case "Escape":
        event.preventDefault();

        closeCustomSelect(
          instance,
          true
        );

        break;
    }
  }


  function buildCustomSelect(
    select
  ) {
    const existingInstance =
      customSelects.get(
        select
      );

    if (existingInstance) {
      renderOptions(
        existingInstance
      );

      return existingInstance;
    }


    const wrapper =
      select.closest(
        "[data-sub-location-select]"
      );

    if (!wrapper) {
      return null;
    }


    selectSequence += 1;


    if (!select.id) {
      select.id =
        "subLocationSelect" +
        selectSequence;
    }


    let label =
      wrapper.querySelector(
        'label[for="' +
        select.id +
        '"]'
      );

    if (!label) {
      label =
        wrapper.querySelector(
          "label"
        );
    }


    if (!label) {
      label =
        document.createElement(
          "label"
        );

      label.className =
        "sr-only";

      label.textContent =
        "메뉴 선택";

      wrapper.insertBefore(
        label,
        select
      );
    }


    label.htmlFor =
      select.id;


    if (!label.id) {
      label.id =
        select.id +
        "Label";
    }


    const button =
      document.createElement(
        "button"
      );

    button.type =
      "button";

    button.className =
      "sub-location-select__button";

    button.setAttribute(
      "aria-haspopup",
      "listbox"
    );

    button.setAttribute(
      "aria-expanded",
      "false"
    );


    const text =
      document.createElement(
        "span"
      );

    text.className =
      "sub-location-select__text";

    text.id =
      select.id +
      "CustomText";


    const icon =
      document.createElement(
        "span"
      );

    icon.className =
      "sub-location-select__icon";

    icon.setAttribute(
      "aria-hidden",
      "true"
    );


    button.appendChild(
      text
    );

    button.appendChild(
      icon
    );


    const list =
      document.createElement(
        "ul"
      );

    list.className =
      "sub-location-select__list";

    list.id =
      select.id +
      "CustomList";

    list.setAttribute(
      "role",
      "listbox"
    );

    list.setAttribute(
      "aria-labelledby",
      label.id
    );

    list.hidden = true;


    button.setAttribute(
      "aria-controls",
      list.id
    );

    button.setAttribute(
      "aria-labelledby",
      label.id +
      " " +
      text.id
    );


    wrapper.appendChild(
      button
    );

    wrapper.appendChild(
      list
    );


    const instance = {
      wrapper: wrapper,
      select: select,
      button: button,
      text: text,
      list: list,
      optionElements: []
    };


    customSelects.set(
      select,
      instance
    );


    renderOptions(
      instance
    );


    wrapper.classList.add(
      "is-custom-ready"
    );


    button.addEventListener(
      "click",
      function () {
        toggleCustomSelect(
          instance
        );
      }
    );


    button.addEventListener(
      "keydown",
      function (event) {
        handleButtonKeydown(
          event,
          instance
        );
      }
    );


    list.addEventListener(
      "click",
      function (event) {
        const optionElement =
          event.target.closest(
            ".sub-location-select__option"
          );

        if (!optionElement) {
          return;
        }

        selectOption(
          instance,
          optionElement
        );
      }
    );


    list.addEventListener(
      "keydown",
      function (event) {
        handleOptionKeydown(
          event,
          instance
        );
      }
    );


    wrapper.addEventListener(
      "focusout",
      function (event) {
        if (
          event.relatedTarget &&
          wrapper.contains(
            event.relatedTarget
          )
        ) {
          return;
        }

        closeCustomSelect(
          instance,
          false
        );
      }
    );


    select.addEventListener(
      "change",
      function () {
        updateSelectedState(
          instance
        );
      }
    );


    return instance;
  }


  function initialize() {
    document
      .querySelectorAll(
        ".sub-location-select__native"
      )
      .forEach(
        function (select) {
          buildCustomSelect(
            select
          );
        }
      );


    const printButton =
      document.getElementById(
        "subPrintBtn"
      );

    if (printButton) {
      printButton.addEventListener(
        "click",
        function () {
          window.print();
        }
      );
    }
  }


  document.addEventListener(
    "click",
    function (event) {
      if (!openedSelect) {
        return;
      }

      if (
        openedSelect.wrapper.contains(
          event.target
        )
      ) {
        return;
      }

      closeCustomSelect(
        openedSelect,
        false
      );
    }
  );


  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key !== "Escape" ||
        !openedSelect
      ) {
        return;
      }

      event.preventDefault();

      closeCustomSelect(
        openedSelect,
        true
      );
    }
  );


  /*
   * 외부에서 option을 변경한 뒤
   * 해당 커스텀 UI만 다시 그릴 때 사용
   */
  window.SubLocationSelect = {
    refresh: function (select) {
      if (!select) {
        return;
      }

      buildCustomSelect(
        select
      );
    }
  };


  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );


  /* =========================================================
     공통 2차 탭 (.sub-tab2)

     항목이 여러 줄로 줄바꿈될 때
     각 줄의 첫 항목에는 구분선이 붙지 않도록
     .is-row-start 클래스를 부여한다.
  ========================================================= */

  function markTab2RowStart() {
    document
      .querySelectorAll(".sub-tab2__list")
      .forEach(function (list) {
        var prevTop = null;

        Array.prototype.forEach.call(
          list.children,
          function (item) {
            var top = item.offsetTop;

            item.classList.toggle(
              "is-row-start",
              prevTop === null || top !== prevTop
            );

            prevTop = top;
          }
        );
      });
  }

  /*
   * 2차 탭이 페이지 내 바로가기(#id)일 때
   * 클릭한 항목으로 활성 표시 이동
   */
  document.addEventListener(
    "click",
    function (event) {
      var link = event.target.closest(".sub-tab2__item[href^='#']");

      if (!link || link.getAttribute("href") === "#") {
        return;
      }

      var list = link.closest(".sub-tab2__list");

      setTab2Active(list, link);

    }
  );

  function setTab2Active(list, link) {
    list.querySelectorAll(".sub-tab2__item").forEach(function (item) {
      var isActive = item === link;

      item.classList.toggle("is-active", isActive);

      if (isActive) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    scrollTab2IntoView(list, link);
  }

  /* 모바일 가로 스크롤일 때 활성 탭을 가운데로 이동 */
  function scrollTab2IntoView(list, link) {
    if (list.scrollWidth <= list.clientWidth) {
      return;
    }

    var listRect = list.getBoundingClientRect();
    var linkRect = link.getBoundingClientRect();

    var target =
      list.scrollLeft + (linkRect.left - listRect.left) -
      (list.clientWidth - linkRect.width) / 2;

    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }

  var tab2Timer;

  document.addEventListener(
    "DOMContentLoaded",
    markTab2RowStart
  );

  window.addEventListener(
    "load",
    markTab2RowStart
  );

  window.addEventListener(
    "resize",
    function () {
      clearTimeout(tab2Timer);
      tab2Timer = setTimeout(markTab2RowStart, 100);
    }
  );
})();