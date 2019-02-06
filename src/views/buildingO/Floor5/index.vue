<template>
  <div class="ivu-layout" style="width: 100%; height: 100%; flex: 0 1 auto; ">
    <div class="ivu-layout-content" style="height: 100%">
      <div style="height: 100%">

        <!--<div class="floorsix" v-show="changeIsShow" :class="{'meng ': changeIsShow}" style="height: 0%">-->
        <div class="floorfive" style="height: 0% ">
          <a>
            <div class="one_five" @click="clickForRoomInfo(521)" @mouseover=""></div>
          </a>
          <a><div class="two_five" @click="clickForRoomInfo(525)"></div></a>
          <a><div class="four_five" @click="clickForRoomInfo(529)"></div></a>
          <a>
            <div class="five_five" @click="clickForRoomInfo(535)"></div>
          </a>
          <a>
            <div class="ten_five" @click="clickForRoomInfo(505)"></div>
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

  .floorfive {

    width: 100%
    padding-bottom 50%
    background: url("./../../../../static/images/floor/5thFloor.png") no-repeat
    background-size: 100% //背景图片所占夫级的百分比
    position: relative
    text-align: center
    height 0Px
  }

  div.floorfive div {
    border 2px solid #000000
    margin-right -1px

  }

  div.floorfive div:hover {
    border 2px solid blue
    background-color rgba(150, 150, 91, 0.51)

  }

  .one_five {
    width: 28%
    padding-bottom 13% //这个是宽度的百分比
    height 0px
    background-color rgba(75, 70, 91, 0.51)
    float left
    flex 1 1 auto
  }

  .two_five {
    width: 14%
    padding-bottom 13% //这个是宽度的百分比
    height 0px
    background-color rgba(30, 20, 91, 0.51)
    float left
  }

  .three_five {
    width: 16%
    padding-bottom 13% //这个是宽度的百分比
    height 0px
    background-color rgba(150, 70, 50, 0.51)
    float left
  }

  .four_five {
    position: absolute;
    left: 50%
    width: 14%
    padding-bottom 13% //这个是宽度的百分比
    height 0px
    background-color rgba(200, 0, 50, 0.51)
    float left
  }

  .five_five {
    position: absolute;
    top: 0%
    left: 71%
    width: 29%
    padding-bottom: 14%
    background-color rgba(30, 20, 91, 0.51)
    float left
    height 0px
  }

  //下部分

  .seven_five {
    position: absolute;
    top: 63.5%
    width: 20%
    padding-bottom: 15%
    background-color rgba(75, 70, 91, 0.51)
    float left
    height 0px
  }

  .eight_five {
    position: absolute;
    top: 59.5%
    left: 20%
    width: 22%
    padding-bottom: 17%
    background-color rgba(30, 20, 91, 0.51)
    float left
    height 0px
  }

  .ten_five {
    position: absolute;
    top: 59.5%
    left: 57%
    width: 23%
    padding-bottom: 17%
    background-color rgba(200, 0, 50, 0.51)
    float left
    height 0px
  }

  .eleven_five {
    position: absolute;
    top: 63.5%
    left 80%
    width: 20%
    padding-bottom: 15%
    background-color rgba(10, 100, 91, 0.51)
    float left
    height 0px
  }


</style>

