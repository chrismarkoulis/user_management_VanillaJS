const app = async () => {

    const response = await fetch("users.json");
    const users = await response.json();
    console.log(users);

    let editing = false;
    
    const usersPanel = document.querySelector(".users-panel");
    const usersForm = document.getElementById("userForm");
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const companyInput = document.getElementById('company');

    const selectedUser = id => users.find(user => user.id === id);

    const displayUserForm = user => {
      nameInput.value = user.name;
      emailInput.value = user.email;
      phoneInput.value = user.phone;
      addressInput.value = user.address;
      companyInput.value = user.company;
    }

    const updateUser = user => {
     
    }

    const formSubmit = id => {
      usersForm.addEventListener('submit', () => {
        event.preventDefault();
        updateUser(selectedUser(id))
      });
    }

    const handleInputChange = () => {
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
    
    }

    const cancelAction = () => {
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
    }

    users.forEach(user => {
        usersPanel.innerHTML += `
        <div id="users" class="row user-row" data-name="${user.name}" data-id="${user.id}">
        <div class="users-photos">
        <img src="${user.photo}" alt="users-photos">
      </div>
      <div class="userInfo">
        <div class="user-name">${user.name}</div>
        <div class="user-email">${user.email}</div>
      </div>
      </div>
        `
        const userRows = usersPanel.getElementsByClassName("user-row");
        for (let i=0; i < userRows.length; i++) {
          userRows[i].addEventListener('click', () => {

            editing = true;
            const dataID = userRows[i].getAttribute('data-id');
            //const dataName = userRows[i].getAttribute('data-name');

           

            handleInputChange();
            cancelAction();
            console.log(selectedUser(dataID));
            displayUserForm(selectedUser(dataID));
           
            
          })

        };

    });

};

app();


