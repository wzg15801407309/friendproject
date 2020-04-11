<template>
     <van-notice-bar
        :text="noticeTxt"
        :scrollable="false"
        color="#284f68"
        background="#fff"
        left-icon="volume-o"
        :speed=30
    />    
</template>
<script>
export default {
    data(){
        return{
            noticeTxt:'蚂蚁币新手交易指南'
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
