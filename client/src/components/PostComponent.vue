<template>
  <div class="container">
    <h1>Latest posts:</h1>
    <div class="create-post">
      <label for="create-post">Say</label>
      <input type="text" class="create-post" v-model="text">
      <button v-on:click="createPost">Ok</button>
    </div>
    <hr>
    <p class="error" v-if="error"> {{ error }} </p>
    <div class="post-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:click="deletePost(post._id)"
      >
      {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()} | ${post.createdAt.getHours()}:${post.createdAt.getMinutes()}` }}
      <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return{
      posts: [],
      error: '',
      text: '',
    }
  },

  async created() {
    try {
      this.posts = await PostService.getPosts()
    } catch(err) {
      this.error = err.message
    }
  },

  methods: {
    async createPost() {
      await PostService.insertPost(this.text)
      try {
        this.posts = await PostService.getPosts()
      } catch(err) {
        this.error = err.message
      }
    },
    async deletePost(id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    }
  }
}
</script>

<style scoped>
div.container { max-width: 800px; margin: 0 auto; }

p.error { border: 1px solid #ff5b5f; background-color: #ffc5c1; padding: 10px; margin-bottom: 15px; }

div.post { position: relative; border: 1px solid #5bd658; background-color: 3bcffb8; padding: 10px 10px 30px 10px; margin-bottom: 15px; background-color: #5bd658; }

p.text { font-size: 22px; font-weight: 700; margin-bottom: 0; }
</style>
