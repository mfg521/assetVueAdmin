<template>
  <div class="ivu-layout" style="width: 100%; height: 100%; flex: 0 1 auto; ">
    <div class="ivu-layout-content" style="height: 100%">
      <div style="height: 100%">

        <!--<div class="floorsix" v-show="changeIsShow" :class="{'meng ': changeIsShow}" style="height: 0%">-->
        <div class="floor3" style="height: 0% ">
          <a>
            <div class="one_3floor" @click="clickForRoomInfo(301)" @mouseover=""></div>
          </a>
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
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .floor3 {

    width: 100%
    padding-bottom 80%
    background: url("./../../../../static/images/floor/3rdFlr.jpg") no-repeat
    background-size: 100% //背景图片所占夫级的百分比
    position: relative
    text-align: center
    height 0Px
  }

  div.floor3 div {
    border 2px solid #000000
    margin-right -1px

  }

  div.floor3 div:hover {
    border 2px solid blue
    background-color rgba(150, 150, 91, 0.51)

  }

  .one_3floor {
    width: 100%
    padding-bottom 90% //这个是宽度的百分比
    height 0px
    background-color rgba(75, 70, 91, 0.51)
    float left
    flex 1 1 auto
  }


</style>

