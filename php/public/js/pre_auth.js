function processPreAuth() {
    clearErrorMessage();

    const btnStartPayment = document.getElementById("btnStartPayment");
    btnStartPayment.disabled = true;
    btnStartPayment.innerText = "Loading...";

    document.getElementById("inputOrderPaymentToken").setAttribute('readonly', "true");
    document.getElementById("sectionPayResult").classList.remove('hidden');

    processPreAuthConfirmPayment();
}

function processPreAuthConfirmPayment() {
    const id = document.getElementById("inputOrderPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processPreAuthConfirmPaymentRequestStateChange(xhr);
    }

    const params = "crossReference=" + document.getElementById("inputCrossReference").value;

    xhr.send(params);
}

function processPreAuthConfirmPaymentRequestStateChange(xhr) {
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
