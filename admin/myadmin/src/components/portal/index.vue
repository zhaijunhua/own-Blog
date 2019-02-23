<template>
    <div class="portal"> 
        <el-container>
            <div class="leftbar">
                <Navlist/>
            </div>
        </el-container>  
        <el-main>
            <div class="container">
                <div class="content">
                    <router-view v-if="isRouterAlive"/>
                </div>
            </div>
        </el-main>
    </div>
</template>
<script>
import Navlist from '../nav/index.vue';
export default {
    name: 'Portal',
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    components: {
        Navlist
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.portal{
    height: 100%;
    display: flex;
    flex-flow: row;
        .el-container{
            max-width: 15%;
            .leftbar{
            width: 175px;
            background-color: #545c64;
        }
    }
    .el-main{
        padding-left: 0px;
        .container{
            flex: 1;
            margin-left: 0px;
            background: #ffffff;
            .content{
                width: 100%;
            }
        }
    }
}
</style>

