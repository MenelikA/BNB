let signUpForm = document.querySelector('#sign-up-form');
let signUpDiv = document.getElementById('sign-up')
let firstNameInput = document.getElementById('first-name');
let lasttNameInput = document.getElementById('last-name');
let usernameInput = document.getElementById('user-name');
let passwordInput = document.getElementById('pass-word');

function handleRentSubmit(event) {
    event.preventDefault();

    removeError();

    if (firstNameInput.value && lasttNameInput.value && usernameInput.value && passwordInput.value) {
        //Create new FormData object from form data
        const formDataObj = new FormData(signUpForm);
        //Generates key-value pairs
        const keyValuePairs = Object.fromEntries(formDataObj.entries());
        //Converts JSON
        const jsonStr = JSON.stringify(keyValuePairs);
        const jsonObj = JSON.parse(jsonStr)
        const data = {
            "name": jsonObj.firstName.toLowerCase() + " " + jsonObj.lastName.toLowerCase(),
            "username": jsonObj.username.toLowerCase(),
            "password": jsonObj.password
        }
        const strData = JSON.stringify(data);
        return fetch('http://localhost:3001/auth/renter/signup', {
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
                    const errorHandler = document.createElement("h2");
                    errorHandler.innerText = msg.error;
                    document.getElementById('sign-up').append(errorHandler);
                }
                else {
                    window.location.href = './login.html'
                }
            })
            .catch(() => {
                const errorMsg = document.createElement("h2");
                errorMsg.innerText = "The request could not be fulfilled.";
                errorMsg.style.color = "red";
                document.getElementById('sign-up').append(errorMsg);
            });
    } else {
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Please Fill in all Fields!";
        errorMsg.style.color = "red";
        document.getElementById('sign-up').append(errorMsg);
    }

}

function handleManSubmit(event) {
    event.preventDefault();

    removeError();

    if (firstNameInput.value && lasttNameInput.value && usernameInput.value && passwordInput.value) {
        //Create new FormData object from form data
        const formDataObj = new FormData(signUpForm);
        //Generates key-value pairs
        const keyValuePairs = Object.fromEntries(formDataObj.entries());
        //Converts JSON
        const jsonStr = JSON.stringify(keyValuePairs);
        const jsonObj = JSON.parse(jsonStr)
        const data = {
            "name": jsonObj.firstName.toLowerCase() + " " + jsonObj.lastName.toLowerCase(),
            "username": jsonObj.username.toLowerCase(),
            "password": jsonObj.password
        }
        const strData = JSON.stringify(data);
        return fetch('http://localhost:3001/auth/manager/signup', {
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
                    const errorHandler = document.createElement("h2");
                    errorHandler.innerText = msg.error;
                    document.getElementById('sign-up').append(errorHandler);
                }
                else {
                    window.location.href = './login.html'
                }
            })
            .catch(() => {
                const errorMsg = document.createElement("h2");
                errorMsg.innerText = "The request could not be fulfilled.";
                errorMsg.style.color = "red";
                document.getElementById('sign-up').append(errorMsg);
            });
    } else {
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Please Fill in all Fields!";
        errorMsg.style.color = "red";
        document.getElementById('sign-up').append(errorMsg);
    }

}

//avoids adding duplicate errors
function removeError() {
    const errorTag = document.querySelector("h2");
    if (signUpDiv.contains(errorTag)) {
        errorTag.remove();
    }
}