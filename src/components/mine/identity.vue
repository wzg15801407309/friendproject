<template>
    <section class="identity-wrapper">
        <div class="identity-head">
            <a href="javascript:;" @click="returnPrev"><i class="iconfont icon-fanhui"></i></a>
            <h1>身份验证</h1>
        </div>
        <div class="identity-content">
            <ul>
                <li>
                    <h3>国家或地区</h3>
                    <h3>中国</h3>
                </li>
                <li>
                    <h3>法人姓名</h3>
                    <input type="text" placeholder="请输入法人姓名" v-model="name">
                </li>
                <li>
                    <h3>法人身份证号</h3>
                    <input type="text" placeholder="请输入法人身份证号" v-model="card">
                </li>
            </ul>
        </div>
        <button class="identity-next" @click="next">下一步</button>
    </section>
</template>
<script>
export default {
    data(){
        return{
            name:'',
            card:''
        }
    },
   
    methods:{
        
        returnPrev(){
            this.$router.go(-1)
        },
        next(){
            if(this.name == ''){
                this.Toast({message: '请输入您的姓名',duration:1200});
                return;
            }
            if(this.card == ''){
                this.Toast({message: '请输入您的身份证号',duration:1200});
                return;
            }
            this.$router.push('/merchant?name='+this.name+'&card='+this.card)
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/submit.styl';
</style>
