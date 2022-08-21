import { RequestAPIType, RoutesAPI } from "../../types/api";
// Promise<Response>
export const RequestAPI = (params: RequestAPIType) => {
  const req = () => {
    switch (params.type) {
      case RoutesAPI.LOGIN:
        return fetch(params.type, {
          body: JSON.stringify(params.user),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "no-cors",
          },
        });
      case RoutesAPI.GAMES:
      case RoutesAPI.LOGOUT:
        return fetch(params.type, {
          method: "POST",
          headers: {
            JWT: params.jwt,
            Username: params.name,
          },
        });
    }
  };
  return req().then((res) => {
    if (!res.ok) throw Error(res.statusText);
    return res.json();
  });
};
