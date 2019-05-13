export const state = () => ({
  idToken: null,
  username: null,
  userId: null,
  isLoggedIn: null,
  posts: []
})

export const mutations = {
  authUser(state, userData) {
    state.idToken = userData.idToken
    state.username = userData.username
    state.userId = userData.userId
    state.isLoggedIn = userData.isLoggedIn
  },
  loadPosts(state, posts) {
    state.posts = posts
  }
}
