<template>
    <div class="blogs">
        <div class="Blog-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="content-card" v-for="items in blog" :key="items.blogId">
                <p class="blogTitle">{{items.blogTitle}}</p>
                <span class="upTime">{{items.blogTime}}</span>
                <p>{{items.blogContent}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'blog',
    data() {
        return {
            blog: [],
            page: 0,
            busy: false
        };
    },
    mounted() {
    },
    methods: {
        getMessage(nice) {
            let params = {
                page: this.page,
                pageSize: 3,
                sort: 1
            };
            let url = 'api/blogs';
           if (params) {
                 let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&');
                } else {
                    url += '&' + paramsArray.join('&');
                }
            }
            this.$axios.get(url)
                .then((res) => {
                    console.log(res.data.result);
                    if(res.data.status === '1') {
                        this.blog = this.blog.concat(res.data.result.list)
                        console.log(this.blog);
                    }
                    if (res.data.result.count === 0) {
                        this.busy = true
                    } else {
                        this.busy = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        loadMore() {
            this.busy = false;
            setTimeout(() => {
                this.page++;
                this.getMessage(true);
            },500)
        }
    }
};
</script>
<style lang="scss" scoped>
.blogs{
    width: 90%;
    margin: 0 auto;
    .content-card{
        margin: 20px auto;
        background: rgba($color: #203141, $alpha: 0.7);
        color: #f2f2f2;
        border-radius: 10px;
        height: 150px;
        .blogTitle{
            width: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 36px;
        }
        .upTime{
            width: 20%;
            margin: 5px auto;
            font-size: 20px;
            line-height: 30px;
        }
        
    }
}
</style>
