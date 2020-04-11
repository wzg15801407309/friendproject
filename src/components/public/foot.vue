<template>
  <div class="footer">
    <ul>
      <li class="footer-list">
        <router-link to="/index">
          <i class="iconfont icon-shouye"></i>
          <span class="footer-txt">首页</span>
        </router-link>
      </li>
      <li class="footer-list"> 
        <router-link :to="hrefPrice"> 
          <i class="iconfont icon-hangqing" ></i>
          <span class="footer-txt">行情</span>
        </router-link>
      </li>
      <li class="footer-list">
        <router-link :to="hrefDeal">
          <i class="iconfont icon-money" ></i>
          <span class="footer-txt">交易</span>
        </router-link>
      </li>
      <li class="footer-list">
        <router-link :to="hrefMine">
          <i class="iconfont icon-wo"></i>
          <span class="footer-txt">我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        hrefPrice: '',
        hrefDeal: '',
        hrefMine: ''
      }
    },
    created() {
       let username = sessionStorage.getItem('username');
        if (!username) {
          this.hrefPrice = '/login'
          this.hrefDeal = '/login'
          this.hrefMine = '/login'
        }else{
          this.hrefPrice = '/price'
          this.hrefDeal = '/deal'
          this.hrefMine = '/mine'
        }
    },
  }
</script>
<style lang="stylus">
  .footer
    position fixed
    width: 100%
    max-width: 640px
    left: 50%
    bottom 0
    transform translateX(-50%)
    display: flex
    height: .8rem
    background: #dcdee9
    border-top:.04rem solid #cacaca
    text-align center
    z-index 10
    & > ul
      width: 100%
      display flex
      .footer-list
        flex: 1
        text-align center
        padding-top .05rem
        .router-link-exact-active
          & > i, .footer-txt
            color: #1296db
        & > a > i
          display block
          font-size: .3rem
          color: #bbbbbb
        & > a
          display: block
          position relative
        & > a >img
          width 0.3rem
          margin 0 auto
          display block
        .footer-txt
          font-size: .16rem
          color: #bbbbbb
          line-height .12rem

</style>
