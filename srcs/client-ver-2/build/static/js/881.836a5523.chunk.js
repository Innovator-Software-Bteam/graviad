"use strict";(self.webpackChunkclient_ver_2=self.webpackChunkclient_ver_2||[]).push([[881],{6881:(e,a,t)=>{t.r(a),t.d(a,{AccountProductBoard:()=>m,AccountProductPage:()=>u});var r=t(5043),s=t(7154),c=t(4558),n=t(9359),l=t(6876),o=t(4280),d=t(3961),i=t(2200),h=t(9920),p=t(579);function u(e){const a=[{board:(0,p.jsx)(m,{}),col:1,row:1,title:"Products",className:"h-full"}];return(0,p.jsx)("div",{className:"w-full h-full",children:a.map(((e,a)=>(0,p.jsxs)("div",{className:(0,n.Id)("flex flex-col gap-4","col-start-".concat(e.col),"row-start-".concat(e.row),e.colSpan&&"col-span-".concat(e.colSpan),e.rowSpan&&"row-span-".concat(e.rowSpan),e.className),children:[(0,p.jsx)(i.Typography,{variant:"h4",className:"text-grvd-theme-sys-dark-primary",children:e.title}),e.board]},a)))})}function m(){const e=(0,d.Jd)(),{close:a,open:t}=(0,h.sp)(),[u,m]=(0,r.useState)([]),[x,f]=(0,r.useState)([1,2,3,4,5,6,7,8,9,10]),[v,y]=(0,r.useState)(!0);return(0,r.useEffect)((()=>{(async()=>{var a;y(!0),await s.A.get("".concat(c.A.server.url,"/products"),{withCredentials:!0,params:{where:{merchantId:null===e||void 0===e||null===(a=e.merchant)||void 0===a?void 0:a.id}}}).then((e=>{m(e.data),y(!1)})).catch((e=>{t("Something went wrong. Please try again!","error"),y(!1)}))})().then().catch()}),[]),0!==u.length||v?e?(0,p.jsxs)("div",{className:(0,n.Id)("grid","gap-16","grid-cols-[repeat(auto-fit,minmax(300px,1fr))]","auto-rows-auto"),children:[v&&x.map(((e,a)=>(0,p.jsx)(o.Dj,{},a))),!v&&u.map((e=>(0,p.jsx)(l.Ay,{offset:1e3,classNamePrefix:"blur-[1000px]",children:(0,p.jsx)(o.AA,{id:e.id},e.id)},e.id)))]}):(0,p.jsx)("div",{className:(0,n.Id)("flex","justify-center","items-center","w-full h-full"),children:(0,p.jsxs)(i.Typography,{variant:"paragraph",className:(0,n.Id)("text-grvd-theme-sys-dark-on-primary-variant text-center"),children:["Please ",(0,p.jsx)("span",{className:"font-bold text-grvd-theme-sys-dark-on-primary p-1 rounded-sm bg-white",children:"Login"})," to see your products."]})}):(0,p.jsx)("div",{className:(0,n.Id)("flex","justify-center","items-center","w-full h-full"),children:(0,p.jsxs)(i.Typography,{variant:"paragraph",className:(0,n.Id)("text-grvd-theme-sys-dark-on-primary-variant text-center"),children:["You don't have any products yet.",(0,p.jsx)("br",{}),"Click ",(0,p.jsx)("span",{className:"font-bold text-grvd-theme-sys-dark-on-primary p-1 rounded-sm bg-white",children:"Create Ad"})," to create the first product."]})})}}}]);
//# sourceMappingURL=881.836a5523.chunk.js.map