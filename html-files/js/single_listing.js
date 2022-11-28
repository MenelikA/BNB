let propName = document.getElementById('prop-name')
let address = document.getElementById('address');
let price = document.getElementById('price');
let description = document.getElementById('description');
let manager = document.getElementById('manager');
let imageFile = document.getElementById('single_image');

window.onload = async () => {
    //get id from session storage
    let property_id = sessionStorage.getItem('property_id');
    //make fetch call
    let property = await getListing(property_id);
}

function getListing(id) {
    return fetch(`http://localhost:3001/properties/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            displayElements(data);
        })
};

async function displayElements(data) {
    let managerName = await getManagerName(data.propertymanager_id);

    propName.innerText = data.name;
    address.innerText = "Address: " + data.address;
    price.innerText = "Price: $" + data.price + "/Night";
    description.innerText = "Description: " + data.description;
    manager.innerText = "Manager: " + managerName;
    imageFile.src = 'data:image/jpeg;base64,' + window.btoa(String.fromCharCode(...new Uint8Array(data.img_data.data)));
}

async function getManagerName(id) {
    return fetch(`http://localhost:3001/properties/manager/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data.name;
        })
}

let requestButton = document.getElementById('request-button');
requestButton.onclick = (event) => {
    sendPropertyRequest(event);
}

function sendPropertyRequest(event) {
    event.preventDefault();
    let user = sessionStorage.getItem('user_id');
    let id = sessionStorage.getItem('property_id');

    const data = {
        "renter_id": user,
        "pending": true
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
            window.location.href = "../html/renter_dashboard.html"
            return res.json();
        })
};