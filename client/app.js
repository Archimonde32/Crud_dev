const refreshTable = () => {
    // Récupérer les utilisateurs depuis le backend
    fetch('/all')
        .then((response) => response.json())
        .then((data) => {
            // Vider le contenu actuel du tableau
            const usersTableBody = document.getElementById('usersTableBody');
            usersTableBody.innerHTML = '';

            // Afficher les utilisateurs dans le tableau à partir des dernières données
            displayUsers(data.result);
        })
        .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));
};

const displayUsers = (users) => {
    const usersTableBody = document.getElementById('usersTableBody');


    // Parcours les utilisateurs et ajoute chaque ligne au tableau
    users.forEach((user) => {
        const row = document.createElement('tr');

        // Ajoute chaque champ de l'utilisateur en tant que cellule dans la ligne
        const fields = ['Nom', 'Prenom', 'Adresse', 'Codepostal', 'Ville', 'Telephone', 'email'];
        fields.forEach((field) => {
            // Vérifier si la clé est différente de "id"
            if (field !== "id") {
                const cell = document.createElement('td');
                cell.textContent = user[field];
                row.appendChild(cell);
            }
        });






        const openEditModal = (user) => {
            const editModal = document.getElementById('editModal');
            editModal.style.display = 'block';
        
            // Remplir le formulaire avec les données de l'utilisateur
            const editUserForm = document.getElementById('editUserForm');
            editUserForm.elements["Nom"].value = user.Nom;
            editUserForm.elements["Prenom"].value = user.Prenom;
            editUserForm.elements["Adresse"].value = user.Adresse;
            editUserForm.elements["Codepostal"].value = user.Codepostal;
            editUserForm.elements["Ville"].value = user.Ville;
            editUserForm.elements["Telephone"].value = user.Telephone;
            editUserForm.elements["email"].value = user.email;

            const userId = user.id;
            editUserForm.dataset.userId = userId;
        };

            // Bouton Modifier
        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = "Modifier";
        editButton.classList.add('editbutton');
        editButton.addEventListener('click', () => {
            openEditModal(user);
        });
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);



        // Bouton Supprimer
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add('suppbutton');
        deleteButton.addEventListener('click', () => {
            deleteUser(user.id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        usersTableBody.appendChild(row);
    });
};



// Fonction pour ouvrir la modale
const openModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
};

// Fonction pour fermer la modale
const closeModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
};

// Fonction pour fermer la modale de modification
const closeEditModal = () => {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
};

// Récupérer le bouton pour ouvrir la modale
const openModalButton = document.getElementById('openModalButton');
// Ajouter un écouteur d'événement pour ouvrir la modale lorsque le bouton est cliqué
openModalButton.addEventListener('click', openModal);


// Fonction pour gérer la soumission du formulaire
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', (event) => {
    event.preventDefault();




    // Récupère les valeurs du formulaire
    const formData = new FormData(userForm);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

//alerte 
const showAlert = (message,type) => {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
if (type === 'success') {
    alertDiv.classList.add('alert', 'alert-success');
}else if(type ==='modif'){
    alertDiv.classList.add('alert', 'alert-modif');
}else if(type === 'delete'){
    alertDiv.classList.add('alert', 'alert-delete');
}

    alertContainer.appendChild(alertDiv);

    // Masquer l'alerte après quelques secondes 
    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Masquer l'alerte après 3 secondes 
};




    // Envoie les données au backend pour enregistrement
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Met à jour le tableau avec les nouvelles données
            fetch('/all')
                .then((response) => response.json())
                .then((data) => {
                    displayUsers(data);
                })
                .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));
        })
        .catch((error) => console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error));

    // Réinitialise le formulaire
    userForm.reset();

    closeModal();

    refreshTable();
    showAlert('Données enregistré', 'success');
});


//alerte 
const showAlert = (message,type) => {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
if (type === 'success') {
    alertDiv.classList.add('alert', 'alert-success');
}else if(type ==='modif'){
    alertDiv.classList.add('alert', 'alert-modif');
}else if(type === 'delete'){
    alertDiv.classList.add('alert', 'alert-delete');
}

    alertContainer.appendChild(alertDiv);

    // Masquer l'alerte après quelques secondes 
    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Masquer l'alerte après 3 secondes 
};




// Gérer la soumission du formulaire de modification
const editUserForm = document.getElementById('editUserForm');
editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Récupère les valeurs du formulaire de modification
    const formData = new FormData(editUserForm);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });
    const userId = editUserForm.dataset.userId;

    // Envoie les données au backend pour mise à jour
    fetch(`/${userId}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {

        
        // Réinitialise le formulaire de modification
        editUserForm.reset();

        // Ferme la modale de modification après avoir soumis le formulaire
        closeEditModal();

        // Actualiser le tableau avec les dernières données depuis le backend
        refreshTable();

        showAlert('Données modifier', 'modif');
        
    })
    .catch((error) => console.error('Erreur lors de la mise à jour de l\'utilisateur:', error));
    
});

const deleteUser = (userId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        fetch(`/${userId}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
                showAlert('Données supprimées', 'delete');

                
                refreshTable();
        })
        .catch((error) => console.error('Erreur lors de la suppression de l\'utilisateur:', error));
    }
};



// Récupérer les utilisateurs depuis le backend
fetch('/all')
    .then((response) => response.json())
    .then((data) => {
        // Affiche les utilisateurs dans le tableau
        displayUsers(data.result);
    })
    .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));