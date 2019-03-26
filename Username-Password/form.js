let users = [
	{
		username: 'Ivan',
		password: 'Proba123',
		age: 'Yes',
		terms: 'Yes'
	},
	{
		username: 'Atanas',
		password: 'Cars21',
		age: 'Yes',
		terms: 'Yes'
	},
	{
		username: 'Yayaya',
		password: 'Yayaya1',
		age: 'No',
		terms: 'No'
	}
];



ClearUsernameError = () => {
	if(username.value.length !== 0){
		username_error.innerHTML = '';
		return true;
	}
}
ClearPasswordError = () => {
	if(password.value.length !== 0){
		password_error.innerHTML = '';
		return true;
	}
}
ClearRepeatPasswordError = () => {
	if(password.value === repeat.value){
		repeat_error.innerHTML = '';
		return true;
	}
}
ClearCheckboxAgeError = () => {
	if (isAgeChecked.checked){
		age_error.innerHTML = '';
		return true;
	}
}
ClearCheckboxAcceptError = () => {
	if (isAccepted.checked){
		accept_error.innerHTML = '';
		return true;
	}
}

let username = document.forms["my-form"]["username"];
let password = document.forms["my-form"]["password"];
let repeat = document.forms["my-form"]["repeat"];
let isAgeChecked = document.getElementById('age');
let isAccepted = document.getElementById('accept');

let username_error = document.getElementById('username-error');
let password_error = document.getElementById('password-error');
let repeat_error = document.getElementById('repeat-error');
let age_error = document.getElementById('age-error');
let accept_error = document.getElementById('accept-error');

username.addEventListener('blur', ClearUsernameError, true);
password.addEventListener('blur', ClearPasswordError, true);
repeat.addEventListener('blur', ClearRepeatPasswordError, true);
isAgeChecked.addEventListener('blur', ClearCheckboxAgeError, true);
isAccepted.addEventListener('blur', ClearCheckboxAcceptError, true);

ValidateUsername = (uname, uname_error) => {
	if(uname.value.length === 0){
		uname_error.innerHTML = 'Please enter a username';
		uname_error.style.color = 'red';
		return false;
	}else if(uname.value.length < 7){
		uname_error.innerHTML = 'Username is too short';
		uname_error.style.color = 'red';
		return false;
	}
	return true;
}

ValidatePassword = (pass, pass_error) => {
	if(password.value.length === 0){
		password_error.innerHTML = 'Please enter a password';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.length < 4){
		password_error.innerHTML = 'Password too short';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.search(/[a-z]/) < 0){
		password_error.innerHTML = 'Password must contain at least one lowercase letter';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.search(/[A-Z]/) < 0){
		password_error.innerHTML = 'Password must contain at least one uppercase letter';
		password_error.style.color = 'red';
		return false;
	}
	return true;
}

ArePasswordsEqual = (pass, repeat_pass, repeat_pass_error) => {
	if(pass.value != repeat_pass.value){
		repeat_pass_error.innerHTML = 'Passwords must be equal';
		repeat_pass_error.style.color = 'red';
		return false;
	}
	return true;
}

IsAdult = (age_check, age_err) => {
	if(!age_check.checked){
		age_err.innerHTML = 'Please check!';
		age_err.style.color = 'red';
		return false;
	}
	return true;
}

doAgree = (accepted, accept_err) => {
	if(!accepted.checked){
		accept_err.innerHTML = 'Please check2!';
		accept_err.style.color = 'red';
		return false;
	}
	return true;
}

SubmitUser = () => {
	/*if(username.value.length === 0){
		username_error.innerHTML = 'Please enter a username';
		username_error.style.color = 'red';
		return false;
	}else if(username.value.length < 7){
		username_error.innerHTML = 'Username is too short';
		username_error.style.color = 'red';
		return false;
	}*/
	let hasError = false;
	if(!ValidateUsername(username, username_error)){
		hasError = true;
	}

	/*if(password.value.length === 0){
		password_error.innerHTML = 'Please enter a password';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.length < 4){
		password_error.innerHTML = 'Password too short';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.search(/[a-z]/) < 0){
		password_error.innerHTML = 'Password must contain at least one lowercase letter';
		password_error.style.color = 'red';
		return false;
	}else if(password.value.search(/[A-Z]/) < 0){
		password_error.innerHTML = 'Password must contain at least one uppercase letter';
		password_error.style.color = 'red';
		return false;
	}*/

	if(!ValidatePassword(password, password_error)){
		hasError = true;
	}

	/*if(password.value != repeat.value){
		repeat_error.innerHTML = 'Passwords must be equal';
		repeat_error.style.color = 'red';
		return false;
	}*/

	if(!ArePasswordsEqual(password, repeat, repeat_error)){
		hasError = true;
	}

	/*if(!isAgeChecked.checked){
		age_error.innerHTML = 'Please check!';
		age_error.style.color = 'red';
		return false;
	}*/

	if(!IsAdult(isAgeChecked, age_error)){
		hasError = true;
	}

	/*if(!isAccepted.checked){
		accept_error.innerHTML = 'Please check2!';
		accept_error.style.color = 'red';
		return false;
	}*/
	if(!doAgree(isAccepted, accept_error)){
		hasError = true;
	}
	
	if(!hasError){
		let ageAnswer = '';
		let termsAnswer = '';

		if(isAgeChecked.checked){
			ageAnswer = 'Yes';
		}else{
			ageAnswer = 'No';
		}

		if(isAccepted.checked){
			termsAnswer = 'Yes';
		}else{
			termsAnswer = 'No';
		}

		users.push({
			username: username.value,
			password: password.value,
			age: ageAnswer,
			terms: termsAnswer
		});

		renderUsers();
	}

	return false;
}

deleteRow = (o) => {
	let p=o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

renderUsers = () => {
	let tableBody = document.querySelector('tbody');

	tableBody.innerHTML = '';
	users.forEach(function(u){
		tableBody.innerHTML += 
		'<tr><td>' + u.username + '</td><td>' 
		+ u.password + '</td><td>' + u.age + '</td><td>'
		+ u.terms + '</td><td><input type="button" value="X" onclick="deleteRow(this)"></td></tr>';
	});
}

renderUsers();