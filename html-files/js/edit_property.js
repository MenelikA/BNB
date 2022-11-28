let propName = document.getElementById('edit-prop-name');
let propDetails = document.getElementById('edit-prop-detail');
let propPrice = document.getElementById('edit-prop-price');
let editForm = document.querySelector("#edit-prop");

window.onload = async () => {
    let id = sessionStorage.getItem("edit_property_id");
}

function editProperty(event) {
    event.preventDefault();

    removeError();

    if (propName.value && propDetails.value && propPrice.value) {
        if (isNaN(propPrice.value)) {
            const errorMsg = document.createElement("h2");
            errorMsg.innerText = "Enter Numeric Value for Price";
            errorMsg.style.color = "red";
            document.getElementById('edit-section').appendChild(errorMsg);
        } else {
            let id = sessionStorage.getItem("edit_property_id");
            //Create new FormData object from form data
            const formDataObj = new FormData(editForm);
            //Generates key-value pairs
            const keyValuePairs = Object.fromEntries(formDataObj.entries());
            //Converts JSON
            const jsonStr = JSON.stringify(keyValuePairs);
            const jsonObj = JSON.parse(jsonStr);
            const data = {
                "name": jsonObj.name,
                "description": jsonObj.details,
                "price": jsonObj.price
            }
            const strData = JSON.stringify(data);
            return fetch(`http://localhost:3001/properties/${id}`, {
                method: 'PUT',
                body: strData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    window.location.href = "../html/manager_dashboard.html"
                    return res.json();
                })
                .catch((err) => {
                    res.send(err);
                })
        }
    } else {
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Please Fill in all Fields";
        errorMsg.style.color = "red";
        document.getElementById('edit-section').appendChild(errorMsg);
    }
};

//avoids adding duplicate error messages
function removeError() {
    const errorTag = document.querySelector("h2");
    if (document.getElementById('edit-section').contains(errorTag)) {
        errorTag.remove();
    }
}