<template>
    <div class="portal">   
        <div class="leftbar">
            <Navlist/>
        </div>
        <div class="container">
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import Navlist from '../nav/index.vue';
export default {
    name: 'Portal',
    components: {
        Navlist
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.portal{
    height: 100%;
    display: flex;
    flex-flow: row;
    .leftbar{
        width: 175px;
        background-color: #545c64;
    }
    .container{
        flex: 1;
        margin-left: 0px;
        background: #ffffff;
        .content{
            width: 90%;
            margin: 0 auto;
        }
    }
}
</style>

