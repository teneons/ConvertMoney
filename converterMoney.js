//swap valute
let swapValute = document.querySelector('.swapValute');

function button1 () {
    if(swapValute.value == 'to_ua'){
        swapValute.value = 'in_ua';
    } else swapValute.value = 'to_ua';

    alert(swapValute.value);


}

swapValute.addEventListener('click', button1);

/*
function swapSelect(){
    let select1 = document.getElementById('listWithCountry');
    let select2 = document.getElementById('listInCountry');

    let valueSelects1 = select1.value;
    let valueSelects2 = select2.value;

    select1.value = valueSelects2;
    select2.value = valueSelects1;

};

swapValute.addEventListener('click', swapSelect);
*/

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

    rateArray = [cursUS.rate, cursEU.rate, cursPL.rate, cursRU.rate];  
    }
}


// CONVERT
function converterMoney() {
    let select1 = document.getElementById('listWithCountry').value;
    let userValute = document.getElementById('userValute').value;
    let outValute = document.getElementById('outValute');

    let convertValute;

    switch (select1){
        case 'US': convertValute = userValute * rateArray[0] +" ₴"; break;
        case 'EU': convertValute = userValute * rateArray[1] +" ₴"; break;
        case 'PL': convertValute = userValute * rateArray[2] +" ₴"; break;
        case 'RU': convertValute = userValute * rateArray[3] +" ₴"; break;
    }
    
    outValute.innerHTML = convertValute;
}

getCursNBU();