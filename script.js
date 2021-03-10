(function () {
    var Animate = function () {
        var txt = document.querySelector(".animate");
        var strTxt = txt.textContent;
        var splitTxt = strTxt.split("");
        txt.textContent = "";
        for (var i = 0; i < splitTxt.length; ++i) {
            txt.innerHTML += "<span>" + splitTxt[i] + "</span>";
        }
        var char = 0;
        var timer;
        var animate = function () {
            timer = setInterval(onTick, 50);
        };
        var onTick = function () {
            var span = txt.querySelectorAll("span")[char++];
            span.classList.add("fade");
            if (char === splitTxt.length) {
                complete();
                return;
            }
        };
        var complete = function () {
            clearInterval(timer);
            timer = null;
        };
        return { animate: animate };
    };
    var Typing = function () {
        var txts = ['webpage', 'page', 'github page'];
        var count = 0;
        var index = 0;
        var currentTxt = '';
        var letter;
        var type = function () {
            if (count === txts.length) {
                count = 0;
            }
            currentTxt = txts[count];
            letter = currentTxt.slice(0, ++index);
            document.querySelector('.typing').textContent = letter;
            if (letter.length === currentTxt.length) {
                ++count;
                index = 0;
            }
            setTimeout(type, 400);
        };
        return { type: type };
    };
    var anim = Animate();
    anim.animate();
    var type = Typing();
    type.type();
})();
