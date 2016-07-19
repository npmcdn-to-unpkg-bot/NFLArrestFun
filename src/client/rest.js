import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";

import adapterFetch from "redux-api/lib/adapters/fetch";

export default reduxApi({
  players: {
    url: '/api/players',
    transformer: transformers.array,
    options: {
      headers: {
        "Accept": "application/json"
      }
    }
  }
}).use("fetch", adapterFetch(fetch));


