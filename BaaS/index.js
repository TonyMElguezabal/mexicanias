const apiKey = 'AIzaSyDXF0BfNtF5jAGCPDx4rLQZkiC1FYWcPCU';
const projectId = 'bedu7-cb391';
const collection = 'users';

firebase.initializeApp({
    apiKey,
    projectId
});

var db = firebase.firestore();

getUsers = () => {

    let date = new Date()
        
    db.collection(collection)
        .where("date", ">", new Date(date.getFullYear(),date.getMonth(),date.getDay(),00,00,00))
        .get().then((response) => {
            response.forEach((doc) => {
                console.log(doc.id);
                console.log(doc.data());
            });
    });
}

// getUsers();

///////////////////////////////

addUser = () => {
    let nameValue = document.getElementById('nameInput').value
    let lastnameValue = document.getElementById('lastnameInput').value
    let emailValue = document.getElementById('emailInput').value
    let ageValue = document.getElementById('ageInput').value
  
    db.collection(collection).add({
      name: nameValue,
      lastname: lastnameValue,
      email: emailValue,
      age: parseInt(ageValue)
    })
    .then(function(response) {
        console.log("Document written with ID: ", response.id);
        // getUsers();
        showUsers();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

updateUser = (userId, name, lastname, age, address) => {
    db.collection('users').doc(userId).set({
        name: name,
        lastname: lastname,
        age: age,
        address: address,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
    }, { merge: true })
}

// updateUser('YtsrrSYpZtbZy1jGstpz', 'Naye', 'Lopez', 35, 'Zapopan')

phones = (userId, remove, item) => {
    const user = db.collection('users').doc(userId)

    if(remove){
        user.update({
            phones: firebase.firestore.FieldValue.arrayRemove(item)
        });
    } else {
        user.update({
            phones: firebase.firestore.FieldValue.arrayUnion(item)
        });
    }
}

// phones('YtsrrSYpZtbZy1jGstpz', false, '3313131313');

removeAddres = (userId) => {
    const user = db.collection(collection).doc(userId);
    user.update({
        address: firebase.firestore.FieldValue.delete()
    });
};

// removeAddres('YtsrrSYpZtbZy1jGstpz');

////////

removeUser = (userId) => {
    db.collection('users').doc(userId).delete()
    .then(function(response) {
        showUsers();
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// removeUser('4BMG5zN7e40L3OHZoiDr');


////////////////////////////////////////////////////////////////////////////////

let clickRemove = (event) => {
    removeUser(event.toElement.id)
}

let removeChilds = (container) => {
    let child = container.lastChild
    while (child) {
        container.removeChild(child)
        child = container.lastChild
    }
}

let showUsers = () => {
    const container = document.getElementById("container")
    removeChilds(container)

    let table = document.createElement("table")
    table.setAttribute("class", "table table-dark")

    let headers = ["Nombre", "Apellido", "Email", "Edad"]

    let tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement("th")
        th.innerText = headers[i]
        tr.appendChild(th)
    }
    table.appendChild(tr)

    db.collection(collection).get().then((response) => {
        response.forEach((doc) => {

            let user = doc.data();
        
            let tr = document.createElement("tr");
            let name = document.createElement("td")
            name.innerText = user.name
            let lastname = document.createElement("td")
            lastname.innerText = user.lastname
            let email = document.createElement("td")
            email.innerText = user.email
            let age = document.createElement("td")
            age.innerText = user.age

            let contenedorBoton = document.createElement("td")
            let boton = document.createElement("button")
            boton.setAttribute("class", "remover")
            boton.setAttribute("id", doc.id)
            boton.innerText = "Eliminar"
            boton.addEventListener('click', clickRemove)
            contenedorBoton.appendChild(boton)
            
            tr.appendChild(name)
            tr.appendChild(lastname)
            tr.appendChild(email)
            tr.appendChild(age)

            tr.appendChild(contenedorBoton)
            
            table.appendChild(tr)
        });
    });

    container.appendChild(table)
}

document.addEventListener("DOMContentLoaded", showUsers)

