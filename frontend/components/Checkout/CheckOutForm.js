import { FormGroup, Input, Label } from "reactstrap";
import CardSection from "./CardSection";
import Cookies from "js-cookie";
import AppContext from "../../context/AppContext";
import { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { responsePathAsArray } from "graphql";

const CheckoutForm = () => {
  //打ち込んだ住所情報取得
  const [data, setData] = useState({
    address: "",
    stripe_id: "",
  });

  //安全にカード情報を送信するためにreactstripeのhooksを使用してtokenを作成する準備
  const elements = useElements();
  const stripe = useStripe();

  const handleChange = (e) => {
    //打ち込んでいる欄のname属性[address]に打ち込んでいる値を入れる
    const updateItem = (data[e.target.name] = e.target.value);
    //現在のdataを展開してupdateItemで更新していく
    setData({ ...data, updateItem });
  };

  //appcontextでカート内情報を持ってくる
  const appContext = useContext(AppContext);
  //jwtトークンを持ってくる
  const userToken = Cookies.get("token");
  //注文を確定させる関数
  const submitOrder = async () => {
    //カードエレメントを取ってくる
    const cardElement = elements.getElement(CardElement);
    //カードエレメントでトークンを作成して安全に送信する
    const token = await stripe.createToken(cardElement);
    //strapiのordersのエンドポイントを叩く
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      //ポストメソッドを叩く
      method: "POST",
      headers: userToken && {
        //Bearerトークンが無いとPOST投稿ができないので設定
        Authorization: `Bearer ${userToken}`,
      },
      //投稿データとしてJavaScriptのオブジェクトや値をJSON文字列に変換
      body: JSON.stringify({
        //amount(合計)をカート内情報の合計に設定
        amount: Number(appContext.cart.total),
        //注文の料理を全て設定
        dishes: appContext.cart.items,
        //onChangeで持ってきた住所を入れる
        address: data.address,
        //カードのトークンidを入れる
        token: token.token.id,
      }),
    });
    if (response.ok) {
      console.log("注文に成功しました");
    } else {
      console.log("注文に失敗しました");
    }
  };
  return (
    <div className="paper">
      <h5>あなたの情報</h5>
      <hr />
      <FormGroup>
        <div>
          <Label>住所</Label>
          <Input name="address" onChange={(e) => handleChange(e)} />
        </div>
      </FormGroup>

      <CardSection submitOrder={submitOrder} />
      <style jsx global>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: 550px;
            padding: 30px;
            background: #fff;
            border-radius: 6px;
            margin-top: 90px;
          }
          .form-half {
            flex: 0.5;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }
          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }
          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
          input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }
          input::placeholder {
            color: #aab7c4;
          }
          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default CheckoutForm;
