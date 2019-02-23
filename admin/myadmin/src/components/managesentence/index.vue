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
                <el-dialog
                    title="具体内容"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>

                    作者：<el-input v-model="editData.author"></el-input>
                    内容<el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="editData.sentenceContent">
                    </el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateData">确 定</el-button>
                    </span>
                </el-dialog>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {formatDate} from '../../util/date.js';
export default {
    inject: ['reload'],
    name: 'manageSentence',
    data() {
        return {
            sentenceData: [],
            search: '',
            centerDialogVisible: false,
            editData: []
        };
    },
    mounted() {
        this.sentenceMessage('0');

    },
    methods: {
        sentenceMessage(cate){
        console.log(cate);
           this.$axios.get('/api/sentences' + '?cate=' + cate)
           .then((response) => {
                if(response.data.status == '1') {
                    this.sentenceData = response.data.result.list;
                   // console.log(JSON.stringify(this.sentenceData));
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            });
        },
        handleEdit(index, row) {
            console.log('id'+ this.sentenceData[index]._id);
            let id = this.sentenceData[index]._id;
            this.centerDialogVisible = true;
            let url = 'api/sentences/curSntence' + '?id=' + id;
            this.$axios.get(url)
                .then((response) => {
                    if(response.data.status = 1) {
                        this.editData = response.data.result.list[0];
                        console.log(this.editData);
                    }
                })
                .catch((error) => {
                    console.log(error + 'error');
                });
        },
        handleDelete(index, row) {
            this.$axios.post('/api/sentences/deleteSentence', {
                id: this.sentenceData[index]._id
            })
            .then((response) => {
                if(response.data.status == '10001') {
                    this.reload();
                    console.log('success' + JSON.stringify(response.data));
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            })
        },
        updateData() {
            this.centerDialogVisible = false;
            let param = {
                sentenceId: this.editData._id,
                sentenceContent: this.editData.sentenceContent,
                translate: this.editData.translate,
                author: this.editData.author,
                category: this.editData.category
            };

            this.$axios.post('/api/sentences/editSentence',{
                sentenceId: this.editData._id,
                sentenceContent: this.editData.sentenceContent,
                translate: this.editData.translate,
                author: this.editData.author,
                category: this.editData.category
            })
                .then((response) => {
                    if(response.data.status == '10001') {
                        console.log('success');
                        this.reload();
                    }
                })
                .catch((error) => {

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
