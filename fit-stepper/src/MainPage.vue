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
        <div class="tabContentsInner">
          <img src="@/assets/tab/home.png" alt="ホーム" />
        </div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(2)">
          <img src="@/assets/tab/regist.png" alt="記録" />
        </div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(3)">
          <img src="@/assets/tab/history.png" alt="履歴" />
        </div>
      </div>
      <div class="tabContents">
        <div class="tabContentsInner" @click="changeTab(4)">
          <img src="@/assets/tab/ranking.png" alt="ランキング" />
        </div>
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
div.tabArea img {
  width: 80%;
  height: auto;
}
div.tabContents {
  width: 25%;
  height: 100%;
  float: left;
  cursor: pointer;
  text-align: center;
}
div.tabContentsInner {
  width: 90%;
  height: 90%;
  margin: 0 auto;
}
</style>
