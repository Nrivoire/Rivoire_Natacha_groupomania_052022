<template>
	<main>
		<div class="container">
			<div class="row">
				<div class="col">
				</div>
				<div class="col-6 col-log">
					<form>
						<div class="imgcontainer">
							<img src="/img/icon-above-font.c8b4b6b1.svg" height="300" alt="groupomania red logo">
						</div>
						<div class="container">
							<div v-if="this.errors.signup == 1" class="alert alert-dark" role="alert">
								Vous devez remplir tout les champs
							</div>
							<div v-if="this.errors.signup == 2" class="alert alert-dark" role="alert">
								Ce compte existe déjà !
							</div>
							<div class="item">
								<label for="firstname"><b>Prénom</b></label>
								<input id="firstname" type="text" v-if="this.errors.firstname" placeholder="Votre prénom"
									name="firstname" v-model="firstname" required>
								<input type="firstname" v-else class="form-control is-invalid"
									placeholder="Votre prénom" name="firstname" v-model="firstname" required>
								<div id="validationFirstname" class="invalid-feedback">
									Il manque votre prénom
								</div>
							</div>
							<div class="item">
								<label for="lastname"><b>Nom</b></label>
								<input id="lastname" type="text" v-if="this.errors.lastname" placeholder="Votre nom de famille"
									name="lastname" v-model="lastname" required>
								<input type="lastname" v-else class="form-control is-invalid"
									placeholder="Votre nom de famille" name="lastname" v-model="lastname" required>
								<div id="validationLastname" class="invalid-feedback">
									Il manque votre nom de famille
								</div>
							</div>
							<div class="item">
								<label for="email"><b>Email</b></label>
								<input id="email" type="email" v-if="this.errors.email" placeholder="Votre email" name="email"
									v-model="email" required>
								<input type="email" v-else class="form-control is-invalid" placeholder="Votre email"
									name="email" v-model="email" required>
								<div id="validationEmail" class="invalid-feedback">
									Il manque votre email
								</div>
							</div>
							<div class="item">
								<label for="password"><b>Mot de passe</b></label>
								<input id="password" type="password" v-if="this.errors.password" placeholder="Votre mot de passe"
									name="password" v-model="password" required>
								<input type="password" v-else class="form-control is-invalid"
									placeholder="Votre mot de passe" name="password" v-model="password" required>
								<div id="validationPassword" class="invalid-feedback">
									Il manque votre mot de passe
								</div>
							</div>
							<button @click="signup" type="submit">Login</button>
						</div>
					</form>
				</div>
				<div class="col">
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: "SignupView",
	data() {
		return {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			errors: {
				firstname: 1,
				lastname: 1,
				email: 1,
				password: 1,
				signup: 0
			}
		}
	},
	methods: {
		signup(e) {
			e.preventDefault();
			if (this.firstname && this.lastname && this.email && this.password) {
				fetch("http://localhost:3000/api/signup", {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						firstname: this.firstname,
						lastname: this.lastname,
						email: this.email,
						password: this.password
					})
				}).then(res => {
					if (res.ok) {
						this.errors.signup = 0;
						return res.json();
					} else if (res.status == 409)
						this.errors.signup = 2;
					else
						this.errors.signup = 1;
				}).then(data => {
					sessionStorage.setItem("Token", JSON.stringify(data.token));
					sessionStorage.setItem("Admin", JSON.stringify(data.admin));
					sessionStorage.setItem("UserId", JSON.stringify(data.userId));
					window.location = "/session";
				}).catch(err => {
					console.error(err);
				})
			}
			if (!this.firstname) {
				this.errors.firstname = 0;
			} else this.errors.firstname = 1;
			if (!this.lastname) {
				this.errors.lastname = 0;
			} else this.errors.lastname = 1;
		}
	}
}
</script>

<style>
input[type=text] {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
}
</style>