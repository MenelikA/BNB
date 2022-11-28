window.onload = async () => {
    let id = sessionStorage.getItem("user_id");
    let properties = await listRequestedProperties(id);
}

function listRequestedProperties(id) {
    return fetch(`http://localhost:3001/properties/renter/requestedProperties/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach((property) => {
                createPendingList(property);
            });
        })
        .catch((err) => {
            res.send(err);
        })
};

function createPendingList(property) {
    const propertyContainer = document.getElementById('pend-requests');

    // ------- Add new Listing -------
    //Create List element with class name
    let newRequester = document.createElement('li');
    newRequester.classList.add('requester');

    //Create div element as row class
    let newRow = document.createElement('div');
    newRow.classList.add('row');

    //Create name element
    let name = document.createElement('div');
    name.classList.add('col-6');
    name.setAttribute('id', 'req-property-name');

    let nameSrc = document.createElement('p');
    nameSrc.innerText = property.name;

    name.appendChild(nameSrc);

    //Create status element
    let pending = document.createElement('div');
    pending.classList.add('col-6');
    pending.setAttribute('id', 'req-property-pending');

    let pendingSrc = document.createElement('p');
    let status = property.isbooked;
    if (!status) {
        pendingSrc.innerText = "Awaiting Approval";
    } else {
        pendingSrc.innerText = "Approved! Enjoy your stay!";
    }

    pending.appendChild(pendingSrc);

    //Append main property elements
    newRow.appendChild(name);
    newRow.appendChild(pending);

    //Append to main property element as lists elements
    newRequester.appendChild(newRow);

    //Append to property container for all listings
    propertyContainer.appendChild(newRequester);
}