document.addEventListener("DOMContentLoaded", function () {

    console.log('inside form')


    function ajoutListenerEnvoyerformulaire() {
        const registrationForm = document.querySelector("#registration-form");
        const errorMessageDiv = document.querySelector("#error-message");

        if (!registrationForm) {
            console.error("Erreur: le formulaire de connexion est introuvable.");
            return;
        }

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = {
                email: registrationForm.querySelector("#email").value,
                password: registrationForm.querySelector("#password").value
            };

            const headers = {
                'Content-Type': 'application/json'
            };

            


            fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: headers
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message || "Mot de passe incorrect");
                        });
                    }
                })
                .then(data => {
                    console.log("Connexion réussie");
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('authenticated', 'true');

                    const event3 = new Event('loginSuccess');
            console.log('loginSuccess est généré');
            window.dispatchEvent(event3);
            console.log('inside submit');
            sessionStorage.setItem('buttonChanged', 'true');
            window.location.href = 'index.html';

                })
                .catch(error => {
                    console.error('Erreur lors de la connexion:', error.message);
                    errorMessageDiv.textContent = error.message || "Mot de passe incorrect. Veuillez vérifier vos informations d'identification.";
                    errorMessageDiv.style.display = 'block';
                });
        });
    }

    ajoutListenerEnvoyerformulaire();
});
