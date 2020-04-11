<template>
    <div class="invite-wrapper">
        <div class="invite-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
        </div>
        <div class="invite-content">
            <div class="invite-txt"><img src="/static/image/invite-title.png"></div>
            <h3>{{inviteCode}}</h3>
            <a href="javascript:;" class="invite-copy">复制</a>
            <p>{{inviteUrl}}</p>
            <a href="javascript:;" class="invite-copy">复制</a>
            <div class="invite-line"></div>
            <div class="invite-info">
                <div class="invite-num">
                    <h3>邀请人数</h3>
                    <p>{{inviteNum}}</p>
                </div>
                <div class="invite-money">
                    <h3>累计获得返佣</h3>
                    <p>{{getInvite}}</p>
                </div>
            </div>
        </div>
        <h3>邀请记录</h3>
        <div class="invite-people">
            <ul class="people-title">
                <li><h3>账号</h3></li>
                <li><p>时间</p></li>
                <!-- <li><p>返佣</p></li> -->
            </ul>
            <ul v-for="(item,index) in inviteList" :key="index">
                <li><h3>{{item.userName}}</h3></li>
                <li><p>{{item.createTime}}</p></li>
                <!-- <li><p>￥10.00</p></li> -->
            </ul>
            <p v-if="inviteList.length == 0">暂无邀请记录</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            inviteCode:'',
            inviteUrl:'',
            inviteNum:'',
            getInvite:0,
            inviteList:[]
        }
    },
    created(){
        this.$axios.post('/user/androidInvite',{}).then((res)=>{
            if(res.data.code == 0){
                this.inviteCode = res.data.data.e
                this.inviteNum = res.data.data.userCount
                this.inviteList = res.data.data.userList
                this.inviteUrl = window.location.host+'/system/invitre/'+this.inviteCode
            }else{
                Toast({message: res.data.msg,duration:1200});
            }
        })
    },
    methods:{
        returnPrev(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .invite-wrapper
        background:#fefefe url(/static/image/invite-bg.png) no-repeat
        background-size:100%;
        .invite-head
            &>a
                display block
                width:.8rem
                line-height:.8rem
                text-align center
                color:#fff
                .icon-fanhui
                    font-size:.5rem
        .invite-content
            width:6rem
            background:#fff
            border-radius:.15rem
            margin:.4rem auto
            padding:.4rem .2rem
            box-sizing:border-box
            box-shadow:0 0 .3rem .01rem #ccc
            .invite-txt
                width:100%;
                margin-top:.1rem
                &>img
                    width:100%; 
            &>h3
                font-size:.5rem
                font-weight:bold
                text-align center
                color:#1296db
                line-height:1.2rem
            .invite-copy
                display block
                width:2rem
                color:#fff
                text-align center
                font-size:.32rem
                font-weight:bold
                margin:0 auto
                line-height:.6rem
                border-radius:.1rem
                background:#1296db
            &>p
                font-size:.3rem
                font-weight:bold
                text-overflow ellipsis
                overflow hidden
                color:#1b3442
                white-space:nowrap
                line-height:1.2rem
                text-align cneter
                width:5rem
                margin:0 auto
            .invite-line
                margin-top:.4rem         
                width:100%;
                background:#0079de
                height:.04rem
            .invite-info    
                display flex
                padding-top:.4rem
                justify-content space-between
                .invite-num
                    flex:0 0 1.5rem
                &>div
                    &>h3
                       font-size:.3rem
                       color:#1b3442
                       line-height:.4rem
                       font-weight:bold
                       text-align center 
                    &>p
                       font-size:.26rem
                       color:#1b3442
                       line-height:.4rem
                       font-weight:bold
                       text-align center    
        &>h3
            font-size:.3rem
            color:#284f68
            line-height:.8rem
            padding-left:.44rem
            font-weight:bold
        .invite-people
            background:#e8eef1
            height:5rem
            overflow-y scroll
            .people-title
                h3
                    line-height:.8rem
                p    
                    line-height:.8rem
            &>ul
               display flex
               &>li
                    flex:0 0 50%  
                    padding-left:.2rem
                    box-sizing:border-box
                    border-bottom:.02rem solid #ccc
                    text-align center
                    &>h3
                        font-size:.28rem
                        color:#284f68
                        line-height:.6rem
                    &>p
                        font-size:.28rem
                        color:#284f68
                        line-height:.6rem
            &>p
                width:100%;
                background:#e8eef1
                text-align center
                color:#284f68
                font-size:.24rem
                line-height:.8rem
</style>
