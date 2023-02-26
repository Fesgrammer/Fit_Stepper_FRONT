<template>
  <div>
    <div class="v104_3">
      <div class="v104_12">
        <div class="v104_13"></div>
        <span class="v104_14">2022/02/25</span>
      </div>
      <!--アバター-->
      <!--<div class="v104_4">
        <div class="v104_5"></div>
        <div class="v104_6"></div>
        <div class="v104_7"></div>
        <div class="v104_8"></div>
        <div class="v104_9"></div>
        <div class="v104_10"></div>
        <div class="v104_11"></div>
      </div>-->

      <div class="avatarArea">
        <div class="avatarAreaInner">
          <img :src="require(`@/assets/avatar/${avatarImg[imgIdx]}.gif`)" />
        </div>
      </div>

      <div class="targetListArea">
        <div v-for="i of targetData" :key="i" class="targetList">
          <div class="targetListInner">
            <p class="buiName">{{ i.bui_name }}</p>
            <p>次のレベル：{{ i.next_level }}</p>
            <p>次のレベルまであと、{{ i.need__amount }}回</p>
          </div>
        </div>
      </div>

      <div class="logoutButtonArea">
        <div class="logoutButton">
          <div class="logoutButtonInner">ログアウト</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: "HomePage",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      /*buiList: [
        { bui_id: 1, bui_name: "上腕2" },
        { bui_id: 2, bui_name: "上腕3" },
        { bui_id: 3, bui_name: "腕" },
        { bui_id: 4, bui_name: "腹筋" },
        { bui_id: 5, bui_name: "肩" },
        { bui_id: 6, bui_name: "背中" },
        { bui_id: 7, bui_name: "お尻" },
        { bui_id: 8, bui_name: "太もも" },
        { bui_id: 9, bui_name: "ふくらはぎ" },
      ],*/
      userName: "",

      avatarImg: ["level0", "level1", "level2"],
      imgIdx: 0,
      buiList: null,
      userData: null,
      /*userData: {
        user_id: 152,
        name: "test02",
        jouwan_two_level: 0,
        jouwan_two_amt: 20,
        jouwan_th_level: 0,
        jouwan_th_amt: 10,
        chest_level: 0,
        chest_amt: 20,
        ads_level: 0,
        ads_amt: 30,
        shoulder_level: 0,
        shoulder_amt: 20,
        back_level: 0,
        back_amt: 10,
        hip_level: 0,
        hip_amt: 0,
        thigh_level: 0,
        thigh_amt: 5,
        calf_level: 0,
        calf_amt: 40,
      },
      targetData: [
        { bui_id: 1, bui_name: "上腕2", next_level: 1, need_amount: 40 },
        { bui_id: 1, bui_name: "上腕2", next_level: 1, need_amount: 20 },
      ],*/
      targetData: null,
    };
  },
  mounted: async function () {
    //ログイン状態を確認
    if (this.cookies.isKey("userName")) {
      this.userName = this.cookies.get("userName");
    }

    let url;
    let dataObj;
    let errMsg;

    //ログイン中のユーザデータを取得する
    url =
      "http://localhost:8080/api/user/getUserData?user_name=" + this.userName;
    //url = "/api/user/getUserData?user_name=" + this.userName;

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
        this.userData = responseData;
        console.log(this.userData);
        if (!this.cookies.isKey("userId")) {
          //cookieに登録（有効期限：1ヶ月）
          this.cookies.set("userId", this.userData.user_id, 60 * 60 * 24 * 30);
        }
      }
    } catch (errMsg) {
      alert(errMsg);
    }

    //部位の一覧を取得する
    url = "http://localhost:8080/api/bui/getBuiList";
    //url = "/api/bui/getBuiList";
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
        //this.formListDataObj = responseData.formList;
        this.buiList = responseData;
      }
    } catch (errMsg) {
      alert(errMsg);
    }

    //目標の一覧を取得する。
    url = "http://localhost:8080/api/level/getNeedMsAmt";
    //url = "/api/level/getNeedMsAmt";
    dataObj = [
      {
        bui_id: this.buiList[0].bui_id,
        bui_name: this.buiList[0].bui_name,
        now_amount: this.userData.jouwan_two_amt,
        now_level: this.userData.jouwan_two_level,
      },
      {
        bui_id: this.buiList[1].bui_id,
        bui_name: this.buiList[1].bui_name,
        now_amount: this.userData.jouwan_th_amt,
        now_level: this.userData.jouwan_th_level,
      },
      {
        bui_id: this.buiList[2].bui_id,
        bui_name: this.buiList[2].bui_name,
        now_amount: this.userData.chest_amt,
        now_level: this.userData.chest_level,
      },
      {
        bui_id: this.buiList[3].bui_id,
        bui_name: this.buiList[3].bui_name,
        now_amount: this.userData.ads_amt,
        now_level: this.userData.ads_level,
      },
      {
        bui_id: this.buiList[4].bui_id,
        bui_name: this.buiList[4].bui_name,
        now_amount: this.userData.shoulder_amt,
        now_level: this.userData.shoulder_level,
      },
      {
        bui_id: this.buiList[5].bui_id,
        bui_name: this.buiList[5].bui_name,
        now_amount: this.userData.back_amt,
        now_level: this.userData.back_level,
      },
      {
        bui_id: this.buiList[6].bui_id,
        bui_name: this.buiList[6].bui_name,
        now_amount: this.userData.hip_amt,
        now_level: this.userData.hip_level,
      },
      {
        bui_id: this.buiList[7].bui_id,
        bui_name: this.buiList[7].bui_name,
        now_amount: this.userData.thigh_amt,
        now_level: this.userData.thigh_level,
      },
      {
        bui_id: this.buiList[8].bui_id,
        bui_name: this.buiList[8].bui_name,
        now_amount: this.userData.calf_amt,
        now_level: this.userData.calf_level,
      },
    ];
    console.log(dataObj);

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
        const responseData = await response.json();
        this.targetData = responseData;
        console.log(this.targetData);
      }
    } catch (errMsg) {
      alert(errMsg);
    }

    //最小のレベルを抽出
    let minLevel = this.targetData[0].next_level - 1;
    for (let i = 1; i < this.targetData.length; i++) {
      if (minLevel > this.targetData[i].next_level - 1) {
        minLevel = this.targetData[i].next_level - 1;
      }
    }
    this.imgIdx = minLevel;
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

div.avatarArea {
  width: 100%;
  margin-top: 20px;
  height: 20%;
}

div.avatarAreaInner {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
div.avatarAreaInner img {
  width: 100%;
  height: auto;
}

div.targetListArea {
  width: 90%;
  height: 55%;
  margin: 0 auto;
  overflow: auto;
}
div.targetList {
  width: 300px;
  height: 120px;
  margin: 30px auto 0 auto;
  background: #ffffff;
  border: #808080 solid 2px;
  border-radius: 10px;
}
div.targetListInner {
  width: 90%;
  height: 90%;
  margin: 0 auto;
}
div.targetListInner p {
  font-size: 16pt;
  line-height: 10px;
}
p.buiName {
  font-weight: bold;
}

div.logoutButtonArea {
  width: 80%;
  height: 50px;
  margin: 0 auto;
}
div.logoutButton {
  width: 60%;
  height: 80%;
  background: #b8dcff;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
}
div.logoutButtonInner {
  width: 80%;
  height: 40%;
  margin: auto;
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
