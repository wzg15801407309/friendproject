<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>登录记录</h1>
        </div>
        <div class="invite-people">
            <ul class="people-title">
                <li><h3>登录时间</h3></li>
                <li><p>登录方式</p></li>
                <li><p>IP</p></li>
                <li><p>状态</p></li>
            </ul>
            <ul v-for="(item,index) in loginList" :key="index" v-if="hasLogin">
                <li><h3>{{item.loginTime}}</h3></li>
                <li><p>{{item.os}}</p></li>
                <li><p>{{item.ipaddr}}</p></li>
                <li><p>{{item.msg}}</p></li>
            </ul>
            <p v-else>暂无登录记录</p>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return{
            loginList:[],
            hasLogin:false
        }
    },
    created(){
        this.getLoginList()
    },
    methods:{
        returnPrev(){
            this.$router.go(-1)
        },
        // 获取登录记录
        getLoginList(){
            this.$axios.post('/user/androidLoginInfo',{}).then((res)=>{
                if(res.data.code == 0){
                    if(res.data.data.length>0){
                        this.hasLogin = true
                        this.loginList = res.data.data
                    }
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
    .invite-people
        background:#e8eef1
        min-height:.5rem
        .people-title
            h3
                line-height:.8rem
            p    
                line-height:.8rem
        &>ul
            display flex
            &>li
                flex:0 0 25%  
                box-sizing:border-box
                border-bottom:.02rem solid #ccc
                text-align center
                &>h3
                    font-size:.24rem
                    color:#284f68
                    line-height:.6rem
                &>p
                    font-size:.24rem
                    color:#284f68
                    line-height:.6rem
        &>p
            width:100%;
            background:#e8eef1
            text-align center
            color:#284f68
            font-size:.24rem
            line-height:.8rem
</style>
