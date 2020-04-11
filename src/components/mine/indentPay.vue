<template>
    <section class="buy-wrapper">
        <div class="identity-head" v-if="way == 'buy'">
             <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <div><img :src="titleImg"></div>
            <p>{{titleTxt}}</p>
        </div>
        <div class="identity-head" v-else>
             <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <p>收款确认</p>
        </div>
        <div class="buy-balance">
            <h3>¥{{payInfo.actual_money | priceFilter}}</h3>
            <span>{{payInfo.orderMoney}}只蚂蚁</span>
        </div>
        <div class="indent-info">
            <div class="countDown">
                <ul>
                    <li>{{hour}}:</li>
                    <li>{{minute}}:</li>
                    <li>{{second}}</li>
                </ul>
            </div>
            <p>真实姓名：{{payInfo.acc_name}}</p>
            <p>收款账号：{{payInfo.acc_num}}</p>
            <div class="indent-Code">
                <vue-qr :text="payInfo.acc_qrcode" :size="135" :margin="0" :dotScale='1' :correctLevel="2" :logoScale="0.25"></vue-qr>
            </div>
            <h3>截图扫描</h3>
        </div>
        <div class="buy-btn" v-if="way == 'buy'">
            <a href="javascript:;" @click="payment">已支付</a>
            <a href="javascript:;" @click="cancelPay">放弃支付</a>
        </div>
        <div class="buy-btn" v-else>
            <a href="javascript:;" @click="collect">已收款</a>
            <a href="javascript:;" @click="unPaid">未收款</a>
        </div>
        <div class="pay-info">
            <p v-if="way == 'buy'">支付完成后，请返回</p>
            <p v-else>收到款后，请确认</p>
            <p>商户单号：{{payInfo.orderId}}</p>
            <p>支付单号：{{payInfo.orderNo}}</p>
        </div>
         <van-dialog
            v-model="collectShow"
            title="确认收款"
            show-cancel-button
            @confirm='confirm'
        >
            <van-field v-model="paypwd" placeholder="请输入交易密码" />
        </van-dialog>
    </section>
</template>
<script>
    import VueQr from 'vue-qr'
