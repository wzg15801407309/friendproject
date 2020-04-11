<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>我的订单</h1>
        </div>
        <div class="indent-warpper">
            <van-tabs v-model="active" @change="changeTab">
                <van-tab :title="tab.title" v-for="(tab,name) in tabs" :key="name">
                    <div class="deal-content">
                        <div v-if="tab.isShow">
                            <div class="deal-list" v-for="(item,index) in tab.list" :key="index">
                                <div class="deal-home">
                                    <div class="deal-head">
                                        <div class="deal-info">
                                            <div class="deal-icon"><img src="/static/image/mayi-icon.png"></div>
                                            <h3>{{item.loginName}}</h3>
                                            <div class="deal-state"><span v-text="item.orderType === 'D'?'出售':'购买'"></span><i class="iconfont icon-youjiantou1"></i></div>
                                            <h3>{{item.takingUserLoginName}}</h3>
                                            <!-- <div class="deal-vip"><img src="/static/image/vip.png"></div> -->
                                        </div>
                                         <div class="indent-stateTxt">
                                            <p v-if="item.paystatus == '00' && item.takingUserLoginName==null">等待接单</p>
                                            <p v-if="item.paystatus == '00' && item.takingUserLoginName!=null">交易中</p>
                                            <p v-if="item.paystatus == '01'">交易成功</p>
                                            <p v-if="item.paystatus == '02'">交易失败</p>
                                            <p v-if="item.paystatus == '03' && item.takingUserLoginName!=''">冻结中</p>
                                        </div>
                                    </div>
                                    <div class="indent-info">
                                        <ul>
                                            <li>时间：<span v-text="Todate(new Date(item.orderTime),'yyyy-MM-dd HH:mm:ss')"></span></li>
                                            <li>订单号：{{item.orderId}}</li>
                                            <li>蚂蚁数量：{{item.orderMoney}}</li>
                                            <li>
                                                支付方式：
                                                <div class="pay-img">
                                                    <img src="/static/image/weixin.png" v-if="item.paychannel == 'WX'">
                                                    <img src="/static/image/apliay.png" v-if="item.paychannel == 'ALI'">
                                                    <img src="/static/image/bank.png" v-if="item.paychannel == 'CUP'">
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="indent-balance">
                                            
                                            <h1 v-show="item.orderType === 'D'">￥{{item.actual_money | priceFilter}}</h1>
                                            <h1 v-show="item.orderType == 'A'">￥{{item.orderMoney | priceFilter}}</h1>
                                            <div class="indent-state" v-if="active == 1 || active == 0">
                                                <button v-if="(item.orderType === 'A' && item.takingUserLoginName == username) || (item.orderType === 'D' && item.loginName == username)" @click="saleMayi(item)">处理</button>
                                                <button v-else @click="buyMayi(item)">购买</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="indent-line"></div>
                            </div>
                        </div>
                        <div class="no-indent" v-else><img src="/static/image/no-message.png"><p>暂无交易</p></div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </section>
