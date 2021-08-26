const switchers = [...document.querySelectorAll('.switcher')];
const registerForm = document.getElementById('register-form');

// register
const signupName = document.getElementById('signup-name');
const signupPassword = document.getElementById('signup-password');
const repeatPassword = document.getElementById('repeat-password');
const smallElement = document.querySelector('.small-repeat');

const smallRegisterFail = document.querySelector('.small-register-fail');

// login
const loginForm = document.getElementById('login-form');
const loginName = document.getElementById('login-name');
const loginPassword = document.getElementById('login-password');
const smallLogin  = document.querySelector('.small-login');

switchers.forEach(item => {
	item.addEventListener('click', function () {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})





registerForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (repeatPassword.value != signupPassword.value) {
		smallElement.style.display = 'block';

	}
	smallElement.style.display = 'none';
	const data = { username: signupName.value,
					password: signupPassword.value
				 };
	console.log(data)
	fetch('/login/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		  },
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if(data.message == 'Error'){
			smallRegisterFail.style.display = 'block';
		} else {
			smallRegisterFail.textContent = 'Register successfully';
			smallRegisterFail.style.display = 'block';
			smallRegisterFail.style.color = 'green';
		}
	  
	})
		.catch(function (error) {
			console.error(error);
		})

})

loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	smallRegisterFail.style.display = 'none';
	const data = { username: loginName.value,
					password: loginPassword.value
				 };
	console.log(data)
	fetch('/login/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		  },
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if(data.message == 'Login Successful!'){

			// save user name
			console.log(data.username)
			smallLogin.style.display = 'block';
			smallLogin.style.color = 'green';
			smallLogin.textContent = data.message;
		}
		else {
			smallLogin.style.display = 'block';
			smallLogin.textContent = data.message;
		}
	})
		.catch(function (error) {
			smallLogin.style.display = 'block';
			smallLogin.textContent = 'Error';
		})

})