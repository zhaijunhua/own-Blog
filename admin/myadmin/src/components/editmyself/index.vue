<template>
    <div class="editpersonal">
        <h2>修改我的个人简介</h2>
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="personalMessage.resume"
                    :autosize="{ minRows: 5, maxRows: 10}">
                </el-input>
                <el-button @click="saveUpdate">保存修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    name: 'editmyself',
    data() {
        return {
            personalMessage: []
        };
    },
    mounted() {
        this.getMessage();
    },
    methods: {
        getMessage() {
            this.$axios('/api/users/personalmessage')
                .then((res) => {
                    console.log(res.data.result[0]);
                    if(res.data.status == '10001') {
                        this.personalMessage = res.data.result[0];
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                })
        },
        saveUpdate() {
            this.$axios.post('/api/users/editMessage', {
                resume: this.personalMessage.resume,
                id: this.personalMessage._id
            })
            .then((res) => {
                if(this.status == '10001') {
                    console.log(success);
                    this.reload();
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .editpersonal{
        width: 80%;
        position: relative;
        h2{
            text-align: center;
            color: #545c64;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        .el-form{
            .el-form-item{
                .el-button{
                    margin: 0 auto;
                }
            }
        }
    }
</style>
