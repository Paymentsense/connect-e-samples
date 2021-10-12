function processStartSubscription() {
    clearErrorMessage();

    disableOrderFormInputs();
    document.getElementById("inputCrossReference").setAttribute('readonly', "true");

    const btnStartSubscription = document.getElementById("btnStartSubscription");
    btnStartSubscription.disabled = true;
    btnStartSubscription.innerText = "Loading...";

    processSubscriptionToken();
}

function processSubscription() {
    clearErrorMessage();

    const btnSubscription = document.getElementById("btnSubscription")
    btnSubscription.disabled = true;
    btnSubscription.innerText = "Loading..."

    document.getElementById("inputPaymentToken").setAttribute('readonly', "true");
    document.getElementById("sectionSubscriptionResult").classList.remove("hidden");

    processSubscriptionConfirmPayment();
}

function processSubscriptionToken() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processSubscriptionTokenRequestStateChange(xhr);
    }

    const amount = document.getElementById("inputAmount").value;
    const transactionType = document.getElementById("inputTransactionType").value;
    const orderId = document.getElementById("inputOrderId").value;
    const orderDescription = document.getElementById("inputOrderDescription").value;
    const crossReference = document.getElementById("inputCrossReference").value

    const params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription + "&crossReference=" + crossReference;

    xhr.send(params);
}

function processSubscriptionTokenRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);

        const btnStartSubscription = document.getElementById("btnStartSubscription");
        btnStartSubscription.disabled = false;
        btnStartSubscription.innerText = "Submit";

        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }

    document.getElementById("inputPaymentToken").value = response.id;
    document.getElementById("btnStartSubscription").remove();
    document.getElementById("sectionSubscriptionPaymentToken").classList.remove("hidden");
}

function processSubscriptionConfirmPayment() {
    const id = document.getElementById("inputPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processSubscriptionConfirmPaymentRequestStateChange(xhr);
    }

    const params = "crossReference=" + document.getElementById("inputCrossReference").value;

    xhr.send(params);
}

function processSubscriptionConfirmPaymentRequestStateChange(xhr) {
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
    const transactionTable = document.getElementById("subscriptionResultTable");
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
    document.getElementById("btnSubscription").remove();
    document.getElementById("sectionSubscriptionResultLoading").classList.add("hidden");
    document.getElementById("sectionSubscriptionResultTable").classList.remove("hidden");
}
