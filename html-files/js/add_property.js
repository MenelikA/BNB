let addPropForm = document.querySelector("#add-property")
let propName = document.getElementById('name');
let propStreet = document.getElementById('prop-street');
let propCity = document.getElementById('prop-city');
let propState = document.getElementById('prop-state');
let propZip = document.getElementById('prop-zip');
let propDescription = document.getElementById('prop-description');
let propPrice = document.getElementById('prop-price');

function addProperty(event) {
    event.preventDefault();

    removeError();

    //client side validation for input fields
    if (propName.value && propStreet.value && propCity.value && propState.value && propZip.value && propDescription.value && propPrice.value) {
        if (isNaN(propZip.value)) {
            const errorMsg = document.createElement("h2");
            errorMsg.innerText = "Enter Numeric Value for Zip Code";
            errorMsg.style.color = "red";
            document.getElementById('addListing').appendChild(errorMsg);
        } else if (propZip.value.length != 5) {
            const errorMsg = document.createElement("h2");
            errorMsg.innerText = "Enter Valid Length for Zip Code";
            errorMsg.style.color = "red";
            document.getElementById('addListing').appendChild(errorMsg);
        } else if (isNaN(propPrice.value)) {
            const errorMsg = document.createElement("h2");
            errorMsg.innerText = "Enter Numeric Value for Price";
            errorMsg.style.color = "red";
            document.getElementById('addListing').appendChild(errorMsg);
        } else {
            let userID = sessionStorage.getItem('user_id');
            //Create new FormData object from form data
            const formDataObj = new FormData(addPropForm);
            //Generates key-value pairs
            const keyValuePairs = Object.fromEntries(formDataObj.entries());
            //Converts JSON
            const jsonStr = JSON.stringify(keyValuePairs);
            const jsonObj = JSON.parse(jsonStr);

            const data = {
                "name": jsonObj.name,
                "address": jsonObj.street + " " + jsonObj.city + " " + jsonObj.state + " " + jsonObj.zip,
                "price": jsonObj.price,
                "isbooked": false,
                "img_name": null,
                "img_data": null,
                "description": jsonObj.description,
                "renter_id": 0,
                "propertymanager_id": userID,
                "pending": false
            }
            const strData = JSON.stringify(data);
            return fetch(`http://localhost:3001/properties/create`, {
                method: 'POST',
                body: strData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    window.location.href = './add_images.html';
                    sessionStorage.setItem('new_property_id', data.id);
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    } else {
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Please Fill in all Fields";
        errorMsg.style.color = "red";
        document.getElementById('addListing').append(errorMsg);
    }

};

//avoids adding duplicate error messages
function removeError() {
    const errorTag = document.querySelector("h2");
    if (document.getElementById('addListing').contains(errorTag)) {
        errorTag.remove();
    }
}