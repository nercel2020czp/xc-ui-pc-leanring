<template>
  <div>
        <el-row class="container" style="width: 470px">

          <div id="body">
            <div class="g-center login-page" @keyup.enter="login">
              <el-tabs v-model="activeName" >
                <el-tab-pane label="用户登陆" name="login">
              <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="loginForm.username" auto-complete="off" placeholder="陈同学/陈老师"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary"  @click.native="login" :loading="editLoading">登陆</el-button>
                  <el-button type="primary"  @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
                </el-tab-pane>
                <el-tab-pane label="用户注册" name="register">
                  建设中..
                </el-tab-pane>
              </el-tabs>
            </div>


        </div>

        </el-row>


  </div>
</template>
<script>

import utilApi from '../../common/utils';
import * as loginApi from '../api/login';

import Vue from 'vue'
export default {
	components:{

	},
  data() {
    return {
      LoginFormVisible:false,
      activeName: 'login',
      editLoading: false,
      loginForm: {
        username:'',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      user:{
        userid:'',
        username: '',
        userimg: ''
      },
      logined:false,
      returnUrl:''
    }
  },
  methods: {
    login: function () {

        this.$refs.loginForm.validate((valid) => {
          if (valid) {
              this.editLoading = true;
              let para = Object.assign({}, this.loginForm);
              // alert(JSON.stringify(para));
              loginApi.login(para).then((res) => {
                this.editLoading = false;
                if(res.success){
                  // alert("登陆成功");
                  // alert(res.token);
                  // alert(JSON.stringify(res));

                  this.$message('登陆成功');
                  //刷新 当前页面
                  console.log(this.returnUrl);
                  let uid = res.token;
                  //将cookie存进去
                  utilApi.setCookie1("uid",uid,0.5);

                  if(this.returnUrl!='undefined' && this.returnUrl!=''
                                                   && !this.returnUrl.includes("/userlogout")
                                                   && !this.returnUrl.includes("/userlogin")){
                    // window.location = "http://ucenter.xuecheng.com/#/login?returnUrl="+ Base64.encode(window.location)
                    //登陆成功后将服务端的uid返回来
                    // alert(this.returnUrl + '?uid=' + res.token);
                    // alert("uid="+res.token);

                    window.location.href = this.returnUrl + '?uid=' + Base64.encode(uid);

                    // this.$router.push({path: this.returnUrl, query: {uid: res.token}})
                  }else{
                    //跳转到首页
                    window.location.href = 'http://www.xuecheng.com/'
                  }

                }else{
                    if(res.message){
                      this.$message.error(res.message);
                    }else{
                      this.$message.error('登陆失败');
                    }
                }
              },
                (res) => {
                  this.editLoading = false;
                });


          }
        });

    },

    resetForm:function(formName){
      this.$refs[formName].resetFields();
    },
    refresh_user:function(){
      let activeUser= utilApi.getActiveUser();

      if(activeUser){
        this.logined = true
        this.user = activeUser;
        //console.log(this.user.username)
      }else{
        this.showlogin()
      }
    },
    showlogin:function(){
       this.LoginFormVisible = true;
    }
  },
  created() {
    // var this_ = this;
    //bus.$on('childa-message', this.showlogin(this_));


  },
  mounted() {

    this.refresh_user()
//    Vue.prototype.loginwin = this;
    if( this.$route.query &&  this.$route.query.returnUrl){

      let returnUrl =  Base64.decode(this.$route.query.returnUrl);
      if(returnUrl.indexOf("124.70.223.230")>-1 || returnUrl.indexOf("www.xuecheng.com")>-1){
        this.loginForm.username = "陈同学";
      }
      if(returnUrl.indexOf("121.199.78.181")>-1 || returnUrl.indexOf("teacher.xuecheng.com")>-1){
        this.loginForm.username = "陈老师";
      }

      //alert(returnUrl)
      this.returnUrl = returnUrl;
      //alert(this.returnUrl)
    }
    /*bus.$on('childa-message', function(data) {
      console.log("aaaaaaaaaaaaa"+data)
      alert(this.LoginFormVisible)
      this.LoginFormVisible = true
      alert(this.LoginFormVisible)
    });*/



  }
}
</script>
<style scoped>
  .login-form{width: 400px;margin:5% auto 0;}
</style>
