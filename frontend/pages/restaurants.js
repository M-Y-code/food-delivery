import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import router, { useRouter } from "next/router";

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
            <Row>
                {restaurant.dishes.map((res) => (
                    <Col xs="6" sm="4" key={res.id}>
                        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                            <CardImg
                                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                                top={true} style={{ height: 250 }} />
                            <CardBody>
                                <CardTitle>{res.name}</CardTitle>
                                <CardTitle>{res.description}</CardTitle>
                            </CardBody>
                            <div className="card-footer">
                                <Link
                                    as={`restaurants/${res.id}`}
                                    href={`restaurants?id=${res.id}`}
                                >
                                    <a className="btn btn-primary">もっと見る</a>
                                </Link>
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
            </Row>
        );
    } else {
        <h1>レストランが見つかりませんでした。</h1>
    }


}

export default Restaurants;