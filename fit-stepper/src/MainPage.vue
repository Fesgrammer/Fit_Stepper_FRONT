<template>
  <div>
    <h1>各ページへのリンク＜動作確認用＞</h1>
    <hr />
    <a @click="changeTab(1)">ホーム・育成</a><br />
    <a @click="changeTab(2)">運動記録登録</a><br />
    <a @click="changeTab(3)">運動履歴</a><br />
    <a @click="changeTab(4)">ランキング</a><br />

    <!--コンポーネント-->
    <home-page v-if="tabNo == 1" />
    <regist-page v-if="tabNo == 2" />
    <history-page v-if="tabNo == 3" />
    <ranking-page v-if="tabNo == 4" />
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
</style>
