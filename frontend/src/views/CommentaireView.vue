<template>
	<main>
		<section class="home-blog bg-sand">
			<div class="container">
				<div class="row">
					<div class="col">
						<div v-if="postData.imageURL" class="media blog-media">
							<a :href="postData.idURL">
								<img class="d-flex" :src="postData.imageURL" alt="postData image"></a>
							<div class="media-body">
								<a :href="postData.idURL">
									<h5 class="mt-0">{{ postData.title }}</h5>
								</a>
								<div class="content_post">{{ postData.content }}</div>
								<ul>
									<li>publié par <b> {{ postData.firstname + " " + postData.lastname }}</b><br> le {{ postData.date }}</li>
									<li class="text-right">{{ postData.count_commentaires ? postData.count_commentaires
											: 0
									}} Commentaires</li>
								</ul>
							</div>
						</div>
						<div v-else class="media blog-media media-only-text">
							<div class="media-body">
								<a :href="postData.idURL">
									<h5 class="mt-0">{{ postData.title }}</h5>
								</a>
								<div class="content_post">{{ postData.content }}</div>
								<ul>
									<li>publié par <b> {{ postData.firstname + " " + postData.lastname }}</b><br> le {{ postData.date }}</li>
									<li class="text-right">{{ postData.count_commentaires ? postData.count_commentaires
											: 0
									}} Commentaires</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<button v-if="postData.userid == this.userId || this.admin == 'true'" @click="deletePost" class="btn btn-outline-danger button-delete-post" type="button">Supprimer Post</button>
			</div>
		</section>
		<section class="content-item" id="comments">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="panel">
							<div class="panel-body">
								<textarea class="form-control" rows="2"
									placeholder="Vous pouvez écrire votre commentaire ici" v-model="message"></textarea>
								<div class="mar-top clearfix">
									<button class="partage-btn btn btn-sm btn-primary pull-right" @click="createComment"
										type="submit">Partager</button>
								</div>
							</div>
						</div>
					
						<!-- COMMENT - START -->
						<div class="media" v-for="comment in commentsData" :key="comment" :data-value="comment.id">
							<div class="media-body">
								<h4 class="media-heading">{{ comment.firstname + ' ' + comment.lastname }}</h4>
								<p>{{ comment.message }}</p>
								<div class="info_commentaire">
									<div class="info_commentaire_button">
										<button v-if="this.userId == comment.userid || this.admin == 'true'" @click="deleteComment(comment.id)" class="btn btn-outline-danger" type="button">supprimer</button>
									</div>
									<ul class="list-unstyled list-inline media-detail pull-left">
										<li>{{ comment.date }}</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- COMMENT - END -->
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: "CommentaireView",
	data() {
		return {
			postData: '',
			message: '',
			commentsData: '',
			userId: '',
			admin: ''
		}
	},
	methods: {
		getPost() {
			var h = new Headers();
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
		createComment() {
			var h = new Headers();
			h.append('Accept', 'application/json');
			h.append('Content-Type', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/comment/create", {
				method: "POST",
				headers: h,
				body: JSON.stringify({
					postid: this.$route.params.id,
					message: this.message,
					date: new Date()
				})
			}).then(res => {
				if (res.ok)
					location.reload();
			}).catch(err => {
				console.error(err);
			})
		},
		getComments() {
			var h = new Headers();
			h.append('Accept', 'application/json');
			h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
			fetch("http://localhost:3000/api/comment/get/" + this.$route.params.id, {
				method: "GET",
				headers: h
			}).then(res => {
				return res.json();
			}).then(data => {
				this.commentsData = data;
			}).catch(err => {
				console.error(err);
			})
		},
		deleteComment(commentId) {
			if (confirm('Voulez-vous vraiment supprimer votre commentaire?')) {
				var h = new Headers();
				h.append('Content-Type', 'application/json');
				h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
				fetch('http://localhost:3000/api/comment/delete', {
					method: "DELETE",
					headers: h,
					body: JSON.stringify({
						commentId : commentId,
						postid : this.postData.id
					})
				}).then(res => {
					if (res.ok) {
						location.reload();
					}
				}).catch(err => {
					console.error(err);
				})
			}
		},
		deletePost() {
			if (confirm('Voulez-vous vraiment supprimer votre post?')) {
				var h = new Headers();
				h.append('Content-Type', 'application/json');
				h.append('Authorization', 'Bearer ' + JSON.parse(sessionStorage.getItem("Token")));
				fetch('http://localhost:3000/api/post/delete', {
					method: "DELETE",
					headers: h,
					body: JSON.stringify({
						postid : this.$route.params.id
					})
				}).then(res => {
					if (res.ok) {
						window.location = '/session';
					}
				}).catch(err => {
					console.error(err);
				})
			}
		}
	},
	beforeMount() {
		this.getPost();
		this.getComments();
		this.admin = sessionStorage.getItem('Admin');
		this.userId = sessionStorage.getItem('UserId');
	},
}
</script>

<style>
.button-delete-post{
		width: 20%;
}

@media screen and (max-width: 425px) {
	.button-delete-post{
		width: 100%;
	}
}

.content_post {
	margin-bottom: 20px;
}

.post {
	border-radius: 10px;
}

.commentaire {
	border-radius: 10px;
}

.content-item {
	padding: 30px 0;
	background-color: #FFFFFF;
}

.content-item.grey {
	background-color: #F0F0F0;
	padding: 50px 0;
	height: 100%;
}

.content-item h2 {
	font-weight: 700;
	font-size: 35px;
	line-height: 45px;
	text-transform: uppercase;
	margin: 20px 0;
}

.content-item h3 {
	font-weight: 400;
	font-size: 20px;
	color: #555555;
	margin: 10px 0 15px;
	padding: 0;
}

.content-headline {
	height: 1px;
	text-align: center;
	margin: 20px 0 70px;
}

.content-headline h2 {
	background-color: #FFFFFF;
	display: inline-block;
	margin: -20px auto 0;
	padding: 0 20px;
}

.grey .content-headline h2 {
	background-color: #F0F0F0;
}

.content-headline h3 {
	font-size: 14px;
	color: #AAAAAA;
	display: block;
}

.mar-top {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.info_commentaire {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.info_commentaire_button {
	width: 100px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	column-gap: 2px;
}

.media-only-text {
	width: 100%;
}

#comments {
	box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, 0.1);
	background-color: #FFFFFF;
}

#comments form {
	margin-bottom: 30px;
}

#comments .btn {
	margin-top: 7px;
}

.partage-btn {
	width: 15%;
}


#comments form fieldset {
	clear: both;
}

#comments form textarea {
	height: 100px;
}

#comments .media {
	border-top: 1px dashed #DDDDDD;
	padding: 20px 0;
	margin: 0;
}

#comments .media>.pull-left {
	margin-right: 20px;
}

#comments .media img {
	max-width: 100px;
}

#comments .media h4 {
	margin: 0 0 10px;
}

#comments .media h4 span {
	font-size: 14px;
	float: right;
	color: #999999;
}

#comments .media p {
	margin-bottom: 15px;
	text-align: justify;
}

#comments .media-detail {
	margin: 0;
}

#comments .media-detail li {
	color: #AAAAAA;
	font-size: 12px;
	padding-right: 10px;
	font-weight: 600;
}

#comments .media-detail a:hover {
	text-decoration: underline;
}

#comments .media-detail li:last-child {
	padding-right: 0;
}

#comments .media-detail li i {
	color: #666666;
	font-size: 15px;
	margin-right: 10px;
}
</style>