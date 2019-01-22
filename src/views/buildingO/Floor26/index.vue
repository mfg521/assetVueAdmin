<template>
  <div class="ivu-layout" style="width: 100%; height: 100%; flex: 0 1 auto; ">
    <div class="ivu-layout-content" style="height: 100%">
      <div style="height: 100%">

        <!--<div class="floorsix" v-show="changeIsShow" :class="{'meng ': changeIsShow}" style="height: 0%">-->
        <div class="floor2six" style="height: 0% ">
            <a><div class="one_2six" @click="clickForRoomInfo(2601)"></div></a>
            <a><div class="two_2six" @click="clickForRoomInfo(2602)"></div></a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //name: 'floor6',
    data() {
      return {}
    },
    methods: {
      clickForRoomInfo(roomNum) {
        this.$store.dispatch('getEmployeeBlock', {roomNum})
        this.$router.push({
          name: 'room'
        })
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .floor2six {

    width: 100%
    padding-bottom 50%
    background: url("./../../../../static/images/floor/26Floor.jpg") no-repeat
    background-size: 100% //背景图片所占夫级的百分比
    position: relative
    text-align: center
    height 0Px
  }

  div.floor2six div {
    border 2px solid #000000
    margin-right -2px
    margin-bottom -2px

  }

  div.floor2six div:hover {
    border 2px solid blue
    background-color rgba(150, 150, 91, 0.51)

  }

  .one_2six {
    width: 51.4%
    padding-bottom 46.4% //这个是宽度的百分比
    height 0px
    background-color rgba(75, 70, 91, 0.51)
    float left
    flex 1 1 auto
  }

  .two_2six {
    width: 48.6%
    padding-bottom 46.4% //这个是宽度的百分比
    height 0px
    background-color rgba(150, 70, 50, 0.51)
    float left
    border-bottom white 2px solid
  }


</style>

