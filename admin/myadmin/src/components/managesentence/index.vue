<template>
    <div class="managesentence">
        <el-table
            :data="sentenceData"
            style="width: 100%" max-height="680px">
            <el-table-column
            label="作者"
            prop="author"
            >
            </el-table-column>
            <el-table-column
            label="内容"
            prop="sentenceContent">
            </el-table-column>
            <el-table-column label="翻译" prop="translate">
            </el-table-column>
            <el-table-column
            align="right">
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
    name: 'manageSentence',
    data() {
        return {
            sentenceData: [],
            search: ''
        };
    },
    mounted() {
        this.sentenceMessage();
    },
    methods: {
        sentenceMessage(){
           this.$axios.get('/api/sentences')
           .then((response) => {
                if(response.data.status == '1') {
                    this.sentenceData = response.data.result.list;
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
            console.log('id' + this.sentenceData[index]._id);
            this.$axios.post('/api/sentences/deleteSentence', {
                id: this.sentenceData[index]._id
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
.managesentence{
    width: 90%;
    position: relative;
    margin: 20px auto;
}
</style>
