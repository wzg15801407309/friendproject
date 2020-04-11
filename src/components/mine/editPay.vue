<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>修改支付密码</h1>
        </div>
        <div class="safe-content">
            <ul>
                <li>
                    <h3>账号</h3>
                    <p>{{userInfo.userName}}</p>
                </li>
                <li>
                    <h3>手机号码</h3>
                    <input type="text" readonly v-model="userInfo.phone"   maxlength="11">
                </li>
                <li>
                    <h3>手机验证码</h3>
                    <input type="text" class="short-input" placeholder="请输入手机验证码" v-model="userInfo.code">
                    <button class="login-code" @click="getCode" :class="{'bgColor':isDisabled}" :disabled="isDisabled">{{codeTxt}}</button>
                </li>
                <li>
                    <h3>新支付密码</h3>
                    <input type="password" placeholder="请输入新支付密码" v-model="userInfo.pay_pwd">
                </li>
                <li>
                    <h3>再次输入</h3>
                    <input type="password" placeholder="请输入新支付密码" v-model="userInfo.pay_pwd_q">
                </li>
            </ul>
        </div>
        <button class="identity-next" @click="editPwd">确定</button>
    </section>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            userInfo:{
                phone:this.global().phone,
                userName:this.global().username,
                pay_pwd:'',
                pay_pwd_q:'',
                code:'',

            },
            codeTxt:'获取手机验证码',
            isDisabled:false
        }
    },
    methods:{
        returnPrev(){
            this.$router.go(-1)
        },
        editPwd(){
            if(this.userInfo.code == ''){
                this.Toast({message: '请输入手机验证码',duration:1200});
                return;
            }
             if(this.userInfo.password == ''){
                this.Toast({message: '请输入登录密码',duration:1200});
                return;
            }
            if(this.userInfo.confirm == ''){
                this.Toast({message: '请再次输入密码',duration:1200});
                return;
            }
            if(this.userInfo.password != this.userInfo.confirm){
                this.Toast({message: '两次密码不一致',duration:1200});
                return;
            }
             this.$axios.post('/system/user/editpaypwd',this.userInfo).then((res)=>{
                 if(res.data.code== 0){
                    this.Toast({message: '密码修改成功',duration:1200,type:'success'});
                    setTimeout(()=>{
                        this.$router.push('/safeCenter')
                    },1200)
                 }else{
                    this.Toast({message: res.data.msg,duration:1200});
                 }
            })
        },
        // 获取验证码
        getCode(){
            this.$axios.post('/sms',{
                phone:this.userInfo.phone
            }).then((res)=>{
                if(res.status == 200){
                    var num=60
                    this.isDisabled = true
                    this.Toast({message: '发送成功',duration:1200,type:"success"});
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
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
    .safe-content
      &>ul
        &>li
            display flex
            padding:0 .4rem
            border-bottom:.02rem solid #cacaca
            line-height:1.2rem
            &>h3
                font-size:.28rem
                color:#284f68 
                flex:0 0 2rem
            &>p
                flex:1
                font-size:.26rem
                color:#284f68
            .short-input
                flex 0 0 2.5rem
                width:100%    
            .login-code
                border:none
                font-size:.2rem
                color:#fff
                border-radius:.05rem
                width:2rem
                float right
                height:.8rem
                line-height:.8rem
                margin-top:.2rem
                background:#1b3442    
            .safe-edit
                flex:0 0 .8rem
                text-align center
                font-size:.28rem
                color:#c5c5c5
            .safe-record
                display flex
                width:100%
                justify-content space-between
                &>h3    
                    flex:1
                    font-size:.28rem
                    color:#284f68 
                    flex:0 0 1.5rem
                .icon-youjiantou
                    flex:0 0 0.3rem

</style>
