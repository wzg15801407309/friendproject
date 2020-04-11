<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>高级认证</h1>
        </div>
        <div class="identity-content">
            <ul>
                <li>
                    <h3>商户名称</h3>
                    <input type="text" placeholder="请输入商户名称" v-model="identity.mercnam">
                </li>
                <li>
                    <h3>法人电话</h3>
                    <input type="text" maxlength="11" placeholder="请输入法人的手机号" v-model="identity.contadtstel">
                </li>
                <li>
                    <h3>商户公钥</h3>
                    <input type="text" placeholder="请输入商户公钥" v-model="identity.publickey"> 
                </li>
            </ul>
        </div>
        <div class="identity-btn">
            <button @click="submit">提交审核</button>
            <button class="identity-cancel" @click="cancel">取消</button>
        </div>
    </section>
</template>
<script>
import {Toast} from 'vant'
import { setTimeout } from 'timers';
var phone = 11 && /^((11|12|13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
export default {
    data(){
        return{
            identity:{
                legalperson:this.$route.query.name,
                legalpersoncrd:this.$route.query.card,
                contadtstel:'',
                mercnam:'',
                publickey:''
            }
        }
    },
    methods:{
        // 返回上一页
        returnPrev(){
            this.$router.go(-1)
        },
        // 取消认证
        cancel(){
            this.$router.push('/mine')
        },
        // 提交数据审核
        submit(){
            if(this.identity.mercnam == ''){
                this.Toast({message: '请输入商户名称',duration:1200});
                return;
            }
            if(this.identity.contadtstel == ''){
                this.Toast({message: '请输入法人电话',duration:1200});
                return;
            }
            if(!phone.test(this.identity.contadtstel)){
                Toast({message: '法人电话格式不正确',duration:1200});
                return;
            }
            if(this.identity.publickey == ''){
                this.Toast({message: '请输入商户公钥',duration:1200});
                return;
            }
            this.$axios.post('/system/merInf/addAuth',this.identity).then((res)=>{
                if(res.data.code == 0){
                    this.Toast({message:'提交成功',type:"success",duration:1200})
                    setTimeout(()=>{
                        this.$router.push('/identityInfo')
                    },1200)
                }else{
                    this.Toast({message:res.data.msg,duration:1200})
                }
            })
            
            
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
    .identity-btn
        display flex
        position absolute
        left:50%
        transform translateX(-50%)
        bottom:.4rem
        width: 100%;
        &>button
            flex:0 0 3.2rem
            margin:0 .2rem
            border:none
            border-radius:.05rem
            color:#fff
            text-align center
            line-height:.8rem
            font-size:.34rem
            background:#1296db
        .identity-cancel
            background:#767676    
</style>
