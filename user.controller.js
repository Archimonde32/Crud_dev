const mysql = require('mysql');
const conn =mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
})

//register a new client
const createUser = (req, res) => {
    //Utilise req.body de body-parser
    const {Nom, Prenom, Adresse, Codepostal,Ville,Telephone,email } = req.body;
    // verifier si les champs sont remplis
    if(!Nom || !Prenom || !Adresse || !Codepostal || !Ville || !Telephone || !email){
        return res.status(400).json({
            error: 'Champ manquant',
        })

    }
    const query = 'INSERT INTO client (Nom, prenom, Adresse, Codepostal, Ville, Telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conn.query(query, [Nom, Prenom, Adresse, Codepostal, Ville, Telephone, email], (err) => {
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.status(200).json({ message: 'Utilisateur enregistré'});
        }
    });
};

// get all client
const AllUsers = (req, res) =>{
    const query = 'SELECT * FROM client';
    conn.query(query, (err, result) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.status(200).json({result});
        }
    })
}


//selectionner un client
// const getUser = (req, res) => {
//     const userId = req.params.id;
//     const query = 'SELECT * FROM client WHERE id = ?';
//     conn.query(query, [userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         } else if (result.length === 0) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé' });
//         } else {
//             res.status(200).json(result[0]);
//         }
//     });
// };


// modifier un client
const UpdateUsers =  (req, res) => {
    const id = req.params.id;
    const { Nom, Prenom, Adresse, Codepostal, Ville, Telephone, email } = req.body;
    if (!Nom || !Prenom || !Adresse || !Codepostal || !Ville || !Telephone || !email) {
        return res.status(400).json({
            error: 'Champ manquant',
        });
    }
    const query = 'UPDATE client SET Nom=?, Prenom=?, Adresse=?, Codepostal=?, Ville=?, Telephone=?, email=? WHERE id=?';
    conn.query(query, [Nom, Prenom, Adresse, Codepostal, Ville, Telephone, email, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Utilisateur mis à jour' });
        }
    });
};

// Route pour supprimer un client par son ID
const SuppUser=(req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM client WHERE id=?';
    conn.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé' });
        }
    });
};



module.exports = {
    createUser, 
    UpdateUsers,
    AllUsers,
    SuppUser
};