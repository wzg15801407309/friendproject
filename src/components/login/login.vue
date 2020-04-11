<template>
    <section class="login-wrapper">
        <div class="index-head">
            <div class="index-logo"><img src="/static/image/logo.png"></div>
        </div>
        <h3>账号登录</h3>
        <div class="login-list">
            <ul>
                <li>
                    <label>登录名</label>
                    <input type="text" placeholder="请输入您的账户名称" v-model="username">
                </li>
                <li>
                    <label>密码</label>
                    <input type="password" placeholder="请输入您的账户密码" v-model="password">
                </li>
                <li>
                    <label>验证码</label>
                    <input type="text" class="short-input" placeholder="请输入右侧图片答案" v-model="validateCode">
                    <a href="javascript:;" class="login-code" @click="getCode"><img :src="imgUrl"></a>
                   <router-link to="/phoneLogin" class="phone-login">手机登录</router-link >
                </li>
            </ul>
        </div>
        <div class="login-foot">
            <a href="javascript:;" class="login-btn" @click="toLogin">登陆</a>
            <div class="login-other">
                <p>还没有账号?<span @click="goReg">去注册</span></p>
                <router-link to="/forget">忘记密码</router-link>
            </div>
        </div>
    </section>
</template>
<script>
import { Toast } from 'vant';
import { fail } from 'assert';
export default {
    data(){
        return{
            imgUrl:'',
            password:'',
            username:'',
            validateCode:'',
            rememberMe:false
        }
    }, 
    created(){
        this.getCode()
    },
    methods:{
        goReg(){
            this.$router.push('/register')
        },
        // 获取验证码
        getCode(){
            let number = parseInt(Math.random()*1000)
            this.imgUrl = baseSet.http + '/captcha/captchaImage?type=math&s='+number
        },
        // 登录
        toLogin(){
             if(this.username == ''){
                Toast({message: '请输入登录帐号',duration:1200});
                return;
            }
            if(this.password == ''){
                Toast({message: '请输入账号密码',duration:1200});
                return;
            }
            if(this.validateCode == ''){
                Toast({message: '请输入图片答案',duration:1200});
                return;
            }
            this.$axios.post("/login",{
                username:this.username,
                password:this.password,
                rememberMe:false,
                validateCode:this.validateCode
            }).then((res)=>{
                if(res.data.code == 0){
                      let userInfo = res.data.data
                      sessionStorage.setItem('username',userInfo.loginName)
                      sessionStorage.setItem('phone',userInfo.phonenumber)
                      sessionStorage.setItem('balance',userInfo.balance)
                      Toast({message: '登录成功',duration:1200,type:"success"});
                      setTimeout(()=>{
                        this.$router.push('/index')
                      },1200)
                }else{
                    Toast({message: res.data.msg,duration:1200});
                    this.getCode()
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/login.styl';

</style>
