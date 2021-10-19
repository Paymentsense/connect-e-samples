let wallet;

function startWalletPayment() {
    clearErrorMessage();

    showApplePayNotSupportedWarningMessageIfSafari();

    const btnStartPayment = document.getElementById("btnStartPayment");
    btnStartPayment.disabled = true;
    btnStartPayment.innerText = "Loading...";

    payConfig.paymentDetails.amount = document.getElementById("inputAmount").value;
    payConfig.paymentDetails.paymentToken = document.getElementById("inputOrderPaymentToken").value;

    document.getElementById("inputOrderPaymentToken").setAttribute('readonly', "true");
    document.getElementById("btnStartPayment").remove();

    wallet = new Connect.Wallet(payConfig, processWalletResult, displayErrors);

    document.getElementById("sectionPay").classList.remove('hidden');
}

function showApplePayNotSupportedWarningMessageIfSafari() {
    const isSafari = window.safari !== undefined;
    if (!isSafari) {
        return
    }
    document.getElementById("applePayNotSupportWarning").classList.remove("hidden");
}

function processWalletResult(transactionResult) {
    console.log(transactionResult);
}
