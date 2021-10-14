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

function displayErrors(errors) {
    const errorsDiv = document.getElementById('errors');
    errorsDiv.innerHTML = '';
    if (errors && errors.length) {
        const list = document.createElement("ul");
        for (const error of errors){
            const item = document.createElement("li");
            item.innerText = error.message;
            list.appendChild(item);
        }
        errorsDiv.appendChild(list);
    }
}