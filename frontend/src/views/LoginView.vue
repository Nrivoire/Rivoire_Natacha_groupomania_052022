<template>

	<body>
		<main>
			<div class="container">
				<div class="row">
					<div class="col">
					</div>
					<div class="col-6">
						<div class="imgcontainer">
							<img src="../assets/icon-above-font.svg" height="300" alt="groupomania red logo">
						</div>
						<div class="container_login">
							<div class="item">
								<label for="email"><b>Email</b></label>
								<input type="email" placeholder="Votre email" name="email" v-model="email" required>
							</div>
							<div class="item">
								<label for="password"><b>Mot de passe</b></label>
								<input type="password" placeholder="Votre mot de passe" name="password"
									v-model="password" required>
							</div>
							<button @click="loginSubmit" type="submit">Login</button>
						</div>
					</div>
					<div class="col">
					</div>
				</div>
			</div>
		</main>
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
				window.location = "/session";
			}).catch(err => {
				console.error(err);
			})
		}
	}
}
</script>

<style>
.col-6 {
	background-color: rgb(245, 167, 167);
	border-radius: 10px;
}

a {
	text-decoration: none;
}

.container_login {
	width: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	margin: 0;
}

.item {
	display: flex;
	flex-direction: column;
}

/* Full-width inputs */
input[type=email],
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

@media screen and (max-width: 767px) {
	.col-6 {
		width: 100%;
	}

	img {
		width: 280px;
	}
}
</style>