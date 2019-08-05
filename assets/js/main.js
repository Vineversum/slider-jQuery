document.querySelector('.slider-controls').style.display = 'block';
document.querySelector('.slider-indicators').style.display = 'block';

let slides = document.querySelectorAll('.slider-item');
let indicators = document.querySelectorAll('.indicator');
let indicatorsContainer = document.querySelector('.slider-indicators');
let length = $('.slider-item').toArray().length;
let currentSlide = 0;
let nextSlide;
let playing = true;
let playPauseBtn = document.getElementById('play-pause');
let previousBtn = document.getElementById('previous-btn');
let nextBtn = document.getElementById('next-btn');
let delay = 4000;
let isGoing = false; 
const activeIndicator_FA = 'fas fa-circle indicator';
const disabledIndicator_FA = 'far fa-circle indicator';
const playBtn_FA = 'fas fa-play';
const pauseBtn_FA = 'fas fa-pause';

// slides[currentSlide].style.zIndex = '1';
$('.slider-item').eq(currentSlide).css('z-index', 1);

let slideInterval = setInterval(showNextSlide, delay); //запускаем слайдер


function showNextSlide() { //следующий слайд
    goToSlide(currentSlide + 1, 'toLeft');
};

function showPreviousSlide() { //предыдущий слайд
    goToSlide(currentSlide - 1, 'toRight');
};

function goToSlide(n, direction) { //переход на n-ый слайд, анимируем переход в зависимости от направления
    if(isGoing) return; //выход если анимация еще не окончена
    isGoing = true;
    nextSlide = (n + length) % length; 

    // indicators[currentSlide].className = 'far fa-circle indicator';//
    $('.indicator').eq(currentSlide).attr('class', disabledIndicator_FA);
    // indicators[nextSlide].className = 'fas fa-circle indicator';
    $('.indicator').eq(nextSlide).attr('class', activeIndicator_FA);
    
    if (direction === 'toRight') {
        // slides[nextSlide].style.transform = 'translateX(-100%)';
        $('.slider-item').eq(nextSlide).css('transform', 'translateX(-100%)');
        
        
        setTimeout(function(){ 
            $('.slider-item').eq(nextSlide).css({
              'z-index': '1',
              'transition': 'transform 0.5s',
              'transform': 'translateX(0)'
            });
            $('.slider-item').eq(currentSlide).css({
              'transition': 'transform 0.5s',
              'transform': 'translateX(100%)'
            });
        }, 0);
        
    }
    if (direction === 'toLeft') {
      
        $('.slider-item').eq(nextSlide).css({
          transform: 'translateX(100%)'
        });
        
        setTimeout(function(){
            $('.slider-item').eq(nextSlide).css({
              'z-index': '1',
              'transition': 'transform 0.5s',
              'transform':'translateX(0)'
            });
            // slides[nextSlide].style.zIndex = '1';
            // slides[nextSlide].style.transition = 'transform 0.5s';
            // slides[currentSlide].style.transition = 'transform 0.5s';
            // slides[nextSlide].style.transform = 'translateX(0)';
            // slides[currentSlide].style.transform = 'translateX(-100%)';
            $('.slider-item').eq(currentSlide).css({
              'transition': 'transform 0.5s',
              'transform': 'translateX(-100%)'
            });
        }, 0);
    }
    setTimeout(function(){
        // slides[currentSlide].style.transition = 'none';
        // slides[nextSlide].style.transition = 'none';
        // slides[currentSlide].style.zIndex = '0';
        $('.slider-item').eq(currentSlide).css({
          'transition': 'none',
          'z-index': '0'
        });
        $('.slider-item').eq(nextSlide).css('transition', 'none');
        currentSlide = nextSlide;
        isGoing = false;
    }, 500);
    
};


$('#play-pause').on('click', function(){ //по нажатию на кнопку воспроизведения/паузы останавливаем или запускаем слайдер 
    if (playing) {
        pauseSlideshow();
    }
    else {
        playSlideshow();
    }
});

function pauseSlideshow(){ //функция паузы
    playing = false;
    $('#play-pause').attr('class', playBtn_FA); //меняем внешний фид кнопки
    clearInterval(slideInterval);
};

function playSlideshow() { //функция воспроизведения
    playing = true;
    $('#play-pause').attr('class', pauseBtn_FA); //меняем внешний фид кнопки
    slideInterval = setInterval(showNextSlide, delay);
};

$('#next-btn').on('click', function() {
    pauseSlideshow();
    showNextSlide();
});

$('#previous-btn').on('click', function() {
    pauseSlideshow();
    showPreviousSlide();
});

// indicatorsContainer.addEventListener ('click', function(event){ //обработка события при помощи делегирования
//     let target = event.target;
//     pauseSlideshow();
//     while (target != this) {
//         if (target.tagName === 'I') {
//             for (let i = 0; i < indicators.length; i++){   //на какой индикатор нажали?
//                 if (indicators[i] === target) {
//                     if (i > currentSlide) goToSlide(i, 'toRight');
//                     else goToSlide(i, 'toLeft');
//                 }
//             }
//         }
//         target = target.parentNode;
//     }
// });
$('.slider-indicators').on('click', 'i', function(){
  pauseSlideshow();
  if ($(this).index() > currentSlide) goToSlide($(this).index(), 'toRight');
  else goToSlide($(this).index(), 'toLeft');
})


$('body').on('keydown', keyNavigation); //обрабатываем нажатие кнопки

function keyNavigation(event) {
    
    if (event.keyCode === 37) { //стрелка влево
        pauseSlideshow();
        showPreviousSlide();
    }
    if (event.keyCode === 39) { //стрелка вправо
        pauseSlideshow();
        showNextSlide();
    }
    if (event.keyCode === 32) { //пробел
        if (playing) pauseSlideshow();
        else playSlideshow();
    }       
};