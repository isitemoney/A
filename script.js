// --- ضع إعدادات Firebase الخاصة بك هنا ---
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function login() {
    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if(!userInput || !passInput) return;

    // جلب بيانات المستخدم من قاعدة البيانات
    database.ref('users/' + userInput).once('value').then((snapshot) => {
        const data = snapshot.val();
        
        if (data && data.password === passInput) {
            errorMsg.style.display = 'none';
            showDashboard(userInput, data);
        } else {
            errorMsg.style.display = 'block';
        }
    }).catch(err => {
        console.error(err);
        alert("حدث خطأ في الاتصال بقاعدة البيانات");
    });
}

function showDashboard(username, data) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    document.getElementById('user-display').innerText = username;
    
    // ربط البيانات ليتم تحديثها فورياً (Real-time)
    database.ref('users/' + username).on('value', (snapshot) => {
        const updatedData = snapshot.val();
        if(updatedData) {
            document.getElementById('clicks').innerText = updatedData.clicks || 0;
            document.getElementById('earnings').innerText = "$" + (updatedData.earnings || 0);
        }
    });
}

function logout() {
    location.reload();
}