
(function () {
    /* =========================
       Text Input / Date Input 전용 스크립트

       data-validate 속성이 있는 input은 validUtil.validateFieldElement 로
       실시간/submit 검증 및 text-field UI 상태를 갱신합니다.
       data-validate 가 없으면 기존 안내/완료 데모 동작을 유지합니다.
    ========================= */
    /* 새로고침 시 input 값 초기화 */
    window.addEventListener('pageshow', function () {
        var textInputs = document.querySelectorAll('.text-field__input');

        textInputs.forEach(function (input) {
            if (input.disabled || input.readOnly) {
                return;
            }

            // input.value = '';

            var field = input.closest('.text-field__wrap');

            if (field) {
                field.classList.remove(
                    'text-field--completed',
                    'text-field--error',
                    'text-field--focused'
                );
            }
        });
    });
    /**
     * validUtil 로드 여부 및 data-validate 위임 가능 여부.
     * @returns {boolean}
     */
    function canDelegateToValidUtil() {
        return typeof validUtil !== "undefined"
            && typeof validUtil.validateFieldElement === "function";
    }

    /**
     * data-validate 필드의 text-field 상태를 validUtil에 위임해 갱신합니다.
     *
     * @param {HTMLInputElement|HTMLTextAreaElement} input - .text-field__input
     * @param {Object} [options] - validUtil.validateFieldElement options
     * @param {string} [options.trigger='input'] - 'input' | 'blur' | 'init'
     * @returns {boolean} true=위임 처리됨, false=validUtil 미사용·data-validate 없음
     */
    function runValidatedTextFieldState(input, options) {
        if (!input || !input.getAttribute || !input.getAttribute("data-validate")) {
            return false;
        }
        if (!canDelegateToValidUtil()) {
            return false;
        }
        validUtil.validateFieldElement(input, options || { trigger: "input" });
        return true;
    }

    const inputFields = document.querySelectorAll('.text-field__wrap');
    if (!inputFields.length) return;

    inputFields.forEach((field) => {
        const input = field.querySelector('.text-field__input');
        const date = field.querySelector('.text-field__date');
        const message = field.querySelector('.text-field__message-text');
        const clearBtn = field.querySelector('.text-field__btn--clear');

        if (!input && !date) return;
        const control = input || date;
        const isDate = !!date;
        /* 인풋 포커스 상태 추가 */
        control.addEventListener('focus', function () {
            field.classList.add('text-field--focused');
        });
        const hasInitialError = field.classList.contains('text-field--error');

        function resetInputState() {
            field.classList.remove(
                'text-field--completed',
                'text-field--error',
                'text-field--disabled'
            );
        }

        function clearMessage() {
            if (message) {
                message.textContent = '';
            }
        }

        function updateDateState() {
            const value = date.value.trim();

            resetInputState();

            if (date.disabled) {
                field.classList.add('text-field--disabled');
                clearMessage();
                return;
            }

            if (value !== '') {
                field.classList.add('text-field--completed');
                clearMessage();
                return;
            }

            if (hasInitialError) {
                field.classList.add('text-field--error');
                if (message) {
                    message.textContent =
                        date.dataset.errorMessage || '날짜를 선택해 주세요.';
                }
                return;
            }

            clearMessage();
        }

        function updateTextInputState(trigger) {
            // data-validate 는 런타임에 추가/제거될 수 있으므로 이벤트 시점마다 확인
            if (runValidatedTextFieldState(input, { trigger: trigger || 'input' })) {
                return;
            }

            const value = input.value.trim();

            resetInputState();

            if (input.disabled) {
                field.classList.add('text-field--disabled');
                if (message) {
                    message.textContent =
                        input.dataset.message || '메시지를 입력해 주세요';
                }
                return;
            }

            if (value === '') {
                if (message) {
                    message.textContent =
                        input.dataset.message || '메시지를 입력해 주세요';
                }
                return;
            }

            if (value === '에러') {
                field.classList.add('text-field--error');
                if (message) {
                    message.textContent =
                        input.dataset.errorMessage || '에러메시지';
                }
                return;
            }

            field.classList.add('text-field--completed');
            if (message) {
                message.textContent =
                    input.dataset.completedMessage || '완료된 메시지';
            }
        }

        function updateInputState(trigger) {
            if (isDate) {
                updateDateState();
                return;
            }
            updateTextInputState(trigger);
        }

        control.addEventListener('input', function () {
            updateInputState('input');
        });
        control.addEventListener('change', function () {
            updateInputState('input');

            if (
                isDate
                && !control.disabled
                && document.activeElement !== control
            ) {
                requestAnimationFrame(function () {
                    control.focus();
                    field.classList.add('text-field--focused');
                });
            }
        });
        if (input) {
            control.addEventListener('blur', function () {
                if (input) {
                    updateInputState('blur');
                } else {
                    updateInputState('input');
                }

                field.classList.remove('text-field--focused');
            });
        }

        if (clearBtn && input) {
            clearBtn.addEventListener('click', function (event) {
                event.preventDefault();

                input.value = '';

                requestAnimationFrame(function () {
                    input.focus();
                    field.classList.add('text-field--focused');
                    updateInputState('input');
                });
            });
        }
        updateInputState('init');
    });
})();
