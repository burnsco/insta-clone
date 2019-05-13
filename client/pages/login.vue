<template>
  <section>
    <form @submit.prevent="onSubmit">
      <b-field
        label="Username"
        type="is-success"
        message="This username is available"
      >
        <b-input v-model="user.username" value="johnsilver" maxlength="30" />
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="user.password"
          type="password"
          value="iwantmytreasure"
          password-reveal
        />
      </b-field>
      <div class="buttons">
        <b-button size="is-large" @click="onSubmit">
          Login
        </b-button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('http://localhost:5000/auth/login', this.user)
        .then((res) => {
          console.log(res)
          this.$store.commit('authUser', {
            idToken: res.data,
            username: this.user.username,
            userId: localStorage.userId,
            isLoggedIn: true
          })
        }).catch((err) => {
          console.log(err)
        })
      this.$router.push('/')
    }
  }
}
</script>
