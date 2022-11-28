// <JS FOLDER>
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    removeError();

    //store property id from created property
    let id = sessionStorage.getItem("new_property_id");

    const formData = new FormData();
    //get file selected by user
    const fileInput = document.getElementById('input')
    const selectedFile = fileInput.files[0];
   
    formData.append('image', selectedFile);

    if (fileInput.value !== "") {
        //request to add image to recently created property
        return fetch(`http://localhost:3001/properties/images/upload/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => {
                window.location.href = "../html/manager_dashboard.html"
                return res.json();
            })
            .catch((err) => {
                res.send(err)
            })
    }
    else {
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Please Upload an Image";
        errorMsg.style.color = "red";
        document.querySelector("section").append(errorMsg);
    }
})

//avoids adding duplicate error messages
function removeError() {
    const errorTag = document.querySelector("h2");
    if (document.querySelector("section").contains(errorTag)) {
        errorTag.remove();
    }
}