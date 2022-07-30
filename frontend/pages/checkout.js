import { Col, Row } from "reactstrap";
import Cart from "../components/Cart";
import CheckOutForm from "../components/Checkout/CheckOutForm";

const checkout = () => {
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, oreder: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <CheckOutForm />
      </Col>
    </Row>
  );
};

export default checkout;
