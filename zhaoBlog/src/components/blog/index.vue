<template>
    <div class="blogs">
        <h2>{{blog.blogTitle}}</h2>
        <p>{{blog.blogContent}}</p>
    </div>
</template>
<style lang="sass" scoped>

</style>
<script>
export default {
    name: 'blog',
    data() {
        return {
            blog: ''
        };
    },
    mounted() {
        this.getMessage();
    },
    methods: {
        getMessage() {
            this.$axios.get('api/blogs')
                .then((res) => {
                    console.log(res.data.status);
                    if(res.data.status === '1') {
                        this.blog = res.data.result.list[0];
                        console.log(this.blog);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>
