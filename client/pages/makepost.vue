<template>
  <section>
    <form @submit.prevent="onSubmit">
      <b-field
        label="Title"
        type="is-success"
        message="This username is available"
      >
        <b-input v-model="title" value="johnsilver" />
      </b-field>
      <b-field
        label="Image Url"
        type="is-success"
        message="This username is available"
      >
        <b-input v-model="imageURL" value="johnsilver" />
      </b-field>

      <div class="buttons">
        <b-button size="is-large" @click="onSubmit">
          Submit
        </b-button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Makepost',
  data() {
    return {
      title: '',
      imageURL: ''
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('http://localhost:5000/auth/posts', {
        userId: localStorage.userId,
        username: 'testusername',
        imageURL: this.imageURL,
        title: this.title,
        comments: []
      })
    }
  }

}
</script>

<style>

</style>