import { setTimeout } from 'timers';
import { Dialog } from 'vant';

    var timer
    export default {
        data(){
            return{
                titleImg:'',
                titleTxt:'',
                hour:'00',
                minute:'00',
                second:'00',
                payInfo:{
                    acc_qrcode:''
                },
                orderId:'',
                paypwd:'',
                endTime:'',
                way:this.$route.query.way,
                collectShow:false
            }
        },
        created(){
            
            // let payInfo = JSON.parse(sessionStorage.getItem('payInfo'))
            this.orderId = this.$route.query.orderId
            console.log(this.orderId)
            this.getOrderInfo()
           
            // this.payInfo = payInfo
            // 
        },
        methods:{
             // 返回上一页
            returnPrev(){
                this.$router.go(-1)
            },
            countTime: function () {
                //获取当前时间
                var date = new Date();
                var now = date.getTime();
                //设置截止时间
                var endDate = new Date(this.endTime);
                var end = endDate.getTime();
                //时间差
                var leftTime = end - now;

                //定义变量 d,h,m,s保存倒计时的时间
                if (leftTime >= 0) {
                    this.hour = this.filterTime(Math.floor(leftTime / 1000 / 60 / 60 % 24));
                    this.minute = this.filterTime(Math.floor(leftTime / 1000 / 60 % 60));
                    this.second = this.filterTime(Math.floor(leftTime / 1000 % 60));
                    timer = setTimeout(this.countTime, 1000);
                }else{
                    clearTimeout(timer)
                }
                //递归每秒调用countTime方法，显示动态时间效果
            },
            filterTime(n){
                return n < 10 ? '0' + n : '' + n
            },
            collect(){
                this.collectShow = true
            },
            // 确认收款
            confirm(){
                if(this.paypwd == ''){
                    this.Toast({message:'请输入交易密码',duration:1200});
                }
                this.$axios.post('/order/receivedOrder/'+this.orderId,{
                    orderId:this.orderId,
                    paypwd:this.paypwd
                }).then((res)=>{
                    if(res.data.code == 0){
                        this.Toast({message: '操作成功',duration:1200,type:'success'});
                        setTimeout(()=>{
                            this.$router.push('/indentList')
                        },1200)
                    }else{
                        this.Toast({message: res.data.msg,duration:1200});
                    }
                })
            },
            // 未收款
            unPaid(){
                this.$axios.post('/system/orderHit/explainD',{
                    orderId:this.orderId,
                    reason:'未收到款'
                }).then((res)=>{
                    if(res.data.code == 0){
                        this.Toast({message: '提交成功',duration:1200,type:'success'});
                    }else{
                        this.Toast({message: res.data.msg,duration:1200});
                    }
                })
            },
            // 接单
            getOrderInfo(){
                this.$axios.post('/order/ordertakingByAndroid/'+this.orderId,{}).then((res)=>{
                    if(res.data.code == 0){
                        this.payInfo = res.data.data.order
                        if(this.payInfo.paychannel == 'WX'){
                            this.titleImg = '/static/image/weixin.png'
                            this.titleTxt = '微信支付'
                        }else if(this.payInfo.paychannel == 'ALI'){
                            this.titleImg = '/static/image/apliay.png'
                            this.titleTxt = '支付宝支付'
                        }else if(this.payInfo.paychannel == 'CUP'){
                            this.titleImg = '/static/image/bank.png'
                            this.titleTxt = '银行卡支付'
                        }
                        let submitTime =  new Date(res.data.data.order.acc_time)
                        this.endTime = submitTime.setMinutes(submitTime.getMinutes() + 5);
                        this.countTime()
                    }
                })
            },
            // 已经支付
            payment(){
                Dialog.confirm({
                    title: '已支付',
                    message: '确定是否已支付该笔订单？'
                }).then(() => {
                    this.$axios.post('/order/payedorder/'+this.orderId,{
                     orderId:this.orderId
                    }).then((res)=>{
                        if(res.data.code == 0){
                            this.Toast({message: '操作成功',duration:1200,type:'success'});
                            setTimeout(()=>{
                                this.$router.push('/indentList')
                            },1200)
                        }else{
                            this.Toast({message: res.data.msg,duration:1200});
                        }
                    })
                }).catch(() => {
                // on cancel
                }); 
            },
            // 放弃支付
            cancelPay(){
                Dialog.confirm({
                    title: '关闭',
                    message: '是否放弃支付该订单？'
                }).then(() => {
                    this.$axios.post('/order/closeorder/'+this.orderId,{
                     orderId:this.orderId
                    }).then((res)=>{
                        if(res.data.code == 0){
                            this.Toast({message: '操作成功',duration:1200,type:'success'});
                            setTimeout(()=>{
                                this.$router.push('/indentList')
                            },1200)
                        }else{
                            this.Toast({message: res.data.msg,duration:1200});
                        }
                    })
                }).catch(() => {
                // on cancel
                }); 
                
            }
        },
        components: { VueQr }
    }
</script>
<style lang="stylus" scoped>
    .buy-wrapper
        .identity-head 
            display flex
            justify-content center
            position relative
            border-bottom:.03rem  solid #cccccc
            &>div
                width:.5rem
                padding-top:.15rem
                padding-right:.1rem
                &>img
                    width:100%
            &>p
                font-size:.36rem
                color:#cfd0e6
                line-height:.8rem
            &>a
                display block
                width:.8rem
                height:.8rem
                text-align center
                line-height:.8rem
                position absolute
                left:0;
                top:0;
                &>i
                    font-size:.4rem    
        .buy-balance
            display flex
            justify-content center
            height: 1rem
            &>h3
                font-size:.5rem
                color:#284f68
                line-height:1rem
                font-weight:bold
            &>span
                font-size:.12rem
                color:#aab4bd
                line-height:1rem
                padding-top:.1rem
                padding-left:.05rem
        .indent-info            
            background:#e8eef1
            padding-top:.4rem
            .countDown
                width:2.1rem
                margin:0 auto
                &>ul
                    display: flex
                    &>li
                        font-size: .5rem
                        color:#284f68
                        font-weight bold
            &>p
                font-size:.36rem    
                color:#284f68
                font-weight bold
                text-align center
                padding-bottom:.2rem
            .indent-Code
                width:3rem
                margin:0 auto
                img
                    width:100%    
            &>h3
                font-size:.34rem    
                color:#284f68
                padding:.3rem 0
                font-weight bold
                text-align center
        .buy-btn
            display flex
            padding-top:.5rem
            justify-content center
            &>a
                display block
                width:2.5rem
                margin:0 .3rem
                background:#1296db
                line-height:.7rem
                border-radius:.1rem
                text-align center
                font-size:.3rem
                color:#fff
                font-weight:bold
        .pay-info
            padding-top:.6rem
            &>p
               font-size:.24rem
               color:#284f68
               padding-bottom:.2rem 
               text-align center        
</style>
