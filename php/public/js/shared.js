function showErrorMessage(message) {
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.classList.remove('hidden');
    errorMsg.innerText = message;
}

function clearErrorMessage() {
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.classList.add('hidden');
    errorMsg.innerText = "";
}

function disableOrderFormInputs() {
    document.getElementById("inputAmount").setAttribute('readonly', "true");
    document.getElementById("inputOrderId").setAttribute('readonly', "true");
    document.getElementById("inputOrderDescription").setAttribute('readonly', "true");
    document.getElementById("inputCrossReference").setAttribute('readonly', "true");
}

function enableOrderFormInputs() {
    document.getElementById("inputAmount").removeAttribute('readonly');
    document.getElementById("inputOrderId").removeAttribute('readonly');
    document.getElementById("inputOrderDescription").removeAttribute('readonly');
    document.getElementById("inputCrossReference").removeAttribute('readonly');
}

function processCrossReference() {
    clearErrorMessage();

    const btnStartPayment = document.getElementById("btnStartPayment");
    btnStartPayment.disabled = true;
    btnStartPayment.innerText = "Loading...";

    document.getElementById("inputOrderPaymentToken").setAttribute('readonly', "true");
    document.getElementById("sectionPayResult").classList.remove("hidden");

    processCrossReferencePayment();
}

function processCrossReferencePayment() {
    const id = document.getElementById("inputOrderPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processCrossReferenceConfirmPaymentRequestStateChange(xhr);
    }

    const params = "crossReference=" + document.getElementById("inputCrossReference").value;

    xhr.send(params);
}

function processCrossReferenceConfirmPaymentRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 200) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.statusCode === 'undefined' || response.statusCode !== 0) {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    document.getElementById("btnStartPayment").remove();
    processConfirmPayment();
}

function processConfirmPayment(confirmPaymentCallback = function(response){}) {
    clearErrorMessage();

    const id = document.getElementById("inputOrderPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/payments/' + id, true);
    xhr.onreadystatechange = function() {
        processConfirmPaymentRequestStateChange(xhr, confirmPaymentCallback);
    }

    xhr.send();
}

function processConfirmPaymentRequestStateChange(xhr, confirmPaymentCallback = function(response){}) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 200) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.crossReference === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const transactionTable = document.getElementById("payResultTable");
    for (const prop in response) {
        if (response.hasOwnProperty(prop)) {
            const fieldCell = document.createElement('td');
            fieldCell.innerText = prop;
            const valueCell = document.createElement('td');
            valueCell.innerText = response[prop];
            const tableRow = document.createElement('tr');
            tableRow.appendChild(fieldCell);
            tableRow.appendChild(valueCell);
            transactionTable.appendChild(tableRow);
        }
    }
    document.getElementById("sectionPayResultLoading").classList.add("hidden");
    document.getElementById("sectionPayResultTable").classList.remove("hidden");

    if (typeof confirmPaymentCallback === 'function') {
        confirmPaymentCallback(response);
    }
}

function displayErrors(errors) {
    const errorsDiv = document.getElementById('errors');
    errorsDiv.innerHTML = '';
    if (errors && errors.length) {
        const list = document.createElement("ul");
        for (const error of errors){
            const item = document.createElement("li");
            item.innerText = error.message;
            list.appendChild(item);
        }
        errorsDiv.appendChild(list);
    }
}