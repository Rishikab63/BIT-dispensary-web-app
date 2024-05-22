
// Initialize Firebase
// const firebaseConfig = {
//       apiKey: "AIzaSyComvKnubt9K5heFpV8Otuo12f3nJ4d_Do",
//       authDomain: "dispensarydata-85401.firebaseapp.com",
//       databaseURL: "https://dispensarydata-85401-default-rtdb.firebaseio.com",
//       projectId: "dispensarydata-85401",
//       storageBucket: "dispensarydata-85401.appspot.com",
//       messagingSenderId: "816557237732",
//       appId: "1:816557237732:web:c16b3be676d1ea699a93f1"
//     };
// firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Function to handle login
function loginUser() {
    var rollNumber = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check user role and password in the database
    checkUserRole(rollNumber, password).then((userRole) => {
        // Redirect based on user role
        localStorage.setItem('bitdispensarycurrentUser', rollNumber);
        redirectToPage(userRole);
    }).catch((error) => {
        console.error("Error logging in: ", error);
        alert("Error Logging in");
        // Handle error here, e.g., display an error message to the user
    });
}

// Function to check user role and password in the database
function checkUserRole(rollNumber, password) {
    return new Promise((resolve, reject) => {
        // Check if the user is a patient
        database.ref('PatientData/' + rollNumber).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const storedPassword = userData.password; // Assuming password is stored as plaintext for simplicity (in practice, use secure hashing)
                // Check if the entered password matches the stored password
                if (password === storedPassword) {
                    resolve("patient");
                } else {
                    reject("Invalid password");
                    alert("Invalid password");
                }
            } else {
                // If not a patient, check if the user is a doctor
                database.ref('StaffDB/doctor/' + rollNumber).once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const storedPassword = userData.password; // Assuming password is stored as plaintext for simplicity (in practice, use secure hashing)
                        // Check if the entered password matches the stored password
                        if (password === storedPassword) {
                            resolve("doctor");
                        } else {
                            reject("Invalid password");
                            alert("Invalid Password");
                        }
                    } else {
                        // If not a doctor, check if the user is a nurse
                        database.ref('StaffDB/nurse/' + rollNumber).once('value')
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userData = snapshot.val();
                                const storedPassword = userData.password; // Assuming password is stored as plaintext for simplicity (in practice, use secure hashing)
                                // Check if the entered password matches the stored password
                                if (password === storedPassword) {
                                    resolve("nurse");
                                } else {
                                    reject("Invalid password");
                                    alert("Invalid Password");
                                }
                            } else {
                                // If not a nurse, check if the user is a dispensing-station
                                database.ref('StaffDB/dispensing-station/' + rollNumber).once('value')
                                .then((snapshot) => {
                                    if (snapshot.exists()) {
                                        const userData = snapshot.val();
                                        const storedPassword = userData.password; // Assuming password is stored as plaintext for simplicity (in practice, use secure hashing)
                                        // Check if the entered password matches the stored password
                                        if (password === storedPassword) {
                                            resolve("dispensing-station");
                                        } else {
                                            reject("Invalid password");
                                            alert("Invalid Password");
                                        }
                                    } else {
                                        // If not found in any role, reject with an error
                                        reject("User not found or role not recognized");
                                        alert("User not found");
                                    }
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// Function to redirect user based on role
function redirectToPage(userRole) {
    if (userRole === "patient") {
        window.location.replace("../Appointment/studentinfo.html");
    } else if (userRole === "doctor") {
        window.location.replace("../design/Doctorinfopage.html");
    } else if (userRole === "nurse") {
        window.location.replace("../nurse/Nurseuserinfo.html");
    } else if (userRole === "dispensing-station") {
        window.location.replace("../Dispensing/dispenuserinfo.html");
    } else {
        console.error("Invalid user role");
        // Handle invalid user role, e.g., display an error message to the user
    }
}
