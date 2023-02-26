<template>
  <div class="main">
    <div class="logoArea">
      <img src="@/assets/Fit_Stepper.png" alt="FitStepper" />
      <h1>Fit Stepper</h1>
    </div>

    <div class="login_form_top">
      <p>
        ユーザー名、パスワードをご入力の上、<br />「ログイン」ボタンをクリックしてください。
        新規登録の場合は、入力後、「新規登録」ボタンを押してください。
      </p>
    </div>
    <div class="login_form_btm">
      <input
        v-model="name"
        type="name"
        name="user_name"
        placeholder="ユーザー名を入力してください"
      /><br />
      <input
        v-model="pass"
        type="password"
        name="password"
        placeholder="パスワードを入力してください"
      />
    </div>
    <button @click="login()">ログイン</button>
    <button @click="addAccount()">新規登録</button>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: "App",
  data() {
    return {
      name: "",
      pass: "",
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    //ログイン状態を確認
    if (this.cookies.isKey("userId")) {
      location.href = "fitstepper.html";
    }
  },
  methods: {
    addAccount: async function () {
      if (this.name == "" || this.pass == "") {
        alert("ユーザー名とパスワードの両方を入力してください。");
        return;
      }
      const url = "http://localhost:8080/api/user/add";
      const dataObj = { name: this.name, pass_row: this.pass };
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
            //cookieに登録（有効期限：1ヶ月）
            this.cookies.set("userName", this.name, 60 * 60 * 24 * 30);
            location.href = "fitstepper.html";
          } else {
            alert("このユーザは既に登録済みです。");
            return;
          }
        }
      } catch (errMsg) {
        alert(errMsg);
      }
    },
    login: async function () {
      if (this.name == "" || this.pass == "") {
        alert("ユーザー名とパスワードの両方を入力してください。");
        return;
      }
      const url = "http://localhost:8080/api/user/login";
      const dataObj = { name: this.name, pass_row: this.pass };
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
            //cookieに登録（有効期限：1ヶ月）
            this.cookies.set("userName", this.name, 60 * 60 * 24 * 30);
            location.href = "fitstepper.html";
          } else {
            alert("ユーザ名またはパスワードが間違っています。");
            return;
          }
        }
      } catch (errMsg) {
        alert(errMsg);
      }
    },
  },
};
</script>

<style>
div.main {
  width: 393px;
  height: auto;
}
div.logoArea {
  width: 50%;
  height: auto;
  text-align: center;
  margin: 0 auto;
}
div.logoArea img {
  width: 50%;
  height: auto;
  text-align: center;
}
.login_form_btm {
  padding: 10px 0;
  background-color: #f7f7f7;
  margin: 10px 0;
}

input {
  width: 200px;
  padding: 3px;
  margin: 5px 0;
}
</style>
