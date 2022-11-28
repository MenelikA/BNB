window.onload = async () => {
    let properties = await getListings();
}

function getListings() {
    return fetch(`http://localhost:3001/properties/`, {
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
                displayProperty(property)
            });
        })
        .catch((err) => {
            res.send(err)
        });
};

function displayProperty(property) {
    const propertyContainer = document.getElementById('property-list');

    if (property.isbooked == false && property.pending == false) {
        // ------- Add new Listing -------
        //Create List element with class name
        let newProperty = document.createElement('li');
        newProperty.classList.add('listing');

        //Create div element as row class
        let newRow = document.createElement('div');
        newRow.classList.add('row');

        //Create name element
        let name = document.createElement('div');
        name.classList.add('col');
        name.setAttribute('id', 'property-name');

        let nameSrc = document.createElement('p');
        nameSrc.innerText = property.name;

        name.appendChild(nameSrc);

        //Create price element
        let price = document.createElement('div');
        price.classList.add('col');
        price.setAttribute('id', 'property-price');

        let priceSrc = document.createElement('p');
        priceSrc.innerHTML = '$' + property.price;

        price.appendChild(priceSrc);

        //Append the two property elements together
        newRow.appendChild(name);
        newRow.appendChild(price);

        //Append to main property element as li
        newProperty.appendChild(newRow);

        //Append to property container for all listings
        propertyContainer.appendChild(newProperty);

        //Use onClick to view individual proerty
        newProperty.onclick = () => {
            showIndividualProperty(property.id)
        }
    }


}

function showIndividualProperty(id) {
    sessionStorage.setItem('property_id', id);
    window.location.href = '../html/single_listing.html';
}