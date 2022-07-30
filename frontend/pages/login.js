import { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import AppContext from "../context/AppContext";
import { login } from "../lib/auth";

const Login = () => {
  //空のユーザーデータを定義
  const [data, setData] = useState({ identifier: "", password: "" });

  //Appcontextで_appjsのvalue(state)を操作できるようにする
  const appContext = useContext(AppContext);

  const handleLogin = () => {
    //入力した値をauthjsに渡す
    login(data.identifier, data.password)
      //成功したらレスポンスを_appjsに渡す
      .then((res) => {
        appContext.setUser(res.data.user);
      })
      //失敗したらコンソールへエラー文を出す
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    //setDataに打ち込んでいる値とname属性を渡す
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    type="email"
                    //identifire(一意に識別する属性)
                    name="identifier"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <span>
                  <a href="/">
                    <small>パスワードをお忘れですか？</small>
                  </a>
                </span>
                <Button
                  style={{ float: "right", width: 120 }}
                  color="primary"
                  //ログイン関数を呼び出し
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  ログイン
                </Button>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px;
          }
        `}
      </style>
    </Container>
  );
};

export default Login;
