<template>
    <div class="sign-in">
        <div class="enter">
            <h1>欢迎登录管理系统</h1>
            <el-form :model="loginForm" :rules="rule2" ref="loginForm">
                <el-form-item  prop="userName" class="item">
                    <span>账号</span>
                    <el-input v-model="loginForm.userName"></el-input>
                </el-form-item>
               <el-form-item prop="pass">
                   <span>密码</span>
                    <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '../../util/back';
export default {
    name: 'login',
    data() {
        var checkUser = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('账号不能为空'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                pass: '',
                checkPass: '',
                userName: ''
            },
            errorTip: false,
            rule2: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                user: [{ validator: checkUser, trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.$axios.post('api/users/login',{
            userName: this.loginForm.userName,
            userPwd: this.loginForm.pass
        }).then((res) => {
            let response = res.data;
            if(response.status == '0'){
                this.errorTip = false;
                this.$router.push({path: 'portal'});
            } else {
                this.errorTip = true;
            }
        })
      },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style lang="scss" scoped>
.sign-in{
    position: relative;
    width: 40%;
    top: 24%;
    margin: 0 auto;
    color: #fff;
    background-color: #000;
    border-radius: 10px;
    background:rgba(0, 0, 0, 0.5);
    filter:Alpha(opacity=60); // ie兼容
    .enter{
        position: relative;
        width: 100%;
        text-align:center;
        vertical-align: center;
        h1{
            top: 20px;
            color: #ffffff;
            line-height: 60px;
        }
        .el-form{
            margin: 0 auto;
            span{
                color: #ffffff;
                font-size: 16px;
            }
        }
        .el-input{
            position: relative;
            width: 80%;
        }
        .el-button{
            margin-bottom: 30px;
        }
    }
}
</style>

