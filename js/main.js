// main.js
/* =============================================================================
   Навигация / Мобильное меню
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            // Переключаем иконку бургера/крестика
            menuBtn.textContent = isOpen ? '\u2715' : '\u2630';
        });

        // Закрываем меню при клике вне навигации
        document.addEventListener('click', (e) => {
            if (navList.classList.contains('open') && !e.target.closest('.main-nav')) {
                navList.classList.remove('open');
                menuBtn.textContent = '\u2630';
            }
        });
    }

    // Перехват пустых якорных ссылок и перенаправление на 404.html
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });
});

/* =============================================================================
   Форма регистрации / Валидация
   ============================================================================= */

/**
 * Обработчик отправки формы регистрации.
 * Заменяет стандартные alert() на визуальную inline-валидацию.
 */
function handleRegister(event) {
    event.preventDefault();

    const form = event.target;
    const password = form.querySelector('#password');
    const confirm = form.querySelector('#confirm');
    const username = form.querySelector('#username');

    // Сброс предыдущих ошибок
    clearValidation(form);

    // Валидация паролей
    if (password.value !== confirm.value) {
        markInvalid(confirm, 'Пароли не совпадают!');
        return false;
    }

    if (password.value.length < 8) {
        markInvalid(password, 'Минимум 8 символов!');
        return false;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Регистрация...';
    btn.disabled = true;

    // Имитация запроса к серверу
    setTimeout(() => {
        btn.textContent = 'Готово!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            alert(`Добро пожаловать, ${username.value.trim()}! Аккаунт создан (демо-режим).`);
            window.location.href = 'index.html';
        }, 800);
    }, 1500);

    return false;
}

/**
 * Устанавливает визуальную ошибку для поля ввода.
 */
function markInvalid(input, message) {
    input.classList.add('is-invalid');
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('form-error')) {
        errorSpan.textContent = message;
    }
}

/**
 * Очищает все состояния ошибок в форме.
 */
function clearValidation(form) {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}