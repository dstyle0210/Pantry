function scrollDisable(){
    $('body').addClass('bodyScrollDisabled').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
    });
}
function scrollAble(){
    $('body').removeClass('bodyScrollDisabled').off('scroll touchmove mousewheel');
}