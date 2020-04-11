<template>
    <section class="login-wrapper">
        <div class="index-head">
            <div class="index-logo"><img src="/static/image/logo.png"></div>
        </div>
        <h3>欢迎注册</h3>
        <div class="login-list">
            <ul>
                <li>
                    <label>登录账号</label>
                    <input type="text" placeholder="请输入您的账户名称" v-model="userInfo.loginName">
                </li>
                <li>
                    <label>用户昵称</label>
                    <input type="text" placeholder="请输入您的用户昵称" v-model="userInfo.userName">
                </li>
                <li>
                    <label>登录密码</label>
                    <input type="password" placeholder="请输入8-20位由数字和字母组成的密码" v-model="userInfo.password">
                </li>
                <li>
                    <label>确认密码</label>
                    <input type="password" placeholder="请输入8-20位由数字和字母组成的密码" v-model="userInfo.confirm"> 
                </li>
                <li>
                    <label>手机号码</label>
                    <input type="text" v-model="userInfo.phonenumber" placeholder="请输入您的手机号码" maxlength="11">
                </li>
                <li>
                    <label>手机验证码</label>
                    <input type="text" class="short-input" placeholder="请输入手机验证码" v-model="userInfo.code">
                    <button class="login-code" @click="getCode" :class="{'bgColor':isDisabled}" :disabled="isDisabled">{{codeTxt}}</button>
                </li>
                <li>
                    <label>支付密码</label>
                    <input type="password" placeholder="请输入6位数字支付密码" v-model="userInfo.pay_pwd" maxlength="6">
                </li>
                <li>
                    <label>确认支付密码</label>
                    <input type="password" placeholder="请再次输入支付密码" v-model="userInfo.pay_pwdConfirm" maxlength="6">
                </li>
                 
                <li>
                    <label>邀请码（选填）</label>
                    <input type="text" placeholder="邀请码" v-model="userInfo.extension">
                </li>
            </ul>
        </div>
        <div class="login-foot">
            <a href="javascript:;" class="login-btn" @click="toRegister">注册</a>
            <div class="login-other">
                <p>已有账号?<span @click="goLogin">去登录</span></p>
            </div>
        </div>
    </section>
</template>
<script>
import { Toast } from 'vant';
import { fail } from 'assert';
import { setTimeout } from 'timers';
var phone = 11 && /^((11|12|13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
var reg =/^(?=.*[0-9].*)(?=.*[a-z].*).{8,20}$/
export default { 
    data(){
        return{
            userInfo:{
                code:'',
                confirm:'',
                extension:'',
                loginName:'',
                password:'',
                phonenumber:'',
                userName:'',
                pay_pwd:''
            },
            codeTxt:'获取手机验证码',
            isDisabled:false
        }
    },
    methods:{
        goLogin(){
            // Toast.loading({mask: true,message: '加载中...',duration:1000});
            // setTimeout(()=>{
                this.$router.push('/login')
            // },1000)
        },
        // 获取验证码
        getCode(){
            if(this.userInfo.phonenumber == ''){
                Toast({message: '请输入手机号码',duration:1200});
                return;
            }
             if(!phone.test(this.userInfo.phonenumber)){
                Toast({message: '手机号码格式不正确',duration:1200});
                return;
            }
            this.$axios.post('/sms',{
                phone:this.userInfo.phonenumber,
                bs:0
            }).then((res)=>{
                if(res.data.code == 0){
                    var num=60
                    this.isDisabled = true
                    Toast({message: '发送成功',duration:1200,type:"success"});
                    var timer = window.setInterval(()=>{
                        num--
                        if(num){
                            this.codeTxt = '重发('+num+')'
                        }else{
                            clearInterval(timer)
                            this.isDisabled = false
                            this.codeTxt = '获取验证码'
                        }
                    },1000)
                }else{
                    Toast({message: res.data.msg,duration:1200});
                    return;
                }
            })
            
        },
        toRegister(){
            if(this.userInfo.loginName == ''){
                Toast({message: '请输入登录帐号',duration:1200});
                return;
            }
            if(this.userInfo.userName == ''){
                Toast({message: '请输入用户昵称',duration:1200});
                return;
            }
            if (!reg.test(this.userInfo.password)) {
                Toast({message: '密码格式不规范',duration:1200});
                return
            }
            if(this.userInfo.password == ''){
                Toast({message: '请输入登录密码',duration:1200});
                return;
            }
            if(this.userInfo.confirm == ''){
                Toast({message: '请再次输入密码',duration:1200});
                return;
            }
            if(this.userInfo.password != this.userInfo.confirm){
                Toast({message: '两次密码不一致',duration:1200});
                return;
            }
            if(this.userInfo.phonenumber == ''){
                Toast({message: '请输入手机号码',duration:1200});
                return;
            }
            if(this.userInfo.code == ''){
                Toast({message: '请输入手机验证码',duration:1200});
                return;
            }
            if(this.userInfo.pay_pwd  == ''){
                Toast({message: '请输入支付密码',duration:1200});
                return;
            }
            this.$axios.post('/system/register',this.userInfo).then((res)=>{
                 if(res.data.code == 0){
                    Toast({message: '注册成功',duration:1200,type:"success"});
                    setTimeout(()=>{
                        this.$router.push('/login') 
                    },1200)
                 }else{
                    Toast({message: res.data.msg,duration:1200});
                 }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/login.styl';
    .login-wrapper .login-list>ul>li .login-code
        line-height:.6rem
    .login-wrapper .login-list>ul>li>input
        height:.6rem
    .login-wrapper 
        .login-list>ul>li
            margin-top:.3rem
    .login-code
        display inline-block
        border:none
        font-size:.2rem
        color:#fff
        border-radius:.05rem
        width:2rem
        float right
        line-height:.6rem
        margin-top:.1rem
        background:#1b3442  
    .login-wrapper .login-foot
        position relative
        margin-top:.5rem    
</style>
