// _____ Slider _____

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#slider");

const computed = getComputedStyle(items);
const step = parseInt(getComputedStyle(items.firstElementChild).width);
const elements = document.querySelectorAll('.burgers__item');
const size = elements.length - 1;
const maxRight = size * step;

right.addEventListener("click", function(e) {
    e.preventDefault();
    let currentRight = parseInt(computed.right);

    // if (!currentRight) {
    //     currentRight = 0;
    // }

    if (currentRight < maxRight) {
        items.style.right = currentRight + step + "px";
    }
});

left.addEventListener("click", function(e) {
    e.preventDefault();
    let currentRight = parseInt(computed.right);

    // if (!currentRight) {
    //     currentRight = 0;
    // }

    if (currentRight > 0) {
        items.style.right = currentRight - step + "px";
    }
});

// _____ Overlay__hamburger__menu _____

const openHamburger = document.querySelector('#hamburger__icon');
const menuHamburger = document.querySelector('#hamburger__menu');
const closeHamburger = document.querySelector('#hamburger__close');

openHamburger.addEventListener('click', function(e) {
    e.preventDefault();
    menuHamburger.style.cssText = 'display:block';

});

closeHamburger.addEventListener('click', function(e) {
    e.preventDefault();
    menuHamburger.style.cssText = 'display:none';
});

// _____ AccordMenu ______

const accordElement = document.querySelector('.menu__accord');
const closeAccord = document.querySelector('.menu');
createAccord(accordElement);

function createAccord(element) {
    const headers = element.querySelectorAll('.accord__item-link');
    let activeContent;

    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];

        header.addEventListener('click', function(e) {
            e.preventDefault();
            if (activeContent) {
                activeContent.classList.remove('active');
            }

            activeContent = header.nextElementSibling;
            activeContent.classList.add('active');

        });
    }
}

// _____ AccordTeam _____

const accordContainer = document.querySelector('.team__list');

createAccordTeam(accordContainer);

function createAccordTeam(element) {
    const links = element.querySelectorAll('.team__item-name');
    let activeItem;

    for (let i = 0; i < links.length; i++) {
        const link = links[i];

        link.addEventListener('click', function() {
            if (activeItem) {
                activeItem.classList.remove('active')
            }
            const content = link.parentNode;

            content.classList.add('active');
            activeItem = content;
        });
    }
}

// _____ Form _____

const myForm = document.querySelector('#order__form');
const sendButton = document.querySelector('#order__btn');

sendButton.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            street: myForm.elements.street.value,
            home: myForm.elements.home.value,
            cor: myForm.elements.cor.value,
            app: myForm.elements.app.value,
            floor: myForm.elements.floor.value,
            comments: myForm.elements.comments.value,
            pay: myForm.elements.pay.value,
            no_tell: myForm.elements.no_tell.value
        }
        if (myForm.elements.pay.value == 'change') {
            pay: ('Потребуется сдача!');
        }
        else {
            pay: ('Оплата картой!');
        };

        console.log(data);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/data');
        xhr.send(JSON.stringify(data));

    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.home)) {
        valid = false;
    }
    if (!validateField(form.elements.app)) {
        valid = false;
    }
    if (!validateField(form.elements.floor)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;

        return false;
    } else {
        field.nextElementSibling.textContent = '';

        return true;
    }
}

// _____ OnePageScroll _____

const sections = $(".section");
const display = $(".maincontent");
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const setActiveMenuItem = itemEq => {
    $('.fixed__menu-item')
        .eq(itemEq)
        .addClass('active')
        .siblings()
        .removeClass('active');
};

const performTransition = sectionEq => {
    const position = `${sectionEq * -100}%`;
    const mouseInertionIsFishined = 300;
    const transitionIsFishined = 1000;

    if (inScroll === false) {
        inScroll = true;
        display.css({
            transform: `translateY(${position})`
        });

        sections
            .eq(sectionEq)
            .addClass("active")
            .siblings()
            .removeClass("active");
        setTimeout(() => {
            inScroll = false
            setActiveMenuItem(sectionEq);
        }, transitionIsFishined + mouseInertionIsFishined);
    }
};

const scrollToSection = direction => {
    const activeSection = sections.filter(".active");
    const prevSection = activeSection.prev();
    const nextSection = activeSection.next();

    if (direction === "up" && prevSection.length) {
        performTransition(prevSection.index());
    }

    if (direction === "down" && nextSection.length) {
        performTransition(nextSection.index());
    }
};

$(document).on({
    wheel: e => {
        const direction = e.originalEvent.deltaY > 0 ? "down" : "up";
        scrollToSection(direction);
    },
    keydown: e => {
        switch (e.keyCode) {
            case 40:
                scrollToSection('down');
                break;
            case 38:
                scrollToSection('up');
                break;
        }
    }
});

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();

    const target = $(e.currentTarget).attr('data-scroll-to');
    performTransition(target);
});

if (isMobile) {
    $(document).swipe({
        swipe: function(
            event,
            direction,
            distance,
            duration,
            fingerCount,
            fingerData
        ) {

            const scrollDirection = direction === "down" ? "up" : "down";
            scrollToSection(scrollDirection);
        }
    });
}

// _____ Video_YouTube_Iframe _____

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            controls: 0,
            disableb: 0,
            modestbranding: 0,
            rel: 0,
            iv_load_policy: 3,
            showinfo: 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case 1:
            $('.player__start').addClass('paused');
            $('.player__wrapper').addClass('active');
            break
        case 2:
            $('.player__start').removeClass('paused');

    }
}

function onPlayerReady() {
    const duration = player.getDuration();
    let interval;
    $('.player').removeClass('hidden');
    updateTimer();
    clearInterval(interval);
    interval = setInterval(() => {
        const completed = player.getCurrentTime();
        const percent = (completed / duration) * 100;
        updateTimer();
        changeButtonPosition(percent);

    }, 1000);
}

function updateTimer() {
    $('.player__duration-complited').text(formatTime(player.getCurrentTime()));
    $('.player__duration-estimate').text(formatTime(player.getDuration()));

}

function formatTime(time) {
    const roundTime = Math.round(time);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;
    const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return minutes + ':' + formatedSeconds;
}

$(".player__start").on('click', e => {
    const playerStatus = player.getPlayerState();

    if (playerStatus != 1) {
        player.playVideo();

    } else {
        player.pauseVideo();

    }
});

// _____ AcornBuffer _____

$('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

    changeButtonPosition(clickedPercent);
    player.seekTo(newPlayerTime);
});

$('.player__splash').on('click', e => {
    player.playVideo();
});

function changeButtonPosition(percent) {
    $('.player__playback-button').css({
        left: `${percent}%`
    });
}