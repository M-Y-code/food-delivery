import React from "react"
import App from "next/app"
import Head from "next/head"
import Layout from "../components/Layout"
import withData from "../lib/apollo"
import AppContext from "../context/AppContext"
import Cookies from "js-cookie"

class Myapp extends App {
    //ユーザー状態をstateで管理(クラスコンポーネントの書き方)
    //fanctionの場合 const[state, setState] = useState(null)
    state = {
        user: null,
    }
    setUser = (user) => {
        this.setState({ user })
    }

    //マウント時に既にクッキー情報が残っているかを確認する
    componentDidMount() {
        const token = Cookies.get("token")//tokenの中にjwtが入っている
        //tokenがセットされていれば
        if (token) {
            //users/meのBearerの同じjwtエンドポイントを叩く
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                //APIを叩けたら
            }).then(async (res) => {
                //tokenが一致しない又は期限切れの場合
                if (!res.ok) {
                    //cookieを削除
                    Cookies.remove("token")
                    //setStateをnullにする
                    this.setState({ user: null });
                    return null
                }
                //レスポンスをjsonで取得
                const user = await res.json()
                //stateにユーザー情報を登録してログイン状態にする
                this.setUser(user)
            })
        }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            //appcontextから提供されるvalueを全てのコンポーネントで使えるようにする
            <AppContext.Provider
                //現在のユーザー状態とユーザーがセットされている状態を渡す
                value={{ user: this.state.user, setUser: this.setUser }}>
                <>
                    <Head>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />
                    </Head>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </>
            </AppContext.Provider>
        )
    }
}

//全てのコンポーネントでGraphQLを使用できるようにwithDataでラッピング
export default withData(Myapp)