function toggleNavbar() {
  var navbarRight = document.getElementById("navbarRight");
  navbarRight.classList.toggle("active");
}


const firebaseConfig = {
    // Firebase configuration
    apiKey: "AIzaSyComvKnubt9K5heFpV8Otuo12f3nJ4d_Do",
    authDomain: "dispensarydata-85401.firebaseapp.com",
    databaseURL: "https://dispensarydata-85401-default-rtdb.firebaseio.com",
    projectId: "dispensarydata-85401",
    storageBucket: "dispensarydata-85401.appspot.com",
    messagingSenderId: "816557237732",
    appId: "1:816557237732:web:c16b3be676d1ea699a93f1"
  };
  
  firebase.initializeApp(firebaseConfig);
 

const StaffDB = firebase.database().ref('StaffDB');

// Function to get element value by ID
const getElementVal = (id) => {
  return document.getElementById(id).value.trim(); // Trim the value to remove leading and trailing spaces
}

const showAlert = (message, type) => {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.appendChild(document.createTextNode(message));
  
    // Insert alert above the form
    const container = document.querySelector('.container');
    container.insertBefore(alert, container.childNodes[0]);
  
    // Timeout to remove alert after 3 seconds
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
  
  // Function to validate form inputs
  const validateForm = () => {
    const formData = {
      name: getElementVal('name'),
      empid: getElementVal('employee-id'),
      phone: getElementVal('phone'),
      password: getElementVal('password'),
      confpassword: getElementVal('confirm-password'),
      employeetype: getElementVal('employee-type')
    };
  
  
    // Check if any field is empty
    for (const field in formData) {
      if (!formData[field]) {
        showAlert('Please fill in all fields', 'danger');
        return false;
      }
    }


    const phoneNumberRegex = /^\+91\d{10}$/; // Accepts +91 followed by 10 digits

  // Validation checks
  if (!phoneNumberRegex.test(formData.phone)) {
    showAlert('Phone number should be in the format +91xxxxxxxxxx', 'danger');
    return false;
  }
  if (formData.password !== formData.confpassword) {
    showAlert('Passwords do not match', 'danger');
    return false;
  }

  return true; 
}

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Validate form inputs
    if (!validateForm()) {
      return; // Exit if form is not valid
    }
  
    // Get form values
    const formData = {
      name: getElementVal('name'),
      empid: getElementVal('employee-id'),
      phone: getElementVal('phone'),
      password: getElementVal('password'),
      confpassword: getElementVal('confirm-password'),
      employeetype: getElementVal('employee-type')
      
    };
  
    // Save the form data in Firebase database
    saveMessage(formData);
  
    // Clear the form after successful submission
    document.getElementById('signup-form').reset();
    showAlert('Data submitted successfully! Your employee code is your username', 'success');
  });
  
  // Function to save form data to Firebase database
  const saveMessage = (formData) => {
    const newStaffData = StaffDB.child(formData.employeetype)
    const newStaffdataa = newStaffData.child(formData.empid)

    newStaffdataa.set(formData);
  }