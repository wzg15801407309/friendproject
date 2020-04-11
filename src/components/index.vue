<template>
    <div class="index-warpper">
        <div class="index-head">
            <div class="index-logo"><img src="/static/image/logo.png"></div>
        </div>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in bannerImgs" :key="index">
                <img :src="item.img" style="width: 100%;">
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar
            :text="noticeTxt"
            color="#284f68"
            background="#fff"
            left-icon="volume-o"
            :speed=30
        /> 
        <div class="index-content">
            <div class="line"></div>
            <div class="down-indent">
                <h3>我的下单</h3>
                <ul class="down-content">
                    <li>
                        <div></div>
                        <div>成交总数</div>
                        <div>冻结数量</div>
                        <div>交易成功</div>
                        <div>手续费</div>
                    </li>
                    <li>
                        <div>当日交易</div>
                        <div><span>{{todayDown.countMoney}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayDown.countMoneyD}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayDown.actual_moneyS}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayDown.takingCharge}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                    </li>
                    <li>
                        <div>昨日交易</div>
                        <div><span>{{yesterdayDown.countMoney}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayDown.countMoneyD}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayDown.actual_moneyS}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayDown.takingCharge}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="down-indent">
                <h3>我的接单</h3>
                <ul class="down-content get-content">
                    <li>
                        <div></div>
                        <div>成交总数</div>
                        <div>冻结数量</div>
                        <div>交易成功</div>
                        <div>分红收益</div>
                    </li>
                    <li>
                        <div>当日交易</div>
                        <div><span>{{todayGet.countMoney}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayGet.countMoneyD}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayGet.actual_moneyS}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{todayGet.takingCharge}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                    </li>
                    <li>
                        <div>昨日交易</div>
                        <div><span>{{yesterdayGet.countMoney}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayGet.countMoneyD}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayGet.actual_moneyS}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{yesterdayGet.takingCharge}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                    </li>
                    <li>
                        <div>本月总数</div>
                        <div><span>{{monthNum.countMoney}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{monthNum.countMoneyD}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{monthNum.actual_moneyS}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                        <div><span>{{monthNum.takingCharge}}</span><div class="mayi-icon"><img :src="mayi"></div></div>
                    </li>
                </ul>
            </div>
        </div>   
        <v-foot></v-foot>
    </div>
</template>
<script>
import foot from './public/foot'
import notice from './public/notice'
export default {
    data(){
        return{
            swiperOption: {
                slidesPerView: 2.5,
                spaceBetween: 10,
                freeMode: true,
            },
            bannerImgs: [
                {url: '', img: '/static/image/banner1.png'},
                {url: '', img: '/static/image/banner2.png'},
                {url: '', img: '/static/image/banner3.png'}
            ],
            yesterdayDown:{},
            todayDown:{},
            yesterdayGet:{},
            todayGet:{},
            monthNum:{},
            noticeTxt:'',
            mayi:'/static/image/mayi-icon.png'
        }
    },
    components:{
        'v-foot':foot,
        notice
    },
    created(){
        this.getIndex()
    },
    methods:{
        getIndex(){
            this.$axios.post('/index',{}).then((res)=>{
                if(res.data.code == 0){
                    let order = res.data.data
                    this.noticeTxt = order.notice[0].noticeContent
                    this.todayDown = order.countOrder[0]
                    this.yesterdayDown = order.countOrder1[0]
                    this.todayGet= order.countOrder2[0]
                    this.yesterdayGet = order.countOrder3[0]
                    this.monthNum = order.countOrder4[0]
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .line
        width:100%;
        height:.15rem
        background:#e8eef1
    .index-warpper
       padding-bottom:.6rem
       .index-content
           .down-indent
                &>h3
                    border-bottom:.02rem solid #cacaca
                    font-size:.3rem
                    padding-left:.3rem
                    line-height:.8rem
                    color:#1c4661
                .down-content
                    &>li
                        display flex
                        border-bottom:.02rem solid #cacaca
                        &>div
                            flex:0 0 20%
                            display flex
                            justify-content center
                            font-size:.26rem
                            color:#1c4661
                            text-align:center
                            line-height:.8rem
                            &>span
                                color:#f00
                            .mayi-icon
                                margin-left:.05rem
                                line-height:.6rem
                                width:.34rem
                                height:.34rem
                                &>img
                                    width:100%
                .get-content
                    &>li>div>span
                        color:#3159ce                        
</style>
