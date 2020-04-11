<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>商户身份认证</h1>
        </div>
        <div class="identity-content">
            <div v-if="identityInfo.status == 1"><img src="/static/image/examine-success.png"></div>
            <div v-else><img src="/static/image/examine-faile.png"></div>
            <ul>
                <li><p>法人证件号码</p><h3>{{identityInfo.legalpersoncrd}}</h3></li>
                <li><p>法人姓名</p><h3>{{identityInfo.legalperson}}</h3></li>
                <li><p>法人电话</p><h3>{{identityInfo.contadtstel}}</h3></li>
                <li><p>商户名称</p><h3>{{identityInfo.mercnam}}</h3></li>
                <li><p>公钥</p><a href="javascript:;" @click="lookKey">查看公钥</a><a href="javascript:;" @click="editKey">修改公钥</a></li>
            </ul>
        </div>
        <van-dialog
            v-model="keyShow"
            title="商户公钥"
        >
            <van-field
                v-model="identityInfo.publickey"
                type="textarea"
                rows="7"
            />
        </van-dialog>
        <van-dialog
            v-model="editShow"
            title="修改商户公钥"
            show-cancel-button
            @confirm='confirm'
        >
            <van-field
                v-model="identityInfo.publickey"
                type="textarea"
                rows="7"
            />
        </van-dialog>
    </section>
</template>
<script>
export default {
    data(){
        return{
            identityInfo:{},
            keyShow:false,
            editShow:false
        }
    },
    created(){
        this.getIdentity()
    },
    methods:{
        // 返回上一页
        returnPrev(){
            this.$router.push('/mine')
        },
        // 获取验证信息
        getIdentity(){
            this.$axios.post('/user/authByAndroid',{}).then((res)=>{
                if(res.data.code == 0){
                    this.identityInfo = res.data.data.mi
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        lookKey(){
            this.keyShow = true
        },
        editKey(){
            this.editShow = true
        },
        // 确定修改
        confirm(){
            if(this.identityInfo.publickey == ''){
                this.Toast({message:'请输入商户公钥',duration:1200});
            }
            this.$axios.post('/system/merInf/edits',{
                mercnam:this.identityInfo.mercnam,
                publickey:this.identityInfo.publickey
            }).then((res)=>{
                if(res.data.code == 0){
                    this.Toast({message: '修改成功',duration:1200});
                    this.getIdentity()
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
   .identity-wrapper
        .identity-head
            border-bottom:.02rem solid #cacaca
            &>a
                display block
                width:.6rem
                line-height:.6rem
                text-align center
                .icon-fanhui
                    font-size:.5rem
            &>h1
                font-size:.54rem
                color:#1b3442
                padding-left:.6rem
                padding-bottom:.3rem
                font-weight:600 
        .identity-content
            &>div
                padding:.24rem .34rem;
                box-sizing:border-box
                width:100%;
                border-bottom:.02rem solid #cacaca
                &>img
                    width:100%
            &>ul
                &>li
                    line-height:1.2rem
                    display flex
                    border-bottom:.02rem solid #cacaca
                    &>p
                        flex:0 0 2.2rem
                        font-size:.3rem
                        color:#cacaca
                        padding-left:.4rem
                    &>h3
                        flex:1
                        font-size:.3rem
                        color:#1b3442
                    &>a
                        display block
                        position relative
                        top:.3rem
                        width:1.8rem
                        height:.6rem
                        line-height:.6rem
                        color:#fff
                        margin-right:.2rem
                        border-radius:.05rem
                        text-align center
                        font-size:.28rem
                        background:#1296db
</style>
