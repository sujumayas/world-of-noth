//https://public-api.wordpress.com/wp/v2/sites/175798736/posts


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    posts: {},
    imvisible: false,
    imurl: "https://theworldofnoth.files.wordpress.com/2020/06/default_men.png",
    imtext: "Placeholder text",
  }, 
  mounted(){
    this.fetchPosts()
  },
  methods: {
      async fetchPosts(){
        // GET request using fetch with async/await
        const response = await fetch("https://public-api.wordpress.com/wp/v2/sites/175798736/posts?categories=395261")
        const data = await response.json()
        this.posts = data
      },
      showModal(post){
          this.imurl = post.jetpack_featured_media_url
          this.imtext = post.content["rendered"]
          this.imvisible = true
      }
  }
})