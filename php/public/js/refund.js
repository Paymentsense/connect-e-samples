function processRefund() {
    disableRefundFormInputs();
    processRefundToken();
}

function disableRefundFormInputs() {
    let btnRefund = document.getElementById("btnRefund")
    btnRefund.disabled = true;
    btnRefund.innerText = "Loading..."
}

function processRefundToken() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processRefundTokenRequestStateChange(xhr);
    }

    let amount = document.getElementById("inputAmount").value;
    let transactionType = document.getElementById("inputRefundTransactionType").value;
    let orderId = document.getElementById("inputOrderId").value;
    let orderDescription = document.getElementById("inputOrderDescription").value;
    let crossReference = document.getElementById("inputRefundCrossReference").value

    let params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription + "&crossReference=" + crossReference;

    xhr.send(params);
}

function processRefundTokenRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        return;
    }

    payConfig.paymentDetails.paymentToken = response.id;

    document.getElementById("btnRefund").remove();
    document.getElementById("sectionRefundResult").classList.remove("hidden");

    processRefundConfirmPayment();
}

function processRefundConfirmPayment() {
    let id = payConfig.paymentDetails.paymentToken;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processRefundConfirmPaymentRequestStateChange(xhr);
    }

    let params = "crossReference=" + document.getElementById("inputRefundCrossReference").value;

    xhr.send(params);
}

function processRefundConfirmPaymentRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 200) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.statusCode === 'undefined') {
        console.error("unexpected api response", response);
        return;
    }
    payment = response;
    const transactionTable = document.getElementById("refundResultTable");
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
    document.getElementById("sectionRefundResultLoading").classList.add("hidden");
    document.getElementById("sectionRefundResultTable").classList.remove("hidden");
}
