<template>
  <section class="section">
    <div class="columns is-mobile">
      <div
        v-for="post in posts"
        :key="post.id"
        :post="posts"
        class="card"
      >
        <p class="card-header-title has-text-grey">
          {{ post.username }}
        </p>
        <img :src="post.imageURL">
        <div class="block">
          <b-icon
            icon="account"
            size="is-medium"
          />
          <b-icon
            icon="home"
            size="is-medium"
          />
          <b-icon
            icon="view-dashboard"
            size="is-medium"
          />
          <h4>{{ post.title }}</h4>
          <ul v-for="comment in comments" :key="comment.id">
            <li><strong>{{ comment.username }} </strong> {{ comment.content }}</li>
          </ul>
          <b-field>
            <b-input v-model="newComment" placeholder="Add a comment..." />
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      newComment: '',
      comments: [
        { id: 1, username: 'dufus69', content: 'you suck man! im jealous ' },
        { id: 2, username: 'assdufus69', content: 'nice car dude! ' },
        { id: 3, username: 'dumbofus69', content: 'HEY I MISS YOU' }
      ]
    }
  },
  mounted() {
    this.$axios.get('http://localhost:5000/auth/getPosts').then((posts) => {
      this.posts = posts.data
      console.log(posts.data)
    })
  }
}
</script>
