// First I target the elemnt from country as (option)
let option = document.getElementById("option1");
// Then I target the elemnt to country as (secOption)
let secOption = document.getElementById("option2");
// In fImg and tImg I target the img element of current country selected.
var fImg = document.getElementById("fromImgae");
var tImg = document.getElementById("toImgae");

// here I use forEach method of Array to get one by one elements from my country codes array
// and add a new option one by one till the array ends with current country codes one by one comes from the array
countryToCurrency.forEach((country) => {
    let options = `<option value'${country.code}'>${country.code}</option>`
    option.insertAdjacentHTML("beforeend", options)
    secOption.insertAdjacentHTML("beforeend", options)
})

// Here I target the convert currency button
document.getElementById("but").addEventListener("click", async (e) => {
    // paraVal is the variable to target the paragraph where my calculated currency stored.
    const paraVal = document.querySelector("p");
    let option = document.getElementById("option1");
    let secOption = document.getElementById("option2");
    // amount is the variable to target the input elemnt where we add our amount to convert.
    let amount = document.getElementById("num");
    // e.preventDefault() to stop browser to submiting the form.
    e.preventDefault()

    // condition to check If amount available or not and it must be greater than 0
    if (amount.value <= 0) {
        alert("Amount must be greater!")
    }
    else {
        try {
            // sending request to the api which gives us a response in object in which all exchange rates are available of all countries.
            const respons = await fetch(`https://v6.exchangerate-api.com/v6/8a24419d5e64bee96713af60/latest/${option.value}`)
            const data = await respons.json();
            // here I calculated the currency by multipling the input amount with the exchange rate of current selected country in which I am converting the currency
            let exhanceRate = amount.value * data.conversion_rates[secOption.value];
            // fixed the total currency calculated to 2 decimal points.
            let totalRate = exhanceRate.toFixed(2);
            // save the calculated currency to my paragraph element.
            paraVal.innerHTML = totalRate + " " + secOption.value;

        } catch (err) {
            // If error occurs in fetching the data it will get here and print in my console.
            console.log(err)
            alert("Something went wrong please try again Later!")
        }
    }
})

// function calls when country code of From Country changes.
function fromchangeHandler() {
    // get the current flag image url from the country code object of current country selected
    let nameCurrent;
    let flagCurrent;
    countryToCurrency.forEach((coun) => {
        if (option.value === coun.code) {
            flagCurrent = coun.flag
            nameCurrent = coun.name
        }
    })
    // set the attribute src and alt of current country selected with its country flag
    fImg.setAttribute("src", `${flagCurrent}`)
    fImg.setAttribute("alt", `${nameCurrent}`)
}

// function calls when country code of To Country changes.
function tochangeHandler() {
    // update the default value in paragraph with current country code
    const paraVal = document.querySelector("p");
    paraVal.innerHTML = "0.00 " + secOption.value;

    // get the current flag image url from the country code object of current country selected
    let nameCurrent;
    let flagCurrent;
    countryToCurrency.forEach((coun) => {
        if (secOption.value === coun.code) {
            flagCurrent = coun.flag
            nameCurrent = coun.name
        }
    })
    // set the attribute src and alt of current country selected with its country flag
    tImg.setAttribute("src", `${flagCurrent}`)
    tImg.setAttribute("alt", `${nameCurrent}`)
}

// function calls when user clicks on the clear ALl button.
function clearHandler() {
    // Clear all the data in the form.
    const paraVal = document.querySelector("p");
    let amount = document.getElementById("num");
    paraVal.innerHTML = "0.00 AED";
    amount.value = '';
    option.value = "AED";
    secOption.value = "AED";
    fImg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAG5SURBVHja7JdLihRBEEBfVqUU6rQNggiCFxA8gswFRNy49gAeQdx4G8HbuHDvRkRUnKxPZ2dGhous6Y9TtavPZmITtYggXsWPSKOqrCkFK8stgAFKoOr1kiKAt8CD76/f/KYYj//u7bPpU28Mn199eGiBLabg7uWLUePLp08mB/j66xvA1gKVSkK9J/29guuxNCZrVX60905qZlD0xvd5XbPvmN22uo+XCFDZXI2Idjt0txuk9TFM+ve7Yk9MAkAPIKSuI3XdoEMX/aQAd4qSfYpHAI0RbVt0FGA/KYAtyvMMaBTUObRpBh2a0E3cgspewkkJQkDqGm3bQfNPL9/PtIQ+cmjC5OqbTaj9qppRcglCAFej3h9H8P9xnBUgCtRNBllYDj0QmxbWAkgxggiktFjg60PosAeMJnQtAIkRq7poBlIfK5cgRBQdzYC1dtLgVVVRluUJgEQo7XH0RminlBDCKUDK99AIwByXs4gcb0JJafaFc7aCjTlktQBIqpiVAPIYas5AcXEx6LCRzaxjKAn4465GjZ1zs13GBngMPAceLbyFfwJfTP8m2PR6SfGAM7eP07UB/g0Aw73uXdMbeJMAAAAASUVORK5CYII=")
    fImg.setAttribute("alt", "UAE Dirham")
    tImg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAG5SURBVHja7JdLihRBEEBfVqUU6rQNggiCFxA8gswFRNy49gAeQdx4G8HbuHDvRkRUnKxPZ2dGhous6Y9TtavPZmITtYggXsWPSKOqrCkFK8stgAFKoOr1kiKAt8CD76/f/KYYj//u7bPpU28Mn199eGiBLabg7uWLUePLp08mB/j66xvA1gKVSkK9J/29guuxNCZrVX60905qZlD0xvd5XbPvmN22uo+XCFDZXI2Idjt0txuk9TFM+ve7Yk9MAkAPIKSuI3XdoEMX/aQAd4qSfYpHAI0RbVt0FGA/KYAtyvMMaBTUObRpBh2a0E3cgspewkkJQkDqGm3bQfNPL9/PtIQ+cmjC5OqbTaj9qppRcglCAFej3h9H8P9xnBUgCtRNBllYDj0QmxbWAkgxggiktFjg60PosAeMJnQtAIkRq7poBlIfK5cgRBQdzYC1dtLgVVVRluUJgEQo7XH0RminlBDCKUDK99AIwByXs4gcb0JJafaFc7aCjTlktQBIqpiVAPIYas5AcXEx6LCRzaxjKAn4465GjZ1zs13GBngMPAceLbyFfwJfTP8m2PR6SfGAM7eP07UB/g0Aw73uXdMbeJMAAAAASUVORK5CYII=")
    tImg.setAttribute("alt", "UAE Dirham")
}