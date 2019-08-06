
$slides = $('.slider-item');
$playPause = $('#play-pause');
$next = $('#next-btn');
$prev = $('#previous-btn');
$indicators = $('.indicator');
$indicatorsContainer = $('.slider-indicators');
$body = $('body');
let length = $slides.toArray().length;
let currentSlide = 0;
let nextSlide;
let playing = true;
let delay = 4000;
let isGoing = false; 
const activeIndicator_FA = 'fas fa-circle indicator';
const disabledIndicator_FA = 'far fa-circle indicator';
const playBtn_FA = 'fas fa-play';
const pauseBtn_FA = 'fas fa-pause';
let slideInterval;

$('.slider-controls').css('display', 'block');
$indicatorsContainer.css('display', 'block');
$('.slider').css('opacity', '1');



$slides.eq(currentSlide).css('z-index', 1);

setTimeout(() => {
  $('.loading').css('display', 'none');
  slideInterval = setInterval(showNextSlide, delay); //запускаем слайдер
}, 1000);


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

    $indicators.eq(currentSlide).attr('class', disabledIndicator_FA);
    $indicators.eq(nextSlide).attr('class', activeIndicator_FA);
    
    if (direction === 'toRight') {
      $slides.eq(nextSlide).css('transform', 'translateX(-100%)');
        
        
        setTimeout(function(){ 
          $slides.eq(nextSlide).css({
              'z-index': '1',
              'transition': 'transform 0.5s',
              'transform': 'translateX(0)'
            });
            $slides.eq(currentSlide).css({
              'transition': 'transform 0.5s',
              'transform': 'translateX(100%)'
            });
        }, 0);
        
    }
    if (direction === 'toLeft') {
      
      $slides.eq(nextSlide).css({
          transform: 'translateX(100%)'
        });
        
        setTimeout(function(){
          $slides.eq(nextSlide).css({
              'z-index': '1',
              'transition': 'transform 0.5s',
              'transform':'translateX(0)'
            });
            $slides.eq(currentSlide).css({
              'transition': 'transform 0.5s',
              'transform': 'translateX(-100%)'
            });
        }, 0);
    }
    setTimeout(function(){
        
      $slides.eq(currentSlide).css({
          'transition': 'none',
          'z-index': '0'
        });
        $slides.eq(nextSlide).css('transition', 'none');
        currentSlide = nextSlide;
        isGoing = false;
    }, 500);
    
};


$playPause.on('click', function(){ //по нажатию на кнопку воспроизведения/паузы останавливаем или запускаем слайдер 
    if (playing) {
        pauseSlideshow();
    }
    else {
        playSlideshow();
    }
});

function pauseSlideshow(){ //функция паузы
    playing = false;
    $playPause.attr('class', playBtn_FA); //меняем внешний фид кнопки
    clearInterval(slideInterval);
};

function playSlideshow() { //функция воспроизведения
    playing = true;
    $playPause.attr('class', pauseBtn_FA); //меняем внешний фид кнопки
    slideInterval = setInterval(showNextSlide, delay);
};

$next.on('click', function() {
    pauseSlideshow();
    showNextSlide();
});

$prev.on('click', function() {
    pauseSlideshow();
    showPreviousSlide();
});


$indicatorsContainer.on('click', 'i', function(){
  pauseSlideshow();
  if ($(this).index() > currentSlide) goToSlide($(this).index(), 'toLeft');
  else goToSlide($(this).index(), 'toRight');
})


$body.on('keydown', keyNavigation); //обрабатываем нажатие кнопки

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