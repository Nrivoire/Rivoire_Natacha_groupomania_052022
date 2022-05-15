<template>

	<body>
		<main>
			<div class="container">
				<div class="row">
					<div class="col">
					</div>
					<div class="col-6 col-log">
						<div class="imgcontainer">
							<img src="/img/icon-above-font.c8b4b6b1.svg" height="300" alt="groupomania red logo">
						</div>
						<div class="container">
							<div class="item">
								<label for="firstname"><b>Prénom</b></label>
								<input type="firstname" placeholder="Votre prénom" name="firstname" v-model="firstname"
									required>
							</div>
							<div class="item"><label for="lastname"><b>Nom</b></label>
								<input type="lastname" placeholder="Votre nom de famille" name="lastname"
									v-model="lastname" required>
							</div>
							<div class="item">
								<label for="email"><b>Email</b></label>
								<input type="email" placeholder="Votre email" name="email" v-model="email" required>
							</div>
							<div class="item">
								<label for="password"><b>Mot de passe</b></label>
								<input type="password" placeholder="Votre mot de passe" name="password"
									v-model="password" required>
							</div>
							<button @click="signup" type="submit">Login</button>
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
	name: "SignupView",
	data() {
		return {
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		}
	},
	methods: {
		signup() {
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
input[type=firstname],
input[type=lastname] {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
}
</style>