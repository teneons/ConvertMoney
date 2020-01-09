//get swap btn
let swapValute = document.getElementById('swapValute');

//swap valute and convert function
function swapSelect(){
    let select1 = document.getElementById('listWithCountry');
    let select2 = document.getElementById('listInCountry');

    let valueSelects1 = select1.value;
    let valueSelects2 = select2.value;

    select1.value = valueSelects2;
    select2.value = valueSelects1;

    //change convert function
    if(swapValute.value == 'val_to_ua'){
        swapValute.value = 'ua_to_val';
  
        document.querySelector('select').setAttribute('onchange', 'converterUa_To_Val()');
        document.getElementById('userValute').setAttribute('oninput', 'converterUa_To_Val()');

    } else {
        swapValute.value = 'val_to_ua'
        document.querySelector('select').setAttribute('onchange', 'converterVal_To_Ua()');
        document.getElementById('userValute').setAttribute('oninput', 'converterVal_To_Ua()');
    };

};

swapValute.addEventListener('click', swapSelect);


//get rate
let rateArray = [];

function getCursNBU() {
    let requestUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    
    let request = new XMLHttpRequest;
    request.open('GET', requestUrl);
    request.responseType = 'text';
    request.send();

    request.onload = getRate;

    function getRate (){

    let cursGetValueValute = request.response;
    let cursToObj = JSON.parse(cursGetValueValute);

    let cursUS = cursToObj.find(item => item.cc == 'USD');
    let cursEU = cursToObj.find(item => item.cc == 'EUR');
    let cursPL = cursToObj.find(item => item.cc == 'PLN');
    let cursRU = cursToObj.find(item => item.cc == 'RUB');
    let cursCN = cursToObj.find(item => item.cc == 'CNY');

    rateArray = [cursUS.rate, cursEU.rate, cursPL.rate, cursRU.rate, cursCN.rate];
    }
}


// CONVERT
function converterVal_To_Ua() {
    let select1 = document.getElementById('listWithCountry').value;
    let userValute = document.getElementById('userValute').value;
    let outValute = document.getElementById('outValute');

    let convertValute;

    switch (select1){
        case 'US': convertValute = userValute * rateArray[0].toFixed(2) + " ₴"; break;
        case 'EU': convertValute = userValute * rateArray[1].toFixed(2) + " ₴"; break;
        case 'PL': convertValute = userValute * rateArray[2].toFixed(2) + " ₴"; break;
        case 'RU': convertValute = userValute * rateArray[3].toFixed(2) + " ₴"; break;
        case 'CN': convertValute = userValute * rateArray[4].toFixed(2) + " ₴"; break;
    }

    outValute.innerHTML = convertValute ;
}

function converterUa_To_Val() {
    //let select1 = document.getElementById('listWithCountry').value;
    let select2 = document.getElementById('listInCountry').value;
    let userValute = document.getElementById('userValute').value;
    let outValute = document.getElementById('outValute');

    let convertValute;

    switch (select2){
        case 'US': convertValute = userValute / rateArray[0].toFixed(2) +" $"; break;
        case 'EU': convertValute = userValute / rateArray[1].toFixed(2) +" €"; break;
        case 'PL': convertValute = userValute / rateArray[2].toFixed(2) +" zł"; break;
        case 'RU': convertValute = userValute / rateArray[3].toFixed(2) +" ₽"; break;
        case 'CN': convertValute = userValute / rateArray[4].toFixed(2) + " ¥"; break;
    }
    
    outValute.innerHTML = convertValute;
}

getCursNBU();