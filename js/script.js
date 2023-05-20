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

    // Modal

    const btnsShowModal = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        btnHideModal = modal.querySelector('.modal__close');

    // console.log(modal);
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(idtimerShowModel);
    }

    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''
    }

    btnsShowModal.forEach(e => {
        e.addEventListener('click', showModal);
    })

    btnHideModal.addEventListener('click', hideModal);

    document.addEventListener('click', (e) => {
        if(e.target === modal && modal.classList.contains('show')) {
            hideModal();
        }
    }
    )

    document.addEventListener('keydown', (e) => {
        if(e.key == 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const idtimerShowModel = setTimeout(showModal, 5_000);

    function showModelByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModelByScroll);
        }
    }

    window.addEventListener('scroll', showModelByScroll);
});

