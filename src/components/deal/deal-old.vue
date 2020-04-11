<template>
    <section class="price-wrapper">
        <div class="price-head">
            <h3>蚂蚁账户资产</h3>
            <p>总资产折合</p>
            <h1>{{balance}}</h1>
            <h5>≈{{balance | priceFilter}} CNY</h5>
        </div>
        <div class="price-search">
            <van-notice-bar
                :text="noticeTxt"
                :scrollable="false"
                color="#284f68"
                background="#fff"
                left-icon="volume-o"
                :speed=30
            />   
            <!-- <input type="text" placeholder="实时成交公告">
            <a href="javascript:;"><i class="iconfont icon-enlarge"></i></a> -->
        </div>
        <div class="partition"></div>
        <div class="price-table">
            <div class="deal-title">
                <ul>
                    <li v-for="(item,index) in title" :key="index"><a href="javascript:;" @click="changeTitle(item.state)" :class="{'title-current':item.state == tabState}">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="deal-content">
                <div v-if="isTrade">
                    <div class="deal-list" v-for="(item,index) in dealList" :key="index">
                        <div class="deal-home">
                            <div class="deal-head">
                                <div class="deal-info">
                                    <div class="deal-icon"><img src="/static/image/mayi-icon.png"></div>
                                    <h3>{{item.loginName}}</h3>
                                    <div class="deal-vip"><img src="/static/image/vip.png"></div>
                                </div>
                                <!-- <div class="deal-rate">
                                    <p>2019</p>
                                    <div class="line"></div>
                                    <p>99%</p>
                                </div> -->
                            </div>
                            <div class="indent-info">
                                <ul>
                                    <li>时间：<span v-text="Todate(new Date(item.orderTime),'yyyy-MM-dd HH:mm:ss')"></span></li>
                                    <li>订单号：{{item.orderId}}</li>
                                    <li>蚂蚁数量：{{item.orderMoney}}</li>
                                    <!-- <li>限额：{{item.quota}}</li> -->
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
                                    <div class="indent-state">
                                        <button v-show="item.orderType === 'D'" @click="buyMayi(item)">购买</button>
                                        <button v-show="item.orderType == 'A'" @click="saleMayi(item)">出售</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="indent-line"></div>
                    </div>
                </div>
                <div class="no-indent" v-else><img src="/static/image/no-message.png"><p>暂无交易</p></div>
            </div>
        </div>
        <v-foot></v-foot>
    </section>
