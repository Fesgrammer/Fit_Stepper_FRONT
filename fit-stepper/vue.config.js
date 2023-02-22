//const { defineConfig } = require('@vue/cli-service')

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "動作確認用ホーム",
    },
    home: {
      entry: "src/home.js",
      template: "public/home.html",
      filename: "home.html",
      title: "ホーム",
    },
    regist: {
      entry: "src/regist.js",
      template: "public/regist.html",
      filename: "regist.html",
      title: "運動記録登録",
    },
    history: {
      entry: "src/history.js",
      template: "public/history.html",
      filename: "history.html",
      title: "運動履歴",
    },
    ranking: {
      entry: "src/ranking.js",
      template: "public/ranking.html",
      filename: "ranking.html",
      title: "ランキング",
    },
  },
};
