<template>
    <div class="message-board">
        <div class="messageBox">
            <el-form :model="form">
                <el-form-item>
                    <span>昵称</span>
                    <el-input placeholder="留个名字吧^v^" v-model="form.yourName">昵称</el-input>
                </el-form-item>
                <el-form-item>
                    <span>留言内容</span>
                    <el-input
                        v-model="form.leaveMessage"
                        label="留言内容"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6}"
                        placeholder="在这里留个言吧^v^"
                        >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="saveMessage" class="save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="leavecontent">
            <div class="leaveList" v-for="items in message" :key="items._id">
                <span>{{items.leaveperson}}</span>&nbsp;&nbsp;&nbsp;说：
                   <p>{{items.leavecontent}}</p>
                   <hr/>
            </div>
        </div>Z
    </div>
</template>
<script>
export default {
    name: 'mesboard',
    inject: ['reload'],
    data() {
        return {
            form: {
                yourName:'',
                leaveMessage: ''
            },
            page: 1,
            message:[]
        };
    },
    mounted() {
        this.returnMessage();
    },
    methods: {
        saveMessage() {
            if (this.form.leaveMessage === '') {
                alert();
            }
            this.$axios.post('api/messageboard/write', {
                leavecontent: this.form.leaveMessage,
                leaveperson: this.form.yourName,
                date: new Date()
            })
            .then((response) => {
                let res = response.data;
                if (res.status === '1') {
                    console.log('留言成功');
                    this.form.leaveMessage = '';
                    this.form.yourName = '';
                     this.reload();
                }
            })
            .catch((error) => {
                console.log(error + 'error');
            });    
        },
        returnMessage() {
            // let params = {
            //     page: this.page,
            //     pageSize: 5,
            // };
            let url = 'api/messageboard/getleaveMessage';
        //    if (params) {
        //          let paramsArray = [];
        //         Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        //         if (url.search(/\?/) === -1) {
        //             url += '?' + paramsArray.join('&');
        //         } else {
        //             url += '&' + paramsArray.join('&');
        //         }
        //     }
            this.$axios.get(url)
                .then((res) => {
                    if(res.data.status === '1') {
                        this.message = res.data.result.list;
                        console.log(res.data.result.list);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.message-board{
    .messageBox {
        background: rgba($color: #203141, $alpha: 0.7);
        border-radius: 20px;
        .el-form{
            width: 60%;
            margin: 0 auto;
            .el-form-item {
                .el-button {
                    margin: 0 auto;
                    margin-bottom: 20px;
                }
                span{
                    color: #f2f2f2;
                    font-size: 20px;
                }
            }
        }
    }
    .leavecontent{
        background: rgba($color: #203141, $alpha: 0.7);  
        border-radius: 10px;      
        .leaveList{
        margin-top: 2px;
        border-radius: 5px;
        span{
            color: #f2f2f2;
            font-size: 18px;
            width: 150px;
        }
        P{
            margin-left: 100px;
            line-height: 20px;
            font-size: 16px;
            color: #f2f2f2;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
    }
    }
}
</style>


