<template>
    <div id="topBar" class="topBar">
        <div class="topNav">
            <el-menu 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
                router>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/article">我的文章</el-menu-item>
                <el-menu-item index="/sentence">句子</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    name: 'topBar',
    data() {
      return {
      };
    },
    computed: {
        activeIndex() {
            return this.$route.path.replace('/', '')
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
#topBar{
    margin: 0 auto;
    padding: 0;
    background:#000 url('../../resource/image/images/bird2.png') no-repeat;
    background-size: 100%;
    width: 100%;
    height: 50%;
    top: 0;
    .topNav{
        .el-menu{
            background-color:rgba(0,0,0,0);
            border-bottom: none;
            font-size: 1.5rem;
            .el-menu-item{
                font-size: 20px;
            }
            .el-menu-item:focus{
                background-color: rgba(0,0,0,0);
                border-bottom-color: none;
            }
            .el-menu-item.is-active {
                background-color: none !important;
                border-bottom-color: none;
            }
        }
        .el-menu--horizontal>.el-menu-item:hover{
            border-bottom: none;
            background-color: rgba(0,0,0,0);
                border-bottom-color: none;

        }
        .el-menu--horizontal>.el-menu-item.is-focus{
            border-bottom: none;
            background-color: rgba(0,0,0,0);
                border-bottom-color: none;

        }
        .el-menu--horizontal>.el-menu-item.is-active{
            border-bottom: none;
            border-bottom-color: none;

        }
    }
}
</style>
