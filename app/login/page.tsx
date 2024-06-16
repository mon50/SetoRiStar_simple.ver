import React from "react";
import { login, signup } from "@/app/login/action";
const LoginPage = () => {
  return (
    <div className="App">
      <h2>新規作成 or ログイン</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  );
};

export default LoginPage;
