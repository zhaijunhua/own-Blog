<template>
    <div class="manageblog">
        <el-table
            :data="leaveData"
            style="width: 100%" max-height="680px">
            <el-table-column
            label="日期"
            prop="date"
            >
                <template slot-scope="scope">
                    <p>{{scope.row.date | formatDate}}</p>
                </template>
            </el-table-column>
            <el-table-column
            label="留言人"
            prop="leaveperson">
            </el-table-column>
            <el-table-column label="留言内容" prop="leavecontent">
            </el-table-column>
            <el-table-column
            align="right">
            <template slot-scope="scope">
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
    inject: ['reload'], // 刷新页面
    name: 'manageBlog',
    data() {
        return {
            leaveData: [],
            search: ''
        };
    },
    mounted() {
        this.leavemessage();
    },
    methods: {
        leavemessage(){
           this.$axios.get('/api/messageboard/getleaveMessage')
           .then((response) => {
                if(response.data.status == '1') {
                    this.leaveData = response.data.result.list;
                    console.log(JSON.stringify(response.data.result.list));
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log('id' + this.leaveData[index]._id);
            this.$axios.post('/api/messageboard/deleteLeave', {
                id: this.leaveData[index]._id
            })
            .then((response) => {
                if(response.data.status == '10001') {
                    console.log('success' + JSON.stringify(response.data));
                    this.reload();
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            })
        }
    },
    filters: {
        formatDate(time) {
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
