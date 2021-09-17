function processSubscription() {
    disableSubscriptionFormInputs();
    processSubscriptionToken();
}

function disableSubscriptionFormInputs() {
    let btnSubscription = document.getElementById("btnSubscription")
    btnSubscription.disabled = true;
    btnSubscription.innerText = "Loading..."
}

function processSubscriptionToken() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processSubscriptionTokenRequestStateChange(xhr);
    }

    let amount = document.getElementById("inputAmount").value;
    let transactionType = document.getElementById("inputSubscriptionTransactionType").value;
    let orderId = document.getElementById("inputOrderId").value;
    let orderDescription = document.getElementById("inputOrderDescription").value;
    let crossReference = document.getElementById("inputSubscriptionCrossReference").value

    let params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription + "&crossReference=" + crossReference;

    xhr.send(params);
}

function processSubscriptionTokenRequestStateChange(xhr) {
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

    document.getElementById("btnSubscription").remove();
    document.getElementById("sectionSubscriptionResult").classList.remove("hidden");

    processSubscriptionConfirmPayment();
}

function processSubscriptionConfirmPayment() {
    let id = payConfig.paymentDetails.paymentToken;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processSubscriptionConfirmPaymentRequestStateChange(xhr);
    }

    let params = "crossReference=" + document.getElementById("inputSubscriptionCrossReference").value;

    xhr.send(params);
}

function processSubscriptionConfirmPaymentRequestStateChange(xhr) {
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
    const transactionTable = document.getElementById("subscriptionResultTable");
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
    document.getElementById("sectionSubscriptionResultLoading").classList.add("hidden");
    document.getElementById("sectionSubscriptionResultTable").classList.remove("hidden");
}