</template>
<script>
import { fail } from 'assert';
export default {
    data(){
        return{
             active:0,
             username:this.global().username,
             tabs:[
                 {title:'未处理',list:[],isShow:false},
                 {title:'冻结中',list:[],isShow:false},
                 {title:'我的下单',list:[],isShow:false},
                 {title:'我的接单',list:[],isShow:false}
             ]
        }
    },
    created(){
         this.getIndent()
    },
    methods:{
        // 返回上一页
        returnPrev(){
            this.$router.push('/mine')
        },
        // 获取初始数据
        getIndent(){
            this.tabs[0].list = []
            this.tabs[1].list = []
            this.$axios.post('/order/ordertakingByAndroid',{}).then((res)=>{
                if(res.data.code == 0){
                    let myOrder = res.data.data.myOrderList
                    myOrder.forEach((val)=>{
                        if(val.paystatus == '00'){
                            this.tabs[0].list.push(val)
                            if(this.tabs[0].list.length>0){this.tabs[0].isShow = true}
                        }
                        if(val.paystatus == '03'){
                            this.tabs[1].list.push(val)
                            if(this.tabs[1].list.length>0){this.tabs[1].isShow = true}
                        }
                    })
                    
                }
            })
        },
        // 获取我的下单数据
        getPlaceOrder(){
            this.$axios.post('/user/androidExchange',{}).then((res)=>{
                if(res.data.code == 0){
                    this.tabs[2].list = res.data.data.page.list
                    if(this.tabs[2].list.length>0){this.tabs[2].isShow = true}
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        // 获取我的接单数据
        getOrderTake(){
            this.$axios.post('/user/androidExchangeTo',{}).then((res)=>{
                if(res.data.code == 0){
                    this.tabs[3].list = res.data.data.page.list
                    if(this.tabs[3].list.length>0){this.tabs[3].isShow = true}
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        // 购买
        buyMayi(row){
            this.$axios.post('/order/ordertakingByAndroid/'+row.orderId,{}).then((res)=>{
                if(res.data.code == 0){
                    this.$router.push('/indentPay?orderId='+row.orderId+'&way=buy')
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        // 出售
        saleMayi(row){
             this.$axios.post('/order/ordertakingByAndroid/'+row.orderId,{}).then((res)=>{
                if(res.data.code == 0){
                    this.$router.push('/indentPay?orderId='+row.orderId+'&way=sale')
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        // 切换标签页
        changeTab(val){
            if(val == '0' || val == '1'){
                this.getIndent()
            }else if(val == '2'){
                this.getPlaceOrder()
            }else if(val == '3'){
                this.getOrderTake()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
    .deal-content
            overflow-y scroll
            position relative
            min-height:7rem
            .deal-home
                padding:.2rem .2rem 0
            .deal-list
                .deal-head
                    display flex
                    justify-content space-between
                    .deal-info
                        display flex
                        .deal-icon
                           flex:0 0 .5rem 
                           width:.5rem
                           height:.5rem
                           &>img
                            width:100%
                        .deal-state
                            flex:0 0 2rem
                            border-bottom:.02rem solid #284f68
                            text-align center 
                            &>span
                                font-size:.28rem
                                color:#f00
                                top:-.08rem
                                position relative
                            &>i
                                font-size:.5rem
                                color:#f00   
                        &>h3
                          font-size:.26rem
                          color:#284f68
                          padding:.2rem .15rem 0
                        .deal-vip
                          width:.4rem
                          margin-top:.12rem
                          &>img
                            width:100%
                    .deal-rate
                        display flex
                        padding-top:.2rem
                        &>p
                           font-size:.26rem
                           color:#697883 
                        .line
                            width:.03rem
                            height:.24rem
                            background:#c5c5c5
                            margin:.05rem .22rem 0
                    .indent-stateTxt
                        flex 0 0 1.2rem
                        &>p
                            font-size:.28rem
                            color:#f00
                            line-height:.5rem
                .indent-info
                    display flex
                    justify-content space-between
                    padding-top:.2rem
                    &>ul
                        &>li
                            display flex
                            font-size:.26rem
                            color:#687782
                            margin-bottom:.2rem
                            .pay-img
                                width:.5rem
                                &>img
                                    width:100%       
                    .indent-balance
                        &>P
                            color:#687782
                            font-size:.26rem
                        &>h1
                            font-size:.4rem
                            color:#1296db
                            padding-top:.46rem
                            font-weight:bold
                            text-align right
                        .indent-state
                            display flex
                            margin-top:0.2rem
                            flex-direction: row-reverse;
                            &>p
                                font-size:.3rem
                                color:#f00
                                line-height:.6rem
                            &>button
                                display block
                                width: 1.5rem;
                                border:none
                                padding:0 .3rem
                                text-align center
                                background:#1296db
                                line-height:.6rem
                                border-radius:.06rem
                                color:#fff
                                margin-left .2rem
                .indent-line
                    width:100%;
                    height:.2rem
                    background:#e8eef1
            .no-indent        
                position absolute
                left:50%;
                top:50%;
                transform translate(-50%,-50%)
                width:2rem
                &>img
                    width:100%
                &>p
                    text-align center
                    color:#687782
                    font-size:.34rem
                    line-height:.6rem   
</style>
