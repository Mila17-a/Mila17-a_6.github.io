"use strict";

window.addEventListener("DOMContentLoaded", function () {
    var servicePrices = {
        basic: 1000,
        premium: 2000,
        express: 1500
    };
    var optionPrices = {
        standard: 0,
        extended: 500,
        max: 1000
    };
    var propertyPrice = 300;

    var form = document.getElementById("calc");
    var quantityInput = document.getElementById("quantity");
    var optionsBlock = document.getElementById("options-block");
    var optionSelect = document.getElementById("option");
    var propertyBlock = document.getElementById("property-block");
    var propertyCheckbox = document.getElementById("property");
    var result = document.getElementById("result");

    function getServiceType() {
        return document.querySelector("input[name='service']:checked").value;
    }

    function update() {
        var type = getServiceType();
        var quantity = Number(quantityInput.value);
        var price = servicePrices[type];

        optionsBlock.hidden = type !== "premium";
        propertyBlock.hidden = type !== "express";

        if (type === "premium") {
            price += optionPrices[optionSelect.value];
        }
        if (type === "express" && propertyCheckbox.checked) {
            price += propertyPrice;
        }

        if (quantityInput.value.trim() === "" || !Number.isInteger(quantity) || quantity < 1) {
            result.textContent = "Введите корректное количество (целое число от 1)";
            return;
        }

        result.textContent = "Стоимость: " + (price * quantity) + " руб.";
    }

    quantityInput.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
});
