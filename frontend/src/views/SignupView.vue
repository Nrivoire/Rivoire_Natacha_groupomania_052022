<template>
	<body>
		<div class="imgcontainer">
			<img src="/img/icon-above-font.c8b4b6b1.svg" height="300" alt="groupomania red logo">
		</div>
		<div class="container">
			<div class="item">
				<label for="firstname"><b>Prénom</b></label>
				<input type="firstname" placeholder="Votre prénom" name="firstname" required>
			</div>
			<div class="item"><label for="lastname"><b>Nom</b></label>
				<input type="lastname" placeholder="Votre nom de famille" name="lastname" required>
			</div>
			<div class="item">
				<label for="email"><b>Email</b></label>
				<input type="email" placeholder="Votre email" name="email" required>
			</div>
			<div class="item">
				<label for="birthday"><b>Date d'anniversaire</b></label>
				<input type="birthday" placeholder="Votre anniversaire" name="birthday" required>
			</div>
			<div class="item">
				<label for="password"><b>Mot de passe</b></label>
				<input type="password" placeholder="Votre mot de passe" name="password" required>
			</div>
			<button type="submit">Login</button>
		</div>
	</body>
</template>

<style>
body {
	background-color: rgb(245, 167, 167);
}

a {
	text-decoration: none;
}

/* Bordered form */
form {
	background-color: white;
	border: 3px solid #f1f1f1;
	width: 30%;
	margin-left: 35%;
}

.container {
	display: flex;
	flex-direction: column;
}

.item {
	display: flex;
	flex-direction: column;
}

/* Full-width inputs */
input {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
}

/* Set a style for all buttons */
button {
	background-color: rgb(214, 79, 79);
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	cursor: pointer;
	width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
	opacity: 0.8;
}

/* Center the avatar image inside this container */
.imgcontainer {
	text-align: center;
	margin: 24px 0 12px 0;
}
</style>