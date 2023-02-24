<template>
  <div>
    <!--コンポーネント-->
    <home-page v-if="tabNo == 1" />
    <regist-page v-if="tabNo == 2" />
    <history-page v-if="tabNo == 3" />
    <ranking-page v-if="tabNo == 4" />

    <!--タブエリア-->
    <div class="tabArea">
      <div class="tabContents" @click="changeTab(1)">
        <div class="tabContentsInner">ホーム</div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(2)">記録</div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(3)">履歴</div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(4)">ランキング</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import RegistPage from "./components/RegistPage.vue";
import HistoryPage from "./components/HistoryPage.vue";
import RankingPage from "./components/RankingPage.vue";

export default {
  name: "MainPage",
  components: {
    HomePage,
    RegistPage,
    HistoryPage,
    RankingPage,
  },
  data() {
    return {
      tabNo: 1,
    };
  },
  methods: {
    changeTab: function (i) {
      this.tabNo = i;
    },
  },
};
</script>

<style>
div.tabArea {
  width: 393px;
  height: 100px;
  background: #cacaca;
}
div.tabContents {
  width: 25%;
  height: 100%;
  background: #8ee99f;
  float: left;
  cursor: pointer;
}
div.tabContentsInner {
  width: 90%;
  height: 90%;
  background: #ffffff;
  margin: 0 auto;
}
</style>
