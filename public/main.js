document.addEventListener('DOMContentLoaded', function() {
    const plantList = document.getElementById('plantList');
    const loginForm = document.getElementById('loginForm');
    const tokenKey = 'json_token';

    // Vérifier si le token existe et charger les plantes
    function checkToken() {
        // comment savoir si mon token est valide ?        
        if (!localStorage.getItem(tokenKey)) {
            localStorage.removeItem(tokenKey);
            loginForm.style.display = 'block';
        }   
        const token = localStorage.getItem(tokenKey);
        if (token) {
            fetchPlants(token);
            loginForm.style.display = 'none';
        }
    }

    // Fonction pour afficher les plantes dans le tableau
    function displayPlants(plants) {
        plantList.innerHTML = '';
        plants.forEach(plant => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-align-center width-5">${plant.id}</td>
                <td style="width:85%">${plant.name}</td>
                <td><div style="display: flex;"><img width="48px" height="48px" style="object-fit: cover;" src="${plant.picture}"/></div></td>
                <td class="text-align-center width-5">${plant.hp}</td>
                <td class="text-align-center width-5">${plant.cp}</td>
            `;
            plantList.appendChild(tr);
        });
    }

    // Fonction pour récupérer les plantes depuis l'API
    async function fetchPlants(token) {
        try {
            const response = await fetch('http://localhost:3000/api/plants', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            displayPlants(data.data);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    }

    // Fonction pour gérer la connexion et récupérer le token JWT
    async function loginAndFetchPlants(event) {
        event.preventDefault();

        const token = localStorage.getItem(tokenKey);
        if (token) {
            console.log(token);
            return;
        }

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            const token = data.token;

            if (token) {
                localStorage.setItem(tokenKey, token);
                fetchPlants(token);
                loginForm.style.display = 'none';
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    // Vérifier le token au chargement de la page
    checkToken();

    // Ajouter un écouteur d'événement pour le formulaire de connexion
    loginForm.addEventListener('submit', loginAndFetchPlants);
});
