<template>
    <section class="login-wrapper">
        <div class="index-head">
            <div class="index-logo"><img src="/static/image/logo.png"></div>
        </div>
        <h3>找回密码</h3>
        <div class="login-list">
            <ul>
                <li>
                    <label>账户名称</label>
                    <input type="text" placeholder="请输入您的账户名称" v-model="resetPwd.loginName" @blur="getInfo">
                </li>
                <li>
                    <label>手机号码</label>
                    <input type="text" placeholder="请输入您的手机号码" v-model="phone" readonly>
                </li>
                <li>
                    <label>手机验证码</label>
                    <input type="text" class="short-input" placeholder="请输入手机验证码" v-model="resetPwd.code">
                    <button class="login-code" @click="getCode" :class="{'bgColor':isDisabled}" :disabled="isDisabled">{{codeTxt}}</button>
                </li>
                <li>
                    <label>新密码</label>
                    <input type="password" placeholder="请输入6-18位由数字和字母组成的密码" v-model="resetPwd.password">
                </li>
            </ul>
        </div>
        <div class="login-foot">
            <a href="javascript:;" class="login-btn" @click="setNewPwd">找回密码</a>
            <div class="login-other">
                <p>记起密码?<span @click="goLogin">去登录</span></p>
            </div>
        </div>
    </section>
</template>
<script>
import { Toast } from 'vant';
var phone = 11 && /^((11|12|13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
var reg =/^(?=.*[0-9].*)(?=.*[a-z].*).{8,20}$/
export default {
    data(){
        return{
            phone:'',
            codeTxt:'获取手机验证码',
            isDisabled:false,
            resetPwd:{
                loginName:'',
                code:'',
                password:'',
                repassword:''
            }
            
        }
    },
     methods:{
        goLogin(){
            this.$router.push('/login')
        },
        // 获取验证码
        getCode(){
            if(this.phone == ''){
                Toast({message: '请输入手机号码',duration:1200});
                return;
            }
            this.$axios.post('/sms',{
                loginName:this.resetPwd.loginName,
                bs:3
            }).then((res)=>{
                if(res.status == 200){
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
                    
                }
            })
            
        },
        // 获取信息
        getInfo(){
            this.$axios.post('/user/LogiName',{
                loginName:this.resetPwd.loginName
            }).then((res)=>{
                if(res.data.code == 0){
                    this.phone = res.data.data.phonenumber
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        // 设置新密码
        setNewPwd(){
            if(this.resetPwd.code == ''){
                this.Toast({message: '请输入手机验证码',duration:1200});
                return;
            }
            if(this.resetPwd.password == ''){
                this.Toast({message: '请输入密码',duration:1200});
                return;
            }
            if (!reg.test(this.resetPwd.password)) {
                Toast({message: '密码格式不规范',duration:1200});
                return
            }
            this.resetPwd.repassword = this.resetPwd.password
            this.$axios.post('/user/resetPwd',this.resetPwd).then((res)=>{
                if(res.data.code == 0){
                    this.Toast({message: '修改成功',duration:1200,type:'success'});
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },1200)
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/login.styl';   
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
</style>
