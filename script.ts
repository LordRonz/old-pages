(function() {
    const Animate = () =>{
        const txt = document.querySelector(".animate");
        const strTxt = txt!.textContent;
        const splitTxt = strTxt!.split("");
        txt!.textContent = "";

        for (let i = 0; i < splitTxt.length; ++i) {
            txt!.innerHTML += "<span>" + splitTxt[i] + "</span>";
        }

        let char = 0;
        let timer: number | null;

        const animate = () => {
            timer = setInterval(onTick, 50);
        };

        const onTick = () => {
            const span = txt!.querySelectorAll("span")[char++];
            span.classList.add("fade");
            if (char === splitTxt.length) {
                complete();
                return;
            }
        };

        const complete = () => {
            clearInterval(timer!);
            timer = null;
        };
        return { animate };
    };

    const Typing = () => {
        const txts = ['webpage', 'page', 'github page'];
        let count = 0;
        let index = 0;
        let currentTxt = '';
        let letter;

        const type = () => {
            if(count === txts.length) {
                count = 0;
            }
            currentTxt = txts[count];
            letter = currentTxt.slice(0, ++index);
            document.querySelector('.typing')!.textContent = letter;
            if(letter.length === currentTxt.length) {
                ++count;
                index = 0;
            }
            setTimeout(type, 400);
        };
        return { type };
    };

    const anim = Animate();
    anim.animate();
    const type = Typing();
    type.type();
})();