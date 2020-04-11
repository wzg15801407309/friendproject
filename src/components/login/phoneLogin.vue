<template>
    <section class="login-wrapper">
        <div class="index-head">
            <div class="index-logo"><img src="/static/image/logo.png"></div>
        </div>
        <h3>手机登陆</h3>
        <div class="login-list">
            <ul>
                <li>
                    <label>手机号码</label>
                    <input type="text" placeholder="请输入您的手机号码" v-model="phone" maxlength="11">
                </li>
                <li>
                    <label>验证码</label>
                    <input type="text" class="short-input" placeholder="请输入右侧图片答案" v-model="validateCode">
                    <a href="javascript:;" class="login-code" @click="getImgCode"><img :src="imgUrl"></a>
                </li>
                <li>
                    <label>手机验证码</label>
                    <input type="text" class="short-input" placeholder="请输入手机验证码" v-model="phoneVal">
                    <button class="login-code" @click="getCode" :class="{'bgColor':isDisabled}" :disabled="isDisabled">{{codeTxt}}</button>
                    <router-link to="/login" class="phone-login">账号登录</router-link >
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
var phone = 11 && /^((11|12|13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
export default {
    data(){
        return{
            phone:'',
            codeTxt:'获取手机验证码',
            validateCode:'',
            isDisabled:false,
            imgUrl:'',
            phoneVal:''
        }
    },
    created(){
        this.getImgCode()
    },
     methods:{
        goReg(){
            this.$router.push('/register')
        },
        // 获取图片验证码
        getImgCode(){
            let number = parseInt(Math.random()*1000)
            this.imgUrl = baseSet.http + '/captcha/captchaImage?type=math&s='+number
        },
        // 获取验证码
        getCode(){
            if(this.phone == ''){
                Toast({message: '请输入手机号码',duration:1200});
                return;
            }
            if(!phone.test(this.phone)){
                Toast({message: '手机号码格式不正确',duration:1200});
                return;
            }
            this.$axios.post('/sms',{
                phone:this.phone
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
        // 登录
        toLogin(){
            if(this.phone == ''){
                Toast({message: '请输入登录帐号',duration:1200});
                return;
            }
            if(!phone.test(this.phone)){
                Toast({message: '手机号码格式不正确',duration:1200});
                return;
            }
            if(this.validateCode == ''){
                Toast({message: '请输入图片答案',duration:1200});
                return;
            }
            if(this.phoneVal == ''){
                Toast({message: '请输入账号密码',duration:1200});
                return;
            }
            this.$axios.post("/login",{
                username:this.phone,
                password:this.phoneVal,
                rememberMe:false,
                validateCode:this.validateCode
            }).then((res)=>{
                if(res.data.code == 0){
                      Toast({message: '登录成功',duration:1200,type:"success"});
                      setTimeout(()=>{
                        this.$router.push('/index')
                      },1200)
                }else{
                    Toast({message: res.data.msg,duration:1200});
                    this.getImgCode()
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
