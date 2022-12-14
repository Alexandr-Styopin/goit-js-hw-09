const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};



class ColorSwitcher {
    constuctor() {
        this.intervalId = null;
        this.isActive = false;
    };
    
    start() {
        if(this.isActive) {
            return;
        };

        this.isActive = true;

        const color = getRandomHexColor();

        this.intervalId = setInterval(() => {
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }

    
};

const colorSwitcher = new ColorSwitcher;

refs.stopBtn.setAttribute('disabled', true);
refs.stopBtn.classList.add('isDisabled');

refs.startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn (evt) {
    colorSwitcher.start();

    refs.stopBtn.removeAttribute('disabled');
    refs.stopBtn.classList.remove('isDisabled');

    refs.startBtn.setAttribute('disabled', true);
    refs.startBtn.classList.add('isDisabled');
};

refs.stopBtn.addEventListener('click', onClickStopBtn);
function onClickStopBtn(evt) {
    colorSwitcher.stop();

    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.classList.remove('isDisabled');

    refs.stopBtn.setAttribute('disabled', true);
    refs.stopBtn.classList.add('isDisabled');
};


