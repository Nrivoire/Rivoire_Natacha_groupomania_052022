<template>
		<main>
			<div class="container">
				<div class="row">
					<div class="col">

					</div>
					<div class="col-6">
						<p v-if="this.admin == 'true'" class="admin-text">Compte admin</p>
						<h1>Mon compte</h1>
					</div>
					<div class="col">
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col">
					</div>
					<div class="col-6 col-log">

						<div class="container">
							<div class="item">
								<label for="firstname"><b>Prénom</b></label>
								<input type="firstname" placeholder="Votre nouveau prénom" name="firstname"
									v-model="firstname">
							</div>
							<div class="item"><label for="lastname"><b>Nom</b></label>
								<input type="lastname" placeholder="Votre nouveau nom de famille" name="lastname"
									v-model="lastname">
							</div>
							<div class="item">
								<label for="password"><b>Mot de passe</b></label>
								<input type="password" placeholder="Votre nouveau mot de passe" name="password"
									v-model="password">
							</div>
							<button @click="updateAccount" type="submit">Modifier votre compte</button>
							<div>
								<button class="deleteButton" @click="deleteAccount" type="delete">Supprimer
									compte</button>
							</div>
						</div>
					</div>
					<div class="col">
					</div>
				</div>
			</div>
		</main>
</template>

<script>
export default {
	name: "AccountView",
	data() {
		return {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			admin: ''
		}
	},
	methods: {
		updateAccount() {
			var obj = {};
			obj = this.firstname ? Object.assign(obj, { 'firstname': this.firstname }) : obj;
			obj = this.lastname ? Object.assign(obj, { 'lastname': this.lastname }) : obj;
			obj = this.password ? Object.assign(obj, { 'password': this.password }) : obj;
			var h = new Headers();
			h.append('Content-Type', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/user/update", {
				method: "PUT",
				headers: h,
				body: JSON.stringify(obj)
			}).then(res => {
				if (res.ok) {
					alert('Votre compte à bien été modifié !');
				}
			}).catch(err => {
				console.error(err);
			})
		},
		getAccount() {
			var h = new Headers();
			h.append('Content-Type', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch('http://localhost:3000/api/user/get', {
				method: "GET",
				headers: h
			}).then(res => {
				return res.json();
			}).then(data => {
				this.firstname = data.firstname;
				this.lastname = data.lastname;
			}).catch(err => {
				console.error(err)
			})
		},
		deleteAccount() {
			if (confirm('Voulez-vous vraiment supprimer votre compte?')) {
				var h = new Headers();
				h.append('Content-Type', 'application/json');
				h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
				fetch('http://localhost:3000/api/user/delete', {
					method: "DELETE",
					headers: h
				}).then(res => {
					if (res.ok) {
						sessionStorage.removeItem("Token");
						window.location = "/login";
					}
				}).catch(err => {
					console.error(err);
				})
			}
		}
	},
	beforeMount() {
		this.getAccount()
		this.admin = sessionStorage.getItem('Admin');
	},
}
</script>

<style>
h1 {
	margin-top: 5%;
	margin-bottom: 10%;
}

.row {
	margin-bottom: 5px;
}

.deleteButton {
	margin-top: 10%;
	background-color: rgb(168, 3, 3);
}

.admin-text {
	color: blue;
}
</style>