//https://public-api.wordpress.com/wp/v2/sites/175798736/posts
import { _CONFIG } from './modules/config.js'

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    posts: {},
    showingCategory: "",
    categories: [],
    imvisible: false,
    imurl: "https://theworldofnoth.files.wordpress.com/2020/06/default_men.png",
    imtext: "Placeholder text",
  }, 
  mounted(){
    console.log("config loaded...")
    this.fetchInitialPosts()
    this.fetchCategories()
  },
  computed : {
    currentPosts : function(){
      return this.posts[this.showingCategory]
    }
  },
  methods: {
      async fetchInitialPosts(){
        // GET request using fetch with async/await
        const response = await fetch(_CONFIG.apiBaseURL+"/posts?category=dragones")
        const data = await response.json()
        this.posts["dragones"] = data.posts
        this.showingCategory = "dragones"
        console.log(`Found ${data.found} posts`)
        //console.log(this.posts)
      },
      async fetchCategories(){
        // GET request using fetch with async/await
        const response = await fetch(_CONFIG.apiBaseURL+"/categories")
        const data = await response.json()
        let vmCategoryList = this.categories
        data.categories.map(function(category){
          let {ID, name, post_count, parent, slug} = category
          vmCategoryList.push({ID, name, post_count, parent, slug}) 
        })
        console.log(`Found ${data.found} categories`)
        console.log(this.categories)
      },
      async reloadCharacters(slug){
        // GET request using fetch with async/await
        if(!this.posts[slug]){
          const response = await fetch(_CONFIG.apiBaseURL+"/posts?category="+slug)
          const data = await response.json()
          this.posts[slug] = data.posts
        }
        this.showingCategory = slug
        console.log(`Found ${data.found} posts for ${slug} category`)
        //console.log(this.posts)
      },
      showModal(post){
          this.imurl = post.featured_image
          this.imtext = post.content
          this.imvisible = true
      }
  }
})