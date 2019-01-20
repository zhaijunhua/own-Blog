<template>
    <div class="blogs">
        <div class="Blog-content" 
            v-infinite-scroll="loadMore" 
            infinite-scroll-disabled="busy" 
            infinite-scroll-distance="10">
            <div class="content-card" v-for="(items,index) in blog" :key="items.blogId">
                <p class="blogTitle">{{items.blogTitle}}</p>
                <span class="upTime">{{items.blogTime}}</span>
                <p class="des">{{items.introduce}}</p>
                <el-button @click="viewdetail(index)">查看详情</el-button>
            </div>
            <div class="more" v-show="isMore">加载更多...</div>
            <div class="more" v-show="noMore"></div>
        </div>
    </div>
</template>
<script>
import formatDate from '../../util/date.js'
export default {
    name: 'blog',
    props: {
        value: String,
        model: {
            type: [String, Object]
        }
    },
    data() {
        return {
            blog: [],
            page: 0,
            busy: false,
            more: {
                moreContent: '更多内容',
                noMoreContent: '已经是全部内容'
            },
            isMore: false,
            noMore: false,
            context: '# 你好'
        };
    },
    computed: {
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
            let url = 'api/blogs/intro';
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
                    if(res.data.status === '1') {
                        this.blog = this.blog.concat(res.data.result.list);
                        console.log(this.blog.blogContent);
                        console.log(this.blog);
                        console.log(res.data.result.list.length);
                        if (res.data.result.list.length < 3) {
                            this.busy = true
                            console.log('结束加载');
                            this.isMore = false;
                            this.noMore = true;
                        } else {
                            this.busy = false;
                            this.isMore = true;
                            console.log('加载');                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        loadMore() {
            this.busy = true;
            setTimeout(() => {
                this.page++;
                this.getMessage(true);
            },1000)
        },
        viewdetail(index) {
            let blogId = this.blog[index]._id;
            console.log(this.blog[index]._id);
            this.$router.push({name: 'blogdetail', params:{type: 'add', id: blogId}});
        }
    }
    // filters: {
    //     formatDate(time) {
    //         var date =new Date(time);
    //         return formatDate(date, 'yyyy年MM月dd日');
    //     }
    // },

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
        .des{
            word-wrap: break-word; /*英文强制换行*/
        }
        
    }
    .more{
        font-size: 1.6em;
        text-align: center;
        color: #203141;
    }
}
</style>
