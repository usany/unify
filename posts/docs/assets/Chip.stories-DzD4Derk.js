import{j as e}from"./iframe-DFoL4fyy.js";import{u as E}from"./useTheme-CKE_kFmv.js";import{C as o}from"./Chip-DXuopmEA.js";import"./preload-helper-C1FmrZbK.js";import"./styled-BfIsCdp3.js";import"./createSvgIcon-CG4aptDC.js";import"./ButtonBase-DVOzUQNg.js";const w=({mode:a,label:r,...s})=>{const i=E().palette.mode==="light"?"#f7fafb":"#5c6778";return a==="piazzaNumber"?e.jsx(o,{color:"primary",sx:{height:"20px"},label:r,...s}):a==="location"?e.jsx(o,{color:"success",label:r,...s}):a==="noProcessing"?e.jsx(o,{sx:{bgcolor:"#7fc4bc",color:"white"},label:r,...s}):a==="processing"?e.jsx(o,{sx:{bgcolor:"#e76e50",color:"white"},label:r,...s}):a==="specific"?e.jsx(o,{size:"small",sx:{bgcolor:i,":hover":{bgcolor:i},fontSize:"12px"},label:r,...s}):e.jsx(e.Fragment,{children:e.jsx(o,{sx:{bgcolor:i,":hover":{bgcolor:i}},label:r,...s})})};w.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Chips",props:{mode:{required:!0,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""}}};const D={title:"Components/Chip",component:w,parameters:{layout:"centered"},tags:["autodocs"],args:{label:"Chip"}},c={args:{mode:""}},t={args:{mode:"piazzaNumber"}},n={args:{mode:"location"}},p={args:{mode:"noProcessing"}},m={args:{mode:"processing"}},d={args:{mode:"specific"}};var u,g,h;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    mode: ''
  }
}`,...(h=(g=c.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,l,C;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    mode: 'piazzaNumber'
  }
}`,...(C=(l=t.parameters)==null?void 0:l.docs)==null?void 0:C.source}}};var x,z,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    mode: 'location'
  }
}`,...(j=(z=n.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var b,S,y;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    mode: 'noProcessing'
  }
}`,...(y=(S=p.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var N,P,_;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mode: 'processing'
  }
}`,...(_=(P=m.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var T,q,v;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    mode: 'specific'
  }
}`,...(v=(q=d.parameters)==null?void 0:q.docs)==null?void 0:v.source}}};const G=["defaultChip","piazzaNumberChip","locationChip","noProcessingChip","processingChip","specificChip"];export{G as __namedExportsOrder,D as default,c as defaultChip,n as locationChip,p as noProcessingChip,t as piazzaNumberChip,m as processingChip,d as specificChip};
