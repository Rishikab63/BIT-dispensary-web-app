                                                                                                                                                                                                // Function to handle editing when the edit button is clicked
function editDay(day) {
    // Prompt the user for a password
    const password = window.prompt("Enter password to edit:");

    // Check if the password is correct
    if (password === "12345") {
        // Password is correct, allow editing
            if(day=='thrusday')
            {
                alert("Editing " + " thursday");
            }
            else{
                alert("Editing " + day);
            }
        // You can implement further logic for editing here
        window.location.href = "edit_prac.html";
    } else {
        // Password is incorrect, show an alert
        alert("Incorrect password. Please try again.");
    }
}