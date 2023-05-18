window.addEventListener('DOMContentLoaded', () =>{

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.remove('show', 'fade');
                item.classList.add('hide');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');

            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {

            const target = event.target;
            if(target && target.classList.contains('tabheader__item')) {
               tabs.forEach((item, index) => {
                    if(item === target){
                        // console.log(index)
                        hideTabContent();
                        showTabContent(index);
                    }
               })
            }
        })

    // Timer

    const deadLine = '2023-05-29';
    let timerDay = document.querySelector('#days'),
    timerHour = document.querySelector('#hours'),
        timerMinute = document.querySelector('#minutes'),
        timerSecond = document.querySelector('#seconds');

        function getTimeRemaining(endTime) {
            let days, hours, minutes, seconds;
            const t = Date.parse(endTime) - Date.parse(new Date);
            if(t <= 0) {
                days = hours = minutes = seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
            }
            return {
                'total': t,
                days,
                hours,
                minutes,
                seconds,
            };
        }

        function getZero(num) {
            if(num > 9 || num < -9) {
                return num;
            } else return ('0' + num)
        }
        
        function setClock (selector, endTime) {
            const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            secunds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 500);
            updateClock();

            function updateClock(){
                const t = getTimeRemaining(endTime)

                days.textContent = getZero(t.days);
                hours.textContent = getZero(t.hours);
                minutes.textContent = getZero(t.minutes);
                secunds.textContent = getZero(t.seconds);

                if(t.total <= 0) {
                    clearInterval(timeInterval)
                }

            }
            updateClock();

    }

    setClock('.timer', deadLine);

} );
