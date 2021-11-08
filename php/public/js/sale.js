let connectE;

function processOrder(tokenCallback = function(response){}) {
    clearErrorMessage();

    disableOrderFormInputs();
    const btnOrder = document.getElementById("btnOrder");
    btnOrder.disabled = true;
    btnOrder.innerText = "Loading..."

    processPaymentToken(tokenCallback);
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

    let params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription;

    const crossReference = document.getElementById("inputCrossReference").value;
    if (crossReference.length > 0) {
        params += "&crossReference=" + crossReference;
    }

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

    document.getElementById("btnOrder").remove();
    document.getElementById("inputOrderPaymentToken").value = response.id;
    document.getElementById("sectionOrderPaymentToken").classList.remove('hidden');

    if (typeof tokenCallback === 'function') {
        tokenCallback(response)
    }
}

function processStartPayment() {
    clearErrorMessage();

    const btnStartPayment = document.getElementById("btnStartPayment");
    btnStartPayment.disabled = true;
    btnStartPayment.innerText = "Loading...";

    payConfig.paymentDetails.amount = document.getElementById("inputAmount").value;
    payConfig.paymentDetails.paymentToken = document.getElementById("inputOrderPaymentToken").value;

    connectE = new Connect.ConnectE(payConfig, displayErrors);

    document.getElementById("inputOrderPaymentToken").setAttribute('readonly', "true");
    document.getElementById("btnStartPayment").remove();

    document.getElementById("sectionCardHelp").classList.remove('hidden');
    document.getElementById("sectionPay").classList.remove('hidden');
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
