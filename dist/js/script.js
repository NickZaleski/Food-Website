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
        modalWindow = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('.modal__close');

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

    modalCloseBtn.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // menu template

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
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
        // внутрь элемента помещаем вот такой html код
            element.innerHTML = `  
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.description}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            // просим отобразить этот элемент на странице
            this.parent.append(element);
        }

    }
    // создаем новую карточку, перечисляя все параметры, как в классе MenuCard
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        // не забываем комбинировать кавычки
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        // число указываем без кавычек
        9,
        // указываем родительский элемент
        // контейнеров много на странице, указываем, что этот дочерний menu
        '.menu .container '
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        // не забываем комбинировать кавычки
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        // число указываем без кавычек
        14,
        // указываем родительский элемент
        // контейнеров много на странице, указываем, что этот дочерний menu
        '.menu .container '
    ).render();


    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        // не забываем комбинировать кавычки
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        // число указываем без кавычек
        21,
        // указываем родительский элемент
        // контейнеров много на странице, указываем, что этот дочерний menu
        '.menu .container '
    ).render();
    

});