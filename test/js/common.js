
$(document).ready(function(){

    faqListEvent();
    animateBannerTotal();
    btnTopClick();
    
});

$(window).scroll(function(){
    
    btnGoTop();
    
});

function btnTopClick(){

    var $btnGoTop = $('.btnTop');

    $btnGoTop.click(function(){
        window.scrollTo({top:0, behavior:'smooth'});
    })

}

function btnGoTop(){
    
    var btnGoTop = $('.btnTop');
    var winInHeight = $(window).height();
    var winScrollTop = $(window).scrollTop();

    if ( winInHeight <= winScrollTop/2 ){
        btnGoTop.show();
    }
    else {
        btnGoTop.hide();
    }
    // console.log(winInHeight);
    // console.log(winScrollTop);
}   

function faqListEvent(){
    var $FaqEventTarget = $('.faqWrap ul li a');
    var $FaqAnswer = $('.faqAnswer');

    $FaqEventTarget.click(function(e){
        if( !$FaqEventTarget.hasClass('isActive') ){
            $(this).addClass('isActive');
        }
        else {
            $(this).removeClass('isActive');
        }
        e.preventDefault();
    });
}

function animateBannerTotal() {
    var IMG_FIX_WIDTH = 240;
    var SPEED = 20;
    var leftImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var rightImages = [14, 15, 16, 1, 18, 19, 20, 21, 22, 23, 14, 15, 16, 1, 18, 19, 20, 21, 22, 23];

    animateBanner2($("#bannerLeft"), leftImages, false);
    animateBanner2($("#bannerRight"), rightImages, true);

    function get$Img(num) {
        var srcPath = "../images/event/";
        var $img = $("<img/>");
        $img.attr("src", srcPath + "company-" + num + ".svg");
        return $img;
    }

    function animateBanner2($bannerArea, images, isLeft) {
        var direction = isLeft ? -1 : 1;
        var base = isLeft ? ":first" : ":last";
        var indexControlNum = isLeft ? 0 : -1;
        images.forEach(function (v, i) {
            var index = i + indexControlNum;
            var $img = get$Img(v)
                .attr({
                    id: "banner" + index,
                    class: "js-banner-item",
                })
                .css("left", IMG_FIX_WIDTH * index);
            $bannerArea.append($img);
        });

        var addTimer = 0;
        setInterval(function () {
            $bannerArea.find(".js-banner-item").each(function (index, el) {
                $(el).css("left", $(el).position().left + direction);
                addTimer++;
                if (addTimer > SPEED * IMG_FIX_WIDTH) {
                    addTimer = 0;
                    var $firstObj = $bannerArea.find(".js-banner-item" + base);
                    var $firstClone = $firstObj.clone();
                    $firstClone.css("left", $firstObj.position().left - direction * IMG_FIX_WIDTH * images.length);
                    isLeft ? $bannerArea.append($firstClone) : $bannerArea.prepend($firstClone);
                    $firstObj.remove();
                }
            });
        }, SPEED);
    }
}
