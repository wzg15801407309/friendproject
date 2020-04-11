<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>安全中心</h1>
        </div>
        <div class="safe-content">
            <ul>
                <li>
                    <h3>账号</h3>
                    <p>{{userName}}</p>
                </li>
                <li>
                    <h3>登录密码</h3>
                    <p>********</p>
                    <router-link to="/editPwd" class="safe-edit">修改</router-link>
                </li>
                <li>
                    <h3>支付密码</h3>
                    <p>********</p>
                     <router-link to="/editPay" class="safe-edit">修改</router-link>
                </li>
                <li>
                    <router-link to="/loginList" class="safe-record">
                        <h3>登录记录</h3>
                        <i class="iconfont icon-youjiantou"></i>
                    </router-link>
                </li>
            </ul>
        </div>
        <button class="exit-login" @click="exit">退出登录</button>
    </section>
</template>
<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
            userName:sessionStorage.getItem('username'),
        }
    },
    methods:{
        returnPrev(){
            this.$router.push('/mine')
        },
        next(){
            this.$router.push('/merchant')
        },
        exit(){
            Dialog.confirm({
                title: '退出',
                message: '是否退出登录？'
            }).then(() => {
                sessionStorage.clear()
                this.$router.push('/')
            }).catch(() => {
            // on cancel
            }); 
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
    .exit-login
        display block
        width:50%;
        background:#f00;
        border:none;
        border-radius:.1rem
        text-align center
        font-size:.3rem
        line-height:.8rem
        color:#fff
        margin:.8rem auto  0 
    .safe-content
      &>ul
        &>li
            display flex
            padding:0 .4rem
            border-bottom:.02rem solid #cacaca
            line-height:1.2rem
            justify-content space-between
            &>h3
                font-size:.28rem
                color:#284f68 
                flex:0 0 1.5rem
            &>p
                flex:1
                font-size:.26rem
                color:#284f68
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
