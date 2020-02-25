const app = async () => {

    // Fetch Data
    const response = await fetch("users.json");
    const users = await response.json();

    // DOM Manipulation
    const usersPanel = document.querySelector(".users-panel");
    const saveButton = document.querySelector(".button-submit");
    const cancelButton = document.querySelector(".button-cancel");
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const companyInput = document.getElementById('company');
    const editInputs = document.getElementsByClassName('user-input');
    const userForm = document.getElementById('userForm');


    // Operations
    let editing = false;

    const init = () => {
        console.log('Application running...');
        renderUserList();
        cancelAction();
    }

    const getUsers = () => {
        return users;
    }

    const getUser = index => {
        return users[index];
    }

    const editUser = (index, user) => {
        users[index] = user;
    }

   
    const highlightSelected = selectedIndex => {
        const userRows = usersPanel.getElementsByClassName("user-row");
        for (let i = 0; i < userRows.length; i++) {
            userRows[i].classList.remove('user-selected');

        }

        userRows[selectedIndex].classList.add("user-selected");
    }


    const handleInputChange = () => {
        for (let i = 0; i < editInputs.length; i++) {
            editInputs[i].addEventListener('keyup', () => {
                editing == true ? (console.log('edit mode enabled'), saveButton.disabled = false,
                cancelButton.hidden = false) : (saveButton.disabled = true,
                    cancelButton.hidden = true, console.log('not editing now...'))
            });
        }
    }

    const cancelAction = () => {
            cancelButton.addEventListener('click', () => {
                editing = false;
                console.log('edit mode enabled: ', editing);
                nameInput.value = '';
                emailInput.value = '';
                phoneInput.value = '';
                addressInput.value = '';
                companyInput.value = '';
                saveButton.disabled = true;
                cancelButton.hidden = true;
        });
    }

    const displayDataOnInput = selectedUser => {
        nameInput.value = selectedUser['name'];
        emailInput.value = selectedUser['email'];
        phoneInput.value = selectedUser['phone'];
        addressInput.value = selectedUser['address'];
        companyInput.value = selectedUser['company'];
    }

    

    const renderUserList = () => {
        const usersList = getUsers();

        usersPanel.innerHTML = '';
        usersList.map((user, index) => {
            let template = `
                <div class="row user-row" data-index="${index}">
                <div class="users-photos">
                <img src="${user.photo}" alt="users-photos">
              </div>
              <div class="userInfo">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
              </div>
              </div>
                `
            usersPanel.innerHTML += template;

            const userRows = usersPanel.getElementsByClassName("user-row");
            for (let i = 0; i < userRows.length; i++) {
                userRows[i].addEventListener('click', renderUserForm);
            }
        });

    }

    const saveUser = (e, user) => {
        const selectedIndex = e.target.getAttribute('data-index');
        const updatedUser = {id: user.id, photo: user.photo, ...user};

        for (let i = 0; i < editInputs.length; i++) {
            let key = editInputs[i].getAttribute('data-key');
            let value = editInputs[i].value;
            updatedUser[key] = value;

        }

        editUser(selectedIndex, updatedUser);
        renderUserList();
        saveButton.disabled = true;
        cancelButton.hidden = true; 
    }

    function renderUserForm(e) {
        saveButton.disabled = true;
        cancelButton.hidden = true;

        editing = true;
        let selectedIndex = null;
        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = this.getAttribute('data-index')

        } else {
            selectedIndex = e;
        }

        const selectedUser = getUser(selectedIndex);
        highlightSelected(selectedIndex);
        displayDataOnInput(selectedUser);
        handleInputChange();
        console.log(selectedUser);

        userForm.setAttribute('data-index', selectedIndex);
        userForm.addEventListener('submit', e => {
            event.preventDefault();
            saveUser(e, selectedUser);
        });


    }

    

    init();
}

app();