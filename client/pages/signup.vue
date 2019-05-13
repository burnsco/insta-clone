<template>
  <section class="main-content columns">
    <aside class="column is-8 is-vcentered">
      <form @submit.prevent="onSubmit">
        <b-field
          label="Email"
          message="This email is invalid"
        >
          <b-input
            v-model="user.email"
            type="email"
            value="john@"
            maxlength="30"
          />
        </b-field>

        <b-field
          label="Username"
          type="is-success"
          message="This username is available"
        >
          <b-input v-model="user.username" maxlength="30" />
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="user.password"
            type="password"
            value="iwantmytreasure"
            password-reveal
          />
        </b-field>
        <b-field label="Password">
          <b-input
            v-model="user.confirmPassword"
            type="confirmPassword"
            value="iwantmytreasure"
            password-reveal
          />
        </b-field>
        <b-button size="is-large" type="submit" @click="onSubmit">
          Submit
        </b-button>
      </form>
    </aside>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('http://localhost:5000/auth/signup', this.user).then((res) => {
        console.log(res)
        localStorage.userId = res.data._id
      }).catch(err => console.log(err))
      this.$router.push('/login')
    }
  }
}
</script>
