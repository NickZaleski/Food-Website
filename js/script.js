// 'use strict';ыы

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


    const deadline = '2020-06-15';

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
            if (this.classes.length === 0){
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
           
            if (!res.ok){
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
           }
        return await res.json();
    };

        // getResource('http://localhost:3000/menu')
        // .then(data => {
        //     data.forEach(({img, altimg, title, descr, price}) => {
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //     });
        // });
        
        getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

        function createCard(data)  {
            data.forEach(({img, altimg, title, descr, price}) => {
                const element = document.createElement('div')
                element.classList.add('menu__item');
                price = price * 27;
                element.innerHTML = `
                    <img src=${img} alt=${altimg}>
                        <h3 class="menu__item-subtitle">${title}</h3>
                        <div class="menu__item-descr">${descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div>
                `;
                document.querySelector('.menu .container').append(element);
            });
        }
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
            // засовываем в неё текст загрузки из объекта message
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            // выводим статус внутри формы
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            // создаем переменную запрос на сервер`
            
            

            // заголовок назначается автоматически
            
            // создаем переменную, которая будет хранить данные формы из формы 
            const formData = new FormData(form);
            // // мы создали объект, потому что из formdata нельзя преобразовать в JSON
            // сначала мы данные из формы делаем массивом массивов, затем
            // делаем из него объект, а объект формируем в JSON формат
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


    function showThanksModal(message){
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

});