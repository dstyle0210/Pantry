function scrollDisable(){
    $('body').addClass('bodyScrollDisabled').on('scroll touchmove wheel', function(e){
        e.preventDefault();
    });
}
function scrollAble(){
    $('body').removeClass('bodyScrollDisabled').off('scroll touchmove wheel');
}