<template>
    <div class="my-sentence">
        <div>
            <el-button @click="sortSentence('0')">全部</el-button>
            <el-button @click="sortSentence('1')">中文</el-button>
            <el-button @click="sortSentence('2')">英文</el-button>
        </div>
        <div v-for="item in sentenceMessage" :key="item.sentenceId">
            <h2>{{item.sentenceContenet}}</h2>
            <h5>--{{item.author}}</h5>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sentence',
    data() {
        return {
            sentenceMessage: [],
            cate: ''
        };
    },
    mounted() {
        this.sortSentence('0');
    },
    methods: {
        sortSentence(cate) {
            // let param = {
            //     cate: this.cate

            // };
            // console.log(param)
            this.$axios.get('api/sentences' + '?cate=' + cate)
                .then((res) => {
                    console.log(res.data.result);
                    let responseData = res.data.result;
                    this.sentenceMessage = responseData.list;
                    console.log(this.sentenceMessage);            
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>

