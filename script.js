// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления hero секции при загрузке страницы
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('visible'), 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('visible'), 400);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('visible'), 600);
    }
    if (heroStats) {
        setTimeout(() => heroStats.classList.add('visible'), 800);
    }
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем классы анимации к элементам
document.querySelectorAll('.feature-card').forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

document.querySelectorAll('.pricing-card').forEach((el, index) => {
    el.classList.add('fade-in-scale');
    el.style.transitionDelay = `${index * 0.12}s`;
    observer.observe(el);
});

document.querySelectorAll('.gallery-item').forEach((el, index) => {
    el.classList.add('fade-in-scale');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

document.querySelectorAll('.contact-item').forEach((el, index) => {
    el.classList.add('fade-in-left');
    el.style.transitionDelay = `${index * 0.12}s`;
    observer.observe(el);
});

// Анимация для заголовков секций
document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.section-subtitle').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Обработка формы бронирования
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Данные формы:', data);
        
        // Показываем уведомление об успехе
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        
        // Очищаем форму
        this.reset();
    });
}

// Кнопки выбора тарифа
document.querySelectorAll('.pricing-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        
        // Прокручиваем к форме и выбираем тариф
        const contactSection = document.getElementById('contact');
        const select = document.querySelector('select');
        
        if (contactSection && select) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Устанавливаем значение в select
            const planValue = planName.toLowerCase();
            select.value = planValue === 'базовый' ? 'basic' : 
                          planValue === 'про' ? 'pro' : 'premium';
        }
    });
});

// Клик по всей карточке тарифа
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        const planName = this.querySelector('h3').textContent;
        
        // Прокручиваем к форме и выбираем тариф
        const contactSection = document.getElementById('contact');
        const select = document.querySelector('select');
        
        if (contactSection && select) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Устанавливаем значение в select
            const planValue = planName.toLowerCase();
            select.value = planValue === 'базовый' ? 'basic' : 
                          planValue === 'про' ? 'pro' : 'premium';
        }
    });
});

// Кнопка "Забронировать" в навигации
document.querySelectorAll('.nav-cta').forEach(button => {
    button.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Параллакс эффект для hero секции с улучшенной плавностью
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.25}px) scale(${1 + scrolled * 0.00015})`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Убираем inline hover эффекты - используем только CSS

// Добавляем subtle glow эффекты при наведении на карточки
document.querySelectorAll('.feature-card, .pricing-card, .gallery-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Улучшенная анимация статистики с easing
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing function для более плавной анимации
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(easeOutQuart * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Запускаем анимацию статистики когда hero секция видима
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    stat.dataset.suffix = text.replace(number, '');
                    setTimeout(() => {
                        animateValue(stat, 0, number, 2200);
                    }, index * 180);
                }
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Убираем inline hover эффекты - используем только CSS

// Изменение навигации при скролле
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Добавляем активный класс к текущей секции в навигации
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});