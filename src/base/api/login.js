import http from './public'
import querystring from 'querystring'
import qs from 'qs'
/*登陆*/
export const login = params => {
  //let loginRequest = querystring.stringify(params)
  let loginRequest = qs.stringify(params);
  // alert("loginRequest="+loginRequest);
  //请求服务端的认证接口
  return http.requestPostForm('/openapi/auth/userlogin',loginRequest);
}
/*退出*/
export const logout = params => {
  const ssoForm = new FormData();
  ssoForm.append("uid_cookie",params);
  ssoForm.append("xxxx","yyyyy");
  // let para = Object.assign({}, ssoForm);
  // // let ssoRequest = qs.stringify(para);
  let ssoRequest = "uid_cookie="+params+"&xxxx=yyyy";
  // // alert("ssoRequest="+ssoRequest);

  return http.requestPost('/openapi/auth/userlogout2',ssoForm);
};



