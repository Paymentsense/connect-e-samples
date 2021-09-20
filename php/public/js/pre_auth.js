function processCollect() {
    clearErrorMessage();

    let btnCollect = document.getElementById("btnCollect");
    btnCollect.disabled = true;
    btnCollect.innerText = "Loading...";

    processCollectToken();
}

function processCollectToken() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processCollectTokenRequestStateChange(xhr);
    }

    let amount = document.getElementById("inputAmount").value;
    let transactionType = document.getElementById("inputCollectTransactionType").value;
    let orderId = document.getElementById("inputOrderId").value;
    let orderDescription = document.getElementById("inputOrderDescription").value;
    let crossReference = document.getElementById("inputCollectCrossReference").value

    let params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription + "&crossReference=" + crossReference;

    xhr.send(params);
}

function processCollectTokenRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);

        let btnCollect = document.getElementById("btnCollect");
        btnCollect.disabled = false;
        btnCollect.innerText = "Collect";

        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }

    payConfig.paymentDetails.paymentToken = response.id;

    document.getElementById("btnCollect").remove();
    document.getElementById("sectionCollectResult").classList.remove("hidden");

    processCollectConfirmPayment();
}

function processCollectConfirmPayment() {
    let id = payConfig.paymentDetails.paymentToken;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processCollectConfirmPaymentRequestStateChange(xhr);
    }

    let params = "crossReference=" + document.getElementById("inputCollectCrossReference").value;

    xhr.send(params);
}

function processCollectConfirmPaymentRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 200) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.statusCode === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    payment = response;
    const transactionTable = document.getElementById("collectResultTable");
    for (let prop in response) {
        if (response.hasOwnProperty(prop)) {
            let fieldCell = document.createElement('td');
            fieldCell.innerText = prop;
            let valueCell = document.createElement('td');
            valueCell.innerText = response[prop];
            let tableRow = document.createElement('tr');
            tableRow.appendChild(fieldCell);
            tableRow.appendChild(valueCell);
            transactionTable.appendChild(tableRow);
        }
    }
    document.getElementById("sectionCollectResultLoading").classList.add("hidden");
    document.getElementById("sectionCollectResultTable").classList.remove("hidden");
}
