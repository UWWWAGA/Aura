document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });


  // --- Hero Slider Logic ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#slider-dots .dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  document.getElementById('slider-next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  document.getElementById('slider-prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  startAutoSlide();


  // --- Portfolio Data & Modal Logic ---
  const portfolioData = {
    1: {
      title: 'Пентхаус "Grand Park"',
      category: 'Квартира • 240 м²',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      desc: 'Роскошный двухуровневый пентхаус с панорамным видом на центр города. В отделке использован итальянский мрамор Calacatta, панельные системы из шпона коптированного дуба и эксклюзивное освещение от Flos.'
    },
    2: {
      title: 'Вилла "Forest Residence"',
      category: 'Загородный дом • 680 м²',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      desc: 'Архитектурный проект виллы в лесном массиве. Интеграция ландшафта в интерьер благодаря сплошному витражному остеклению. В доме спроектирован спа-комплекс и винная комната.'
    },
    3: {
      title: 'Ресторан "Amber Lounge"',
      category: 'Коммерция • 450 м²',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      desc: 'Концептуальный интерьер премиального ресторана. Мягкий камерный свет, барная стойка из цельного массива кварцита и авторская мебель.'
    },
    4: {
      title: 'Апартаменты "Skyline"',
      category: 'Квартира • 180 м²',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      desc: 'Лаконичный интерьер для ценителей минимализма. Интегрированная система «Умный дом», скрытые двери скрытого монтажа и безрамочные светильники.'
    },
    5: {
      title: 'Резиденция "Oak Estate"',
      category: 'Загородный дом • 920 м²',
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Загородная усадьба с авторскими лепными карнизами, паркетом ёлочкой из французского дуба и двусветной гостиной с камином.'
    },
    6: {
      title: 'Офис продаж "Apex HQ"',
      category: 'Коммерция • 310 м²',
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      desc: 'Представительский офис с зонами переговоров класса люкс, шумоизоляционными акустическими капсулами и отделкой из латуни.'
    }
  };

  const modal = document.getElementById('portfolio-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const data = portfolioData[id];

      if (data) {
        modalContent.innerHTML = `
          <div class="modal-media">
            <img src="${data.img}" alt="${data.title}">
          </div>
          <span class="modal-tag">${data.category}</span>
          <h3 class="modal-title">${data.title}</h3>
          <p class="modal-desc">${data.desc}</p>
          <a href="#contacts" onclick="document.getElementById('portfolio-modal').classList.add('hidden')" class="btn btn-primary btn-small">Запросить аналогичный проект</a>
        `;
        modal.classList.remove('hidden');
      }
    });
  });

  modalClose.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });


  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const matches = filter === 'all' || item.getAttribute('data-category') === filter;

        if (matches) {
          // Bring back into flow, then fade in on the next frame
          item.style.display = 'block';
          requestAnimationFrame(() => item.classList.remove('is-fading'));
        } else {
          // Fade out first, then remove from flow once the transition ends
          item.classList.add('is-fading');
          setTimeout(() => {
            if (item.classList.contains('is-fading')) {
              item.style.display = 'none';
            }
          }, 350);
        }
      });
    });
  });


  // --- Services Tab Switcher ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const activeContent = tabContents[index];

      tabContents.forEach((content, i) => {
        if (i === index) return;
        content.classList.add('is-fading');
      });

      setTimeout(() => {
        tabContents.forEach((content, i) => {
          content.classList.toggle('hidden', i !== index);
        });
        activeContent.classList.add('is-fading');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => activeContent.classList.remove('is-fading'));
        });
      }, 200);
    });
  });


  // --- Interactive Price Calculator Logic ---
  const typeBtns = document.querySelectorAll('.calc-type-btn');
  const areaRange = document.getElementById('area-range');
  const areaVal = document.getElementById('area-val');
  const styleSelect = document.getElementById('style-select');
  const option3d = document.getElementById('option-3d');
  const optionSupervision = document.getElementById('option-supervision');
  const totalPrice = document.getElementById('total-price');

  let currentRate = 4500;

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRate = parseFloat(btn.getAttribute('data-rate'));
      calculateTotal();
    });
  });

  areaRange.addEventListener('input', (e) => {
    areaVal.textContent = e.target.value;
    calculateTotal();
  });

  styleSelect.addEventListener('change', calculateTotal);
  option3d.addEventListener('change', calculateTotal);
  optionSupervision.addEventListener('change', calculateTotal);

  function calculateTotal() {
    const area = parseFloat(areaRange.value);
    const styleMultiplier = parseFloat(styleSelect.value);

    let price = area * currentRate * styleMultiplier;

    if (optionSupervision.checked) {
      price *= 1.30;
    }

    totalPrice.textContent = Math.round(price).toLocaleString('ru-RU') + ' ₽';
  }

  calculateTotal();


  // --- Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const nameError = document.getElementById('form-name-error');
  const phoneError = document.getElementById('form-phone-error');

  // Only letters (RU/EN), spaces, hyphens and apostrophes are allowed in the name field
  const NAME_ALLOWED = /[^\p{L}\s'-]/gu;
  // Only digits and the characters used in phone formatting are allowed
  const PHONE_ALLOWED = /[^\d+()\-\s]/g;
  const MAX_PHONE_DIGITS = 11; // e.g. 7 999 000 00 00

  function setFieldError(input, errorEl, message) {
    input.classList.add('field-error');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove('field-error');
    errorEl.classList.add('hidden');
  }

  // Strip disallowed characters as the user types
  nameInput.addEventListener('input', () => {
    const cleaned = nameInput.value.replace(NAME_ALLOWED, '');
    if (cleaned !== nameInput.value) nameInput.value = cleaned;
    clearFieldError(nameInput, nameError);
  });

  phoneInput.addEventListener('input', () => {
    let cleaned = phoneInput.value.replace(PHONE_ALLOWED, '');

    // Cap the number of actual digits so the field can't grow forever
    let digitCount = 0;
    let capped = '';
    for (const ch of cleaned) {
      if (/\d/.test(ch)) {
        digitCount++;
        if (digitCount > MAX_PHONE_DIGITS) continue;
      }
      capped += ch;
    }

    if (capped !== phoneInput.value) phoneInput.value = capped;
    clearFieldError(phoneInput, phoneError);
  });

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      setFieldError(nameInput, nameError, 'Введите имя (минимум 2 буквы).');
      return false;
    }
    if (/\d/.test(value)) {
      setFieldError(nameInput, nameError, 'Имя не должно содержать цифры.');
      return false;
    }
    clearFieldError(nameInput, nameError);
    return true;
  }

  function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > MAX_PHONE_DIGITS) {
      setFieldError(phoneInput, phoneError, 'Введите корректный номер телефона.');
      return false;
    }
    clearFieldError(phoneInput, phoneError);
    return true;
  }

  nameInput.addEventListener('blur', validateName);
  phoneInput.addEventListener('blur', validatePhone);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    formAlert.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => formAlert.classList.add('hidden'), 5000);
  });

  // --- Custom Select Dropdown Logic ---
  const customSelect = document.getElementById('custom-style-dropdown');
  if (customSelect) {
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const label = customSelect.querySelector('.custom-select-label');
    const options = customSelect.querySelectorAll('.custom-option');
    const nativeSelect = document.getElementById('style-select');

    // Переключение открытия/закрытия
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = customSelect.classList.contains('is-open');
      customSelect.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen);
    });

    // Выбор опции
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const value = opt.getAttribute('data-value');
        const text = opt.querySelector('span').textContent;

        // Обновляем текст в кнопке
        label.textContent = text;

        // Переключаем активный класс
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        // Синхронизируем со скрытым нативным <select> и триггерим его расчет
        if (nativeSelect) {
          nativeSelect.value = value;
          nativeSelect.dispatchEvent(new Event('change'));
        }

        // Закрываем список
        customSelect.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Закрытие при клике вне дропдауна
    document.addEventListener('click', (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
