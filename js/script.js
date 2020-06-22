'use strict';

// создаем счётчик событий, который запускает наш код только тогда, когда дерево DOM построено
document.addEventListener('DOMContentLoaded', () => {
    // создаем переменные. первая указывает на сами блок-кнопки;  
    const tabs = document.querySelectorAll('.tabheader__item'),
        // вторая указывает на блок, в котром хранится изображение;
        tabsContent = document.querySelectorAll('.tabcontent'),
        // третья переменная указывает на всего родителя, котором есть кнопки
        tabsParent = document.querySelector('.tabheader__items');

    // создаем функцию, скрывающую блок с фотографией
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // добавляем класс хайд на элементе
            item.classList.remove('show', 'fade'); // удаляем класс шоу на элементе
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // удаляем класс на кнопке
        });
    }
    // создаем функцию, показывающую блок с фотографией
    // i = 0 означает, что блок будет начинаться по умолчанию с первой фотки
    function showTabContent(i = 0) {
        // для первой фотки добавляем класс шоу класс фейд
        tabsContent[i].classList.add('show', 'fade');
        // для первой фотки удаляем класс хайд
        tabsContent[i].classList.remove('hide');
        // добавляем первой фотке класс активности
        tabs[i].classList.add('tabheader__item_active');
    }

    // вызваем эти функции
    hideTabContent();
    showTabContent();

    // на родителя кнопко устанавливаем событие
    tabsParent.addEventListener('click', (event) => {
        // для цели события создаем переменную, для более красивого кода
        const target = event.target;
        // прописываем условие: если цель события И класс цели события содержит конкретный класс
        if (target && target.classList.contains('tabheader__item')) {
            // то для каждой кнопки сработает функция в которой item - это кнопка, а i - значение кнопки
            tabs.forEach((item, i) => {
                // сравниваем цель события и элемент. 
                // если они совпадают, то срабатывают функции 
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // timer

    const deadline = '2020-06-27';

    function getTimeRemaining(endtime) {

        // преобразуем в дату и получим разницу в количестве милисекунд
        const t = Date.parse(endtime) - Date.parse(new Date()),
            // оокругляем до ближайшего целого, делим t 
            // на 1000 милисекунд уменоженную на 60 (сколько в минуте)
            // умноженную на 60 (сколько минут в часе)
            // умнженные на 24 (сколько часов в дне)
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            // общее количество часов до конца. Остаток от деления нужен
            // чтобы если осталось например 50 часов, он записал остаток от деления
            // в часах. 24+24=48 и остаток 2 часа. до конца осталось 2 дня 2 часа
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        // возращаем объект!
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // если цифра больше или равна нулю И
    // меньше десяти, то вернуть num значение 0+число
    // иначе вернуть просто num
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // устанавливает время

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // мигание вёрстки
        updateClock();

        // обновляет таймер
        function updateClock() {
            // постоянная получает остаток времени от endtime 
            const t = getTimeRemaining(endtime);
            // вставляем в код остаток содержащийся в днях и тд
            // вызывая getZero подставляем нули к числам
            // вместо параметра num испольщуем разницу t для дня и тд
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // говорим перестать обновлять таймер, если общее число total 
            // меньше или равно нулю. таким образом если дата уже прошла
            // таймер не будет выводить отрицательные значения
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    // вызываем функцию с селектором таймер и переменной deadline
    // таймер - то для какого элементы мы применяем,
    // дедлайн - дата когда таймер должен остановиться
    setClock('.timer', deadline);

    // Modal window


    const modalBtn = document.querySelectorAll('[data-close]'),
        modalWindow = document.querySelector('.modal');
    // modalCloseBtn = document.querySelector('.modal__close');

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }


    modalBtn.forEach(i => {
        i.addEventListener('click', openModal);
    });

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(modalTimerId);
    }

    // modalCloseBtn.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // menu template

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            // обращаемся к рест оператору классов
            this.classes = classes;
            // цена в долларах
            this.price = price;
            // указываем на родительский элемент 
            this.parent = document.querySelector(parentSelector);
            // курс гривны к доллару
            this.transfer = 27;
            // функция которая уже возвращает цену в гривнах
            this.changeToUAH();
        }

        changeToUAH() {
            // цену в долларах переводим по курсу в гривны
            this.price = this.price * this.transfer;

        }

        render() {
            // создаем элемент с тегом div
            const element = document.createElement('div');
            // если в массиве 0 элементов
            if (this.classes.length === 0) {
                // то записать в элемент 'menu__item'
                this.element = 'menu__item';
                // добавить элементу этот селектор
                element.classList.add(this.element);
            } else {
                // иначе, если в массиве classes есть что-то, то выполняем добавление классов
                // так как classes - это массив, то мы его перебираем и в нашу переменную
                // element добавляем класс
                this.classes.forEach(className => element.classList.add(className));
            }


            // внутрь элемента помещаем вот такой html код
            element.innerHTML = `  
                    <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.description}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            // просим отобразить этот элемент на странице
            this.parent.append(element);
        }

    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };


    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms
    // создали переменную и вложили в нее  все формы
    const forms = document.querySelectorAll('form');
    // создали объект, содержащий статусы каждого из сообщений
    const message = {
        loading: './img/form/original.svg',
        success: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Упс, что-то пошло не так'
    };
    // все формы перебираем для отправки
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    // функция отправить данные, в ней аргумент форма
    function bindPostData(form) {
        // для формы добавляем обрабочик
        form.addEventListener('submit', (e) => {
            // отключаем перезагрузку страницы
            e.preventDefault();
            // создаем элемент в котором будет статус нашей отправки
            const statusMessage = document.createElement('img');
            // создал аттрибут src
            statusMessage.src = message.loading;

            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);





            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });


        });
    }


    function showThanksModal(message) {
        const prevModalDialogue = document.querySelector('.modal__dialog');
        prevModalDialogue.classList.add('hide');
        // функция отвечает за открытие модальных окон
        openModal();


        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialogue.classList.add('show');
            prevModalDialogue.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    // silder

    const current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });
    // creating postion relative to make all content inside positioned right with absolute postion
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDiggits(str) {
       return +str.replace(/\D/g, '');
    };


    next.addEventListener('click', () => {
        if (offset == deleteNotDiggits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '')
        }
        slidesField.style.transform = `translateX(-${offset}px)`


        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideCounterCondition();

        dotsOpacity()
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDiggits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDiggits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideCounterCondition();

        dotsOpacity()

    });

        function dotsOpacity() {
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        }
        
        // function transformToNumbers(mesure) {
        //     +mesure.replace(/\D/g, '')
        // };


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = offset = deleteNotDiggits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            slideCounterCondition();

            dotsOpacity()
        });
    });

const slideCounterCondition = () => {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex;
    }
}
// calculator


// берем тег в котором заключен результат и присваеваем переменной
const result = document.querySelector('.calculating__result span');
// создаем переменные, в которых уже выбрана женщина и коэффицент
// а так же рост, вес и возраст
let sex = 'female',
    height, weight, age,
    ratio = 1.375;
// функция которая считает все значения
function calcTotal() {
// если нет пола или нет роста или нет веса или возраста или коэффицента, то
    if(!sex || !height || !weight || !age || !ratio){
// покажи результат пустой
        result.textContent = '____';
// остановить выполнение фукнции
        return;
    }
// если пол женский, то пользуемся вот таким уравнением
    if (sex === 'female'){
        result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2)
    } 
// иначе (мужской), пользуемся вот таким уравнением и записываем результат в переменную
    else {
        result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2)
    }
}
// вызываем фукнцию
calcTotal();

// получаем статическую информацию (та что кнопочная)
// используем параментры слектор и активный класс
    function getStaticInformation(parentSelector, activeClass) {
// для переменной элементс выбираем все родительские селекторы с тегом див
        const elements = document.querySelectorAll(`${parentSelector} div`);

// каждый элемент перебираем и обрабатываем событие по клику
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
    // если при нажатии мы получили аттрибут data-ratio,
                if (e.target.getAttribute('data-ratio')){
    // то присваеваем ratio цифровое значение дата аттрибута
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
    // иначе, если при нажатии полчаем id, то присваеваем в переменную пол
                    sex = e.target.getAttribute('id');
                   
                }
    // так же для кажлого элемент перебор делаем
                elements.forEach(elem => {
                // удаляем активный класс
                    elem.classList.remove(activeClass);
                })
    // и назначаем класс на событие!
                e.target.classList.add(activeClass);
    // вызываем функцию, которая даёт нам возможность посчитать результат
                calcTotal();
            });
        });
        
    };

    // вызываем стаческую фукнцию, первым аргументом передаем пол, вторым - активный класс
    getStaticInformation('#gender', 'calculating__choose-item_active');
    // вызываем статическую фукнцию для разных типов активности
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


// создание функции для динамической информации
    function getDynamicInformation(selector){
    // добавили переменную инпут с и по селектору выбрали селектор
        const input = document.querySelector(selector);
    // на поле для ввода повесили событие
        input.addEventListener('input', () => {
    // если инпут имеет аттрибут айди
            switch(input.getAttribute('id')) {
    // в случае с высотой
                case 'height':
    // присвоить высоте введенное числовое значение 
                    height = +input.value;
                    break;
    // присвоить весу введенное числовое значение
                case 'weight':
                    weight = +input.value;
                    break;
    // присвоить возрасту введенное числовое значение
                case 'age':
                    age = +input.value;
                    break;
            }
    // вызываем функцию, которая пересчитывает нам всё это
            calcTotal();
        });
        
    }

    // вызываем фукнции по селектору
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');




});