function processStartCollect() {
    clearErrorMessage();

    const btnStartCollect = document.getElementById("btnStartCollect");
    btnStartCollect.disabled = true;
    btnStartCollect.innerText = "Loading...";

    document.getElementById("inputCollectAmount").setAttribute('readonly', "true");
    document.getElementById("inputCollectOrderId").setAttribute('readonly', "true");
    document.getElementById("inputCollectOrderDescription").setAttribute('readonly', "true");
    document.getElementById("inputCollectCrossReference").setAttribute('readonly', "true");

    processCollectToken();
}

function processCollect() {
    clearErrorMessage();

    const btnCollect = document.getElementById("btnCollect");
    btnCollect.disabled = true;
    btnCollect.innerText = "Loading...";

    document.getElementById("inputCollectPaymentToken").setAttribute('readonly', "true");
    document.getElementById("sectionCollectResult").classList.remove("hidden");

    processCollectConfirmPayment();
}

function processCollectToken() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/access-tokens', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processCollectTokenRequestStateChange(xhr);
    }

    const amount = document.getElementById("inputAmount").value;
    const transactionType = document.getElementById("inputCollectTransactionType").value;
    const orderId = document.getElementById("inputOrderId").value;
    const orderDescription = document.getElementById("inputOrderDescription").value;
    const crossReference = document.getElementById("inputCollectCrossReference").value

    const params = "amount=" + amount + "&transactionType=" + transactionType + "&orderId=" +
        orderId + "&orderDescription=" + orderDescription + "&crossReference=" + crossReference;

    xhr.send(params);
}

function processCollectTokenRequestStateChange(xhr) {
    if (xhr.readyState !== 4) {
        return;
    }
    if (xhr.status !== 201) {
        console.error("unexpected api response code", xhr.status, xhr.responseText);

        const btnStartCollect = document.getElementById("btnStartCollect");
        btnStartCollect.disabled = false;
        btnStartCollect.innerText = "Submit";

        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }
    const response = JSON.parse(xhr.responseText);
    if (typeof response.id === 'undefined') {
        console.error("unexpected api response", response);
        showErrorMessage("An api error occurred, please check console.log for details");
        return;
    }

    document.getElementById("inputCollectPaymentToken").value = response.id;
    document.getElementById("btnStartCollect").remove();
    document.getElementById("sectionCollectPaymentToken").classList.remove("hidden");
}

function processCollectConfirmPayment() {
    const id = document.getElementById("inputCollectPaymentToken").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cross-reference-payments/' + id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.onreadystatechange = function() {
        processCollectConfirmPaymentRequestStateChange(xhr);
    }

    const params = "crossReference=" + document.getElementById("inputCollectCrossReference").value;

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
    document.getElementById("btnCollect").remove();
    document.getElementById("sectionCollectResultLoading").classList.add("hidden");
    document.getElementById("sectionCollectResultTable").classList.remove("hidden");
}
