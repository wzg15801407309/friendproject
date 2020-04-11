<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>修改登录密码</h1>
        </div>
        <div class="safe-content">
            <ul>
                <li>
                    <h3>账号</h3>
                    <p>{{userName}}</p>
                </li>
                <li>
                    <h3>原登录密码</h3>
                    <input type="password" placeholder="请输入原始密码" v-model="userPwd.oldPassword">
                </li>
                <li>
                    <h3>新登录密码</h3>
                    <input type="password" placeholder="请输入新登录密码" v-model="userPwd.newPassword">
                </li>
                <li>
                    <h3>再次输入</h3>
                    <input type="password" placeholder="请输入新登录密码" v-model="userPwd.twoPassword">
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
            userName:this.global().username,
            userPwd:{
                oldPassword:'',
                newPassword:'',
                twoPassword:''
            }

        }
    },
    methods:{
        returnPrev(){
            this.$router.go(-1)
        },
        editPwd(){
            if(this.userPwd.oldPassword == ''){
                this.Toast({message: '请输入账号原密码',duration:1200});
                return;
            }
            if(this.userPwd.newPassword == ''){
                this.Toast({message: '请输入账号密码',duration:1200});
                return;
            }
            if(this.userPwd.twoPassword  == ''){
                this.Toast({message: '请再次输入账号密码',duration:1200});
                return;
            }
            if(this.userPwd.twoPassword  != this.userPwd.newPassword){
                this.Toast({message: '两次密码不一致',duration:1200});
                return;
            }
            this.$axios.post('/system/user/setPwd',this.userPwd).then((res)=>{
                if(res.data.code == 0){
                    this.Toast({message: '密码修改成功',type:'success',duration:1200});
                    setTimeout(()=>{
                        sessionStorage.clear()
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
                flex:0 0 1.8rem
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
                &>h3    
                    flex:1
                    font-size:.28rem
                    color:#284f68 
                    flex:0 0 1.5rem
                .icon-youjiantou
                    flex:0 0 0.3rem

</style>
