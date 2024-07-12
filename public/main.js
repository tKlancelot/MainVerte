// consommer mon api rest depuis mon front

document.addEventListener('DOMContentLoaded', function() {
    const plantList = document.getElementById('plantList');
    // const addUserForm = document.getElementById('addPlantForm');

    // Function to fetch users from the API
    async function fetchUsers() {
        const response = await fetch('http://localhost:3000/api/plants');
        const plants = await response.json();
        console.log(plants.data)

        // ajouter les plants dans mon plantList
        plants.data.forEach(plant => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${plant.id}</td>
                <td>${plant.name}</td>
                <td>${plant.hp}</td>   
                <td>${plant.cp}</td>   
            `;
            plantList.appendChild(tr);
            });
            
            // je dois créer un router ??
            // <td><a href="/plants/${plant.id}">Voir</a></td>
        
    }

    fetchUsers();
});
