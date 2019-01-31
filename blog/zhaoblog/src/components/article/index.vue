<template>
    <div class="classify">
        <div>
            <el-button @click="getclassify('1')">html</el-button>
            <el-button @click="getclassify('2')">css</el-button>
            <el-button @click="getclassify('3')">js</el-button>
            <el-button @click="getclassify('4')">vue</el-button>
            <el-button @click="getclassify('5')">react</el-button>
            <el-button @click="getclassify('6')">node</el-button>
            <el-button @click="getclassify('7')">其他</el-button>
        </div>
        <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="searchContent"
            class="search"
            @click="search">
        </el-input>
        <el-button @click="search">搜索</el-button>
        <div class="result-content">
            <div class="content-card" v-for="(items,index) in result" :key="items._id">
                <p class="blogTitle">{{items.blogTitle}}</p>
                <p class="des">{{items.introduce}}</p>
                <span class="upTime">{{items.blogTime}}</span>
                <el-button type="text" class="lookDetail" @click="viewdetail(index)">查看详情<i class="el-icon-more"></i></el-button>
            </div>
            <!-- <div class="more" v-show="isMore">加载更多...</div>
            <div class="more" v-show="noMore"></div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'blogarticle',
    data() {
        return {
            result: [],
            searchContent: ''
        };
    },
    methods: {
        getclassify(category) {
            let url = '/api/blogs/classify' + '?' + 'category=' + category
            this.$axios.get(url)
                .then((response) => {
                    if(response.data.status == '10001'){
                        this.result = response.data.result.list;
                        console.log(this.result);
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                });
        },
        search() {
            console.log(this.searchContent);
            this.$axios.post('/api/blogs/search',{
                searchContent: this.searchContent 
            })
            .then((response) => {
                this.result = response.data.result.list;
                console.log('success' + JSON.stringify(response.data.result.list));
            })
            .catch((error) => {
                console.log(error + 'error');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.classify {
    .result-content {
        .content-card{
            margin: 20px auto;
            background: rgba($color: #203141, $alpha: 0.7);
            color: #f2f2f2;
            border-radius: 10px;
            height: 150px;
            width: 90%;
            .blogTitle{
                width: 100%;
                font-size: 20px;
                text-align: center;
                line-height: 36px;
            }
            .upTime{
                width: 20%;
                margin: 5px auto;
                font-size: 14px;
                line-height: 30px;
                position: relative;
                top: 30px;
                left: 40px;
            }
            .des{
                word-wrap: break-word; /*英文强制换行*/
                font-size: 16px;
                position: relative;
                left: 30px;
                line-height: 22px;
            }
            .lookDetail{
                float: right;
                position: relative;
                color: #f2f2f2;
                top: 30px;
                right: 50px;
            }
        }
    }
}
</style>

