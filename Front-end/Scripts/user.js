        // Email validation function
        function validateEmails() {
            const email = document.getElementById('email').value;
            const confirmEmail = document.getElementById('confirm-email').value;
            const registerButton = document.getElementById('register-button');
            const userName = document.getElementById("userName").value;
            const password = document.getElementById("password").value;

            if (email === confirmEmail && email !== "" && userName !== "" && password !== "") {
                registerButton.disabled = false;
            } else {
                registerButton.disabled = true;
            }
        }

        // Add event listeners for real-time validation
        document.getElementById('email').addEventListener('input', validateEmails);
        document.getElementById('confirm-email').addEventListener('input', validateEmails);
        document.getElementById('userName').addEventListener('input', validateEmails);
        document.getElementById('password').addEventListener('input', validateEmails);

        // Handle form submission
        document.getElementById('registerForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form from refreshing the page
            
            const username = document.getElementById('userName').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const subscribeStatus = document.getElementById('subscribeStatus').checked;

            const data = {
                username,
                email,
                password,
                subscribeStatus: subscribeStatus ? true : false
            };

            try {
                const response = await fetch('http://localhost:8080/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Registration successful: ' + result.message);
                } else {
                    const error = await response.json();
                    alert('Error: ' + error.message);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to register. Please try again later.');
            }
        });



        //for login
        const lemail=document.getElementById("l-email");
        const lpass=document.getElementById("l-password");

        lemail.addEventListener('input',allCompleted);
        lpass.addEventListener('input',allCompleted);

        function allCompleted() {
        if (lemail.value && lpass.value) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }


    // Handle login button click (without form submission)
    loginButton.addEventListener('click', async () => {
        const email = lemail.value;
        const password = lpass.value;

        const data = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Login successful: ' + result.accessToken);
                // Optionally, you can store the token or perform further actions
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in. Please try again later.');
        }
    });


    function  displayLogin(){
        document.querySelector(".loginContainer").style.display="block";
        document.querySelector(".registerContainer").style.display="none";
    }

    function displayRegister(){
        document.querySelector(".registerContainer").style.display="block";
        document.querySelector(".loginContainer").style.display="none";
    }