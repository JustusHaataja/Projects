const container = document.getElementById('container');
const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');

registerButton.addEventListener('click', () => {
  container.classList.add('active');
});

loginButton.addEventListener('click', () => {
  container.classList.remove('active');
});

/* container.style.background = "linear-gradient(to right, rgba(0,0,0,0.5) 20%,",
"rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.9) 100%)"; */