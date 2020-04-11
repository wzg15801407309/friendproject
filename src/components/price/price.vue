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
        <div class="price-content-title">
            <ul>
                <li>接单用户</li>
                <li>数量</li>
                <li>方向</li>
                <li>收益（元）</li>
            </ul>
        </div>
        <div class="price-table">
            <div class="price-content">
                <div class="price-content-title price-list" v-for="(item,index) in priceList" :key="index">
                    <ul>
                        <li class="ellipsis">{{item.takingUserLoginName}}</li>
                        <li>{{item.actual_money}}</li>
                        <li v-text="item.orderType == 'D'?'买入':'出售'"></li>
                        <li class="red">+{{item.takingCharge | priceFilter}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <v-foot></v-foot>
    </section>
</template>
<script>
import foot from '../public/foot'
export default {
    data(){
        return{
            priceList:[],
            noticeTxt:'蚂蚁币新手交易指南',
            balance:'0.00'
        }
    },
    created(){
        this.getIndent()
        this.initWebSocket()
    },
    methods:{
        // 获取初始数据
        getIndent(){
            this.$axios.post('/order/ordertakingByAndroid',{}).then((res)=>{
                if(res.data.code == 0){
                    let orderIndent = res.data.data.doneOrderList
                    this.balance = parseFloat(res.data.data.user.balance).toFixed(2)
                    this.priceList = orderIndent
                }
            })
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
            console.log(json)
            if ("ORDERTAKING" == json.messegeType) {
                //订单推送处理

            } else if ("ORDERSUCCESS" == json.messegeType) {
                //成功订单
                this.priceList.unshift(json.data)
            } else if ("ORDERTIMEOUT" == json.messegeType || "ORDERTAKINGED" == json.messegeType) {
                //订单超时
            
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
    .price-content-title
        border-bottom:.02rem solid #cacaca
        &>ul
            display flex
            &>li
                flex:0 0 25%
                text-align center
                font-size:.28rem
                line-height:.7rem
                color:#cacaca
    .price-table
        height:9rem
        overflow-y scroll
        .price-content
            .price-list
                &>ul
                    &>li
                        color:#1b3442
                    .ellipsis
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
</style>
