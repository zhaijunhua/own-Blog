<template>
    <div class="add">
        <div>
            <div class="authorName">
                <span class="author">作者/出处</span>
                <el-input v-model="author"></el-input>
            </div>
            
            <div class="chooseCate">
                <el-radio-group v-model="cate">
                    <el-radio :label="1">摘抄</el-radio>
                    <el-radio :label="2">记录</el-radio>
                </el-radio-group>
            </div>
            <div class="content">
                <span>内容：</span>
                <el-input type="textarea" v-model="sentenceContent" placeholder="请输入内容"></el-input>
            </div>
            <el-button @click="insertSentence">添加</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addsentence',
    data() {
        return {
            sentenceContent: '',
            author: '',
            cate: '',
            translate: ''
        };
    },
    methods: {
        insertSentence() {
            if (this.sentenceContent === '' || this.author === '') {
                alert("句子内容内容不能为空");
            } else {
                console.log(this.cate);
                this.$axios.post('/api/sentences/addSentence', {
                    sentenceContent: this.sentenceContent,
                    author: this.author,
                    category: this.cate,
                    addTime: new Date()
                })
                .then((response) => {
                    let res = response.data;
                    if (res.status === '1') {
                       console.log('success');
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                });    
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.add{
    width: 70%;
    margin: 0 auto;
    position: relative;
    vertical-align: middle;
    top: 50px;
    .authorName {
        display: flex;
        .author{
            width: 100px;
            font-size: 16px;

        }
        .el-input{
            flex: 1;
        }
    }
    .chooseCate{
        margin-top: 10px;
    }
    .content{
        margin-top: 20px;
        font-size: 16px;
    }
    .el-button{
        margin-top: 20px;
    }
}
</style>

