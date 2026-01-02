import{r as F,u as G,_ as L,a as n,j as i,d as f}from"./iframe-DFoL4fyy.js";import{u as Z}from"./useTheme-CKE_kFmv.js";import{g as B,a as K,s as V,c as Y,b as H}from"./styled-BfIsCdp3.js";import"./preload-helper-C1FmrZbK.js";const C=e=>{let r;return e<1?r=5.11916*e**2:r=4.5*Math.log(e+1)+2,(r/100).toFixed(2)};function ee(e){return B("MuiPaper",e)}K("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const re=["className","component","elevation","square","variant"],oe=e=>{const{square:r,elevation:o,variant:t,classes:s}=e,a={root:["root",t,!r&&"rounded",t==="elevation"&&`elevation${o}`]};return H(a,ee,s)},ae=V("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:o}=e;return[r.root,r[o.variant],!o.square&&r.rounded,o.variant==="elevation"&&r[`elevation${o.elevation}`]]}})(({theme:e,ownerState:r})=>{var o;return n({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!r.square&&{borderRadius:e.shape.borderRadius},r.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},r.variant==="elevation"&&n({boxShadow:(e.vars||e).shadows[r.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${f("#fff",C(r.elevation))}, ${f("#fff",C(r.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[r.elevation]}))}),te=F.forwardRef(function(r,o){const t=G({props:r,name:"MuiPaper"}),{className:s,component:a="div",elevation:x=1,square:d=!1,variant:b="elevation"}=t,Q=L(t,re),h=n({},t,{component:a,elevation:x,square:d,variant:b}),X=oe(h);return i.jsx(ae,n({as:a,ownerState:h,className:Y(X.root,s),ref:o},Q))});function se(e){return B("MuiCard",e)}K("MuiCard",["root"]);const ne=["className","raised"],ie=e=>{const{classes:r}=e;return H({root:["root"]},se,r)},de=V(te,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})(()=>({overflow:"hidden"})),ce=F.forwardRef(function(r,o){const t=G({props:r,name:"MuiCard"}),{className:s,raised:a=!1}=t,x=L(t,ne),d=n({},t,{raised:a}),b=ie(d);return i.jsx(de,n({className:Y(b.root,s),elevation:a?8:void 0,ref:o,ownerState:d},x))}),J=({label:e,sxObject:r,mode:o,...t})=>{const s=Z();let a;return o==="colorThree"?a=s.palette.mode==="light"?"#cbd5df":"#1a202c":o==="colorTwo"?a=s.palette.mode==="light"?"#e2e8f0":"#2d3848":a=s.palette.mode==="light"?"#f7fafb":"#5c6778",i.jsx(i.Fragment,{children:i.jsx(ce,{sx:{bgcolor:a,":hover":{bgcolor:a},...r},...t,children:e})})};J.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Cards",props:{label:{required:!0,tsType:{name:"string"},description:""},shadowColor:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},mode:{required:!0,tsType:{name:"string"},description:""},sxObject:{required:!0,tsType:{name:"object"},description:""}}};const{fn:le}=__STORYBOOK_MODULE_TEST__,ge={title:"Components/Card",component:J,parameters:{layout:"centered"},tags:["autodocs"],args:{onClick:le(),label:"Card",shadowColor:"lightblue"}},c={args:{mode:"colorThree",sxObject:{}}},l={args:{mode:"colorTwo",sxObject:{}}},p={args:{mode:"colorTwo",sxObject:{width:200*.9,height:280*.9,boxShadow:"1.9px 1.9px 1.9px 1.9px lightblue"}}},u={args:{mode:"colorTwo",sxObject:{flexGrow:1,overflow:"hidden"}}},m={args:{mode:"colorTwo",sxObject:{maxWidth:`${window.screen.width*.9}px`,boxShadow:"1.9px 1.9px 1.9px 1.9px lightblue"}}},v={args:{mode:"colorTwo",sxObject:{height:"1080px",maxWidth:`${window.screen.width*.9}px`,border:1,borderWidth:"5px",borderColor:"lightblue",borderRadius:"10px"}}},g={args:{mode:"colorOne",sxObject:{}}};var w,j,O;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    mode: 'colorThree',
    sxObject: {}
  }
}`,...(O=(j=c.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var T,y,_;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    mode: 'colorTwo',
    sxObject: {}
  }
}`,...(_=(y=l.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var R,S,P;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    mode: 'colorTwo',
    sxObject: {
      width: 200 * 0.9,
      height: 280 * 0.9,
      boxShadow: \`1.9px 1.9px 1.9px 1.9px lightblue\`
    }
  }
}`,...(P=(S=p.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var $,q,M;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    mode: 'colorTwo',
    sxObject: {
      flexGrow: 1,
      overflow: 'hidden'
    }
  }
}`,...(M=(q=u.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var U,k,N;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    mode: 'colorTwo',
    sxObject: {
      maxWidth: \`\${window.screen.width * 0.9}px\`,
      boxShadow: \`1.9px 1.9px 1.9px 1.9px lightblue\`
    }
  }
}`,...(N=(k=m.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var W,E,z;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    mode: 'colorTwo',
    sxObject: {
      height: \`1080px\`,
      maxWidth: \`\${window.screen.width * 0.9}px\`,
      border: 1,
      borderWidth: '5px',
      borderColor: 'lightblue',
      borderRadius: '10px'
    }
  }
}`,...(z=(E=v.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var I,A,D;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    mode: 'colorOne',
    sxObject: {}
  }
}`,...(D=(A=g.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const xe=["defaultCard","brightCard","brightAddCard","brightPiazzaCard","brightSpecificCard","brightSpecificRearCard","brighterCard"];export{xe as __namedExportsOrder,p as brightAddCard,l as brightCard,u as brightPiazzaCard,m as brightSpecificCard,v as brightSpecificRearCard,g as brighterCard,ge as default,c as defaultCard};
