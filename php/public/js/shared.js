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