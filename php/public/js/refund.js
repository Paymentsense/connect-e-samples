function processStartRefund() {
    clearErrorMessage();

    disableOrderFormInputs();
    document.getElementById("inputCrossReference").setAttribute('readonly', "true");

    const btnStartRefund = document.getElementById("btnStartRefund");
    btnStartRefund.disabled = true;
    btnStartRefund.innerText = "Loading...";

    processRefundToken();
}

function processRefund() {
    clearErrorMessage();

    const btnRefund = document.getElementById("btnRefund");
    btnRefund.disabled = true;
    btnRefund.innerText = "Loading...";

    document.getElementById("inputPaymentToken").setAttribute('readonly', "true");
    document.getElementById("sectionRefundResult").classList.remove('hidden');

    processRefundConfirmPayment();
}

function processRefundToken() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processRefundTokenRequestStateChange(xhr);
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

function processRefundTokenRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);

        const btnStartRefund = document.getElementById("btnStartRefund");
        btnStartRefund.disabled = false;
        btnStartRefund.innerText = "Submit";

        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }

    document.getElementById("btnStartRefund").remove();
    document.getElementById("inputPaymentToken").value = response.id;
    document.getElementById("sectionRefundPaymentToken").classList.remove("hidden");
}

function processRefundConfirmPayment() {
    const id = document.getElementById("inputPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processRefundConfirmPaymentRequestStateChange(xhr);
    }

    const params = "crossReference=" + document.getElementById("inputCrossReference").value;

    xhr.send(params);
}

function processRefundConfirmPaymentRequestStateChange(xhr) {
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
    const transactionTable = document.getElementById("refundResultTable");
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
    document.getElementById("btnRefund").remove();
    document.getElementById("sectionRefundResultLoading").classList.add("hidden");
    document.getElementById("sectionRefundResultTable").classList.remove("hidden");
}
