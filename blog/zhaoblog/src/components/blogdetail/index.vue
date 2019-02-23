 <template>
     <div class="detail">
        <div v-html="markdown" class="article">
            {{detail.blogContent}}
        </div>
     </div>
 </template>
 <script>
 export default {
     name: 'detail',
     data() {
         return {
             blogId: this.$route.params.id,
             detail: []
         }
     },
     computed: {
         markdown() {
            let content = this.detail.blogContent;
            return this.marked(content || '', {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
        }
     },
     mounted() {
         this.articleDetial();
     },
     methods: {

         articleDetial() {
             this.$axios.get('/api/blogs/mainBlog' + '?id=' +this.blogId)
             .then((response) => {
                 this.detail = response.data.result.list[0];
                 console.log(this.detail);
             })
             .catch((error) => {
                 console.log('error' + error);
             })
         }
     }
 }
 </script>
 <style lang="scss" scoped>
 .detail{
     background-color: 	#EBEBEB;
     border-radius: 5px;
     .article{
         position: relative;
         width: 95%;
         margin: 0 auto;
         padding-top: 10px;
         padding-bottom: 20px;
     }
 }
 </style>
 