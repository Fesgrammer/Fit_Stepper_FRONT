<template>
  <div>
    <div class="v104_3">
      <div class="v104_12">
        <div class="v104_13"></div>
        <span class="v104_14">データ入力</span>
      </div>
      <div class="buiButtonArea" v-if="buiButtonAreaIsShow">
        <h2>部位を選択してください。</h2>
        <div v-for="i of buiList" :key="i" class="buttonList">
          <div class="buttonListInner" @click="selectBui(i.bui_id, i.bui_name)">
            <p>{{ i.bui_name }}</p>
          </div>
        </div>
      </div>
      <div class="eventButtonArea" v-if="eventButtonAreaIsShow">
        <h2>種目を選択してください。</h2>
        <div v-for="j of eventList" :key="j" class="buttonList">
          <div
            class="buttonListInner"
            @click="selectEvent(j.event_id, j.event_name)"
          >
            <p>{{ j.event_name }}</p>
          </div>
        </div>
        <button @click="backToBuiList()">前へ</button>
      </div>
      <div class="inputArea" v-if="inputAreaIsShow">
        <h2>運動量を入力して、「登録」を押してください。</h2>
        <p>部位：{{ selectedBuiName }}</p>
        <p>種目：{{ selectedEventName }}</p>
        <p>運動量：</p>
        <input v-model="amount" /><br />
        <button @click="backToEventList()">前へ</button>
        <button @click="regist()">登録</button>
      </div>
      <div class="completedArea" v-if="completedAreaIsShow">
        <h1>登録完了！</h1>
        <h2>今回の運動による成長結果は・・・</h2>
        <img v-if="!levelUpFlag" src="@/assets/level/keep.png" alt="現状維持" />
        <img
          v-if="levelUpFlag"
          src="@/assets/level/up.png"
          alt="レベルアップ"
        />
        <br />
        <button @click="reload()">ホームへ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: "RegistPage",
  data() {
    return {
      userId: null,

      buiButtonAreaIsShow: true,
      eventButtonAreaIsShow: false,
      inputAreaIsShow: false,
      completedAreaIsShow: false,

      //入力データ
      selectedBuiId: null,
      selectedBuiName: null,
      slectedEventId: null,
      selectedEventName: null,
      amount: null,

      levelUpFlag: false,

      buiList: null,
      eventList: null,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted: async function () {
    //ログイン状態を確認
    if (this.cookies.isKey("userId")) {
      this.userId = this.cookies.get("userId");
    }

    let url;
    let errMsg;

    //部位の一覧を取得する
    //url = "http://localhost:8080/api/bui/getBuiList";
    url = "/api/bui/getBuiList";
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        switch (response.status) {
          default:
            errMsg =
              "何らかの理由でエラーが発生しました。（E: " +
              response.status +
              ")";
            throw new Error(errMsg);
        }
      } else {
        const responseData = await response.json();
        this.buiList = responseData;
      }
    } catch (errMsg) {
      alert(errMsg);
    }

    //種目の一覧を取得する
    //url = "http://localhost:8080/api/event/getEventList";
    url = "/api/event/getEventList";
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        switch (response.status) {
          default:
            errMsg =
              "何らかの理由でエラーが発生しました。（E: " +
              response.status +
              ")";
            throw new Error(errMsg);
        }
      } else {
        const responseData = await response.json();
        this.eventList = responseData;
      }
    } catch (errMsg) {
      alert(errMsg);
    }
  },
  methods: {
    selectBui: function (id, name) {
      this.selectedBuiId = id;
      this.selectedBuiName = name;
      this.goToEventList();
    },
    selectEvent: function (id, name) {
      this.slectedEventId = id;
      this.selectedEventName = name;
      this.goToInputArea();
    },
    goToEventList: function () {
      this.buiButtonAreaIsShow = false;
      this.eventButtonAreaIsShow = true;
    },
    goToInputArea: function () {
      this.eventButtonAreaIsShow = false;
      this.inputAreaIsShow = true;
    },
    regist: async function () {
      if (this.amount == null) {
        alert("運動量を入力してください。");
        return;
      }
      //const url = "http://localhost:8080/api/motion/regMsRec";
      const url = "/api/motion/regMsRec";
      const date = this.getDate();
      const dataObj = {
        user_id: this.userId,
        bui_id: this.selectedBuiId,
        event_id: this.slectedEventId,
        amount: this.amount,
        date: date,
      };
      let errMsg;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
        });
        if (!response.ok) {
          switch (response.status) {
            default:
              errMsg = "何らかの理由でエラーが発生しました。";
              throw new Error(errMsg);
          }
        } else {
          const responseData = await response.text();
          if (responseData == "OK") {
            //総運動量計算処理へ
            this.clucTotalAmount();
          }
        }
      } catch (errMsg) {
        alert(errMsg);
      }
    },
    getDate: function () {
      const today = new Date();
      let date_txt =
        today.getFullYear() +
        "-" +
        today.getMonth() +
        1 +
        "-" +
        today.getDate();
      return date_txt;
    },
    clucTotalAmount: async function () {
      //総運動量を計算
      //const url ="http://localhost:8080/api/motion/clucMsSum?user_id=" +this.userId +"&bui_id=" +this.selectedBuiId;
      const url =
        "/api/motion/clucMsSum?user_id=" +
        this.userId +
        "&bui_id=" +
        this.selectedBuiId;

      let errMsg;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          switch (response.status) {
            default:
              errMsg =
                "何らかの理由でエラーが発生しました。（E: " +
                response.status +
                ")";
              throw new Error(errMsg);
          }
        } else {
          const responseData = await response.json();
          const total_amount = responseData.sum_motion;
          //レベルの更新へ
          this.upDateData(total_amount);
        }
      } catch (errMsg) {
        alert(errMsg);
      }
    },
    upDateData: async function (amount) {
      let new_level;
      //新しいレベルを取得
      //let url ="http://localhost:8080/api/level/clucNowLevel?bui_id=" +this.selectedBuiId +"&amount=" +amount;
      let url =
        "/api/level/clucNowLevel?bui_id=" +
        this.selectedBuiId +
        "&amount=" +
        amount;
      let errMsg;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          switch (response.status) {
            default:
              errMsg =
                "何らかの理由でエラーが発生しました。（E: " +
                response.status +
                ")";
              throw new Error(errMsg);
          }
        } else {
          const responseData = await response.json();
          new_level = responseData.now_level;
        }
      } catch (errMsg) {
        alert(errMsg);
      }

      //データを更新
      //url = "http://localhost:8080/api/user/updateData";
      url = "/api/user/updateData";
      const dataObj = {
        user_id: this.userId,
        bui_id: this.selectedBuiId,
        new_level: new_level,
        total_amount: amount,
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
        });
        if (!response.ok) {
          switch (response.status) {
            default:
              errMsg = "何らかの理由でエラーが発生しました。";
              throw new Error(errMsg);
          }
        } else {
          const responseData = await response.text();
          if (responseData == "UP") {
            this.levelUpFlag = true;
          }
          alert("登録完了しました！結果画面を表示します。");
          this.goToComplete();
        }
      } catch (errMsg) {
        alert(errMsg);
      }
    },
    goToComplete: function () {
      this.inputAreaIsShow = false;
      this.completedAreaIsShow = true;
    },
    reload: function () {
      location.href = "fitstepper.html";
    },
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

div.buiButtonArea {
  width: 90%;
  height: 70%;
  margin: 20px auto 0 auto;
  overflow: auto;
}
div.eventButtonArea {
  width: 90%;
  height: 70%;
  margin: 20px auto 0 auto;
  overflow: auto;
}
div.inputArea {
  width: 90%;
  height: 500px;
  margin: 0 auto;
}
div.completedArea {
  width: 90%;
  height: 100%;
  text-align: center;
}

div.completedArea img {
  width: 50%;
  height: auto;
}
div.buttonList {
  width: 90%;
  height: 80px;
  margin: 50 auto 0 auto;
  border: #808080 solid 2px;
  border-radius: 10px;
  cursor: pointer;
}
div.buttonListInner {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: 18pt;
  padding-top: 0px;
  font-size: 15pt;
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
