<template>
    <div class="editpersonal">
        <h2>修改我的个人简介</h2>
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textarea"
                    autosize>
                </el-input>
                <el-button>保存修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'editmyself'
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
