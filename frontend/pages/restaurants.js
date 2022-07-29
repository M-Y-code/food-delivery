import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import router, { useRouter } from "next/router";
import Cart from "../components/Cart";
import { useContext } from "react";
import AppContext from "../context/AppContext";

//graphqlで指定したクエリ取得
//$id ->どのレストランのidを叩くのか決める
//ID! ->idは絶対入っていなければならない
//restaurant(id: $id) ->レストランのidは今のid
const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }
`;

const Restaurants = (props) => {
    //AppContextで状態管理を使用
    const appContext = useContext(AppContext)
    //useRouterをrouterに格納
    const router = useRouter();
    //graphqlでクエリ内のデータ取得
    //{ variables: { id: router.query.id } } ->useRouter(reacthooks)でクエリのID取得
    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, { variables: { id: router.query.id } })
    //loadingがtrueの場合
    if (loading) return <h1>Loading...</h1>
    //errorがtrueの場合
    if (error) return <h1>Error!!</h1>
    //データがあればhtmlを出力
    if (data) {
        //restaurantのデータを格納
        const { restaurant } = data
        //フィルター後のデータをmapで展開
        return (
            <>
                <h1>{restaurant.name}</h1>
                <Row>
                    {restaurant.dishes.map((dish) => (
                        <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
                            <Card style={{ margin: "0 10px" }}>
                                <CardImg
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                                    top={true} style={{ height: 250 }} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardTitle>{dish.description}</CardTitle>
                                </CardBody>
                                <div className="card-footer">
                                    <Button outline color="primary" onClick={() => appContext.addItem(dish)}>
                                        + カートに入れる
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                    <style jsx>
                        {`
                    a {
                        color: white;
                    }
                    a:link {
                        text-decoration: none;
                        color: white;
                    }
                    a:hover {
                        color: white
                    }
                    .card-colums {
                        column-connt: 3;
                    }
                    `}
                    </style>
                    <Col xs="3" style={{ padding: 0 }}>
                        <div>
                            <Cart />
                        </div>
                    </Col>
                </Row>
            </>
        );
    } else {
        <h1>レストランが見つかりませんでした。</h1>
    }


}

export default Restaurants;