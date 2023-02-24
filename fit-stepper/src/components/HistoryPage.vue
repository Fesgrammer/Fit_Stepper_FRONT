<template>
  <div>
    <h1>履歴確認画面</h1>
    <div class="v104_3">
      <div class="v104_12">
        <div class="v104_13"></div>
        <span class="v104_14">履歴</span>
      </div>
      <div class="recordListArea">
        <div v-for="i of recordList" :key="i" class="recordList">
          <div class="recordListInner">
            <p>{{ i.date }}</p>
            <p>{{ buiList[i.bui_id - 1].bui_name }}</p>
            <p>{{ eventList[i.event_id - 1].event_name }}</p>
            <p>{{ i.amount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPage",
  data() {
    return {
      eventList: [
        { event_id: 1, event_name: "ベンチプレス" },
        { event_id: 2, event_name: "プッシュアップ" },
        { event_id: 3, event_name: "チンニング" },
      ],
      buiList: [
        { bui_id: 1, bui_name: "上腕2" },
        { bui_id: 2, bui_name: "上腕3" },
        { bui_id: 3, bui_name: "腕" },
      ],
      recordList: [
        {
          motion_id: 1,
          user_id: 1,
          bui_id: 1,
          event_id: 1,
          amount: 10,
          date: "aaaaa",
        },
        {
          motion_id: 2,
          user_id: 1,
          bui_id: 1,
          event_id: 2,
          amount: 30,
          date: "aaaaa",
        },
        {
          motion_id: 3,
          user_id: 1,
          bui_id: 1,
          event_id: 1,
          amount: 10,
          date: "aaaaa",
        },
        {
          motion_id: 4,
          user_id: 1,
          bui_id: 1,
          event_id: 2,
          amount: 90,
          date: "aaaaa",
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-size: 14px;
}

div.recordListArea {
  width: 90%;
  height: 500px;
  margin: 0 auto;
}
div.recordList {
  width: 300px;
  height: 200px;
  margin: 30px auto 0 auto;
  background: #ffe37f;
}
div.recordListInner {
  width: 90%;
  height: 90%;
  margin: 0 auto;
}

/*ウィンドウ*/
.v104_3 {
  width: 393px;
  height: 852px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

/**/
.v104_12 {
  width: 393px;
  height: 137px;
  /*background: url("../images/v104_12.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

/**/
.v104_13 {
  width: 393px;
  height: 137px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

.v104_14 {
  width: 331px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 56px;
  left: 31px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}

.v104_23 {
  width: 50px;
  height: 50px;
  /*background: url("../images/v104_23.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 66px;
  left: 14px;
  overflow: hidden;
}

.v104_4 {
  width: 145px;
  height: 342px;
  /*background: url("../images/v104_4.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 196px;
  left: 124px;
  overflow: hidden;
}

.v104_5 {
  width: 63px;
  height: 64px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 40px;
  border-radius: 50%;
}

.v104_6 {
  width: 63px;
  height: 56px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 146px;
  left: 40px;
  overflow: hidden;
}

.v104_7 {
  width: 78px;
  height: 67px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 72px;
  left: 33px;
}

.v104_8 {
  width: 22px;
  height: 131px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 72px;
  left: 0px;
  overflow: hidden;
}

.v104_9 {
  width: 22px;
  height: 131px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 72px;
  left: 122px;
  overflow: hidden;
}

.v104_10 {
  width: 27px;
  height: 131px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 210px;
  left: 40px;
  overflow: hidden;
}

.v104_11 {
  width: 27px;
  height: 131px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 210px;
  left: 77px;
  overflow: hidden;
}

.v104_18 {
  width: 393px;
  height: 117px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 735px;
  left: 1px;
  overflow: hidden;
}

/*ホーム*/
.v104_19 {
  width: 50px;
  height: 50px;
  /*background: url("アイコン/ホーム.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 753px;
  left: 36px;
  overflow: hidden;
}

/*ランキング*/
.v104_20 {
  width: 50px;
  height: 50px;
  /*background: url("アイコン/ランキング.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 753px;
  left: 309px;
  overflow: hidden;
}

/*入力*/
.v104_21 {
  width: 50px;
  height: 50px;
  /*background: url("アイコン/入力.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 753px;
  left: 127px;
  overflow: hidden;
}

/*履歴*/
.v104_22 {
  width: 50px;
  height: 50px;
  /*background: url("アイコン/履歴.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 753px;
  left: 218px;
  overflow: hidden;
}

.v104_15 {
  width: 324px;
  height: 127px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 582px;
  left: 35px;
  overflow: hidden;
}

.v104_16 {
  width: 324px;
  height: 127px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

.v104_17 {
  width: 275px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 24px;
  left: 21px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 64px;
  opacity: 1;
  text-align: center;
}

/*入力ページ*/
.v64_29 {
  width: 393px;
  height: 137px;
  /*background: url("../images/v64_29.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_30 {
  width: 393px;
  height: 137px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_31 {
  width: 331px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 56px;
  left: 31px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}
.v64_36 {
  width: 393px;
  height: 100px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: absolute;
  top: 752px;
  left: 0px;
  overflow: hidden;
}
.name {
  color: #fff;
}
.v64_136 {
  width: 341px;
  height: 81px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 233px;
  left: 26px;
  overflow: hidden;
}
.v64_118 {
  width: 341px;
  height: 81px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_117 {
  width: 125px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 4px;
  left: 108px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}
.v64_139 {
  width: 341px;
  height: 81px;
  /*background: url("../images/v64_139.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 590px;
  left: 26px;
  overflow: hidden;
}
.v64_119 {
  width: 341px;
  height: 81px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_122 {
  width: 125px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 4px;
  left: 108px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}
.v64_138 {
  width: 341px;
  height: 81px;
  /*background: url("../images/v64_138.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 471px;
  left: 26px;
  overflow: hidden;
}
.v64_120 {
  width: 341px;
  height: 81px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_123 {
  width: 125px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 4px;
  left: 108px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}
.v64_137 {
  width: 341px;
  height: 81px;
  /*background: url("../images/v64_137.png");*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 352px;
  left: 26px;
  overflow: hidden;
}
.v64_121 {
  width: 341px;
  height: 81px;
  background: rgba(217, 217, 217, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v64_124 {
  width: 125px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 4px;
  left: 108px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 40px;
  opacity: 1;
  text-align: center;
}
.v64_125 {
  width: 400px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 137px;
  left: 4px;
  font-family: Inter;
  font-weight: Regular;
  font-size: 20px;
  opacity: 1;
  text-align: center;
}
</style>
