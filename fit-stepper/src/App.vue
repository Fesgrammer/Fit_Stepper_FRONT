<template>
  <div>
    <h1>Fit Stepperへようこそ</h1>
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
export default {
  name: "App",
  data() {
    return {
      name: "",
      pass: "",
    };
  },
  methods: {
    addAccount: function () {
      if (this.name == "" || this.pass == "") {
        alert("ユーザー名とパスワードの両方を入力してください。");
        return;
      }
    },
    login: function () {
      if (this.name == "" || this.pass == "") {
        alert("ユーザー名とパスワードの両方を入力してください。");
        return;
      }
    },
  },
};
</script>

<style>
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
