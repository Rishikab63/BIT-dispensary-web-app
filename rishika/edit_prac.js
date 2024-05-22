import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyComvKnubt9K5heFpV8Otuo12f3nJ4d_Do",
      authDomain: "dispensarydata-85401.firebaseapp.com",
      databaseURL: "https://dispensarydata-85401-default-rtdb.firebaseio.com",
      projectId: "dispensarydata-85401",
      storageBucket: "dispensarydata-85401.appspot.com",
      messagingSenderId: "816557237732",
      appId: "1:816557237732:web:c16b3be676d1ea699a93f1"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

document.getElementById('myform').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const day = document.getElementById("day").value;
  const sr_no = document.getElementById("sr_no").value;
  const name = document.getElementById("name").value;

  // Get a reference to the database path based on the selected day
  const dbRef = ref(db, 'doctor_timetable/' + day + '/' + sr_no);

  // Push the data under the specific day
  await set(dbRef, {
    sr_no: sr_no,
    name: name
});


  // Alert
  alert("Data entered!");

  // Clear form fields
  document.getElementById("sr_no").value = "";
  document.getElementById("name").value = "";
});