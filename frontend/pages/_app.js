import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

class Myapp extends App {
  //ユーザー状態をstateで管理(クラスコンポーネントの書き方)
  //fanctionの場合 const[state, setState] = useState(null)
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };
  setUser = (user) => {
    this.setState({ user });
  };

  //マウント時に既にクッキー情報が残っているかを確認する
  componentDidMount() {
    const token = Cookies.get("token"); //tokenの中にjwtが入っている
    const cart = Cookies.get("cart"); //クッキーに残っているカート情報を取得

    //カートが未定義以外の場合かつカート内がstring型の時
    if (cart !== "undefind" && typeof cart === "string") {
      //配列をJSON形式に変換
      JSON.parse(cart)
        //カート内を一つずつ取り出し
        .forEach((item) => {
          this.setState({
            //itemsにカートの内容、
            cart: {
              items: JSON.parse(cart),
              //totalに直前のカートの状態+=アイテムの値段×個数を挿入
              total: (this.state.cart.total += item.price * item.quantity),
            },
          });
        });
    }

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
          Cookies.remove("token");
          //setStateをnullにする
          this.setState({ user: null });
          return null;
        }
        //レスポンスをjsonで取得
        const user = await res.json();
        //stateにユーザー情報を登録してログイン状態にする
        this.setUser(user);
      });
    }
  }

  //カートへ商品の追加
  addItem = (item) => {
    //今のカートの中からitemを検索
    let { items } = this.state.cart;
    //カートの中身を一つずつ取り出しidを取得しitemのidと比較して存在すればnewItemに格納
    const newItem = items.find((i) => i.id === item.id);
    //カート内に見つからなければ(新しい商品であれば)個数を1に変更
    if (!newItem) {
      item.quantity = 1;
      //cartに追加する
      this.setState(
        {
          cart: {
            //itemsに追加(スプレッド構文)
            items: [...items, item],
            //価格を加算
            total: this.state.cart.total + item.price,
          },
        },
        //カート内情報をCookieに保存
        () => Cookies.set("cart", this.state.cart.items)
      );
    } else {
      //既に同じ商品がカートに入っている場合
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              //カート内のアイテムと選んだアイテムIDが同じ場合
              item.id === newItem.id
                ? //itemオブジェクトに対してquantityフィールドを追加してquantityに+1する
                  Object.assign({}, item, { quantity: item.quantity + 1 })
                : //違う場合itemのみを返す
                  item
            ),
            //価格を加算
            total: this.state.cart.total + item.price,
          },
        },
        //カート内情報をCookieに保存
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  //カートから商品を削除
  removeItem = (item) => {
    //今のカートの中からitemを検索
    let { items } = this.state.cart;
    //カートの中身を一つずつ取り出しidを取得しitemのidと比較して存在すればnewItemに格納
    const newItem = items.find((i) => i.id === item.id);
    //カート内の個数が１より多ければ
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              //カート内のアイテムと選んだアイテムIDが同じ場合
              item.id === newItem.id
                ? //itemオブジェクトに対してquantityフィールドを追加してquantityに-1する
                  Object.assign({}, item, { quantity: item.quantity - 1 })
                : //違う場合itemのみを返す
                  item
            ),
            //価格を減算
            total: this.state.cart.total - item.price,
          },
        },
        //カート内情報をCookieに保存
        () => Cookies.set("cart", this.state.cart.items)
      );
    } else {
      //カートに入っている商品が一つの場合
      //現在のカートの中身を展開
      const items = [...this.state.cart.items];
      //カートの中身と-を押した商品のINDEXが同じ時
      const index = items.findIndex((i) => i.id === newItem.id);
      //カートの中身から指定したINEX番号を一つだけ削除する
      items.splice(index, 1);
      this.setState(
        {
          cart: {
            //削除後のitemsを渡す
            items: items,
            //価格を減算
            total: this.state.cart.total - item.price,
          },
        },
        //カート内情報をCookieに保存
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      //appcontextから提供されるvalueを全てのコンポーネントで使えるようにする
      <AppContext.Provider
        //現在のユーザー状態とユーザーがセットされている状態を渡す
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

//全てのコンポーネントでGraphQLを使用できるようにwithDataでラッピング
export default withData(Myapp);
