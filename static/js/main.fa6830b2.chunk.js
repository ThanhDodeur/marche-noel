(this["webpackJsonpmarche-noel"]=this["webpackJsonpmarche-noel"]||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,a,t){e.exports=t.p+"static/media/snowflake.c1c98c92.svg"},,,,,,,function(e,a,t){e.exports=t(49)},,,,,function(e,a,t){},function(e,a,t){},,,,,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(12),c=t.n(s),u=(t(29),t(5));var l=t(17),i=t.n(l);t(30);var o=function(e){var a=e.callBack;return r.a.createElement("div",{className:"accueil noselect clickable",onClick:a},r.a.createElement("img",{src:i.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"March\xe9 de No\xebl"))},p=t(6),m=t(11),d=t(8),f=t(1),v=t.n(f),g=t(2),h=t(18),b=t(19),y=t(22),E=t(21),w=t(3),N=(t(38),0);function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"id";return N++,"".concat(e).concat(N)}function k(e){return function(a){e>0&&(a(),k(e-1)(a))}}function j(e,a){return e.map((function(e,t){return[e,a[t]]}))}function x(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;if(!e)return 0;e=Number(e);var t=Math.abs(a);return Math.round((e+Number.EPSILON)*Math.pow(10,t))/Math.pow(10,t)}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1?arguments[1]:void 0;return Math.floor(e/(a||100)*100)}function T(e,a){for(var t=Math.min(e.length,a.length),n=[e,a],r=[Object(p.a)(e),Object(p.a)(a)],s=n[0].length===t?[0,1]:[1,0],c=s[0],u=s[1],l=0;l<t;l++){var i=n[c][l];n[u].includes(i)&&(r[0].splice(r[0].indexOf(i),1),r[1].splice(r[1].indexOf(i),1))}return r}var R=t(4),C=["Vendredi","Samedi","Dimanche"],D=["Salle","Transactions","Assurance","Papeterie","Timbres","Courses","Traiteur","Schmitz","Autre"],A=function(){var e=localStorage.getItem("saved-store-auto"),a={};return e&&(a=JSON.parse(e)||a),Object(R.a)(Object(R.a)({},P),a)},P={daysRawData:Object.fromEntries(j(C,Array(3).fill({customers:[],suppliers:[]}))),eventExpenses:{},dailyAccounting:Object.fromEntries(j(C,Array(3).fill({tombolaTickets:0}))),costTotal:0,ticketPrice:0,days:[],suppliers:{},missedPaymentsByDay:{},missedTransactionsByDay:{},supplierTotal:0,supplierRealGain:0},B=function(e,a,t){for(var n=[],r={},s=0,c=0,l=0,i=Object.entries(t);l<i.length;l++){var o=Object(u.a)(i[l],2),p=o[0],m=o[1],d=_({dayName:p,dayRaw:m,suppliers:r});r=d.suppliers,e[p]=d.missedPayments,a[p]=d.missedTransactions,n.push(d.day)}return Object.values(r).forEach((function(e){s+=e.total,c+=e.realGain})),{days:n,suppliers:r,supplierTotal:s,supplierRealGain:c,missedPaymentsByDay:e,missedTransactionsByDay:a}},_=function(e){var a,t=e.dayName,n=e.dayRaw,r=e.suppliers,s=n.customers,c=n.suppliers,u={},l={paid:[],paidTotal:0,paymentTransactions:[],recievedTransactions:[],supplied:[],suppliedTotal:0},i=Object(m.a)(s);try{for(i.s();!(a=i.n()).done;){var o=a.value;if(o[0]){u[o[0]]=u[o[0]]||Object.assign({},l);var p=Number(o[3]);u[o[0]].paidTotal+=p||0,u[o[0]].paymentTransactions.push(p),u[o[0]].paid.push({name:o[2],price:o[3],supplierId:o[1]}),r[o[1]]=r[o[1]]||{total:0,realGain:0},r[o[1]].realGain+=Number(o[3])||0}}}catch(E){i.e(E)}finally{i.f()}var d,f=Object(m.a)(c);try{for(f.s();!(d=f.n()).done;){var v=d.value;if(v[0]&&v[1]){u[v[1]]=u[v[1]]||Object.assign({},l);var g=Number(v[3]);u[v[1]].suppliedTotal+=g||0,u[v[1]].recievedTransactions.push(g),u[v[1]].supplied.push({name:v[2],price:v[3],supplierId:v[0]}),r[v[0]]=r[v[0]]||{total:0,realGain:0},r[v[0]].total+=Number(v[3])||0}}}catch(E){f.e(E)}finally{f.f()}var h=F(u),b=h.missedPayments,y=h.missedTransactions;return{day:{dayName:t,customers:u,missedPayments:b,missedTransactions:y,dailyLoss:h.dailyLoss,customersAverage:h.customersAverage,obtainedAverage:h.obtainedAverage},suppliers:r,missedPayments:b,missedTransactions:y}},F=function(e){for(var a={},t={},n=0,r=0,s=0,c=Object.entries(e),l=0,i=c;l<i.length;l++){var o=Object(u.a)(i[l],2),p=o[0],m=o[1],d=T(m.paymentTransactions,m.recievedTransactions),f=Object(u.a)(d,2),v=f[0],g=f[1];t[p]={paidSurplus:v,suppliedSurplus:g};var h=m.paidTotal,b=m.suppliedTotal,y=b-h;0!==y&&(a[p]=y,n+=y),s+=Number(b),r+=Number(h)}return{missedPayments:a,missedTransactions:t,dailyLoss:n,customersTotal:r,customersAverage:r/(c.length||0),obtainedAverage:s/(c.length||0)}},M=function(e){return{type:"SAVE_EXPENSES",payload:e}},L=function(e){return{type:"SAVE_DAY",payload:e}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:"FEED_COMPUTE",payload:e}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:"SET_STORE",payload:e}},U=function(){return{type:"COMPUTE"}},G=function(){return{type:"CLEAR_STORE"}};t(39);var H=function(e){var a=e.buttons,t=void 0===a?[]:a,s=Object(n.useState)(!0),c=Object(u.a)(s,2),l=c[0],i=c[1];return r.a.createElement("nav",{className:"navbar"},r.a.createElement("div",{className:"hamburger",onClick:function(){i(!l)}},r.a.createElement("div",{className:"line"}),r.a.createElement("div",{className:"line"}),r.a.createElement("div",{className:"line"})),r.a.createElement("div",{className:"nav-buttons "+(l?"open":"")},t.map((function(e,a){return r.a.createElement("div",{role:"button",key:a,className:"nav-button clickable noselect ".concat(e.className),onClick:e.callBack},r.a.createElement("span",null,e.fa&&r.a.createElement("i",{className:"fa ".concat(e.fa," inline spaced")}),r.a.createElement("span",{className:"inline"},e.content)))}))))};t(40);var J=function(e){var a=e.messageIds,t=e.messages;return r.a.createElement("div",{className:"popups"},a.map((function(e){var a=t[e];return r.a.createElement("div",{key:e,className:"popup "+a.type},!!a.title&&r.a.createElement("span",null,a.title),a.content)})))};t(41),t(42),t(43);var V=function(e){var a=e.customers;return r.a.createElement("div",null,r.a.createElement("h2",null,r.a.createElement("i",{className:"fa fa-user spaced"})," Liste Client:"),Object.keys(a).map((function(e){return r.a.createElement("div",{className:"entry",key:"cust_"+e},r.a.createElement("span",null,"[client: ",e,"] - "),r.a.createElement("span",null,"total pay\xe9: ",x(a[e].paidTotal,3),"\u20ac"),r.a.createElement("span",null," | "),r.a.createElement("span",null,"a re\xe7u pour un total de: ",x(a[e].suppliedTotal,3),"\u20ac"))})))};t(44);var K=function(e){var a=e.missedPayments;return r.a.createElement("div",null,r.a.createElement("h2",null,r.a.createElement("i",{className:"fa fa-exclamation-triangle spaced"})," Paiements incorrectes:"),Object.keys(a).map((function(e){return r.a.createElement("div",{className:"entry",key:"missed_"+e},r.a.createElement("span",null,"[client: ",e,"] - "),r.a.createElement("span",null,"Argent Manquant: ",x(a[e],3),"\u20ac"))})))};var W=function(e){var a=e.day,t=e.index,n=e.dayAccounting;return Object.keys(a.customers).length?r.a.createElement("div",{className:"day",key:t},r.a.createElement("h1",null,a.dayName),r.a.createElement("div",{className:"day-data"},r.a.createElement("div",null,"Total des paiements manqu\xe9s: ",x(a.dailyLoss,3),"\u20ac"),r.a.createElement("div",null,"Tickets de tombola vendus: ",n.tombolaTickets),r.a.createElement("div",null,"Moyenne des d\xe9penses des clients: ",x(a.customersAverage||0,3),"\u20ac"),r.a.createElement("div",null,"Moyenne des objets re\xe7u par les clients: ",x(a.obtainedAverage||0,3),"\u20ac"),r.a.createElement(V,{customers:a.customers}),r.a.createElement(K,{missedPayments:a.missedPayments}))):r.a.createElement("div",null)};var Y=function(e){var a=e.openDay,t=Object(w.d)((function(e){return e.marche.dailyAccounting})),n=Object(w.d)((function(e){return e.marche.days})),s=Object(w.d)((function(e){return e.marche.supplierTotal})),c=Object(w.d)((function(e){return e.marche.supplierRealGain})),u=Object(w.d)((function(e){return e.marche.suppliers})),l=Object(w.d)((function(e){return e.marche.ticketPrice})),i=Object(w.d)((function(e){return e.marche.costTotal}));return r.a.createElement("div",null,function(){var e=0,o=Object.entries(u);o.sort((function(e,a){return a[1].realGain-e[1].realGain}));for(var p=0,m=Object.values(t);p<m.length;p++){var d=m[p];e+=Number(d.tombolaTickets)||0}return r.a.createElement("div",{className:"content global-content"},function(e){var a=x(-(s-c),3);return r.a.createElement("div",{className:"global-stats profits"},r.a.createElement("h3",null,r.a.createElement("i",{className:"fa fa-line-chart spaced"})," B\xe9n\xe9fices"),r.a.createElement("div",null,r.a.createElement("span",null,"B\xe9n\xe9fices des vendeurs:")," ",r.a.createElement("span",{className:"value-display"},x(s,3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Paiements "+(a>0?"en exc\xe8s":"manquants")+":")," ",r.a.createElement("span",{className:"value-display"},a,"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Vente de tombola:")),r.a.createElement("div",null,r.a.createElement("span",null,e," x ",l,"\u20ac: "),r.a.createElement("span",{className:"value-display"},x(l*e,3),"\u20ac ")),r.a.createElement("div",null,r.a.createElement("span",null,"Total des frais: "),r.a.createElement("span",{className:"value-display"},x(-i,3),"\u20ac")),r.a.createElement("div",{className:"separated"},r.a.createElement("span",null,"B\xe9n\xe9fices net du march\xe9: "),r.a.createElement("span",{className:"value-display"},x(function(e){return c+l*e-i}(e),3),"\u20ac")))}(e),function(e){for(var a=Object.values(n),t=0,s=0,c=0,u=0,l=a;u<l.length;u++){var i=l[u];t+=i.customersAverage||0,s+=i.obtainedAverage||0,c+=Object.values(i.customers).filter((function(e){return e.paidTotal>0})).length}var o=S(t,s);return r.a.createElement("div",{className:"global-stats"},r.a.createElement("h3",null,r.a.createElement("i",{className:"fa fa-bar-chart spaced"})," Statistiques (sur ",n.length," jour(s))"),r.a.createElement("div",{className:"daily-stats"},r.a.createElement("div",null,r.a.createElement("span",null,"Moyenne pay\xe9e par les clients:")," ",r.a.createElement("span",{className:"value-display"},x(t/(a.length||1),3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Moyenne des articles re\xe7u:")," ",r.a.createElement("span",{className:"value-display"},x(s/(a.length||1),3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Taux de paiement:")," ",r.a.createElement("span",{className:"value-display"},o,"%")),r.a.createElement("div",null,r.a.createElement("span",null,"Tickets de tombola Vendus:")," ",r.a.createElement("span",{className:"value-display"},e)),r.a.createElement("div",null,r.a.createElement("span",null,"Quantit\xe9 de fiches pay\xe9es:")," ",r.a.createElement("span",{className:"value-display"},c))))}(e),!!o.length&&function(e){var a=e[0]&&e[0][1]&&e[0][1].realGain;return r.a.createElement("div",{className:"global-stats"},r.a.createElement("h3",null,r.a.createElement("i",{className:"fa fa-trophy spaced"})," Classement des fournisseurs"),e&&e.map((function(e,t){return r.a.createElement("div",{key:"ladder_"+t,className:"ladder-entry"},r.a.createElement("div",{className:"progress-bar",style:{width:S(e[1].realGain,a)+"%"}}),r.a.createElement("span",null,t+1,"."),r.a.createElement("span",null,"[",e[0],"]"),r.a.createElement("span",{className:"value"},x(e[1].realGain,3),"\u20ac"))})))}(o),r.a.createElement("div",null,n.map((function(e,n){return a&&a!==e.dayName?r.a.createElement("div",{key:"empty_"+n}):r.a.createElement(W,{day:e,key:n,dayAccounting:t[e.dayName],index:n})}))))}())},z=t(23),Q=function(){},X=function(e){e.value;var a=e.label,t=void 0===a?"Upload":a,n=e.onChange,s=void 0===n?Q:n,c=Object(z.a)(e,["value","label","onChange"]);return r.a.createElement("span",null,r.a.createElement("label",null,r.a.createElement("span",{className:"clickable"},t),r.a.createElement("input",Object.assign({},c,{style:{display:"none"},type:"file",onChange:function(e){s(Object(p.a)(e.target.files)),e.target.value=null}}))))};t(45);var Z=function(e){var a=this,t=e.day,s=e.addMessage,c=Object(w.c)(),l=Object(w.d)((function(e){return e.marche.dailyAccounting[t]||{tombolaTickets:0}})),i=Object(w.d)((function(e){return e.marche.missedTransactionsByDay[t]||{}})),o=Object(w.d)((function(e){return e.marche.daysRawData[t]||{}})),p=Object(n.useState)([]),m=Object(u.a)(p,2),d=m[0],f=m[1],h=Object(n.useState)([]),b=Object(u.a)(h,2),y=b[0],E=b[1],N=Object(n.useState)(void 0),O=Object(u.a)(N,2),j=O[0],x=O[1],S=Object(n.useRef)(null),T=Object(n.useRef)(null),R=o.customers||[],C=o.suppliers||[],D=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(n=new FileReader).readAsText(t),e.abrupt("return",new Promise((function(e){n.onload=function(a){e(n.result)}})));case 6:return e.prev=6,e.t0=e.catch(0),a._addMessage("ERREUR",e.t0.message,"error"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(a){return e.apply(this,arguments)}}(),A=function(){var e=Object(g.a)(v.a.mark((function e(a){var t,n,r,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(1,t=a.split(/\r\n|\n/),k(1)((function(){return t.shift()})),t.shift().split(","),n=[],r=[];t.length;)(s=t.shift().split(","))[0]&&n.push([Number(s[0]),Number(s[1]),s[2],Number(s[3])]),s[4]&&s[5]&&r.push([Number(s[4]),Number(s[5]),s[6],Number(s[7])]);return e.abrupt("return",{newCustomerLines:n,newSupplierLines:r});case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),P=function(){var e=Object(g.a)(v.a.mark((function e(a){var n,r,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("customer"!==a){e.next=8;break}return r=d,(n=R).push(r),e.next=6,c(L({day:t,data:{customers:n,suppliers:C},dayAccounting:l}));case 6:return e.next=8,f(["","","",""]);case 8:if("supplier"!==a){e.next=16;break}return s=y,(n=C).push(s),e.next=14,c(L({day:t,data:{customers:R,suppliers:n},dayAccounting:l}));case 14:return e.next=16,E(["","","",""]);case 16:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),B=function(){var e=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==a.key){e.next=4;break}return S.current.focus(),e.next=4,P("customer");case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),_=function(){var e=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Tab"!==a.key){e.next=6;break}return a.stopPropagation(),a.preventDefault(),S.current.focus(),e.next=6,P("customer");case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),F=function(){var e=Object(g.a)(v.a.mark((function e(a){var n,r,u,i,o,p,m;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=a[0]).name.includes(".csv")){e.next=4;break}return s("ERREUR","Le fichier doit \xeatre un .csv","error",8e3),e.abrupt("return");case 4:return e.next=6,x(n);case 6:return e.next=8,D(n);case 8:return r=e.sent,e.next=11,A(r);case 11:return u=e.sent,i=u.newCustomerLines,o=u.newSupplierLines,p=R.concat(i),m=C.concat(o),e.next=18,c(L({day:t,data:{customers:p,suppliers:m},dayAccounting:l}));case 18:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),M=function(){var e=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==a.key){e.next=4;break}return T.current.focus(),e.next=4,P("supplier");case 4:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),I=function(){var e=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Tab"!==a.key){e.next=6;break}return a.stopPropagation(),a.preventDefault(),T.current.focus(),e.next=6,P("supplier");case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),q=function(){var e=Object(g.a)(v.a.mark((function e(a,n,r){var s,u;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=R||[],!1!==a){e.next=6;break}return(u=d.map((function(e){return e||""})))[n]=r,f(u),e.abrupt("return");case 6:return s[a]||(s[a]=[]),s[a][n]=r,e.next=10,c(L({day:t,data:{customers:s,suppliers:C},dayAccounting:l}));case 10:case"end":return e.stop()}}),e)})));return function(a,t,n){return e.apply(this,arguments)}}(),U=function(){var e=Object(g.a)(v.a.mark((function e(a,n,r){var s,u;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=C||[],!1!==a){e.next=6;break}return(u=y.map((function(e){return e||""})))[n]=r,E(u),e.abrupt("return");case 6:return s[a]||(s[a]=[]),s[a][n]=r,e.next=10,c(L({day:t,data:{customers:R,suppliers:s},dayAccounting:l}));case 10:case"end":return e.stop()}}),e)})));return function(a,t,n){return e.apply(this,arguments)}}(),G=function(){var e=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(L({day:t,data:{customers:R,suppliers:C},dayAccounting:{tombolaTickets:Number(a)}}));case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"content input-page noselect"},r.a.createElement("div",{className:"title-area ml-10"},r.a.createElement("h1",null,t),r.a.createElement("div",{role:"button",className:"form-button",onClick:function(e){return function(e){if(e.currentTarget===e.target){var a=e.currentTarget.getElementsByTagName("input");a.length&&(e.stopPropagation(),a[0].click())}}(e)}},r.a.createElement(X,{label:"Ajouter .csv",className:"noselect",value:j,onChange:F}))),r.a.createElement("div",null,r.a.createElement("span",{className:"ml-10"},"Tickets de tombola vendus:"),r.a.createElement("input",{className:"number-input ml-10",pattern:"[0-9]*",type:"number",onChange:function(e){G(e.target.value)},value:l.tombolaTickets}),r.a.createElement("i",{className:"fa fa-ticket spaced"})),r.a.createElement("div",{className:"area-container"},r.a.createElement("div",{className:"group-input customers"},r.a.createElement("div",{className:"col-titles"},r.a.createElement("div",{className:"number"},"Client"),r.a.createElement("div",{className:"number"},"Fournisseur"),r.a.createElement("div",{className:"string"},"Article"),r.a.createElement("div",{className:"number"},"Prix")),R.map((function(e,a){var t=i[e[0]];return r.a.createElement("div",{className:"customer-row row saved-row "+(t&&t.paidSurplus&&t.paidSurplus.includes(Number(e[3]))?"unpaid":""),key:"customer_"+a},r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){q(a,0,e.target.value)},value:e[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){q(a,1,e.target.value)},value:e[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){q(a,2,e.target.value)},value:e[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){q(a,3,e.target.value)},value:e[3]}),"\u20ac")})),r.a.createElement("div",{className:"customer-row row new-row",onKeyDown:B},r.a.createElement("input",{ref:S,className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){q(!1,0,e.target.value)},value:d[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){q(!1,1,e.target.value)},value:d[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){q(!1,2,e.target.value)},value:d[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onKeyDown:_,onChange:function(e){q(!1,3,e.target.value)},value:d[3]}),"\u20ac"),r.a.createElement("div",null,"Appuier sur 'Tab' pour naviguer entre les cases. Appuier sur 'Entrer' pour sauver la derni\xe8re ligne.")),r.a.createElement("div",{className:"group-input suppliers"},r.a.createElement("div",{className:"col-titles"},r.a.createElement("div",{className:"number"},"Fournisseur"),r.a.createElement("div",{className:"number"},"Client"),r.a.createElement("div",{className:"string"},"Article"),r.a.createElement("div",{className:"number"},"Prix")),C.map((function(e,a){var t=i[e[1]];return r.a.createElement("div",{className:"supplier-row row saved-row "+(t&&t.suppliedSurplus&&t.suppliedSurplus.includes(Number(e[3]))?"unpaid":""),key:"supplier_"+a},r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){U(a,0,e.target.value)},value:e[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){U(a,1,e.target.value)},value:e[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){U(a,2,e.target.value)},value:e[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){U(a,3,e.target.value)},value:e[3]}),"\u20ac")})),r.a.createElement("div",{className:"supplier-row row new-row",onKeyDown:M},r.a.createElement("input",{ref:T,className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){U(!1,0,e.target.value)},value:y[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){U(!1,1,e.target.value)},value:y[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){U(!1,2,e.target.value)},value:y[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onKeyDown:I,onChange:function(e){U(!1,3,e.target.value)},value:y[3]}),"\u20ac"),r.a.createElement("div",null,"Appuier sur 'Tab' pour naviguer entre les cases. Appuier sur 'Entrer' pour sauver la derni\xe8re ligne."))))};t(46);var $=function(e){var a=Object(w.d)((function(e){return e.marche.eventExpenses})),t=Object(w.d)((function(e){return e.marche.ticketPrice})),n=Object(w.c)();function s(){return(s=Object(g.a)(v.a.mark((function e(t,r){var s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(s=a)[t]=r,n(M(s));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function c(){return(c=Object(g.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n(I({ticketPrice:Number(a)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(e){return a[e]||0}return r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"form noselect"},r.a.createElement("div",{className:"input-grid left"},D.map((function(e){return r.a.createElement("div",{key:"input_container_"+e},r.a.createElement("span",{className:"accounting-span"},e,": "),r.a.createElement("input",{className:"accounting-input",onChange:function(a){!function(e,a){s.apply(this,arguments)}(e,Number(a.target.value))},pattern:"[0-9]*",type:"number",value:u(e)})," \u20ac")}))),r.a.createElement("div",{className:"input-grid right"},r.a.createElement("div",null,r.a.createElement("span",{className:"accounting-span"}," Prix des tickets: "),r.a.createElement("input",{className:"accounting-input",onChange:function(e){!function(e){c.apply(this,arguments)}(e.target.value)},pattern:"[0-9]*",type:"number",value:t}),"\u20ac"))))};t(47);var ee=function(){var e=Object(n.useState)(!1),a=Object(u.a)(e,2),t=a[0],s=a[1];return r.a.createElement("div",{className:"help noselect"},r.a.createElement("div",{className:"help-link ml-auto"},r.a.createElement("a",{className:"help-text",target:"new",href:"https://docs.google.com/spreadsheets/d/1UKT38_RUa3MQ_HEGtWgaPKvedD35wYksaj7-T0sc9N8/edit?usp=sharing"},"Format accept\xe9"),r.a.createElement("i",{className:"fa fa-file-excel-o"})),r.a.createElement("div",{className:"help-link ml-auto",onClick:function(){s(!t)}},r.a.createElement("u",null,"Vid\xe9o d'explication"),r.a.createElement("i",{className:"fa fa-play"})),!!t&&r.a.createElement("iframe",{title:"help video",src:"https://drive.google.com/file/d/1hk40AsnzUJ7gUevslwSnfZGkSvyJ0OKu/preview",width:"900",height:"500"}))},ae=function(e){Object(y.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(h.a)(this,t),(n=a.call(this))._loadSave=function(e){var a=localStorage.getItem(e);a&&n.props.setStore(JSON.parse(a)),n._addMessage("Charg\xe9","La derni\xe8re sauvegarde \xe0 \xe9t\xe9 charg\xe9e","info",2e3)},n._readFile=function(){var e=Object(g.a)(v.a.mark((function e(a){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(t=new FileReader).readAsText(a),e.abrupt("return",new Promise((function(e){t.onload=function(a){e(t.result)}})));case 6:return e.prev=6,e.t0=e.catch(0),n._addMessage("ERREUR",e.t0.message,"error"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(a){return e.apply(this,arguments)}}(),n._saveState=function(e){var a=n.props.store;localStorage.setItem(e,JSON.stringify({days:a.days,suppliers:a.suppliers,missedPaymentsByDay:a.missedPaymentsByDay,missedTransactionsByDay:a.missedTransactionsByDay,supplierTotal:a.supplierTotal,supplierRealGain:a.supplierRealGain,daysRawData:a.daysRawData,eventExpenses:a.eventExpenses,dailyAccounting:a.dailyAccounting,ticketPrice:a.ticketPrice,costTotal:a.costTotal}))},n._addMessage=function(){var e=Object(g.a)(v.a.mark((function e(a,t){var r,s,c,u=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=u.length>2&&void 0!==u[2]?u[2]:"info",s=u.length>3&&void 0!==u[3]?u[3]:5e3,c=O("message"),e.next=5,n.setState({popupIds:n.state.popupIds.concat(c),popups:Object.assign({},n.state.popups,Object(d.a)({},c,{title:a,content:t,type:r}))});case 5:setTimeout(Object(g.a)(v.a.mark((function e(){var a,t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.state.popupIds.filter((function(e){return e!==c})),delete(t=Object.assign({},n.state.popups))[c],e.next=5,n.setState({popupIds:a,popups:t});case 5:case"end":return e.stop()}}),e)}))),s);case 6:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),n._openFile=function(){var e=Object(g.a)(v.a.mark((function e(a){var t,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("application/json"===a.type){e.next=3;break}return n._addMessage("ERREUR","Le fichier n'est pas un de type .json","error"),e.abrupt("return",!1);case 3:return e.next=5,n._readFile(a);case 5:if(t=e.sent,r=JSON.parse(t),!Object.keys(r).includes("daysRawData")){e.next=17;break}return e.next=10,n.props.setStore(r);case 10:return e.next=12,n._addMessage("Charg\xe9","Le fichier a bien \xe9t\xe9 charg\xe9","info",2e3);case 12:return e.next=14,n.props.compute();case 14:return e.abrupt("return",!0);case 17:return n._addMessage("ERREUR","Le fichier n'a pas pu \xeatre charg\xe9","error"),e.abrupt("return",!1);case 19:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.clearAll=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.props.clearStore(),e.next=3,n._addMessage("","Tout le contenu a \xe9t\xe9 r\xe9initialis\xe9","error",5e3);case 3:return e.next=5,n.toggleReset();case 5:case"end":return e.stop()}}),e)}))),n.onClickLoad=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n._loadSave("saved-state-manual"),e.next=3,n.toggleLoad();case 3:case"end":return e.stop()}}),e)}))),n.onClickSave=function(){n._saveState("saved-state-manual"),n._addMessage("Sauvegard\xe9","Les informations ont \xe9t\xe9 sauvegard\xe9es","info",3e3),n.toggleSave()},n.onClickSaveFile=function(){!function(e,a,t){var n=new Blob([e],{type:t});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(n,a);else{var r=document.createElement("a"),s=URL.createObjectURL(n);r.href=s,r.download=a,document.body.appendChild(r),r.click(),setTimeout((function(){document.body.removeChild(r),window.URL.revokeObjectURL(s)}),0)}}(JSON.stringify({daysRawData:n.props.store.daysRawData,eventExpenses:n.props.store.eventExpenses,dailyAccounting:n.props.store.dailyAccounting,ticketPrice:n.props.store.ticketPrice,costTotal:n.props.store.costTotal}),"marche-de-noel-".concat(function(){var e=new Date,a=String(e.getDate()).padStart(2,"0"),t=String(e.getMonth()+1).padStart(2,"0"),n=e.getFullYear(),r=e.getHours(),s=e.getMinutes();return"".concat(a,"-").concat(t,"-").concat(n,"-").concat(r,"h").concat(s)}(),".json"),"application/json"),n.toggleSave()},n.onClose=function(){n._saveState("saved-store-auto")},n.onDrop=function(){var e=Object(g.a)(v.a.mark((function e(a){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),a.stopPropagation(),(t=a.dataTransfer)&&t.types.includes("Files")){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,n._openFile(t.files[0]);case 9:n.setState({isDragHover:!1});case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.onFileInputChange=function(){var e=Object(g.a)(v.a.mark((function e(a){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a[0],e.next=3,n._openFile(t);case 3:if(!e.sent){e.next=7;break}return e.next=7,n.toggleLoad();case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.onFileInputWrapperClick=function(e){if(e.currentTarget===e.target){var a=e.currentTarget.getElementsByTagName("input");a.length&&(e.stopPropagation(),a[0].click())}},n.toggleDay=function(){var e=Object(g.a)(v.a.mark((function e(a){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.showDayForm===a,e.next=3,n.setState({showDayForm:!1,showForm:!1});case 3:if(t){e.next=6;break}return e.next=6,n.setState({showDayForm:a});case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.toggleEventForm=Object(g.a)(v.a.mark((function e(){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.state.showForm,e.next=3,n.setState({showForm:!a,showDayForm:!1});case 3:a&&n.props.compute();case 4:case"end":return e.stop()}}),e)}))),n.toggleHelp=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({showHelp:!n.state.showHelp});case 2:case"end":return e.stop()}}),e)}))),n.toggleLoad=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({loadRequested:!n.state.loadRequested});case 2:case"end":return e.stop()}}),e)}))),n.toggleReset=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({resetRequested:!n.state.resetRequested});case 2:case"end":return e.stop()}}),e)}))),n.toggleSave=function(){n.setState({saveRequested:!n.state.saveRequested})},n.state={resetRequested:!1,loadRequested:!1,saveRequested:!1,showForm:!1,showDayForm:!1,showHelp:!1,popupIds:[],popups:{}},n}return Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.addEventListener("beforeunload",this.onClose);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){window.removeEventListener("beforeunload",this.onClose)}},{key:"_getButtons",value:function(){var e,a=this,t=[{className:(this.state.showForm?"active":"")+" purple",fa:"fa-eur",content:"Comptabilit\xe9",callBack:this.toggleEventForm}],n=Object(m.a)(C);try{var s=function(){var n=e.value;t.push({className:(a.state.showDayForm===n?"active ":"")+(a.props.store.daysRawData[n]&&a.props.store.daysRawData[n].customers.length?"green":"alert"),fa:"fa-calendar",callBack:function(){a.toggleDay(n)},content:n})};for(n.s();!(e=n.n()).done;)s()}catch(i){n.e(i)}finally{n.f()}if(t.push({content:"Aide",fa:"fa-info-circle",className:"blue order-2 ml-auto "+(!!this.state.showHelp&&"active"),callBack:this.toggleHelp}),!this.state.saveRequested&&!this.state.loadRequested){var c=[{content:"Tout effacer",fa:"fa-trash",className:"warning",callBack:this.toggleReset}];this.state.resetRequested&&(c=[{content:"Annuler",fa:"fa-times",className:"green",callBack:this.toggleReset},{content:"Confirmer: Effacer l'encodage en cours",fa:"fa-check",className:"alert",callBack:this.clearAll}]),t.push.apply(t,Object(p.a)(c))}var u=[{content:"Sauvegarder",fa:"fa-floppy-o",className:"green order-2",callBack:this.toggleSave}];this.state.saveRequested&&(u=[{content:"Annuler",fa:"fa-times",className:"alert",callBack:this.toggleSave},{content:"Sauvegarde locale",fa:"fa-cloud-download",className:"warning",callBack:this.onClickSave},{content:"T\xe9l\xe9charger la sauvegarde",fa:"fa-download",className:"warning",callBack:this.onClickSaveFile}]),this.state.loadRequested||t.push.apply(t,Object(p.a)(u));var l=[{content:"Charger",fa:"fa-upload",className:"green order-2",callBack:this.toggleLoad}];return this.state.loadRequested&&(l=[{content:"Annuler",fa:"fa-times",className:"alert",callBack:this.toggleLoad},{content:"Charger sauvegarde locale",fa:"fa-cloud-upload",className:"warning",callBack:this.onClickLoad},{fa:"fa-upload",className:"warning",callBack:function(e){return a.onFileInputWrapperClick(e)},content:r.a.createElement(X,{label:'"Charger depuis un fichier .JSON"',className:"noselect",value:void 0,onChange:this.onFileInputChange})}]),this.state.saveRequested||t.push.apply(t,Object(p.a)(l)),t}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"marche-page",onDrop:function(a){return e.onDrop(a)},onDragOver:function(e){e.preventDefault(),e.stopPropagation()}},r.a.createElement(H,{buttons:this._getButtons()}),!!this.state.popupIds.length&&r.a.createElement(J,{messageIds:this.state.popupIds,messages:this.state.popups}),!!this.state.showHelp&&r.a.createElement(ee,null),!!C.includes(this.state.showDayForm)&&r.a.createElement(Z,{day:this.state.showDayForm,addMessage:this._addMessage}),!!this.state.showForm&&r.a.createElement($,null),r.a.createElement(Y,{openDay:this.state.showDayForm}))}}]),t}(r.a.Component),te=Object(w.b)((function(e){return{store:e.marche}}),{setStore:q,compute:U,clearStore:G})(ae);t(48);var ne=function(e){var a=Object(n.useState)({open:!1}),t=Object(u.a)(a,2),s=t[0],c=t[1],l=function(){var e=r.a.useState((function(){return window.localStorage.getItem("color-scheme-option")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")})),a=Object(u.a)(e,2),t=a[0],n=a[1];return r.a.useEffect((function(){var e=window.matchMedia("(prefers-color-scheme: dark)"),a=function(){return n(e.matches?"dark":"light")};return e.addListener(a),window.localStorage.setItem("color-scheme-option",t),function(){return e.removeListener(a)}}),[t]),[t,n]}(),i=Object(u.a)(l,2),p=i[0],m=i[1];return r.a.createElement("div",{className:"page ".concat(p)},s.open?r.a.createElement(te,null):r.a.createElement("div",{className:"page accueil-wrapper"},r.a.createElement("div",{role:"button",className:"light-icon-wrapper clickable noselect",onClick:function(){return m("light"===p?"dark":"light")}},r.a.createElement("i",{className:"light-icon fa "+("light"===p?"fa-sun-o":"fa-moon-o")})),r.a.createElement(o,{callBack:function(){c({open:!0})}})))},re=t(9),se=Object(re.b)({marche:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A(),a=arguments.length>1?arguments[1]:void 0,t={};switch(a.type){case"SAVE_EXPENSES":var n=0,r=a.payload;return Object.values(r).forEach((function(e){return n+=e})),Object(R.a)(Object(R.a)({},e),{eventExpenses:r,costTotal:n});case"SAVE_DAY":var s=a.payload,c=s.day,u=s.data,l=s.dayAccounting,i=Object(R.a)({},e.daysRawData),o=Object(R.a)(Object(R.a)({},e.dailyAccounting),Object(d.a)({},c,l));return i[c]=u,t=B(e.missedPaymentsByDay,e.missedTransactionsByDay,i),Object(R.a)(Object(R.a)(Object(R.a)({},e),{daysRawData:i,dailyAccounting:o}),t);case"COMPUTE":return t=B(e.missedPaymentsByDay,e.missedTransactionsByDay,e.daysRawData),Object(R.a)(Object(R.a)({},e),t);case"FEED_COMPUTE":return t=B(e.missedPaymentsByDay,e.missedTransactionsByDay,e.daysRawData),Object(R.a)(Object(R.a)(Object(R.a)({},e),a.payload),t);case"SET_STORE":return Object(R.a)(Object(R.a)({},e),a.payload);case"CLEAR_STORE":return P;default:return e}}}),ce=Object(re.c)(se);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w.a,{store:ce},r.a.createElement(ne,null))),document.getElementById("root"))}],[[24,1,2]]]);
//# sourceMappingURL=main.fa6830b2.chunk.js.map