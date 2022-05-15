<template>

	<body>
		<div>
			<h1>Vous pouvez modifier votre compte ici</h1>
		</div>
		<div class="container">
			<div class="item">
				<label for="firstname"><b>Prénom</b></label>
				<input type="firstname" placeholder="Votre prénom" name="firstname" v-model="firstname">
			</div>
			<div class="item"><label for="lastname"><b>Nom</b></label>
				<input type="lastname" placeholder="Votre nom de famille" name="lastname" v-model="lastname">
			</div>
			<div class="item">
				<label for="email"><b>Email</b></label>
				<input type="email" placeholder="Votre email" name="email" v-model="email">
			</div>
			<div class="item">
				<label for="password"><b>Mot de passe</b></label>
				<input type="password" placeholder="Votre mot de passe" name="password" v-model="password">
			</div>
			<button @click="updateAccount" type="submit">Modify your account</button>
		</div>
	</body>
</template>

<script>
export default {
	name: "SessionView",
	data() {
		return {
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		}
	},
	methods: {
		updateAccount() {
			var obj = {};
			obj = this.firstname ? Object.assign(obj, {'firstname': this.firstname}) : obj;
			obj = this.lastname ? Object.assign(obj, {'lastname': this.lastname}) : obj;
			obj = this.email ? Object.assign(obj, {'email': this.email}) : obj;
			obj = this.password ? Object.assign(obj, {'password': this.password}) : obj;
			console.log(obj);
			var h = new Headers();
			h.append('Content-Type', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/user/update", {
				method: "PUT",
				headers: h,
				body: JSON.stringify(obj)
			}).then(res => {
				return res.json();
			}).then(data => {
				console.log(data);
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
	background-color: white;
	border: 3px solid #f1f1f1;
	width: 30%;
	margin-left: 35%;
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
</style>