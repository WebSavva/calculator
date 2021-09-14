const appObject = {
    buttons: document.querySelectorAll('button'),
    display: document.querySelector('.calculator-display__content'),
    calculator: document.querySelector('.calculator'),
    firstValue: 0,
    operatorValue: '',
    awaitingNextNumber: false,
    operations: {
        "/" : (firstValue, secondValue) => firstValue / secondValue,
        "*" : (firstValue, secondValue) => firstValue * secondValue,
        "+" : (firstValue, secondValue) => firstValue + secondValue,
        "-" : (firstValue, secondValue) => firstValue - secondValue,
        "=" : (firstValue, secondValue) => secondValue
    }
};

appObject.buttons.forEach( (btn) => {
    if ( btn.classList.contains('operator') ) {
        btn.addEventListener('click',useOperator);
    } else if (btn.classList.contains('decimal') ) {
        btn.addEventListener('click', addDecimal);
    } else if (btn.classList.contains('clear') ) {
        btn.addEventListener('click', clearDisplay);
    } else {
        btn.addEventListener('click', displayNumber);
    }
});

//functions 
function displayNumber(event, num = event.target.value) {
    if (appObject.awaitingNextNumber) {
        appObject.display.textContent = num;
        appObject.awaitingNextNumber = false;
    } else {
        appObject.display.textContent = appObject.display.textContent === '0' ? num : appObject.display.textContent + num;
    }
}

function clearDisplay() {
    appObject.display.textContent = '0';
    appObject.awaitingNextNumber = false;
    appObject.firstValue = 0;
    appObject.operatorValue = "";
}

function addDecimal() {
    if (appObject.awaitingNextNumber) return;

    if ( !appObject.display.textContent.includes('.') ) {
        appObject.display.textContent = `${appObject.display.textContent}.`;
    }
}

function useOperator(event, operator = event.target.value) {
    const currentValue = +appObject.display.textContent;

    //in case of operator change
    if (appObject.operatorValue && appObject.awaitingNextNumber) {
        appObject.operatorValue = operator;
        return;
    }



    //assigning first value if not existed
    if (!appObject.firstValue) {
        appObject.firstValue = currentValue;
    } else {
        const calculation = appObject.operations[appObject.operatorValue](appObject.firstValue, currentValue);
        console.log(calculation);
        appObject.firstValue = calculation;
        appObject.display.textContent = calculation;
    }

    appObject.operatorValue = operator;
    appObject.awaitingNextNumber = true;
} 