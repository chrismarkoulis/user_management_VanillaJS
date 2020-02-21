"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const usersPanel = document.querySelector(".users-panel");
    const userForm = document.querySelector("#userForm");
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const companyInput = document.getElementById('company');

    let editing = false;
    console.log("editing onInit: ", editing)

    let allUsers = [];

    
    
    fetch("users.json")
        .then(res => res.json())
        .then(userData => userData.map(user => {
    allUsers = userData;
    usersPanel.innerHTML += `
    <div class="row user-row" data-id="${user.id}">
    <div class="users-photos">
    <img src="${user.photo}" alt="users-photos">
  </div>
  <div class="userInfo">
    <div class="user-name">${user.name}</div>
    <div class="user-email">${user.email}</div>
  </div>
  </div>
  
    ` 
         

}));

           

    window.onload = () => {
        const usersRow = document.querySelectorAll('.user-row');
        usersRow.forEach(userRow => userRow.addEventListener('click', () => {
            editing = true;
            console.log("editing onClick: ",editing);

            const dataID = userRow.getAttribute('data-id');
            
            
            const userSelected = allUsers.filter(user => {
                return user.id === dataID;
              })


            nameInput.value = userSelected[0].name;
            emailInput.value = userSelected[0].email;
            phoneInput.value = userSelected[0].phone;
            addressInput.value = userSelected[0].address;
            companyInput.value = userSelected[0].company;

            

            console.log(userSelected);
             

            userForm.addEventListener('submit', () => {
                event.preventDefault();
                const userName = userRow.querySelector('.user-name');

               
                        userName.innerText = nameInput.value;
                        userSelected[0].name = nameInput.value;
                  
                console.log(userSelected);
                console.log(userName);
                
               
             });
            
            
           
        })

        );

    }

    
    (function handleInputChange() {
        const formInputs = document.querySelectorAll('input');
        formInputs.forEach(input => {
           
            input.addEventListener('keyup', () => {
              if (editing == true) {
               console.log("editing onChange",editing);
               document.querySelector(".button-submit").disabled = false;
               document.querySelector(".button-cancel").hidden = false;
          
        }
        else {
            document.querySelector(".button-submit").disabled = true;
            document.querySelector(".button-cancel").hidden = true;

            console.log('not editing');
        }
    });
        });
    
    }());

    (function cancelAction() {
        const cancelButton = document.querySelector(".button-cancel");
        cancelButton.addEventListener('click', () => {
            editing = false;
            console.log('editing state: ', editing);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            addressInput.value = '';
            companyInput.value = '';
            document.querySelector(".button-submit").disabled = true;
            cancelButton.hidden = true;
        });
    }());


















});