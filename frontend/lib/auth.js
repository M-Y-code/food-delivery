import axios from "axios"
import Cookie from "js-cookie"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

//新しいユーザーを登録
export const registerUser = async (username, email, password) => {
    //axiosライブラリでAPIエンドポイントを叩く(strapiドキュメント参照)
    await axios.post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
    })
        .then((res) => {
            //成功時jwtトークンを取得しクッキーに７日間保存
            Cookie.set("token", res.data.jwt, { expires: 7 })
            console.log(res.data.jwt)
        })
        //失敗時コンソールにエラー出力
        .catch((err) => {
            console.log(err)
        })
}