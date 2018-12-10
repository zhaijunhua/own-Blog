<template>
    <div class="my-sentence">
        <div v-for="item in sentenceMessage" :key="item.sentenceId">
        <h1>{{item.sentenceContenet}}</h1>
        <h6>{{item.author}}</h6>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sentence',
    data() {
        return {
            sentenceMessage: []
        };
    },
    mounted() {
        this.getSentence();
    },
    methods: {
        getSentence() {
            this.$axios.get('api/sentences')
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

