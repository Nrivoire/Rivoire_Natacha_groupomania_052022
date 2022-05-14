<template>
	<body>
		<div class="imgcontainer">
			<img src="../assets/icon-above-font.svg" height="300" alt="groupomania red logo">
		</div>
		<div class="container">
			<div class="item">
				<label for="email"><b>Email</b></label>
				<input type="email" placeholder="Votre email" name="email" v-model="email" required>
			</div>
			<div class="item">
				<label for="password"><b>Mot de passe</b></label>
				<input type="password" placeholder="Votre mot de passe" name="password" v-model="password" required>
			</div>
			<button @click="loginSubmit" type="submit">Login</button>
		</div>
	</body>
</template>

<script>
export default {
	name: "LoginView",
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		loginSubmit() {
			fetch("http://localhost:3000/api/login", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					//'Authentication': 'Bearer ' + JSON.parse(sessionStorage.getItem("Token"))
				},
				body: JSON.stringify({
					email: this.email,
					password: this.password
				})
			}).then(res => {
				return res.json();
			}).then(data => {
				console.log(data);
				sessionStorage.setItem("Token", JSON.stringify(data.token));
				sessionStorage.setItem("UserId", JSON.stringify(data.userId));
				window.location = "/session";
			}).catch(err => {
				console.error(err);
			})
		}
	}
}
</script>

<style>
body {
	background-color: rgb(245, 167, 167);
}

a {
	text-decoration: none;
}

.container {
	display: flex;
	flex-direction: column;
}

.item {
	display: flex;
	flex-direction: column;
}

/* Bordered form */
form {
	background-color: white;
	border: 3px solid #f1f1f1;
	width: 30%;
	margin-left: 35%;
}

/* Full-width inputs */
input[type=text],
input[type=password] {
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