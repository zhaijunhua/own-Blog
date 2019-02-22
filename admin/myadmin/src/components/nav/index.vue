<template>
        <div class="navbar">
            <el-row class="tac">
                <el-col :span="20">
                    <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router>
                        <el-menu-item index="/message">
                            <i class="el-icon-menu"></i>
                            首页
                        </el-menu-item>
                        <el-menu-item index="/writeblog">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">写博客</span>
                        </el-menu-item>
                        <el-menu-item index="/addsentence">
                            <i class="el-icon-edit"></i>
                            <span slot="title">写句子</span>
                        </el-menu-item>
                        <el-menu-item index="/editmyself">
                            <i class="el-icon-setting"></i>
                            <span slot="title">修改资料</span>
                        </el-menu-item>
                        <el-menu-item index="/manageBlog">
                            <i class="el-icon-edit-outline"></i>
                            管理博客
                        </el-menu-item>
                        <el-menu-item index="/manageleave">
                             <i class="el-icon-edit-outline"></i>
                             管理留言
                        </el-menu-item>
                        <el-menu-item index="/manageSentence">
                            <i class="el-icon-edit-outline"></i>
                            句子管理
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-remove-outline"></i>
                            <span slot="title" @click="logout">注销</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
</template>
<script>
export default {
    name: 'Navlist',
    data() {
        return {
        };
    },
    mounted() {

    },
    computed: {
        activeIndex() {
            return this.$route.path.replace('/', '')
        }
    },
    methods: {
        logout() {
            this.$axios.post('api/users/logout')
                .then((response) => {
                    let res = response.data;
                    if (res.status === '0') {
                        this.nickName = ''
                         this.$router.push({path: '/'});
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                })
        },
    }

};
</script>
<style lang="scss" scoped>
.navbar{
    width: 100%;
    height: 100%;
    background-color: #545c64;
    .el-row{
        width: 13%;
        border: none;
        position: fixed;
        height:100%;
        background-color: #545c64;
        .el-col{
        border: none;
        width: 100%;
            .el-menu{
                border-right: none;
            }
        }
    }
}
</style>

