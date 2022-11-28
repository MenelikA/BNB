window.onload = async () => {
    let id = sessionStorage.getItem("user_id");
    let properties = await listManagerProp(id);

}

function listManagerProp(id) {
    return fetch(`http://localhost:3001/properties/managerProperties/${id}`, {
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
                createList(property);
                if (property.pending) {
                    pendRequests(property);
                }
            });
        })
        .catch((err) => {
            res.send(err);
        })
};

function getRenterName(renter_id) {
    return fetch(`http://localhost:3001/properties/rentersName/${renter_id}`, {
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
        .catch((err) => {
            res.send(err);
        })
};

async function createList(property) {
    const propertyContainer = document.getElementById('property-list');

    // ------- Add new Listing -------
    //Create List element with class name
    let newProperty = document.createElement('li');
    newProperty.classList.add('listing');

    //Create div element as row class
    let newRow = document.createElement('div');
    newRow.classList.add('row');

    //Create name element
    let name = document.createElement('div');
    name.classList.add('col-4');
    name.setAttribute('id', 'property-name');

    let nameSrc = document.createElement('p');
    nameSrc.innerText = property.name;

    name.appendChild(nameSrc);

    if (property.isbooked) {

        //Create Renter name element
        let renterName = await getRenterName(property.renter_id);
        let renterNameDiv = document.createElement('div');
        renterNameDiv.classList.add('col-4');
        renterNameDiv.setAttribute('id', 'property-name');

        let renterNameSrc = document.createElement('p');
        renterNameSrc.innerText = renterName;

        renterNameDiv.appendChild(renterNameSrc);

        //create div for Make Property Available button element
        let makePropertyAvailableBtnDiv = document.createElement('div');
        makePropertyAvailableBtnDiv.classList.add('col-4');
        makePropertyAvailableBtnDiv.classList.add('my-auto');

        //create Make Property Available button
        let makePropertyAvailableBtn = document.createElement('button');
        makePropertyAvailableBtn.classList.add("btn");
        makePropertyAvailableBtn.classList.add("btn-dark");
        makePropertyAvailableBtn.classList.add("btn-block");
        makePropertyAvailableBtn.innerText = "Make Property Available"

        //Append edit button to div editBtn
        makePropertyAvailableBtnDiv.appendChild(makePropertyAvailableBtn);

        //Append Property Name, Renter Name, and Make Property Available Button
        newRow.appendChild(name);
        newRow.appendChild(renterNameDiv);
        newRow.appendChild(makePropertyAvailableBtnDiv);

        //Append to main property element as lists elements
        newProperty.appendChild(newRow);

        //Append to property container for all listings
        propertyContainer.appendChild(newProperty);

        makePropertyAvailableBtn.onclick = () => {
            putPropertyOnMarket(property.id);
            location.reload();
        }

    } else {
        //create div for edit button element
        let editBtnDiv = document.createElement('div');
        editBtnDiv.classList.add('col-4');
        editBtnDiv.classList.add('my-auto')

        //create div for delete button  element
        let deleteBtnDiv = document.createElement('div');
        deleteBtnDiv.classList.add('col-4');
        deleteBtnDiv.classList.add('my-auto')

        //create edit button
        let editBtn = document.createElement('button');
        editBtn.classList.add("btn");
        editBtn.classList.add("btn-dark");
        editBtn.classList.add("btn-block");
        editBtn.innerText = "Edit"

        //create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-danger");
        deleteBtn.classList.add("btn-block");
        deleteBtn.innerText = "Delete"

        //Append edit button to div editBtn
        editBtnDiv.appendChild(editBtn);

        //Append delete button to div deleteBtn
        deleteBtnDiv.appendChild(deleteBtn);

        //Append main property elements
        newRow.appendChild(name);
        newRow.appendChild(editBtnDiv);
        newRow.appendChild(deleteBtnDiv);

        //Append to main property element as lists elements
        newProperty.appendChild(newRow);

        //Append to property container for all listings
        propertyContainer.appendChild(newProperty);

        deleteBtn.onclick = () => {
            deleteProp(property.id);
            location.reload();
        }

        editBtn.onclick = () => {
            sessionStorage.setItem("edit_property_id", property.id);
            window.location.href = '../html/edit_property.html';
        }
    }


}

async function pendRequests(property) {
    const propertyContainer = document.getElementById('pend-requests');
    let renterNameSrc = await getRenterName(property.renter_id);

    // ------- Add new Listing -------
    //Create List element with class name
    let newRequester = document.createElement('li');
    newRequester.classList.add('requester');

    //Create div element as row class
    let newRow = document.createElement('div');
    newRow.classList.add('row');

    //Create name element
    let name = document.createElement('div');
    name.classList.add('col-3');
    name.setAttribute('id', 'req-property-name');

    let nameSrc = document.createElement('p');
    nameSrc.innerText = property.name;

    name.appendChild(nameSrc);

    //create div for renter name
    let renter = document.createElement('div');
    renter.classList.add('col-3');
    name.setAttribute('id', 'renter-name');

    let renterName = document.createElement('p');
    renterName.innerText = renterNameSrc;
    renter.appendChild(renterName);

    //create div for approve button element
    let approveBtnDiv = document.createElement('div');
    approveBtnDiv.classList.add('col-3');
    approveBtnDiv.classList.add('my-auto');
    approveBtnDiv.setAttribute('id', 'approveBtn');


    //create div for deny button element
    let denyBtnDiv = document.createElement('div');
    denyBtnDiv.classList.add('col-3');
    denyBtnDiv.classList.add('my-auto');
    denyBtnDiv.setAttribute('id', 'denyBtn');

    //create approve button
    let approveBtn = document.createElement('button');
    approveBtn.classList.add("btn");
    approveBtn.classList.add("btn-success");
    approveBtn.classList.add("btn-block");
    approveBtn.innerText = "Approve"

    //create deny button
    let denyBtn = document.createElement('button');
    denyBtn.classList.add("btn");
    denyBtn.classList.add("btn-warning");
    denyBtn.classList.add("btn-block");
    denyBtn.innerText = "Deny"

    //Append approve button to div editBtn
    approveBtnDiv.appendChild(approveBtn);

    //Append deny button to div deleteBtn
    denyBtnDiv.appendChild(denyBtn);

    //Append main property elements
    newRow.appendChild(name);
    newRow.appendChild(renter);
    newRow.appendChild(approveBtnDiv);
    newRow.appendChild(denyBtnDiv);

    //Append to main property element as lists elements
    newRequester.appendChild(newRow);

    //Append to property container for all listings
    propertyContainer.appendChild(newRequester);

    approveBtn.onclick = () => {
        sendApproval(property.id)
        location.reload();
    }

    denyBtn.onclick = () => {
        sendDenial(property.id)
        location.reload();
    }
}

async function sendApproval(id) {
    const data = {
        "isbooked": true,
        "pending": false
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
            location.reload();
            return res.json();
        })
        .catch((err) => {
            res.send(err);
        })
}

async function sendDenial(id) {
    const data = {
        "renter_id": 0,
        "pending": false
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
            location.reload();
            return res.json();
        })
        .catch((err) => {
            res.send(err);
        })
}

async function deleteProp(id) {
    return fetch(`http://localhost:3001/properties/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .catch((err) => {
            res.send(err);
        });
}

async function putPropertyOnMarket(id) {
    const data = {
        "isbooked": false,
        "renter_id": 0
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
            location.reload();
            return res.json();
        })
        .catch((err) => {
            res.send(err)
        })
}