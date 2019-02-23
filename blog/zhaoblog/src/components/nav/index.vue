<template>
    <div id="top-bar" class="topbar">
        <div class="top-nav">
            <el-menu 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                text-color="#fff"
                active-text-color="#ffd04b"
                router>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/blogarticle">分类查找</el-menu-item>
                <el-menu-item index="/sentence">句子</el-menu-item>
                <el-menu-item index="/mesboard">留言板</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    name: 'navbar',
    data() {
      return {
      };
    },
    computed: {
        activeIndex() {
            return this.$route.path.replace('/', '')
        }
    },
    mounted() {
        // window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        // 滚轮事件监听
        // handleScroll() {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //     if (scrollTop > 200) {
        //         this.isFixed = true;
        //     } else {
        //         this.isFixed = false;
        //     }
        // }
    }
};
</script>
<style lang="scss" scoped>
#top-bar{
    margin: 0 auto;
    padding: 0;
    background:#203141 no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 50px;;
    top: 0;
    position: fixed;
    z-index: 1;
    .top-nav{
        position: relative;
        top: 0;
        background-color: #203141;
        .el-menu{
            position: relative;
            top: 0;
            background-color:#203141;
            border-bottom: none;
            font-size: 1.5rem;
            .el-menu-item{
                font-size: 20px;
            }
            .el-menu-item:focus{
                background-color: #203141;
                border-bottom-color: none;
            }
            .el-menu-item.is-active {
                background-color: none !important;
                border-bottom-color: none;
            }
        }
        .el-menu--horizontal>.el-menu-item:hover{
            border-bottom: none;
            background-color: #203141;
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
    // 将顶部导航栏悬浮
    .fixed{
        position: fixed;
        z-index: 1000;
    }
}
</style>
