<template>
    <section>
        <div class="pay-warrper">
            <div class="identity-head">
                <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
                <h1>支付方式</h1>
            </div>
            <div class="pay-content">
                <ul>
                    <li>
                        <router-link to="/addPay">
                            <h3>+ 添加支付方式</h3>
                            <p>请务必使用您本人的实名账户，被激活的支付方式将在交易时向买方展示最多激活一种。</p>
                            <i class="iconfont icon-youjiantou"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="pay-content">
                <ul>
                    <li>
                        <h3>已启用收款账号<span>(点击账号修改支付方式)</span></h3>
                    </li>
                    <li v-for="(item,index) in startWay" :key="index">
                        <div class="pay-way" v-if="item.accType == 'ALI'">
                            <div><img src="/static/image/apliay.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div>
                        <div class="pay-way"  v-if="item.accType == 'WX'">
                            <div><img src="/static/image/weixin.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div> 
                        <div class="pay-way"  v-if="item.accType == 'CUP'">
                            <div><img src="/static/image/bank.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div>  
                        <div class="pay-operate">
                            <a href="javascript:;" @click="delWay(item)">删除</a>
                            <van-switch :value="item.status == 1" @input="onInput(item)" class="pay-switch" size="24px"/>
                        </div>
                    </li>
                    <li>
                        <h3>备用收款账号<span>(点击账号修改支付方式)</span></h3>
                    </li>
                      <li v-for="(item,index) in endWay" :key="index+1000">
                        <div class="pay-way" v-if="item.accType == 'ALI'">
                            <div><img src="/static/image/apliay.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div>
                        <div class="pay-way"  v-if="item.accType == 'WX'">
                            <div><img src="/static/image/weixin.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div> 
                        <div class="pay-way"  v-if="item.accType == 'CUP'">
                            <div><img src="/static/image/bank.png"></div>
                            <h3 @click="toEdit(item)">{{item.accNum}}</h3>
                        </div>  
                        <div class="pay-operate">
                            <a href="javascript:;" @click="delWay(item)">删除</a>
                            <van-switch :value="item.status == 1" @input="onInput(item)" class="pay-switch" size="24px"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
            startWay:[],
            endWay:[]
        }
    },
    created(){
        this.getWay()
    },
    methods:{
        returnPrev(){
            this.$router.push('/mine')
        },
        // 切换开关
        onInput(item){
            console.log(item)
            Dialog.confirm({
                title: '提醒',
                message: '是否切换开关？'
            }).then(() => {
                this.$axios.post('/system/accountNum/edit_status',{
                    accType:item.accType,
                    id:item.id,
                    status:item.status
                }).then((res)=>{
                    this.getWay()
                })
            });
        },
        // 删除方式
        delWay(item){
            Dialog.confirm({
                title: '删除',
                message: '是否删除该支付方式？'
            }).then(() => {
                this.$axios.post('/system/accountNum/deleteid',{
                    id:item.id
                }).then((res)=>{
                    if(res.data.code == 0){
                        this.Toast({message: '删除成功',duration:1200,type:'success'});
                        this.getWay()
                    }else{
                        this.Toast({message: res.data.msg,duration:1200});
                    }
                })
            });
        },
        getWay(){
            this.startWay=[]
            this.endWay=[]
            this.$axios.post('/user/androidPayList',{}).then((res)=>{
                if(res.data.code == 0){
                    let way = res.data.data
                    if(way.length>0){
                        way.forEach((val)=>{
                            if(val.status == 1){
                                this.startWay.push(val)
                            }else{
                                this.endWay.push(val)
                            }   
                        })
                    }
                   
                    
                }else{
                    this.Toast({message: res.data.msg,duration:1200});
                }
            })
        },
        toEdit(item){
            sessionStorage.setItem('editPay',JSON.stringify(item))
            this.$router.push('/editPayWay')
        }
    }
}
</script>
<style lang="stylus" scoped>
    .pay-warrper
        .identity-head
            border-bottom:.02rem solid #cacaca
            &>a
                display block
                width:.8rem
                line-height:.8rem
                text-align center
                .icon-fanhui
                    font-size:.5rem
            &>h1
                font-size:.54rem
                color:#1b3442
                padding-left:.6rem
                padding-bottom:.3rem
                font-weight:600
        .pay-content
            &>ul>li
                display flex
                justify-content space-between
                border-bottom:.02rem solid #cacaca
                &>a
                    display block
                    width:100%;
                    position relative
                    &>h3
                        font-size:.28rem
                        color:#284f68
                        text-align center
                        padding-top:.4rem
                    &>p
                        font-size:.24rem
                        color:#c5c5c5
                        text-align center
                        padding:0 .8rem
                    &>i
                        font-size:.4rem
                        color:#c5c5c5
                        position absolute
                        right:.25rem
                        top:.5rem
                &>h3
                    font-size:.32rem
                    color:#284f68
                    font-weight:bold
                    line-height:.8rem
                    padding-left:.4rem
                    &>span
                        font-size:.24rem
                        color:#cacaca
                .pay-way
                    display flex
                    padding:.2rem .3rem
                    &>div
                       width:.8rem
                       height:.8rem
                       &>img
                           width:100%
                    &>h3
                        margin-left:.15rem
                        font-size:.28rem
                        color:#284f68
                        line-height:.8rem
                .pay-operate
                    padding-right:.3rem
                    &>a
                        font-size:.28rem
                        color:#c5c5c5
                        margin-right:.3rem
                        line-height:1.2rem
                    .pay-switch
                        position relative
                        top:10%;
</style>
