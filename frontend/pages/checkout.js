import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Row } from "reactstrap";
import Cart from "../components/Cart";
import CheckOutForm from "../components/Checkout/CheckOutForm";

const checkout = () => {
  //公開可能キーを入力
  const stripePromise = loadStripe(
    "pk_test_51LR5F1HmHEVRGKagO9wwfJmkiNnTelTE7MjtQ2ZhdoAjkg80TGhmjGzadgILEKU9GMAoamVf3rFL5aAJPVFAgtN500mRCN7Ytk"
  );
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, oreder: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        {/* チェックアウトフォームをElementsで囲ってstripe属性にstripePromiseを渡す */}
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;
