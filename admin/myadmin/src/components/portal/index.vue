<template>
    <div class="portal">   
        <div class="leftbar">
            <Navlist/>
        </div>
        <div class="container">
            <router-view/>
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
        width: 185px;
        background-color: #545c64;
    }
    .container{
        flex: 1;
        margin-left: 0px;
        background: #ffffff;
    }
}
</style>

