<template>
	<main>
		<div class="session">
			<h1>Yay you loged in !</h1>
		</div>
		<div class="center-column">
			<div class="new-post">
				<input @change="uploadPicture($event)" type="file" accept="image/png, image/jpeg" class="downloadPic">
				<textarea class="input-new-post" type="text" placeholder="Votre message ici..." name="content" v-model="content">
				</textarea>
				<button @click="postNewPost" class="validate" type="submit">Valider</button>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: "SessionView",
	data() {
		return {
			content: '',
			imageURL: '',
		}
	},
	methods: {
		uploadPicture(event) {
			this.imageURL = event.target.files[0];
		},
		postNewPost() {
			var formdata = new FormData();
			formdata.append('content', this.content);
			formdata.append('image', this.imageURL);
			var h = new Headers();
			h.append('Accept', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/post/create", {
				method: "POST",
				headers : h,
				body: formdata
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
main {
	background-color: rgb(255, 220, 220);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.input-new-post {
	width: 80%;
	height: 100px;
}
.new-post {
	background-color: rgb(245, 167, 167);
	width: 100%;
}
/* Set a style for all buttons */
.validate {
	background-color: rgb(214, 79, 79);
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	cursor: pointer;
	width: 80%;
}
input[type='file'] {
	border: none
}

/* Add a hover effect for buttons */
button:hover {
	opacity: 0.8;
}
</style>