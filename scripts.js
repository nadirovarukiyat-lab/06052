// mobile-nav.js
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Меняем иконку кнопки
            if (navList.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
                // Блокируем прокрутку при открытом меню
                body.style.overflow = 'hidden';
            } else {
                mobileMenuBtn.innerHTML = '☰';
                body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !mobileMenuBtn.contains(e.target) && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
    }
    
    // Система табов для услуг
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                tabBtns.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс нажатой кнопке
                btn.classList.add('active');
                
                // Показываем соответствующий контент
                const tabId = btn.getAttribute('data-tab');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Активируем первый таб по умолчанию
        if (tabBtns.length > 0 && !document.querySelector('.tab-btn.active')) {
            tabBtns[0].classList.add('active');
            const firstTabId = tabBtns[0].getAttribute('data-tab');
            const firstTabContent = document.getElementById(firstTabId);
            if (firstTabContent) {
                firstTabContent.classList.add('active');
            }
        }
    }
    
    // Плавная прокрутка для якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем мобильное меню если оно открыто
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                }
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Форма обратной связи
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const serviceSelect = this.querySelector('select[name="service"]');
            const messageTextarea = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Сбрасываем предыдущие ошибки
            this.querySelectorAll('.error').forEach(el => el.remove());
            this.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
                el.classList.remove('error-border');
            });
            
            // Валидация
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Пожалуйста, введите ваш email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            }
            
            if (!phoneInput.value.trim()) {
                showError(phoneInput, 'Пожалуйста, введите ваш телефон');
                isValid = false;
            }
            
            if (!messageTextarea.value.trim()) {
                showError(messageTextarea, 'Пожалуйста, введите ваше сообщение');
                isValid = false;
            }
            
            if (isValid) {
                // Здесь обычно отправка формы на сервер
                // Для демонстрации просто покажем сообщение об успехе
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = '✓ Сообщение отправлено!';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    
                    // Очищаем форму
                    this.reset();
                    
                    // Возвращаем исходное состояние через 3 секунды
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Функция отображения ошибки
    function showError(input, message) {
        input.classList.add('error-border');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.style.color = '#ff3860';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Функция проверки email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые нужно анимировать
    document.querySelectorAll('.service-card, .approach-card, .review-card').forEach(el => {
        observer.observe(el);
    });
    
    // Newsletter форма
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (input.value && isValidEmail(input.value)) {
                const originalText = button.textContent;
                button.textContent = '✓';
                button.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    input.value = '';
                }, 2000);
            }
        });
    }
    
    // Добавляем текущий год в футер
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
