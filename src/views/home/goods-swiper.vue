<style lang="sass" scoped>
.hot_goods_container
  position: relative
  margin-top: 20px
  padding: 20px 30px
  background: #fff
  overflow: hidden

  >.icon_btn
    position: absolute
    width: 40px
    height: 16%
    top: 40%
    z-index: 2
    border: none
    outline: 0
    cursor: pointer
    color: #1f2a44
    font-weight: bolder
    transition: all .4s ease-out
    background: #f8f8f8
    box-shadow: 0 0 3px 1px rgba(0,0,0,.2)

    &[disabled]
      opacity: .4

    &:hover
      box-shadow: 0 0 5px 2px rgba(0,0,0,.2)

  >.left
    left: 0
    border-radius: 0 3px 3px 0

  >.right
    right: 0
    border-radius: 3px 0 0 3px

.goods_swiper
  margin-top: 40px
  // swiper 父组件原本设置的为 overflow: hidden，但是把 rank_number 隐藏了，所以把 overflow: hidden 设置给上面的 hot_goods_container
  overflow: initial

.goods_card
  >.rank_number
    position: absolute
    height: 24px
    width: 24px
    margin-top: -30px
    text-align: center
    line-height: 24px
    font-size: 14px
    font-family: Roboto, sans-serif
    border-radius: 50%
    color: #666
    background: #fff
    border: 1px solid #aaa

  >.rank_number_first
    color: #fff
    background: #d9a300
    border: 1px solid #d9a300
    text-shadow: 1px 1px 2px #8d6a00

  >.rank_number_last
    color: #fff
    background: #999
    border: 1px solid #999

.recent_goods_container
  margin-top: 20px
  padding: 20px 30px
  background: #fff

  >.goods_list
    margin-top: 20px
    display: flex
    justify-content: space-between

    >.goods_card
      flex: 1
</style>

<template lang="pug">
section
  .container.hot_goods_container
    h2.tc 人气商品排行榜
    button.icon_btn.left(@click="slideTo('slidePrev')" :disabled="activeIndex === 0"): i.i-return
    button.icon_btn.right(@click="slideTo('slideNext')" :disabled="activeIndex === 10"): i.i-enter
    swiper.goods_swiper(:options="swiperOption" ref="mySwiper")
      swiper-slide(v-for="n in 20" :key="n")
        GoodsCard
          .rank_number(:class="n < 4 ? 'rank_number_first' : (n > 10 ? 'rank_number_last' : '')") {{n}}

  .container.recent_goods_container
    h2.tc 最近浏览过的商品
    .goods_list
      GoodsCard.goods_card(v-for="n in 10" :key="n" :to="'1'")
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import GoodsCard from 'components/GoodsCard'

@Component({
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  components: {
    GoodsCard,
  },
})
export default class GoodsSwiper extends Vue {
  activeIndex = 0
  swiperOption = {
    slidesPerView: 10, // 设置slider容器能够同时显示的slides数量
    spaceBetween: 18,
    slidesPerGroup: 10, // 在carousel mode下定义slides的数量多少为一组。
  }

  slideTo(dir) {
    this.swiper[dir]()
    this.activeIndex = this.swiper.activeIndex
  }
}
</script>
