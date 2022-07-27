import { HttpLink } from "apollo-link-http"
import { withData } from "next-apollo"

//デプロイ時のパスと開発環境のパス指定
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

//QraphQLに接続
const config = {
    link: new HttpLink({
        uri: `${API_URL}/graphql`,
    })
}

//withDataでラッピングして渡す
export default withData(config)