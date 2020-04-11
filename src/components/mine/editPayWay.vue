<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>修改支付方式</h1>
        </div>
        <div class="identity-content">
            <ul>
                <li style="display:flex">
                    <h3>支付方式</h3>
                    <select v-model="payList.accType" class="pay-select" @change="changeWay">
                        <option value="ALI">支付宝</option>
                        <option value="WX">微信</option>
                        <option value="CUP">银行卡</option>
                    </select>
                </li>
                <li>
                    <h3>真实姓名</h3>
                    <input type="text" placeholder="请输入收款真实姓名" v-model="payList.accName">
                </li>
                <li>
                    <h3>收款账号</h3>
                    <input type="text" placeholder="请输入收款账号" v-model="payList.accNum">
                </li>
                <li v-show="!isBank">
                    <h3>收款码上传</h3>
                    <div class="custom-wx" v-if="haveImg">
                        <vue-qr :text="payList.upd_qrcode" :size="135" :margin="0" :dotScale='1' :correctLevel="2" :logoScale="0.25"></vue-qr>
                        <a href="javascript:;" @click="delCode"><i class="iconfont icon-shanchu"></i></a>
                    </div>
                    <van-uploader v-else v-model="fileList" :max-count="1" multiple  :after-read="afterRead"/>
                </li>
            </ul>
        </div>
        <div class="identity-btn">
            <button @click="submit">提交</button>
            <button class="identity-cancel" @click="cancel">取消</button>
        </div>
    </section>
</template>
<script>
import {Toast} from 'vant'
import { setTimeout } from 'timers';
import VueQr from 'vue-qr'
export default {
    data(){
        return{
            fileList: [],
            payList:{
                accName:'',
                accNum:'',
                accType:'',
                upd_qrcode:''
            },
            haveImg:true,

        }
    },
    created(){
        let editList = JSON.parse(sessionStorage.getItem('editPay'))
        this.payList = editList
    },
    components:{
        VueQr
    },
    methods:{
        // 返回上一页
        returnPrev(){
            sessionStorage.removeItem('editPay')
            this.$router.go(-1)
        },
        // 上传二维码后
        afterRead(file){
            var that = this
            qrcode.decode(this.getObjectURL(file.file))
            qrcode.callback = function(imgMsg){
                if(imgMsg == 'error decoding QR Code'){
                    Toast({message: '请上传包含二维码的图片',duration:1500});
                }else{
                    that.payList.upd_qrcode = imgMsg
                }
                
            }
        },
        // 解析上传的二维码图片
        getObjectURL(file){
            var url = null;
            if (window.createObjectURL != undefined) {          // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {               // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {         // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        // 修改提交
        submit(){
            if(this.payList.accType == ''){
                Toast({message: '请选择支付方式',duration:1200});
                return;
            }
            if(this.payList.accName == ''){
                Toast({message: '请输入收款真实姓名',duration:1200});
                return;
            }
            if(this.payList.accNum == ''){
                Toast({message: '请输入收款账号',duration:1200});
                return;
            }
            this.$axios.post('/system/accountNum/edit',this.payList).then((res)=>{
                if(res.data.code == 0){
                    Toast({message: '修改成功',duration:1200,type:"success"});
                    setTimeout(()=>{
                        this.$router.push('/payWay')
                    },1200)
                }else{
                    Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        cancel(){
            sessionStorage.removeItem('editPay')
            this.$router.go(-1)
        },
        // 删除原来的二维码
        delCode(){
            this.payList.upd_qrcode = ''
            this.haveImg = false
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
    .pay-select
        margin-left:.15rem
        border:.02rem solid #1296db
        width:3rem
        height:.8rem
        border-radius:.1rem
    .custom-wx
        width:3rem
        position relative
        &>img
            width:100%
        &>a
            position absolute
            right:0
            bottom:0
            width:.6rem
            height:.6rem
            text-align center
            line-height:.6rem
            background:rgba(0,0,0,0.5)
            &>i
                font-size:.3rem
                color:#fff
</style>
