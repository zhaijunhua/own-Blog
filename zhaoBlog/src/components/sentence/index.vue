<template>
    <div class="my-sentence">
        <div>
            <el-button @click="sortSentence('2')">中文</el-button>
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
    },
    methods: {
        getSentence() {
            var param = {
                cate: this.cate

            }
            console.log(param)
            this.$axios.get('api/sentences',{param})
                .then((res) => {
                    console.log(res.data.result);
                    let responseData = res.data.result;
                    this.sentenceMessage = responseData.list;
                    console.log(this.sentenceMessage);            
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        sortSentence(index) {
            this.cate = index;
            this.getSentence();
        }
    }
}
</script>

