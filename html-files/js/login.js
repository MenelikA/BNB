let logInForm = document.getElementById('login-form');
let pageBody = document.querySelector("body");

function handleRentLogin(event) {
    event.preventDefault();

    removeError();

    //Create new FormData object from form data
    const formDataObj = new FormData(logInForm);
    //Generates key-value pairs
    const keyValuePairs = Object.fromEntries(formDataObj.entries());
    //Converts JSON
    const jsonStr = JSON.stringify(keyValuePairs);
    const jsonObj = JSON.parse(jsonStr)
    const data = {
        "username": jsonObj.username.toLowerCase(),
        "password": jsonObj.password
    }
    const strData = JSON.stringify(data);
    return fetch('http://localhost:3001/auth/renter/login', {
        method: 'POST',
        body: strData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(msg => {
            if (msg.error) {
                const errorHandler = document.createElement("h3");
                errorHandler.setAttribute('id', 'error');
                errorHandler.classList.add('text-center')
                errorHandler.innerText = msg.error;
                pageBody.append(errorHandler);
                errorHandler.style.color = "red"
            }
            else {
                storeId(msg.id);
                window.location.href = './renter_dashboard.html'
            }
        })
        .catch(() => {
            const errorMsg = document.createElement("h3");
            errorMsg.setAttribute('id', 'error');
            errorMsg.classList.add('text-center')
            errorMsg.innerText = "The request could not be fulfilled.";
            pageBody.append(errorMsg);
            errorMsg.style.color = "red"
        });
}

function handleManLogin(event) {
    event.preventDefault();

    removeError();

    //Create new FormData object from form data
    const formDataObj = new FormData(logInForm);
    //Generates key-value pairs
    const keyValuePairs = Object.fromEntries(formDataObj.entries());
    //Converts JSON
    const jsonStr = JSON.stringify(keyValuePairs);
    const jsonObj = JSON.parse(jsonStr)
    const data = {
        "username": jsonObj.username.toLowerCase(),
        "password": jsonObj.password
    }
    const strData = JSON.stringify(data);
    return fetch('http://localhost:3001/auth/manager/login', {
        method: 'POST',
        body: strData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(msg => {
            if (msg.error) {
                const errorHandler = document.createElement("h3");
                errorHandler.setAttribute('id', 'error');
                errorHandler.classList.add('text-center');
                errorHandler.innerText = msg.error;
                pageBody.append(errorHandler);
                errorHandler.style.color = "red";
            }
            else {
                storeId(msg.id);
                window.location.href = './manager_dashboard.html';
            }
        })
        .catch(() => {
            const errorMsg = document.createElement("h3");
            errorMsg.setAttribute('id', 'error');
            errorMsg.classList.add("text-center");
            errorMsg.innerText = "The request could not be fulfilled.";
            pageBody.append(errorMsg);
            errorMsg.style.color = "red";
        });
}

function storeId(id) {
    sessionStorage.setItem('user_id', id);
}

//avoids adding duplicate error messages
function removeError() {
    const errorTag = document.querySelector("h3#error");
    if (pageBody.contains(errorTag)) {
        errorTag.remove();
    }
}