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
    if (num >= 0 && num < 10){
        return `0${num}`;
    }else{
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


});