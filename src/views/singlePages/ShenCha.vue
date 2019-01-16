<template>
  <div>
    <div class="msite">
      <mt-header class="mt-header" title="资产详细信息">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="$router.back()">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <mt-cell title="assetModel">
      <span>{{form.computerModel}}</span>
    </mt-cell>
    <mt-cell title="assetClass">
      <span>{{form.assetType}}</span>
    </mt-cell>
    <mt-cell title="serialNumber">
      <span>{{form.serialNumber}}</span>
    </mt-cell>
    <mt-cell title="taggerNumber">
      <span>{{form.taggerNumber}}</span>
    </mt-cell>
    <mt-cell title="financeNumber">
      <span>{{form.financeCode}}</span>
    </mt-cell>
    <mt-cell title="beijingCode">
      <span>{{form.beijingCode}}</span>
    </mt-cell>
    <mt-cell title="责任人">
      <span>{{form.employeeName}}</span>
    </mt-cell>
    <mt-cell title="floor">
      <span>{{form.floor}}</span>
    </mt-cell>
    <mt-cell title="roomNum">
      <span>{{form.roomNum}}</span>
    </mt-cell>
    <mt-cell title="borrowedDate">
      <span>{{form.borrowedDate}}</span>
    </mt-cell>
    <mt-cell title="borrowedDate">
      <span>{{form.borrowedDate}}</span>
    </mt-cell>
    <mt-button type="primary" style="width: 48%;margin-left: 1.5%; height: 3rem;" @click="handleConfire">确认信息</mt-button>
    <mt-button type="danger" style="width: 48%; height: 3rem;" @click="handleError">报错</mt-button>

  </div>

</template>

<script>
  import {addObj, reqShenChaInfo} from '../../api/asset/shencha';
  import {mapGetters} from 'vuex';
  import {MessageBox,Toast} from 'mint-ui';

  export default {

    data() {
      return {
        form: {},
        error: {}
      }
    },
    mounted: function () {
      this.getUsers(this.$route.query.serialNumber);
    },

    methods: {
      getUsers(serialNumber) {
        reqShenChaInfo(serialNumber)
          .then(response => {
            this.form = response.data;
          })

      },

      handleConfire(){
        this.error={};
        this.error.serialNumber=this.$route.query.serialNumber;
        this.error.submitPeople = this.name;
        addObj(this.error)
        Toast("操作成功");
      },

      handleError() {
        MessageBox.prompt('请输入报错信息').then(({value, action}) => {
          console.log(this.name)
          this.error={}
          this.error.submitPeople = this.name;
          this.error.submitInfo = value;
          this.error.submitType = 0;
          this.error.serialNumber = this.form.serialNumber;
          this.error.roomNum=this.form.roomNum;
          if (action === 'confirm') {
            addObj(this.error)
          }
        });
      }
    },
    computed: {
      ...mapGetters([
        'name',
      ])
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .msite
    width 100%
    .mt-header
      font-size 1.2rem
      height 4rem
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          height 10%
          font-size 25px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
      .go_back
        position absolute
        top 12px
        left 15px
        width 30px
        height 30px
        > .iconfont
          font-size 30px
          color #999

  .mint-cell
    height: 4rem;
    .mint-cell-wrapper
      .mint-cell-title
        .mint-cell-text
          font-size: 1.2rem;
          margin-left: 15px;
          font-weight: bold;
</style>
