(function(e){function t(t){for(var s,i,o=t[0],c=t[1],l=t[2],d=0,m=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);u&&u(t);while(m.length)m.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},a={app:0},r=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("7a23"),a=n("df85");function r(e,t,n,a,r,i){var o=Object(s["w"])("header-nav"),c=Object(s["w"])("router-view");return Object(s["s"])(),Object(s["f"])(s["a"],null,[Object(s["i"])(o),Object(s["i"])(c,{class:"container"})],64)}var i={class:"navbar navbar-expand-lg navbar-dark bg-dark"},o={class:"container-fluid"},c={class:"collapse navbar-collapse justify-content-between"},l=Object(s["h"])("Exchange"),u=Object(s["h"])("Log out"),d=Object(s["h"])("Log in");function m(e,t,n,a,r,m){var b=Object(s["w"])("router-link");return Object(s["s"])(),Object(s["f"])("nav",i,[Object(s["g"])("div",o,[Object(s["g"])("div",c,[Object(s["i"])(b,{class:"navbar-brand",to:"/"},{default:Object(s["C"])((function(){return[l]})),_:1}),Object(s["g"])("div",null,[m.isAuth?(Object(s["s"])(),Object(s["d"])(b,{key:0,to:"/logout",class:"btn btn-danger"},{default:Object(s["C"])((function(){return[u]})),_:1})):Object(s["e"])("",!0),m.isAuth?Object(s["e"])("",!0):(Object(s["s"])(),Object(s["d"])(b,{key:1,to:"/login",class:"btn btn-success"},{default:Object(s["C"])((function(){return[d]})),_:1}))])])])])}var b={name:"HeaderNav",computed:{isAuth:function(){return!1}}},p=n("d959"),f=n.n(p);const g=f()(b,[["render",m]]);var h=g,j={name:"App",components:{HeaderNav:h}};const O=f()(j,[["render",r]]);var v=O,w=n("6c02");function y(e,t,n,a,r,i){return Object(s["s"])(),Object(s["f"])("div")}var V={name:"Home"};const x=f()(V,[["render",y]]);var k=x,P={class:"input-data"},U=Object(s["g"])("label",{class:"mt-3",for:"username-input"},"Username",-1),_=Object(s["g"])("label",{class:"mt-3",for:"password-input"},"Password",-1),C={class:"link-div mt-3 d-flex flex-column"},A=Object(s["h"])("No account yet? "),E=Object(s["h"])("Register"),L=["disabled"],R={class:"text-danger align-self-center"};function S(e,t,n,a,r,i){var o=Object(s["w"])("router-link");return Object(s["s"])(),Object(s["f"])("form",{onSubmit:t[2]||(t[2]=Object(s["E"])((function(){return i.login&&i.login.apply(i,arguments)}),["prevent"])),class:"position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded"},[Object(s["g"])("div",P,[U,Object(s["D"])(Object(s["g"])("input",{id:"username-input",name:"username",class:Object(s["o"])({"login-input form-control":!0,"is-invalid":!e.isUsernameValid}),type:"text",autocomplete:"off","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.username=t})},null,2),[[s["A"],e.username]]),_,Object(s["D"])(Object(s["g"])("input",{id:"password-input",name:"password",class:Object(s["o"])({"login-input form-control":!0,"is-invalid":!e.isPasswordValid}),type:"password","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.password=t})},null,2),[[s["A"],e.password]])]),Object(s["g"])("div",C,[Object(s["g"])("p",null,[A,Object(s["i"])(o,{to:"/register"},{default:Object(s["C"])((function(){return[E]})),_:1})]),Object(s["g"])("button",{class:"btn btn-success w-50 align-self-center",disabled:!i.isFormValid},"Log in",8,L),Object(s["g"])("span",R,Object(s["y"])(e.message),1)])],32)}n("ac1f"),n("466d"),n("99af");var N=n("1da1"),D=(n("96cf"),n("bc3a")),F=n.n(D),H=function(){var e=Object(N["a"])(regeneratorRuntime.mark((function e(t){var n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,F()(t).catch((function(e){return console.log(e),{code:500,messages:["Something went wrong"]}}));case 2:return n=e.sent,e.next=5,n.data;case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(e,t){return H({url:e,headers:t,method:"get"})},M=function(e,t,n){return H({url:e,data:t,headers:n,method:"post"})},T="http://cherniuk-exchange:8080",$=function(e){return console.log(window.ENV),M("".concat(T,"/api/register"),e,{"Content-Type":"application/json"})},z=function(e){return M("".concat(T,"/api/login_check"),e,{"Content-Type":"application/json"})},Z=function(e){return J("".concat(T,"/api/confirm?code=").concat(e.code,"&uid=").concat(e.uid))},q={name:"Login",data:function(){return{username:"",password:"",isPasswordValid:!0,isUsernameValid:!0,message:""}},watch:{password:function(e){this.isPasswordValid=e.length>=8,this.message=this.isPasswordValid?"":"Password should be 8 characters or longer."},username:function(e){this.isUsernameValid=e.match(/^[0-9a-zA-Z_.]{3,64}$/),this.message=this.isUsernameValid?"":'Username should contain only latin letters, numbers and specific symbols "_", "." and have length from 3 to 64 characters.'}},computed:{isFormValid:function(){return this.isUsernameValid&&!!this.username&&this.isPasswordValid&&!!this.password}},methods:{login:function(){var e=JSON.stringify({username:this.username,password:this.password}),t=z(e);t.data.token?console.log(t):(this.message="",this.message=t.data.message)}}};const I=f()(q,[["render",S]]);var W=I,B={class:"input-data"},G=Object(s["g"])("label",{class:"mt-3",for:"email-input"},"Email",-1),K=Object(s["g"])("label",{class:"mt-3",for:"username-input"},"Username",-1),Q=Object(s["g"])("label",{class:"mt-3",for:"password-input"},"Password",-1),X={class:"link-div mt-3 d-flex flex-column"},Y=Object(s["h"])("Already have an account? "),ee=Object(s["h"])("Log in"),te=["disabled"],ne={class:"text-danger align-self-center"},se={key:1,class:"position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded"},ae=Object(s["g"])("h3",null,"We sent confirmation link to your email. Please, check your inbox.",-1),re=[ae];function ie(e,t,n,a,r,i){var o=Object(s["w"])("router-link");return this.isRegistered?(Object(s["s"])(),Object(s["f"])("div",se,re)):(Object(s["s"])(),Object(s["f"])("form",{key:0,onSubmit:t[3]||(t[3]=Object(s["E"])((function(){return i.register&&i.register.apply(i,arguments)}),["prevent"])),class:"position-absolute top-50 start-50 translate-middle w-50 p-5 border border-white rounded"},[Object(s["g"])("div",B,[G,Object(s["D"])(Object(s["g"])("input",{id:"email-input",name:"email",class:Object(s["o"])({"login-input form-control":!0,"is-invalid":!e.isEmailValid}),type:"text",autocomplete:"off","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.email=t})},null,2),[[s["A"],e.email]]),K,Object(s["D"])(Object(s["g"])("input",{id:"username-input",name:"username",class:Object(s["o"])({"login-input form-control":!0,"is-invalid":!e.isUsernameValid}),type:"text",autocomplete:"off","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.username=t})},null,2),[[s["A"],e.username]]),Q,Object(s["D"])(Object(s["g"])("input",{id:"password-input",name:"password",class:Object(s["o"])({"login-input form-control":!0,"is-invalid":!e.isPasswordValid}),type:"password","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.password=t})},null,2),[[s["A"],e.password]])]),Object(s["g"])("div",X,[Object(s["g"])("p",null,[Y,Object(s["i"])(o,{to:"/login"},{default:Object(s["C"])((function(){return[ee]})),_:1})]),Object(s["g"])("button",{class:"btn btn-success w-50 align-self-center",disabled:!i.isFormValid},"Register",8,te),Object(s["g"])("span",ne,Object(s["y"])(e.message),1)])],32))}n("159b");var oe={name:"Register",data:function(){return{email:"",username:"",password:"",isEmailValid:!0,isPasswordValid:!0,isUsernameValid:!0,message:"",isRegistered:!1}},watch:{email:function(e){this.isEmailValid=e.match(/^.+@.+$/),this.message=this.isEmailValid?"":"Invalid email."},password:function(e){this.isPasswordValid=e.length>=8,this.message=this.isPasswordValid?"":"Password should be 8 characters or longer."},username:function(e){this.isUsernameValid=e.match(/^[0-9a-zA-Z_.]{3,64}$/),this.message=this.isUsernameValid?"":'Username should contain only latin letters, numbers and specific symbols "_", "." and have length from 3 to 64 characters.'}},computed:{isFormValid:function(){return this.isEmailValid&&!!this.email&&this.isUsernameValid&&!!this.username&&this.isPasswordValid&&!!this.password}},methods:{register:function(){var e=this,t=JSON.stringify({email:this.email,username:this.username,password:this.password}),n=$(t);200===n.data.code?this.isRegistered=!0:(this.message="",n.data.messages.forEach((function(t){e.message+=t+";"})))}}};const ce=f()(oe,[["render",ie]]);var le=ce,ue={key:0,class:"d-flex flex-column justify-content-center"},de=Object(s["g"])("h3",null,"Email is confirmed!",-1),me=Object(s["h"])("Return to home page"),be={key:1,class:"d-flex align-content-center"};function pe(e,t,n,a,r,i){var o=Object(s["w"])("router-link");return e.isConfirmed?(Object(s["s"])(),Object(s["f"])("div",ue,[de,Object(s["i"])(o,{to:"/",class:"w-50 btn btn-success"},{default:Object(s["C"])((function(){return[me]})),_:1})])):(Object(s["s"])(),Object(s["f"])("div",be,[Object(s["g"])("h3",{class:Object(s["o"])(e.isLoaded?"text-danger":"text-white")},Object(s["y"])(e.message),3)]))}var fe={name:"Confirm",data:function(){return{isConfirmed:!1,isLoaded:!1,message:"Loading..."}},mounted:function(){var e=Z(this.$route.query);this.isLoaded=!0,200===e.data.code?this.isConfirmed=!0:this.message="Failed to confirm your email."}};const ge=f()(fe,[["render",pe]]);var he=ge,je=[{path:"/",name:"Home",component:k},{path:"/login",name:"Login",component:W},{path:"/register",name:"Register",component:le},{path:"/confirm",name:"Confirm",component:he}],Oe=Object(w["a"])({history:Object(w["b"])(),routes:je}),ve=Oe,we=Object(s["c"])(v);we.use(a["a"]),we.use(ve),we.mount("#app")}});
//# sourceMappingURL=app.50922eaf.js.map