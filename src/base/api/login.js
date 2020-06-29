import http from './public'
import querystring from 'querystring'
import qs from 'qs'
/*登陆*/
export const login = params => {
  //let loginRequest = querystring.stringify(params)
  let loginRequest = qs.stringify(params);
  //请求服务端的认证接口
  return http.requestPostForm('/openapi/auth/userlogin',loginRequest);
}
/*退出*/
export const logout = params => {
  return http.requestPost('/openapi/auth/userlogout');
}



