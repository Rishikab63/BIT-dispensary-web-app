// Your web app's Firebase configuration

{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyComvKnubt9K5heFpV8Otuo12f3nJ4d_Do",
    authDomain: "dispensarydata-85401.firebaseapp.com",
    databaseURL: "https://dispensarydata-85401-default-rtdb.firebaseio.com",
    projectId: "dispensarydata-85401",
    storageBucket: "dispensarydata-85401.appspot.com",
    messagingSenderId: "816557237732",
    appId: "1:816557237732:web:c16b3be676d1ea699a93f1",
    measurementId: "G-2QVLXCC1XT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> */}


function toggleNavbar() {
  var navbarRight = document.getElementById("navbarRight");
  navbarRight.classList.toggle("active");
}





const firebaseConfig = {
  apiKey: "AIzaSyComvKnubt9K5heFpV8Otuo12f3nJ4d_Do",
  authDomain: "dispensarydata-85401.firebaseapp.com",
  databaseURL: "https://dispensarydata-85401-default-rtdb.firebaseio.com",
  projectId: "dispensarydata-85401",
  storageBucket: "dispensarydata-85401.appspot.com",
  messagingSenderId: "816557237732",
  appId: "1:816557237732:web:c16b3be676d1ea699a93f1",
  measurementId: "G-2QVLXCC1XT"
};

firebase.initializeApp(firebaseConfig);
const PatientDetailDB = firebase.database().ref('PatientData');

render();
  function render(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
  }


  function phoneAuth(){
    var number = document.getElementById('phoneNumber').value;
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function(confirmationResult){
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
       
        document.getElementById('sender').style.display = 'none';
        document.getElementById('verifier').style.display = 'block';
    }).catch(function(error){
        alert(error.message);
    })
  }
  
  function codeverify(){
    var code = document.getElementById('verificationcode').value;
    coderesult.confirm(code).then(function(){
        document.getElementsByClassName('p-conf')[0].style.display = 'block';
        document.getElementsByClassName('n-conf')[0].style.display = 'none';
  
    }).catch(function(){
        document.getElementsByClassName('p-conf')[0].style.display = 'none';
        document.getElementsByClassName('n-conf')[0].style.display = 'block';
  
  
    })
  }


// Reference to the database



// Function to get element value by ID
const getElementVal = (id) => {
  return document.getElementById(id).value.trim(); // Trim the value to remove leading and trailing spaces
}

// Function to show alert
const showAlert = (message, type) => {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.appendChild(document.createTextNode(message));

  // Insert alert above the form
  const container = document.querySelector('.login-container');
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
    rollNumber: getElementVal('rollNumber'),
    age: getElementVal('age'),
    sex: getElementVal('sex'),
    address: getElementVal('address'),
    phoneNumber: getElementVal('phoneNumber'),
    yearOfPassing: getElementVal('yearOfPassing'),
    chronicIllness: getElementVal('chronicIllness'),
    password: getElementVal('createPassword'),
    confirmPassword: getElementVal('confirmPassword')
  };

  // Check if any field is empty
  for (const field in formData) {
    if (!formData[field]) {
      showAlert('Please fill in all fields', 'danger');
      return false;
    }
  }

  // Regular expressions for validation
  const phoneNumberRegex = /^\+91\d{10}$/; // Accepts +91 followed by 10 digits

  // Validation checks
  if (!phoneNumberRegex.test(formData.phoneNumber)) {
    showAlert('Phone number should be in the format +91xxxxxxxxxx', 'danger');
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    showAlert('Passwords do not match', 'danger');
    return false;
  }

  return true; // Form is valid
}

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Validate form inputs
  if (!validateForm()) {
    return; // Exit if form is not valid
  }

  // Get form values
  const formData = {
    name: getElementVal('name'),
    rollNumber: getElementVal('rollNumber'),
    age: getElementVal('age'),
    sex: getElementVal('sex'),
    address: getElementVal('address'),
    phoneNumber: getElementVal('phoneNumber'),
    yearOfPassing: getElementVal('yearOfPassing'),
    chronicIllness: getElementVal('chronicIllness'),
    password: getElementVal('createPassword'),
    confirmPassword: getElementVal('confirmPassword')
  };

  // Save the form data in Firebase database
  saveMessage(formData);

  // Clear the form after successful submission
  });

// Function to save form data to Firebase database
const saveMessage = (formData) => {
  const newPatientDetail = PatientDetailDB.child(formData.rollNumber)
  if (document.querySelector('.p-conf').style.display === 'block') {
    newPatientDetail.set(formData);
    showAlert('Data submitted successfully! Your rollnumber or employee code is your username', 'success');
  } else {
    showAlert('OTP not verified. Please verify your phone number.', 'danger');
  }
 
}

// Function to open signup box
const openSignupBox = () => {
  document.getElementById('signup-box').style.display = 'block';
  document.getElementById('login-box').style.display = 'none';
}

// Function to open login box and hide signup box
const openLoginBox = () => {
  document.getElementById('signup-box').style.display = 'none';
  document.getElementById('login-box').style.display = 'block';
}

// Event listener to open signup box when "Sign Up" link is clicked
document.getElementById('signup-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default action of the link
  openSignupBox(); // Call the function to open the signup box
});

// Event listener to switch to login box when "Login" link is clicked
document.getElementById('login-from-signup').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default action of the link
  openLoginBox(); // Call the function to close the signup box and open the login box
});