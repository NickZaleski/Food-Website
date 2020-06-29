function calc() {
    // calculator

    // берем тег в котором заключен результат и присваеваем переменной
    const result = document.querySelector('.calculating__result span');

    // создаем переменные, в которых уже выбрана женщина и коэффицент
    // а так же рост, вес и возраст
    let sex, height, weight, age, ratio;

    // если в локал сторадж есть item с полом.
    if (localStorage.getItem('sex')) {
        // то присвоиить переменной объект пол
        sex = localStorage.getItem('sex');
    } else {
        // иначе полу присвоить занчение по умолчанию 
        sex = 'female';
        // и установить его в локал сторадж
        localStorage.setItem('sex', 'female');
    }

    // такое же условие для коэффицента
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // функцтя позволяющая инициировать работу с данными в локал сорадж
    function initLocalSettings(selector, activeClass) {
        // элементы по селектору
        const elements = document.querySelectorAll(selector);
        // в каждом элементе удаяляется класс
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            // если атрибут id у элемента строго равен обхекту sex
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                // то добавить активный класс для элемента
                elem.classList.add(activeClass);
            }
            // если аттрибут коэффицента строго равен объекту ratio 
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                // то добавить элементу класс актичвносте
                elem.classList.add(activeClass);
            }
        });
    }
    // запуск функции для селектора, а так же указыаем класс который добавляем
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    // запускаем фукнцию для селектора,  а так же добавляем класс активности
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция которая считает все значения
    function calcTotal() {
        // если нет пола или нет роста или нет веса или возраста или коэффицента, то
        if (!sex || !height || !weight || !age || !ratio) {
            // покажи результат пустой
            result.textContent = '____';
            // остановить выполнение фукнции
            return;
        }
        // если пол женский, то пользуемся вот таким уравнением
        if (sex === 'female') {
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
    function getStaticInformation(selector, activeClass) {
        // для переменной элементс выбираем все родительские селекторы с тегом див
        const elements = document.querySelectorAll(selector);

        // каждый элемент перебираем и обрабатываем событие по клику
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // если при нажатии мы получили аттрибут data-ratio,
                if (e.target.getAttribute('data-ratio')) {
                    // то присваеваем ratio цифровое значение дата аттрибута
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    // иначе, если при нажатии полчаем id, то присваеваем в переменную пол
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
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
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    // вызываем статическую фукнцию для разных типов активности
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // создание функции для динамической информации
    function getDynamicInformation(selector) {
        // добавили переменную инпут с и по селектору выбрали селектор
        const input = document.querySelector(selector);
        // на поле для ввода повесили событие
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // если инпут имеет аттрибут айди
            switch (input.getAttribute('id')) {
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


}

export default calc;