</template>
<script>
import foot from '../public/foot'
import {Toast} from 'vant'
import { setTimeout } from 'timers';
import { fail } from 'assert';
import { Dialog } from 'vant';
export default {
    data(){
        return{
            title:[
                {name:'购买',state:0},
                {name:'出售',state:1},
            ],
            buy:[],
            sell:[],
            dealList:[],
            tabState:0,
            noticeTxt:'蚂蚁币新手交易指南',
            isTrade:false,
            balance:'0.00'
        }
    },
    created(){
        this.getIndent()
        this.initWebSocket()
        this.dealList = this.buy
    },
    methods:{
        // 获取初始数据
        getIndent(){
            this.$axios.post('/order/ordertakingByAndroid',{}).then((res)=>{
                if(res.data.code == 0){
                    let orderIndent = res.data.data.orderList
                    this.balance = parseFloat(res.data.data.user.balance).toFixed(2)
                    orderIndent.forEach((val)=>{
                        if(val.orderType == 'D'){
                            this.buy.push(val)
                        }else if(val.orderType == 'A'){
                            this.sell.push(val)
                        }
                    })
                }
            })
        },
        // 改变标题选项卡
        changeTitle(state){
            this.tabState = state
            Toast.loading({mask: true,message: '加载中...',duration:1000});
            if(state == 0){
                setTimeout(()=>{
                    this.dealList = this.buy
                },1000)
            }else{
                console.log(this.sell)
                 setTimeout(()=>{
                   this.dealList = this.sell
                },1000)
            }
        },
        // 购买蚂蚁
        buyMayi(row){
           this.$axios.post('/order/ordertakingByAndroid/'+row.orderId,{}).then((res)=>{
                if(res.data.code == 0){
                    this.$router.push('/dealPay?orderId='+row.orderId+'&way=buy')
                }else{
                    Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        saleMayi(row){
            let payMoney = (parseFloat(row.orderMoney)/100).toFixed(2)
            Dialog.confirm({
                title: '出售',
                message: '是否已'+payMoney+'元出售'+row.orderMoney+'只蚂蚁'
            }).then(() => {
                 this.$axios.post('/order/ordertakingByAndroid/'+row.orderId,{}).then((res)=>{
                    if(res.data.code == 0){
                        Toast({message: '接单成功',duration:1200,type:"success"});
                         this.$router.push('/dealPay?orderId='+row.orderId+'&way=sale')
                    }else{
                        Toast({message: res.data.msg,duration:1200});
                    }
                })
            }).catch(() => {
            // on cancel
            });
           
        },
        initWebSocket(){ //初始化weosocket
            const wsuri = baseSet.socketUrl ;        
            this.websock = new WebSocket(wsuri);        
            this.websock.onmessage = this.websocketonmessage;        
            this.websock.onopen = this.websocketonopen;        
            this.websock.onerror = this.websocketonerror;        
            this.websock.onclose = this.websocketclose;
        },
        websocketonopen(){ //连接建立之后执行send方法发送数据
            // let actions = {"test":"12345"};        
            // this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror(){//连接建立失败重连
            // this.initWebSocket();
        },
        websocketonmessage(e){ //数据接收
            const json = JSON.parse(e.data);
            
            var orderid = json.data.orderId;
            if ("ORDERTAKING" == json.messegeType) {
                console.log(json)
                this.isTrade = true
                //订单推送处理
                if(json.data.orderType == 'D'){
                    if(this.buy.length == 0){
                        this.buy.push(json.data)
                        return
                    }
                    let buyNum = true
                    this.buy.forEach((val)=>{
                        if(val.orderId == json.data.orderId){
                            buyNum = false
                        }
                    })
                    if(buyNum){
                        this.buy.push(json.data)
                    }
                }else if(json.data.orderType == 'A'){
                    
                    if(this.sell.length == 0){
                        this.sell.push(json.data)
                        return
                    }
                    
                    let sellNum = true
                    this.sell.forEach((val)=>{
                        if(val.orderId == json.data.orderId){
                            sellNum = false
                        }
                    })
                    if(sellNum){
                        this.sell.push(json.data)
                    }
                    

                }
            } else if ("ORDERSUCCESS" == json.messegeType) {
                //成功订单

            } else if ("ORDERTIMEOUT" == json.messegeType || "ORDERTAKINGED" == json.messegeType) {
                //订单超时
                if(json.data.orderType == 'D'){
                    this.buy.forEach((val,index)=>{
                        if(val.orderId == json.data.orderId){
                            this.buy.splice(index,1)
                            
                        }
                    })
                    // if(this.buy.length == 0){
                    //     this.isTrade = false
                    // }
                }else if(json.data.orderType == 'A'){
                    this.sell.forEach((val,index)=>{
                        if(val.orderId == json.data.orderId){
                            this.sell.splice(index,1)
                        }
                    })
                    // console.log(this.sell)
                    // if(this.sell.length == 0){
                    //     this.isTrade = false
                    // }
                }
                
                
            } else if ("MYORDER" == json.messegeType) {
            

            }
        },
        websocketsend(Data){//数据发送
            // this.websock.send(Data);
        },
        websocketclose(e){  //关闭
            console.log('断开连接',e);
        },
    },
    components:{
        'v-foot':foot
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/price.styl';
    .price-table
        .deal-title
            background:#fff
            padding:.1rem .2rem
            border-bottom:.02rem solid #cacaca      
            &>ul
                background:#5887d3
                padding:.04rem .06rem
                display flex
                width:3.5rem
                &>li
                    width:1.8rem
                    &>a
                        display block
                        background:#5887d3
                        padding:.02rem
                        font-size:.3rem
                        color:#fff
                        text-align center
                    .title-current
                        background:#fff
                        color:#5887d3
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
                           width:.5rem
                           height:.5rem
                           &>img
                            width:100%
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
