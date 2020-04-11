<template>
    <section class="price-wrapper">
        <div class="price-head money-head">
            <div class="price-title">
                <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
                <h3>我的资产</h3>
            </div>
            <p>总资产折合</p>
            <h1>{{balance}}(冻结{{freeze}})</h1>
            <h5>≈{{balance | priceFilter}} CNY</h5>
        </div>
        <div class="partition"></div>
        <div class="price-table">
            <div class="price-content-title">
                <ul>
                    <li>传票号</li>
                    <li>用户名称</li>
                    <li>资金方向</li>
                    <li>改变额度</li>
                    <li>当前额度</li>
                    <!-- <li>更新时间</li> -->
                    <li>费用类型</li>
                </ul>
            </div>
            <div class="price-content">
                <div v-if="isShow">
                    <div class="price-content-title price-list" v-for="(item,index) in moneyList" :key="index">
                        <ul>
                            <li class="ellipsis">{{item.orderId}}</li>
                            <li>{{item.userName}}</li>
                            <li><span v-text="item.capCapital == 'A'?'购买':'出售'"></span></li>
                            <li>{{item.changeCoin}}</li>
                            <li>{{item.nowmoney}}</li>
                            <!-- <li>{{item.updtime}}</li> -->
                            <li><span v-if="item.costtype == 'ALI'">支付宝</span><span v-else-if="item.costtype == 'WX'">微信</span><span v-else>银行卡</span></li>
                        </ul>
                    </div>
                </div>
                <div class="no-indent" v-else><img src="/static/image/no-message.png"><p>暂无交易</p></div>
            </div>
        </div>
        <v-foot></v-foot>
    </section>
</template>
<script>
export default {
    data(){
        return{
            price:0,
            noticeTxt:'蚂蚁币新手交易指南',
            moneyList:[],
            isShow:false,
            balance:'0.00',
            freeze:0
        }
    },
    created(){
        this.myMoney()
    },
    methods:{
        returnPrev(){
            this.$router.go(-1)
        },
        myMoney(){
            this.$axios.post('/user/androidFinance',{}).then((res)=>{
                if(res.data.code == 0){
                    this.moneyList = res.data.data.page.list
                    this.balance = res.data.data.userbalance.balance
                    this.freeze = res.data.data.amountmoney
                    if(this.moneyList.length>0){
                        this.isShow = true
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
    @import '../../assets/stylus/price.styl';
    .money-head
        padding-top:0!important;
        height:2.8rem!important;
    .price-title
        &>a
            position absolute
            left:0
            top:0;
            display block
            width:.8rem
            line-height:.8rem
            color:#fff
            text-align center
            .icon-fanhui
                font-size:.4rem
        &>h3
            font-size:.3rem
            color:#eaf8fc
            text-align center
            line-height:.8rem        
    .price-table
        overflow-x scroll
        .price-content-title
            min-width:100%;
            border-bottom:.02rem solid #cacaca
            &>ul
                display flex
                &>li
                    flex:0 0 16.5%
                    text-align center
                    font-size:.24rem
                    line-height:.7rem
                    color:#cacaca
        .price-content
            height 7rem
            overflow-y scroll
            .price-list
                &>ul
                    &>li
                        color:#1b3442
                    .ellipsis
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
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
                    color:#cacaca
                    font-size:.28rem
                    line-height:.6rem            
</style>
