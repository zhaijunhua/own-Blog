<template>
    <div class="manageblog">
        <el-table
            :data="blogData"
            style="width: 100%" max-height="680px">
            <el-table-column
            label="日期"
            prop="blogTime"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.blogTime | formatDate}}</p>
                </template>
            </el-table-column>
            <el-table-column
            label="标题">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>描述：{{ scope.row.intro }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.blogTitle }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="类别" prop="category">
            </el-table-column>
            <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {formatDate} from '../../util/date.js';
export default {
    name: 'manageBlog',
    data() {
        return {
            blogData: [],
            search: ''
        };
    },
    mounted() {
        this.Blog();
    },
    methods: {
        Blog(){
           this.$axios.get('/api/blogs/intro')
           .then((response) => {
                if(response.data.status == '1') {
                    this.blogData = response.data.result.list;
                    console.log(JSON.stringify(response.data.result.list));
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
            let blogId = this.blogData[index]._id
            this.$router.push({name: 'editblog', params:{type: 'add', id: blogId}});
            console.log(blogId);
        },
        handleDelete(index, row) {
            console.log('id' + this.blogData[index]._id);
            this.$axios.post('/api/blogs/deleteBlog', {
                id: this.blogData[index]._id
            })
            .then((response) => {
                if(response.data.status == '10001') {
                    console.log('success' + JSON.stringify(response.data));
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            })
        }
    },
    filters: {
        formatDate (time) {
            let date =new Date(time);
            return formatDate(date, 'yyyy年MM月dd日');
        }
    }
};
</script>
<style lang="scss" scoped>
.manageblog{
    width: 90%;
    position: relative;
    margin: 20px auto;
}
</style>
