<template>
  <div class="column">
    <div class="card">
      <p class="card-header-title has-text-grey">
        {{ username }}
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
        <h4>{{ title }}</h4>
        <ul v-for="comment in comments" :key="comment.id">
          <li><strong>{{ comment.username }} </strong> {{ comment.content }}</li>
        </ul>
        <b-field>
          <b-input v-model="form.content" placeholder="Add a comment..." />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      form: {
        id: 0,
        content: '',
        username: '',
        date: ''
      },
      comments: [
        { id: 1, username: 'dufus69', content: 'you suck man! im jealous ' },
        { id: 2, username: 'assdufus69', content: 'nice car dude! ' },
        { id: 3, username: 'dumbofus69', content: 'HEY I MISS YOU' }
      ]
    }
  }
}
</script>
