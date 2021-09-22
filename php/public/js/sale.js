let connectE;
let payment;

function processOrder(tokenCallback = function(response){}) {
    clearErrorMessage();

    disableOrderFormInputs();
    const btnOrder = document.getElementById("btnOrder");
    btnOrder.disabled = true;
    btnOrder.innerText = "Loading..."

    processPaymentToken(tokenCallback);
}

function disableOrderFormInputs() {
    document.getElementById("inputAmount").setAttribute('readonly', "true");
    document.getElementById("inputOrderId").setAttribute('readonly', "true");
    document.getElementById("inputOrderDescription").setAttribute('readonly', "true");
}

function enableOrderFormInputs() {
    document.getElementById("inputAmount").removeAttribute('readonly');
    document.getElementById("inputOrderId").removeAttribute('readonly');
    document.getElementById("inputOrderDescription").removeAttribute('readonly');
}

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

function processPaymentToken(tokenCallback = function(response){}) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processPaymentTokenRequestStateChange(xhr, tokenCallback);
    }

    const amount = document.getElementById("inputAmount").value;
    const transactionType = document.getElementById("inputTransactionType").value;
    const orderId = document.getElementById("inputOrderId").value;
    const orderDescription = document.getElementById("inputOrderDescription").value;

    const params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription;

    xhr.send(params);
}

function processPaymentTokenRequestStateChange(xhr, tokenCallback = function(response){}) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);

        const btnOrder = document.getElementById("btnOrder");
        btnOrder.disabled = false;
        btnOrder.innerText = "Submit"

        enableOrderFormInputs();
        showErrorMessage("An api error occurred, please check console.log for details");

        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }

    payConfig.paymentDetails.amount = document.getElementById("inputAmount").value;
    payConfig.paymentDetails.paymentToken = response.id;

    connectE = new Connect.ConnectE(payConfig, displayErrors);

    document.getElementById("btnOrder").remove();
    document.getElementById("sectionCardHelp").classList.remove('hidden');
    document.getElementById("sectionPay").classList.remove('hidden');

    if (typeof tokenCallback === 'function') {
        tokenCallback(response)
    }
}

function processPayment(confirmPaymentCallback = function (response) {}) {
    clearErrorMessage();

    const btnPay = document.getElementById("btnPay");
    btnPay.disabled = true;
    btnPay.innerText = "Loading...";

    connectE.executePayment()
        .then(function(data) {
            processPaymentSuccess(data, confirmPaymentCallback);
        }).catch(function(data) {
            processPaymentError(data);
        });
}

function processPaymentSuccess(data, confirmPaymentCallback = function(response){}) {
    document.getElementById("sectionCardHelp").classList.add('hidden');
    document.getElementById("demo-payment").classList.add("hidden");
    document.getElementById("btnPay").remove();
    document.getElementById("demo-result").classList.remove("hidden");
    document.getElementById("status-code").innerText = data.statusCode;
    document.getElementById("auth-code").innerText = data.authCode;
    document.getElementById("sectionPayResult").classList.remove("hidden");
    processConfirmPayment(confirmPaymentCallback);
}

function processPaymentError(data) {
    console.error('Payment request failed', data);

    const errorMsg = document.getElementById("errorMsg");
    errorMsg.classList.remove('hidden');
    errorMsg.innerText = "An api error occurred, please check console.log for details";

    const btnPay = document.getElementById("btnPay");
    btnPay.disabled = false;
    btnPay.innerText = "Pay";

    if (typeof data === 'string') {
        document.getElementById("errors").innerText = data;
    }
    if (data && data.message) {
        document.getElementById("errors").innerText = data.message;
    }
}

function processConfirmPayment(confirmPaymentCallback = function(response){}) {
    clearErrorMessage();

    const id = payConfig.paymentDetails.paymentToken;
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
    payment = response;
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
