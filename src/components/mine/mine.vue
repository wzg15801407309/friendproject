<template>
    <section class="mine-wrapper">
        <div class="mine-head">
            <div class="mine-avatar"><img src="/static/image/avatar.png"></div>
            <div class="mine-info">
                <h3>{{username}}</h3>
                <!-- <p>UID:{{userId}}</p> -->
            </div>
        </div>
        <div class="line"></div>
        <div class="mine-list">
            <ul>
                <li>
                    <router-link :to="item.href" v-for="(item,index) in userList" :key="index">
                        <i class="iconfont" :class="item.icon"></i>
                        <p>{{item.name}}</p>
                        <i class="iconfont icon-youjiantou"></i>
                    </router-link>
                </li>
            </ul>
            <div class="line"></div>
            <ul>
                <li>
                    <router-link :to="item.href" v-for="(item,index) in safeList" :key="index">
                        <i class="iconfont" :class="item.icon"></i>
                        <p>{{item.name}}</p>
                        <i class="iconfont icon-youjiantou"></i>
                    </router-link>
                </li>
            </ul>
            
        </div>
        <v-foot></v-foot>
    </section>
</template>
<script>
import foot from '../public/foot'
export default {
    data(){
        return{
            username:this.global().username,
            userList:[
                {icon:'icon-zichan',name:'我的资产',href:'/mineMoney'},
                {icon:'icon-layer',name:'订单管理',href:'/indentList'},
                {icon:'icon-money',name:'邀请返佣',href:'/invite'},
                {icon:'icon-shoukuan',name:'收款方式',href:'/payWay'},
            ],
            safeList:[
                {icon:'icon-sign',name:'身份认证',href:'/identityInfo'},
                {icon:'icon-success',name:'安全中心',href:'/safeCenter'}
            ]
        }
    },
    methods:{
        
    },
    components:{
        'v-foot':foot
    }
}
</script>
<style lang="stylus" scoped>
    .line
        width:100%;
        height:.15rem
        background:#e8eef1
    .mine-wrapper
       .mine-head
            display flex
            padding:.4rem .15rem
            .mine-avatar
                margin-right:.15rem
                width:1.5rem 
                &>img
                    width:100%
            .mine-info
                &>h3
                    font-size:.46rem
                    color:#284f68
                    font-weight:bold
                    line-height:1rem
                &>p
                    font-size:.28rem
                    color:#284f68 
        .mine-list
            &>ul
               &>li
                 &>a
                    display flex
                    padding:0 .15rem
                    border-bottom:.02rem solid #cacaca
                    justify-content space-between
                    line-height:1rem
                    &>i
                        flex:0 0 .7rem
                        font-size:.6rem
                        color:#1296db
                        text-align center
                    &>p
                        flex:1
                        font-size:.28rem
                        color:#284f68
                        padding-left:.2rem
                    .icon-youjiantou
                        font-size:.4rem
                        color:#cacaca
                     
</style>
