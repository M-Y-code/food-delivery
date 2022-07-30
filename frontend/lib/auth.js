import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

//新しいユーザーを登録
export const registerUser = (username, email, password) => {
  //resolve(成功時)reject(失敗時)
  return new Promise((resolve, reject) => {
    //axiosライブラリでAPIエンドポイントを叩く(strapiドキュメント参照)
    axios
      .post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        //成功時データをresに格納
        resolve(res);
        //成功時jwtトークンを取得しクッキーに７日間保存
        Cookie.set("token", res.data.jwt, { expires: 7 });
        //リダイレクトさせる
        window.location.href = "/";
      })
      //失敗時コンソールにエラー出力
      .catch((err) => {
        //失敗時データをerrに格納
        reject(err);
        console.log(err);
      });
  });
};

//login
export const login = (identifier, password) => {
  //resolve(成功時)reject(失敗時)
  return new Promise((resolve, reject) => {
    //axiosライブラリでAPIエンドポイントを叩く(strapiドキュメント参照)
    axios
      .post(`${API_URL}/auth/local`, {
        identifier,
        password,
      })
      .then((res) => {
        //成功時データをresに格納
        resolve(res);
        //成功時jwtトークンを取得しクッキーに７日間保存
        Cookie.set("token", res.data.jwt, { expires: 7 });
        //リダイレクトさせる
        window.location.href = "/";
      })
      //失敗時コンソールにエラー出力
      .catch((err) => {
        //失敗時データをerrに格納
        reject(err);
        console.log(err);
      });
  });
};
