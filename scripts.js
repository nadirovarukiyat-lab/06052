// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initStickyHeader();
    initBookingForm();
    initCurrentDate();
    initAnimations();
});

// Плавный скролл
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Фиксированная шапка
function initStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('sticky');
            header.style.boxShadow = 'none';
        }
    });
}

// Форма записи
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.name.value.trim(),
            phone: this.phone.value.trim(),
            service: this.service.value,
            date: this.date.value,
            message: this.message?.value.trim() || '',
            timestamp: new Date().toISOString()
        };
        
        // Валидация
        if (!formData.name || !formData.phone || !formData.service || !formData.date) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Форматирование телефона
        const phoneDigits = formData.phone.replace(