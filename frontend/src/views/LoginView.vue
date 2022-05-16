<template>

	<body>
		<main>
			<div class="container">
				<div class="row">
					<div class="col">
					</div>
					<div class="col-6 col-log">
						<div class="imgcontainer">
							<img src="../assets/icon-above-font.svg" height="300" alt="groupomania red logo">
						</div>
						<form>
							<div class="container_login">
								<div v-if="!this.errors.login" class="alert alert-dark" role="alert">
									Wrong email or password
								</div>
								<div class="item">
									<label for="email"><b>Email</b></label>
									<input type="email" v-if="this.errors.email" placeholder="Votre email" name="email"
										v-model="email" required>
									<input type="email" v-else class="form-control is-invalid" placeholder="Votre email"
										name="email" v-model="email" required>
									<div id="validationServer04Feedback" class="invalid-feedback">
										Il manque votre email
									</div>
								</div>
								<div class="item">
									<label for="password"><b>Mot de passe</b></label>
									<input type="password" v-if="this.errors.password" placeholder="Votre mot de passe"
										name="password" v-model="password" required>
									<input type="password" v-else class="form-control is-invalid"
										placeholder="Votre mot de passe" name="password" v-model="password" required>
									<div id="validationServer04Feedback" class="invalid-feedback">
										Il manque votre mot de passe
									</div>
								</div>
								<button @click="loginSubmit" type="submit">Login</button>
							</div>
						</form>
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
			errors: {
				email: 1,
				password: 1,
				login: 1
			}
		}
	},
	methods: {
		loginSubmit(e) {
			e.preventDefault();
			if (this.email && this.password) {
				this.errors.email = 1;
				this.errors.password = 1;
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
					if (res.ok) {
						this.errors.login = 1;
						return res.json();
					} else
						this.errors.login = 0;
				}).then(data => {
					if (data) {
						sessionStorage.setItem("Token", JSON.stringify(data.token));
						sessionStorage.setItem("UserId", JSON.stringify(data.userId));
						window.location = "/session";
					}
				}).catch(err => {
					console.error(err);
				})
			}
			if (!this.email) {
				this.errors.email = 0;
			}
			if (!this.password) {
				this.errors.password = 0;
			}
		}
	}
}
</script>

<style>
.col-log {
	background-color: rgb(252, 222, 222);
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