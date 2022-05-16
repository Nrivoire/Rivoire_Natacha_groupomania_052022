<template>
	<main>
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="media blog-media media-new-post">
						<div class="downloadPic">
							<input @change="uploadPicture($event)" type="file" placeholder="Choisir une image" accept="image/png, image/jpeg">
						</div>
						<div class="media-body">
							<textarea v-model='title' placeholder="Votre titre ici..."></textarea>
							<textarea class="input-new-post" type="text" placeholder="Votre message ici..."
								name="newContent" v-model="newContent"></textarea>
							<button @click="postNewPost" class="validate" type="submit">Valider</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<section class="home-blog bg-sand">
			<div class="container">
				<div class="row" v-for="post in tablePost" :key="post">
					<div class="col">
						<div class="media blog-media">
							<a :href="post.idURL">
								<img class="d-flex" :src="post.imageURL" alt="post image"></a>
							<div class="media-body">
								<a :href="post.idURL">
									<h5 class="mt-0">{{ post.title }}</h5>
								</a>
								<div class="content">{{ post.content }}</div>
								<ul>
									<li>publié par <b> {{ post.firstname + " " + post.lastname }}</b></li>
									<li class="text-right"><a :href="post.idURL">{{ post.count_commentaires ?
											post.count_commentaires
											: 0
									}} Commentaires</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: "SessionView",
	data() {
		return {
			newContent: '',
			tablePost: '',
			imageURL: ''
		}
	},
	methods: {
		uploadPicture(event) {
			this.imageURL = event.target.files[0];
		},
		postNewPost() {
			var formdata = new FormData();
			formdata.append('content', this.newContent);
			formdata.append('image', this.imageURL);
			var h = new Headers();
			h.append('Accept', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/post/create", {
				method: "POST",
				headers: h,
				body: formdata
			}).then(res => {
				if (res.ok)
					location.reload();
			}).catch(err => {
				console.error(err);
			})
		},
		getAllPost() {
			var h = new Headers();
			h.append('Accept', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch('http://localhost:3000/api/post', {
				method: "GET",
				headers: h
			}).then(res => {
				return res.json();
			}).then(data => {
				for (var i = 0; i < data.length; i++) {
					data[i].idURL = "/commentaire/" + data[i].id;
				}
				this.tablePost = data;
			}).catch(err => {
				console.error(err);
			})
		}
	},
	beforeMount() {
		this.getAllPost()
	},
}
</script>

<style>
a {
	text-decoration: none;
	color: unset;
}

a:hover {
	color: unset;
}

.input-new-post {
	width: 80%;
	height: 100px;
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

.downloadPic {
	border: 1px solid grey;
	min-width: 200px;
	height: 260px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.content {
	margin-bottom: 20px;
}

input[type='file'] {
	border: none
}

/* Add a hover effect for buttons */
button:hover {
	opacity: 0.8;
}

body {
	margin-top: 20px;
}

.media img {
	max-height: 400px;
}

.home-blog {
	padding-top: 80px;
	padding-bottom: 80px;
}

@media (min-width: 992px) {
	.home-blog {
		padding-top: 100px;
		padding-bottom: 100px;
	}
}

.home-blog .section-title {
	padding-bottom: 15px;
}

.home-blog .media {
	margin-top: 50px;
}

@media (min-width: 768px) {
	.home-blog .media {
		margin-top: 30px;
	}
}

.bg-sand {
	background-color: #f5f5f6;
}

.media.blog-media {
	margin-top: 30px;
	position: relative;
	display: block;
}

@media (min-width: 992px) {
	.media.blog-media {
		display: table;
	}
}

.media.blog-media .circle {
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	white-space: nowrap;
	position: absolute;
	padding: 0;
	top: 20px;
	left: 20px;
	text-align: center;
	box-shadow: none;
	transform: translateX(0);
	color: #fff;
	transition: background-color 0.3s ease;
}

.media.blog-media .circle .day {
	color: #fff;
	transition: color 0.25s ease;
	font-weight: 500;
	font-size: 28px;
	line-height: 1;
	margin-top: 12px;
}

.media.blog-media .circle .month {
	text-transform: uppercase;
	font-size: 14px;
}

.media.blog-media>a {
	position: relative;
	display: block;
}

@media (min-width: 992px) {
	.media.blog-media>a {
		display: table-cell;
		vertical-align: top;
		min-width: 200px;
	}
}

@media (min-width: 1200px) {
	.media.blog-media>a {
		min-width: 230px;
	}
}

.media.blog-media>a:before {
	position: absolute;
	content: "";
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	opacity: 0;
	transform: scale(0);
	transition: transform 0.3s ease, opacity 0.3s;
	background: rgba(214, 79, 79, 0.2);
}

.media.blog-media>a img {
	width: 100%;
}

.media.blog-media:hover>a:before {
	opacity: 1;
	transform: scale(1);
}

.media.blog-media:hover .circle {
	background-color: rgba(255, 255, 255, 0.9);
}

.media.blog-media:hover .circle .day,
.media.blog-media:hover .circle .month {
	color: #222;
}

.media.blog-media:hover .media-body h5 {
	color: #c60c0c;
}

.media.blog-media:hover .media-body a.post-link {
	color: #c60c0c;
	text-decoration: underline;
}

.media.blog-media .media-body {
	border: 1px solid #efeff3;
	padding: 30px 30px 10px;
	font-size: 14px;
	background: #fff;
	border-top: none;
}

@media (min-width: 992px) {
	.media.blog-media .media-body {
		padding: 15px 20px 10px;
		border-top: 1px solid #efeff3;
		border-left: none;
		display: table-cell;
		vertical-align: top;
	}
}

@media (min-width: 1200px) {
	.media.blog-media .media-body {
		padding: 30px 20px 10px;
	}
}

.media.blog-media .media-body h5 {
	transition: color 0.3s ease;
	margin-bottom: 15px;
}

@media (min-width: 992px) {
	.media.blog-media .media-body h5 {
		font-size: 15px;
	}
}

@media (min-width: 1200px) {
	.media.blog-media .media-body h5 {
		margin-bottom: 15px;
		font-size: 18px;
	}
}

.media.blog-media .media-body a.post-link {
	display: block;
	color: #222;
	font-size: 11px;
	padding: 23px 0;
	text-transform: uppercase;
	font-weight: 400;
}

@media (min-width: 992px) {
	.media.blog-media .media-body a.post-link {
		padding: 7px 0;
	}
}

@media (min-width: 1200px) {
	.media.blog-media .media-body a.post-link {
		padding: 23px 0;
	}
}

.media.blog-media .media-body ul {
	position: relative;
	padding: 10px 0 0;
}

.media.blog-media .media-body ul li {
	display: inline-block;
	width: 49%;
	position: relative;
}

.media.blog-media .media-body ul li:before {
	position: absolute;
	content: "";
	top: 5px;
	left: 0;
	width: 1px;
	height: 14px;
	background: #eeeef2;
}

.media.blog-media .media-body ul li:first-child:before {
	visibility: hidden;
}

.media.blog-media .media-body ul:before {
	position: absolute;
	content: "";
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background: #eeeef2;
}

.media-new-post {
	width: 100%;
}
</style>