<template>
	<main>
		<div class="container">
			<div class="row">
				<div class="col">
				</div>
				<div class="col-6">
					<div class="post row">
						<h2>Publié par {{ postData.firstname + " " + postData.lastname }}</h2>
						<img :src="postData.imageURL" height="200">
						<p>{{ postData.content }}</p>
					</div>
					<div class="commentaires row">
						<h2>Commentaires</h2>
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
	name: "CommentaireView",
	data() {
		return {
			postData: ''
		}
	},
	methods: {
		getPost() {
			var h = new Headers();
			console.log(this.$route.params.id);
			h.append('Accept', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/post/get/" + this.$route.params.id, {
				method: "GET",
				headers: h
			}).then(res => {
				return res.json();
			}).then(data => {
				this.postData = data;
			}).catch(err => {
				console.error(err);
			})
		},
	},
	beforeMount() {
		this.getPost()
	},
}
</script>

<style>
.post {
	border-radius: 10px;
}
.commentaire {
	border-radius: 10px;
}
</style>