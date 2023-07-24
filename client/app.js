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
});



// Récupérer les utilisateurs depuis le backend
fetch('/all')
    .then((response) => response.json())
    .then((data) => {
        // Affiche les utilisateurs dans le tableau
        displayUsers(data.result);
    })
    .catch((error) => console.error('Erreur lors de la récupération des utilisateurs:', error));