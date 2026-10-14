/* =========================================================
   Custom Select 공통
========================================================= */

window.refreshCustomSelect = function (nativeSelect) {

  if (!nativeSelect) {
    return;
  }

  const customSelect = nativeSelect.closest('.custom-select');

  if (!customSelect) {
    return;
  }

  const button = customSelect.querySelector(
    '.custom-select__button'
  );

  const buttonText = customSelect.querySelector(
    '.custom-select__text'
  );

  const optionList = customSelect.querySelector(
    '.custom-select__list'
  );

  const fieldWrap = customSelect.closest(
    '.text-field__wrap'
  );

  if (
    !button ||
    !buttonText ||
    !optionList
  ) {
    return;
  }


  /* =====================================================
     native select
     실제 데이터 처리용
  ===================================================== */

  nativeSelect.setAttribute(
    'tabindex',
    '-1'
  );

  nativeSelect.setAttribute(
    'aria-hidden',
    'true'
  );


  /* =====================================================
     접근성 속성
  ===================================================== */

  button.setAttribute(
    'aria-haspopup',
    'listbox'
  );

  button.setAttribute(
    'aria-expanded',
    'false'
  );


  if (!optionList.id) {

    optionList.id =
      'customSelectList_' +
      Math.random()
        .toString(36)
        .substring(2, 10);
  }


  button.setAttribute(
    'aria-controls',
    optionList.id
  );

  optionList.setAttribute(
    'role',
    'listbox'
  );


  /* =====================================================
     현재 custom select 사용 가능 여부
  ===================================================== */

  function isUsableCustomSelect(
    targetCustomSelect
  ) {

    if (!targetCustomSelect) {
      return false;
    }


    const targetNative =
      targetCustomSelect.querySelector(
        '.custom-select__native'
      );

    const targetButton =
      targetCustomSelect.querySelector(
        '.custom-select__button'
      );


    if (
      !targetNative ||
      !targetButton
    ) {
      return false;
    }


    if (
      targetNative.disabled ||
      targetButton.disabled
    ) {
      return false;
    }


    const style =
      window.getComputedStyle(
        targetCustomSelect
      );


    if (
      style.display === 'none' ||
      style.visibility === 'hidden'
    ) {
      return false;
    }


    if (
      targetCustomSelect
        .getClientRects()
        .length === 0
    ) {
      return false;
    }


    return true;
  }


  /* =====================================================
     현재 custom select의 option 목록
  ===================================================== */

  function getOptions() {

    return Array.from(
      customSelect.querySelectorAll(
        '.custom-select__option'
      )
    ).filter(function (option) {

      return (
        option.getAttribute(
          'aria-disabled'
        ) !== 'true'
      );
    });
  }


  /* =====================================================
     페이지의 모든 custom select
     개수 제한 없음
  ===================================================== */

  function getAllCustomSelects() {

    return Array.from(
      document.querySelectorAll(
        '.custom-select'
      )
    ).filter(function (select) {

      return isUsableCustomSelect(
        select
      );
    });
  }


  /* =====================================================
     선택 상태 UI 반영
  ===================================================== */

  function updateSelectedState() {

    const selectedValue =
      String(
        nativeSelect.value || ''
      );


    const options =
      customSelect.querySelectorAll(
        '.custom-select__option'
      );


    options.forEach(
      function (option) {

        const optionValue =
          String(
            option.dataset.value || ''
          );


        const isSelected =
          optionValue ===
          selectedValue;


        option.classList.toggle(
          'is-selected',
          isSelected
        );


        option.setAttribute(
          'aria-selected',
          isSelected
            ? 'true'
            : 'false'
        );
      }
    );


    const selectedOption =
      nativeSelect.options[
      nativeSelect.selectedIndex
      ];


    if (selectedOption) {

      buttonText.textContent =
        selectedOption
          .textContent
          .trim();

    } else {

      buttonText.textContent = '';
    }


    if (
      selectedValue !== ''
    ) {

      customSelect.classList.add(
        'has-value'
      );

    } else {

      customSelect.classList.remove(
        'has-value'
      );
    }
  }


  /* =====================================================
     option tabindex 초기화
  ===================================================== */

  function resetOptionTabIndex() {

    customSelect.querySelectorAll(
      '.custom-select__option'
    ).forEach(
      function (option) {
        option.setAttribute(
          'tabindex',
          '-1'
        );
      }
    );
  }


  /* =====================================================
     셀렉트 닫기
  ===================================================== */

  function closeCustomSelect() {

    customSelect.classList.remove(
      'is-open'
    );


    button.setAttribute(
      'aria-expanded',
      'false'
    );


    resetOptionTabIndex();
  }


  /* =====================================================
     option 포커스

     wrap = true
     → 방향키 순환

     wrap = false
     → Tab 순회
  ===================================================== */

  function focusOption(
    index,
    wrap
  ) {

    const options =
      getOptions();


    if (!options.length) {
      return false;
    }


    if (wrap === true) {

      if (
        index >=
        options.length
      ) {
        index = 0;
      }


      if (
        index < 0
      ) {
        index =
          options.length - 1;
      }

    } else {

      if (
        index < 0 ||
        index >=
        options.length
      ) {
        return false;
      }
    }


    resetOptionTabIndex();


    const targetOption =
      options[index];


    if (!targetOption) {
      return false;
    }


    targetOption.setAttribute(
      'tabindex',
      '0'
    );


    /*
     * 실제 option 포커스
     */
    requestAnimationFrame(
      function () {

        targetOption.focus({
          preventScroll: true
        });


        let top = 0;
        let curr = targetOption;
        while (curr && curr !== optionList) {
          top += curr.offsetTop;
          curr = curr.offsetParent;
        }
        const optionHeight = targetOption.offsetHeight || 36;
        const listHeight = optionList.clientHeight || 180;
        optionList.scrollTop = Math.max(0, top - (listHeight / 2) + (optionHeight / 2));
      }
    );


    return true;
  }


  /* =====================================================
     셀렉트 열기

     focusType

     mouse
     → 마우스 클릭용
     → 옵션창만 열고 버튼 focus 유지

     first
     → 첫 option

     last
     → 마지막 option

     selected
     → 현재 선택 option
  ===================================================== */

  function openCustomSelect(
    focusType
  ) {

    if (
      nativeSelect.disabled
    ) {
      return false;
    }


    /* 다른 열린 셀렉트 닫기 */
    document
      .querySelectorAll(
        '.custom-select.is-open'
      )
      .forEach(
        function (select) {

          if (
            select ===
            customSelect
          ) {
            return;
          }


          if (
            select
              ._closeCustomSelect
          ) {

            select
              ._closeCustomSelect();

          } else {

            select.classList.remove(
              'is-open'
            );


            const otherButton =
              select.querySelector(
                '.custom-select__button'
              );


            if (otherButton) {

              otherButton.setAttribute(
                'aria-expanded',
                'false'
              );
            }
          }
        }
      );


    customSelect.classList.add(
      'is-open'
    );


    button.setAttribute(
      'aria-expanded',
      'true'
    );


    updateSelectedState();


    const options =
      getOptions();


    if (!options.length) {

      closeCustomSelect();

      return false;
    }


    /* =================================================
       ★ 마우스 클릭

       옵션창은 열지만
       option으로 focus를 넘기지 않음.

       따라서 button:focus 스타일 유지.
       단, 현재 선택된 option이 목록에서 바로 보이도록
       optionList 스크롤을 선택된 위치로 이동.
    ================================================= */

    if (
      focusType === 'mouse'
    ) {

      resetOptionTabIndex();

      const currentNativeVal = nativeSelect ? nativeSelect.value : '';
      const selectedOption =
        options.find(
          function (option) {
            return option.classList.contains('is-selected') ||
              option.getAttribute('aria-selected') === 'true' ||
              (currentNativeVal && option.dataset.value === currentNativeVal);
          }
        );

      if (selectedOption && optionList) {
        requestAnimationFrame(
          function () {
            let top = 0;
            let curr = selectedOption;
            while (curr && curr !== optionList) {
              top += curr.offsetTop;
              curr = curr.offsetParent;
            }
            const optionHeight = selectedOption.offsetHeight || 36;
            const listHeight = optionList.clientHeight || 180;
            optionList.scrollTop = Math.max(0, top - (listHeight / 2) + (optionHeight / 2));
          }
        );
      }

      return true;
    }


    let targetIndex = 0;


    /* =================================================
       마지막 option
    ================================================= */

    if (
      focusType === 'last'
    ) {

      targetIndex =
        options.length - 1;

    }

    /* =================================================
       첫 option
    ================================================= */

    else if (
      focusType === 'first'
    ) {

      targetIndex = 0;

    }

    /* =================================================
       선택된 option
    ================================================= */

    else {

      const currentNativeVal = nativeSelect ? nativeSelect.value : '';
      targetIndex =
        options.findIndex(
          function (option) {

            return option
              .classList
              .contains(
                'is-selected'
              ) || option.getAttribute('aria-selected') === 'true' ||
              (currentNativeVal && option.dataset.value === currentNativeVal);
          }
        );


      if (
        targetIndex < 0
      ) {
        targetIndex = 0;
      }
    }


    focusOption(
      targetIndex,
      false
    );


    return true;
  }


  /* =====================================================
     다음 / 이전 custom select 찾기
  ===================================================== */

  function getSiblingCustomSelect(
    direction
  ) {

    const customSelects =
      getAllCustomSelects();


    const currentIndex =
      customSelects.indexOf(
        customSelect
      );


    if (
      currentIndex === -1
    ) {
      return null;
    }


    const targetIndex =
      currentIndex +
      direction;


    if (
      targetIndex < 0 ||
      targetIndex >=
      customSelects.length
    ) {
      return null;
    }


    return customSelects[
      targetIndex
    ];
  }


  /* =====================================================
     다음 custom select 이동

     현재 select에서 값을 선택했거나
     열린 옵션의 마지막에서 Tab 했을 때

     → 다음 select 자동 open
     → 첫 option focus
  ===================================================== */

  function moveToNextCustomSelect() {

    const nextCustomSelect =
      getSiblingCustomSelect(1);


    if (!nextCustomSelect) {
      return false;
    }


    closeCustomSelect();


    const nextNative =
      nextCustomSelect.querySelector(
        '.custom-select__native'
      );


    if (!nextNative) {
      return false;
    }


    /*
     * AJAX 갱신 대응
     */
    if (
      window.refreshCustomSelect
    ) {

      window.refreshCustomSelect(
        nextNative
      );
    }


    requestAnimationFrame(
      function () {

        if (
          nextCustomSelect
            ._openCustomSelect
        ) {

          nextCustomSelect
            ._openCustomSelect(
              'first'
            );
        }
      }
    );


    return true;
  }


  /* =====================================================
     이전 custom select 이동
     Shift + Tab
  ===================================================== */

  function moveToPreviousCustomSelect() {

    const prevCustomSelect =
      getSiblingCustomSelect(-1);


    if (!prevCustomSelect) {
      return false;
    }


    closeCustomSelect();


    const prevNative =
      prevCustomSelect.querySelector(
        '.custom-select__native'
      );


    if (!prevNative) {
      return false;
    }


    if (
      window.refreshCustomSelect
    ) {

      window.refreshCustomSelect(
        prevNative
      );
    }


    requestAnimationFrame(
      function () {

        if (
          prevCustomSelect
            ._openCustomSelect
        ) {

          prevCustomSelect
            ._openCustomSelect(
              'last'
            );
        }
      }
    );


    return true;
  }


  /* =====================================================
     일반 포커스 요소
  ===================================================== */

  function getFocusableElements() {

    const selector =
      'a[href], ' +
      'button:not(:disabled), ' +
      'input:not([type="hidden"]):not(:disabled), ' +
      'textarea:not(:disabled), ' +
      'select:not(:disabled), ' +
      '[tabindex]:not([tabindex="-1"])';


    return Array.from(
      document.querySelectorAll(
        selector
      )
    ).filter(
      function (element) {


        /* native custom select 제외 */
        if (
          element.classList &&
          element.classList.contains(
            'custom-select__native'
          )
        ) {
          return false;
        }


        /* custom option 제외 */
        if (
          element.classList &&
          element.classList.contains(
            'custom-select__option'
          )
        ) {
          return false;
        }


        if (
          element.getAttribute(
            'aria-hidden'
          ) === 'true'
        ) {
          return false;
        }


        const style =
          window.getComputedStyle(
            element
          );


        if (
          style.display === 'none' ||
          style.visibility === 'hidden'
        ) {
          return false;
        }


        if (
          element
            .getClientRects()
            .length === 0
        ) {
          return false;
        }


        return true;
      }
    );
  }


  /* =====================================================
     마지막 custom select 이후
     다음 일반 요소
  ===================================================== */

  function moveToNextFocusableElement() {

    closeCustomSelect();


    const elements =
      getFocusableElements();


    const currentIndex =
      elements.indexOf(
        button
      );


    if (
      currentIndex === -1
    ) {
      return false;
    }


    const target =
      elements[
      currentIndex + 1
      ];


    if (!target) {
      return false;
    }


    requestAnimationFrame(
      function () {

        target.focus();
      }
    );


    return true;
  }


  /* =====================================================
     첫 custom select 이전
     일반 요소
  ===================================================== */

  function moveToPreviousFocusableElement() {

    closeCustomSelect();


    const elements =
      getFocusableElements();


    const currentIndex =
      elements.indexOf(
        button
      );


    if (
      currentIndex === -1
    ) {
      return false;
    }


    const target =
      elements[
      currentIndex - 1
      ];


    if (!target) {
      return false;
    }


    requestAnimationFrame(
      function () {

        target.focus();
      }
    );


    return true;
  }


  /* =====================================================
     option 선택
  ===================================================== */

  function selectOption(option) {

    if (!option) {
      return;
    }


    if (
      option.getAttribute(
        'aria-disabled'
      ) === 'true'
    ) {
      return;
    }


    const value =
      option.dataset.value ||
      '';


    const text =
      option
        .textContent
        .trim();


    nativeSelect.value =
      value;


    buttonText.textContent =
      text;


    /* 기존 선택 제거 */
    customSelect
      .querySelectorAll(
        '.custom-select__option'
      )
      .forEach(
        function (item) {

          item.classList.remove(
            'is-selected'
          );

          item.setAttribute(
            'aria-selected',
            'false'
          );
        }
      );


    /* 현재 옵션 선택 */
    option.classList.add(
      'is-selected'
    );


    option.setAttribute(
      'aria-selected',
      'true'
    );


    /* 값 존재 상태 */
    if (
      value !== ''
    ) {

      customSelect.classList.add(
        'has-value'
      );

    } else {

      customSelect.classList.remove(
        'has-value'
      );
    }


    /* =================================================
       native change

       기존 onchange
       addEventListener change
       모두 실행
    ================================================= */

    nativeSelect.dispatchEvent(
      new Event(
        'change',
        {
          bubbles: true
        }
      )
    );


    /* =================================================
       validation
    ================================================= */

    if (fieldWrap) {

      fieldWrap.classList.remove(
        'text-field--error',
        'text-field--completed'
      );


      if (
        value === 'error'
      ) {

        fieldWrap.classList.add(
          'text-field--error'
        );

      } else if (
        value !== ''
      ) {

        fieldWrap.classList.add(
          'text-field--completed'
        );
      }
    }


    /* =================================================
       ★ 선택 완료

       현재 셀렉트 닫기
       → 다음 custom select가 있으면 자동 진입
       → 없으면 다음 일반 요소
    ================================================= */

    closeCustomSelect();

  }


  /* =====================================================
     기존 custom option 초기화
  ===================================================== */

  optionList.innerHTML = '';


  /* =====================================================
     native option
     → custom option 생성
  ===================================================== */

  Array.from(
    nativeSelect.options
  ).forEach(
    function (
      opt,
      index
    ) {

      const li =
        document.createElement(
          'li'
        );


      li.className =
        'custom-select__option';


      li.dataset.value =
        opt.value;


      li.textContent =
        opt.textContent;


      li.setAttribute(
        'role',
        'option'
      );


      li.setAttribute(
        'tabindex',
        '-1'
      );


      li.id =
        optionList.id +
        '_option_' +
        index;


      /* disabled */
      li.setAttribute(
        'aria-disabled',
        opt.disabled
          ? 'true'
          : 'false'
      );


      /* selected */
      if (
        opt.selected
      ) {

        li.classList.add(
          'is-selected'
        );


        li.setAttribute(
          'aria-selected',
          'true'
        );

      } else {

        li.setAttribute(
          'aria-selected',
          'false'
        );
      }


      /* =============================================
         마우스 클릭 option 선택
      ============================================= */

      li.addEventListener(
        'click',
        function (event) {

          event.stopPropagation();

          selectOption(li);
        }
      );


      /* =============================================
         option keyboard
      ============================================= */

      li.addEventListener(
        'keydown',
        function (event) {

          const options =
            getOptions();


          const currentIndex =
            options.indexOf(
              li
            );


          if (
            currentIndex === -1
          ) {
            return;
          }


          /* -------------------------------------
             ArrowDown

             다음 option
             마지막 → 첫 option
          ------------------------------------- */

          if (
            event.key ===
            'ArrowDown'
          ) {

            event.preventDefault();


            focusOption(
              currentIndex + 1,
              true
            );


            return;
          }


          /* -------------------------------------
             ArrowUp

             이전 option
             첫 option → 마지막
          ------------------------------------- */

          if (
            event.key ===
            'ArrowUp'
          ) {

            event.preventDefault();


            focusOption(
              currentIndex - 1,
              true
            );


            return;
          }


          /* -------------------------------------
             Home
          ------------------------------------- */

          if (
            event.key ===
            'Home'
          ) {

            event.preventDefault();


            focusOption(
              0,
              false
            );


            return;
          }


          /* -------------------------------------
             End
          ------------------------------------- */

          if (
            event.key ===
            'End'
          ) {

            event.preventDefault();


            focusOption(
              options.length - 1,
              false
            );


            return;
          }


          /* -------------------------------------
             Enter / Space

             현재 option 선택

             → 다음 custom select
          ------------------------------------- */

          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {

            event.preventDefault();


            selectOption(
              li
            );


            return;
          }


          /* -------------------------------------
             Escape

             ★ 선택하지 않음
             ★ 현재 값 그대로 유지
             ★ 옵션창만 닫음
             ★ 버튼으로 focus 복귀
          ------------------------------------- */

          if (
            event.key ===
            'Escape'
          ) {

            event.preventDefault();


            closeCustomSelect();


            requestAnimationFrame(
              function () {

                button.focus();
              }
            );


            return;
          }


          /* =====================================
             Tab

             ★ 옵션창이 이미 열린 상태에서만
               option들을 Tab으로 순회

             option
             → option
             → option
             → 다음 custom select
          ===================================== */

          if (
            event.key ===
            'Tab'
          ) {

            event.preventDefault();


            /* =============================
               Shift + Tab
            ============================= */

            if (
              event.shiftKey
            ) {

              /*
               * 이전 option 있음
               */
              if (
                currentIndex > 0
              ) {

                focusOption(
                  currentIndex - 1,
                  false
                );


                return;
              }


              /*
               * 첫 option에서
               * Shift + Tab
               *
               * 현재 셀렉트 닫고
               * 버튼으로 복귀
               */
              closeCustomSelect();


              requestAnimationFrame(
                function () {

                  button.focus();
                }
              );


              return;
            }


            /* =============================
               일반 Tab
            ============================= */


            /*
             * 다음 option이 있으면
             * 계속 옵션 순회
             */
            if (
              currentIndex <
              options.length - 1
            ) {

              focusOption(
                currentIndex + 1,
                false
              );


              return;
            }


            /*
             * 마지막 option
             *
             * → 다음 custom select
             * → 자동 open
             * → 첫 option
             */
            const movedNext =
              moveToNextCustomSelect();


            if (
              movedNext
            ) {

              return;
            }


            /*
             * 더 이상 custom select 없으면
             * 다음 일반 요소
             */
            moveToNextFocusableElement();


            return;
          }
        }
      );


      optionList.appendChild(
        li
      );
    }
  );


  /* =====================================================
     초기 UI
  ===================================================== */

  updateSelectedState();


  /* =====================================================
     disabled
  ===================================================== */

  if (
    nativeSelect.disabled
  ) {

    button.disabled =
      true;


    button.setAttribute(
      'aria-disabled',
      'true'
    );

  } else {

    button.disabled =
      false;


    button.removeAttribute(
      'aria-disabled'
    );
  }


  /* =====================================================
     버튼 이벤트 중복 방지
  ===================================================== */

  if (
    button.dataset
      .customSelectInitialized !==
    'true'
  ) {

    button.dataset
      .customSelectInitialized =
      'true';


    /* =============================================
       버튼 마우스 클릭

       ★ 중요

       클릭으로 열 때는
       option으로 focus 이동시키지 않음.

       button 자체 focus 유지
       → 기존 button:focus CSS 유지
    ============================================= */

    button.addEventListener(
      'click',
      function (event) {

        event.stopPropagation();


        const currentNative =
          customSelect.querySelector(
            '.custom-select__native'
          );


        if (
          !currentNative ||
          currentNative.disabled
        ) {
          return;
        }


        if (
          customSelect.classList.contains(
            'is-open'
          )
        ) {

          if (
            customSelect
              ._closeCustomSelect
          ) {

            customSelect
              ._closeCustomSelect();
          }

        } else {

          if (
            customSelect
              ._openCustomSelect
          ) {

            /*
             * ★ mouse
             *
             * 옵션으로 focus 이동하지 않음
             */
            customSelect
              ._openCustomSelect(
                'mouse'
              );
          }
        }
      }
    );


    /* =============================================
       버튼 keyboard
    ============================================= */

    button.addEventListener(
      'keydown',
      function (event) {


        /* -------------------------------------
           Enter / Space

           ★ 키보드로 명시적으로 열었을 때만
             option 탐색 시작
        ------------------------------------- */

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {

          event.preventDefault();


          /*
           * 이미 열려 있는 경우
           *
           * 마우스로 열어놓은 뒤
           * 키보드 Enter를 누를 수도 있으므로
           * 옵션으로 진입
           */
          if (
            customSelect.classList.contains(
              'is-open'
            )
          ) {

            if (
              customSelect
                ._focusOption
            ) {

              customSelect
                ._focusOption(
                  0,
                  false
                );
            }

          } else {

            if (
              customSelect
                ._openCustomSelect
            ) {

              customSelect
                ._openCustomSelect(
                  'first'
                );
            }
          }


          return;
        }


        /* -------------------------------------
           ArrowDown

           키보드로 옵션 탐색 시작
        ------------------------------------- */

        if (
          event.key ===
          'ArrowDown'
        ) {

          event.preventDefault();


          if (
            customSelect
              ._openCustomSelect
          ) {

            customSelect
              ._openCustomSelect(
                'first'
              );
          }


          return;
        }


        /* -------------------------------------
           ArrowUp

           마지막 option부터 탐색
        ------------------------------------- */

        if (
          event.key ===
          'ArrowUp'
        ) {

          event.preventDefault();


          if (
            customSelect
              ._openCustomSelect
          ) {

            customSelect
              ._openCustomSelect(
                'last'
              );
          }


          return;
        }


        /* -------------------------------------
           Escape

           마우스로 옵션창을 열어둔 상태에서
           버튼에 focus가 있을 수도 있음.

           → 선택 없이 닫기
        ------------------------------------- */

        if (
          event.key ===
          'Escape'
        ) {

          if (
            !customSelect
              .classList
              .contains(
                'is-open'
              )
          ) {
            return;
          }


          event.preventDefault();


          if (
            customSelect
              ._closeCustomSelect
          ) {

            customSelect
              ._closeCustomSelect();
          }


          button.focus();


          return;
        }


        /* =====================================
           Tab

           ★ 핵심 변경

           Enter로 열지 않은 상태:
           → 옵션을 거치지 않음
           → 기본 Tab 순서로 다음 요소 이동

           마우스로 열려 있는 상태:
           → 닫고 다음 요소 이동

           option을 키보드로 열었을 때는
           이미 focus가 option에 있으므로
           이 코드가 아니라 option keydown에서
           Tab 순회
        ===================================== */

        if (
          event.key ===
          'Tab'
        ) {

          /*
           * 마우스로 열려 있는 상태에서
           * 버튼에 focus가 있다면 닫기
           */
          if (
            customSelect
              .classList
              .contains(
                'is-open'
              )
          ) {

            if (
              customSelect
                ._closeCustomSelect
            ) {

              customSelect
                ._closeCustomSelect();
            }
          }


          /*
           * ★ preventDefault 하지 않음
           *
           * 브라우저 기본 Tab 이동 사용
           *
           * 시/도 버튼
           * → Tab
           * → 시/군/구 버튼
           * → Tab
           * → 읍/면/동 버튼
           *
           * 옵션을 안 열었으면
           * 옵션 전부 건너뜀
           */
          return;
        }
      }
    );
  }


  /* =====================================================
     외부 호출용 함수
  ===================================================== */

  customSelect._closeCustomSelect =
    closeCustomSelect;


  customSelect._openCustomSelect =
    openCustomSelect;


  customSelect._focusOption =
    focusOption;


  customSelect._moveToNextCustomSelect =
    moveToNextCustomSelect;


  customSelect._moveToPreviousCustomSelect =
    moveToPreviousCustomSelect;


  customSelect._moveToNextFocusableElement =
    moveToNextFocusableElement;


  customSelect._moveToPreviousFocusableElement =
    moveToPreviousFocusableElement;
};


/* =========================================================
   최초 페이지 로드
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    const customSelects =
      document.querySelectorAll(
        '.custom-select'
      );


    /* =================================================
       모든 custom select 초기화
       개수 제한 없음
    ================================================= */

    customSelects.forEach(
      function (customSelect) {

        const nativeSelect =
          customSelect.querySelector(
            '.custom-select__native'
          );


        if (!nativeSelect) {
          return;
        }


        window.refreshCustomSelect(
          nativeSelect
        );
      }
    );


    /* =================================================
       외부 클릭
       → 열린 custom select 닫기
    ================================================= */

    document.addEventListener(
      'click',
      function (event) {

        document
          .querySelectorAll(
            '.custom-select.is-open'
          )
          .forEach(
            function (select) {

              if (
                select.contains(
                  event.target
                )
              ) {
                return;
              }


              if (
                select
                  ._closeCustomSelect
              ) {

                select
                  ._closeCustomSelect();

              } else {

                select.classList.remove(
                  'is-open'
                );


                const selectButton =
                  select.querySelector(
                    '.custom-select__button'
                  );


                if (
                  selectButton
                ) {

                  selectButton.setAttribute(
                    'aria-expanded',
                    'false'
                  );
                }
              }
            }
          );
      }
    );
  }
);