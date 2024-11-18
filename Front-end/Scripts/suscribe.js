const form = document.getElementById('subscription-form');

if (form) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form data
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirm-email').value;

        // Validate if the emails match
        if (email !== confirmEmail) {
            alert('Emails do not match.');
            return;
        }

        // Create a data object to send
        const data = {
            firstName,
            lastName,
            email,
        };

        // Send the data to the backend
        try {
            const response = await fetch('http://localhost:8080/api/suscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });

            // Parse the response as JSON
            const result = await response.json();

            // Handle success
            if (response.ok) {

                const message = document.getElementsByClassName("addingnewsection")[0]; // Get the first div with this class

                // Make the div visible
                message.style.visibility = "visible";
                

                form.reset(); // Reset form after successful submission
            } else {
                alert('Failed to subscribe.');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('An error occurred while subscribing.');
        }
    });
} else {
    console.error('Form not found.');
}
