var chatTextInput = null;
var chatText = '';
var pressedKey = {};

function goToKOT() {
    var goToUrl = 'https://s2.kingtime.jp/independent/recorder/personal/';
    var newTab = window.open(goToUrl, '_blank');
    setTimeout(function () {
        newTab.focus();
    }, 200);
}

function checkChatText() {
    var checkExp = /(業務開始|業務終了)/;
    if (checkExp.test(chatText)) {
        goToKOT();
    };
}

function clickSendButton() {
    chatText = chatTextInput.value;
    checkChatText();
}

function setBasic() {
    var sendArea = document.getElementById('_chatSendArea');
    var sendButtons = sendArea.querySelectorAll('button');

    sendButtons.forEach((element) => {
        if (element.innerText === '送信') {
            element.onclick = clickSendButton;
        }
    });

    chatTextInput = document.getElementById('_chatText');

    document.addEventListener("keydown", function (event) {
        pressedKey[event.key] = true;

        if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt' || event.key === 'Meta') {
            chatText = chatTextInput.value;
        }

        if ((pressedKey.Control || pressedKey.Shift || pressedKey.Alt || pressedKey.Meta) && event.keyCode === 13) {
            checkChatText();
        }
    });

    document.addEventListener('keyup', (event) => {
        delete pressedKey[event.key];
    });
}

document.onreadystatechange = function () {
    readyState = document.readyState;
    if (readyState === 'complete') {
        setTimeout(function () {
            setBasic();
        }, 500);
    }
}