<template>
	<main>
		<section class="home-blog bg-sand">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="media blog-media">
							<a :href="postData.idURL">
								<img class="d-flex" :src="postData.imageURL" alt="postData image"></a>
							<div class="media-body">
								<a :href="postData.idURL">
									<h5 class="mt-0">{{ postData.title }}</h5>
								</a>
								<div class="content_post">{{ postData.content }}</div>
								<ul>
									<li>publié par <b> {{ postData.firstname + " " + postData.lastname }}</b></li>
									<li class="text-right">{{ postData.count_commentaires ? postData.count_commentaires
											: 0
									}} Commentaires</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="content-item" id="comments">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="panel">
							<div class="panel-body">
								<textarea class="form-control" rows="2" placeholder="Vous pouvez écrire votre commentaire ici"></textarea>
								<div class="mar-top clearfix">
									<button class="btn btn-sm btn-primary pull-right" type="submit"><i
											class="fa fa-pencil fa-fw"></i> Partager</button>
								</div>
							</div>
						</div>

							<!-- COMMENT - START -->
							<div class="media">
								<div class="media-body">
									<h4 class="media-heading">John Doe</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
										amet,
										consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
										elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
										sit
										amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
										adipiscing elit.</p>
									<div class="info_commentaire">
									<ul class="list-unstyled list-inline media-detail pull-left">
										<li><i class="fa fa-calendar"></i>27/02/2014</li>
									</ul>
									<ul class="list-unstyled list-inline media-detail pull-right">
										<li class=""><a href="">12 Like</a></li>
										<li class=""><a href="">2 Dislike</a></li>
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

#comments {
	box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, 0.1);
	background-color: #FFFFFF;
}

#comments form {
	margin-bottom: 30px;
}

#comments .btn {
	margin-top: 7px;
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