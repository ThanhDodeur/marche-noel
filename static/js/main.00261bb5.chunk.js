(this["webpackJsonpmarche-noel"]=this["webpackJsonpmarche-noel"]||[]).push([[0],[,,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/snowflake.c1c98c92.svg"},,,,,,function(e,t,a){e.exports=a(36)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(10),c=a.n(s),u=(a(22),a(1)),l=a.n(u),i=a(2),o=a(3),p=a(11),m=a.n(p);a(24);var d=function(e){return r.a.createElement("div",{className:"accueil noselect"},r.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"March\xe9 de No\xebl"))},v=a(4),f=a(7),h=a(8),g=a(12),y=a(13),b=a(15),E=a(14),N=(a(25),0);function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"id";return N++,"".concat(e).concat(N)}function k(e){return function(t){e>0&&(t(),k(e-1)(t))}}function x(e,t){return e.map((function(e,a){return[e,t[a]]}))}function O(e,t){if(!e)return 0;e=Number(e);var a=Math.abs(t);return Math.round((e+Number.EPSILON)*Math.pow(10,a))/Math.pow(10,a)}function j(e,t){for(var a=Math.min(e.length,t.length),n=[e,t],r=[Object(v.a)(e),Object(v.a)(t)],s=n[0].length===a?[0,1]:[1,0],c=s[0],u=s[1],l=0;l<a;l++){var i=n[c][l];n[u].includes(i)&&(r[0].splice(r[0].indexOf(i),1),r[1].splice(r[1].indexOf(i),1))}return r}a(26);var T=function(e){var t=e.buttons,a=void 0===t?[]:t;return r.a.createElement("nav",{className:"navbar"},a.map((function(e,t){return r.a.createElement("div",{key:t,className:"nav-button clickable noselect ".concat(e.className),onClick:e.callBack},r.a.createElement("span",null,e.fa&&r.a.createElement("i",{className:"fa ".concat(e.fa," inline spaced")}),r.a.createElement("span",{className:"inline"},e.content)))})))};a(27);var S=function(e){var t=e.messageIds,a=e.messages;return r.a.createElement("div",{className:"popups"},t.map((function(e){var t=a[e];return r.a.createElement("div",{key:e,className:"popup "+t.type},r.a.createElement("span",null,t.title),t.content)})))};a(28),a(29),a(30);var D=function(e){var t=e.customers;return r.a.createElement("div",null,r.a.createElement("h2",null,"Liste Client:"),Object.keys(t).map((function(e){return r.a.createElement("div",{className:"entry",key:"cust_"+e},r.a.createElement("span",null,"[client: ",e,"] - "),r.a.createElement("span",null,"total pay\xe9: ",O(t[e].paidTotal,3),"\u20ac"),r.a.createElement("span",null," | "),r.a.createElement("span",null,"a re\xe7u pour un total de: ",O(t[e].suppliedTotal,3),"\u20ac"))})))};a(31);var A=function(e){var t=e.missedPayments;return r.a.createElement("div",null,r.a.createElement("h2",null,"Paiements incorrectes:"),Object.keys(t).map((function(e){return r.a.createElement("div",{className:"entry",key:"missed_"+e},r.a.createElement("span",null,"[client: ",e,"] - "),r.a.createElement("span",null,"Argent Manquant: ",O(t[e],3),"\u20ac"))})))};var C=function(e){var t=e.day,a=e.index,n=e.dayAccounting;return Object.keys(t.customers).length?r.a.createElement("div",{className:"day",key:a},r.a.createElement("h1",null,t.dayName),r.a.createElement("div",{className:"day-data"},r.a.createElement("div",null,"Total des paiements manqu\xe9s: ",O(t.dailyLoss,3),"\u20ac"),r.a.createElement("div",null,"Tickets de tombola vendus: ",n.tombolaTickets),r.a.createElement("div",null,"Moyenne des d\xe9penses des clients: ",O(t.customersAverage||0,3),"\u20ac"),r.a.createElement("div",null,"Moyenne des objets re\xe7u par les clients: ",O(t.obtainedAverage||0,3),"\u20ac"),r.a.createElement(D,{customers:t.customers}),r.a.createElement(A,{missedPayments:t.missedPayments}))):r.a.createElement("div",null)};var R=function(e){var t=e.days,a=e.costTotal,n=e.suppliers,s=e.openDay,c=e.supplierTotal,u=e.dailyAccounting,l=e.ticketPrice;return r.a.createElement("div",null,function(){var e=0,i=Object.entries(n);i.sort((function(e,t){return e[1].total<t[1].total?1:e[1].total>t[1].total?-1:0}));for(var o=0,p=Object.values(u);o<p.length;o++){var m=p[o];e+=Number(m.tombolaTickets)||0}return r.a.createElement("div",{className:"content"},function(e){return r.a.createElement("div",{className:"global-stats profits"},r.a.createElement("h3",null,"B\xe9n\xe9fices"),r.a.createElement("div",null,r.a.createElement("span",null,"B\xe9n\xe9fices des vendeurs:")," ",r.a.createElement("span",{className:"value-display"},O(c,3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Vente de tombola:")),r.a.createElement("div",null,r.a.createElement("span",null,e," x ",l,"\u20ac: "),r.a.createElement("span",{className:"value-display"},O(l*e,3),"\u20ac ")),r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement("i",{className:"fa fa-minus icon"}),"Total des frais: "),r.a.createElement("span",{className:"value-display"},"-",O(a,3),"\u20ac")),r.a.createElement("div",{className:"separated"},r.a.createElement("span",null,"B\xe9n\xe9fices net du march\xe9: "),r.a.createElement("span",{className:"value-display"},O(function(e){return c+l*e-a}(e),3),"\u20ac")),t.map((function(e,t){return s&&s!==e.dayName?r.a.createElement("div",null):r.a.createElement(C,{day:e,key:t,dayAccounting:u[e.dayName],index:t})})))}(e),function(e){for(var a=Object.values(t),n=0,s=0,c=0,u=0,l=a;u<l.length;u++){var i=l[u];n+=i.customersAverage||0,s+=i.obtainedAverage||0,c+=Object.keys(i.customers).length}return r.a.createElement("div",{className:"global-stats"},r.a.createElement("h3",null,"Statistiques (sur ",t.length," jour(s))"),r.a.createElement("div",{className:"daily-stats"},r.a.createElement("div",null,r.a.createElement("span",null,"Moyenne pay\xe9e par les clients:")," ",r.a.createElement("span",{className:"value-display"},O(n/(a.length||1),3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Moyenne des articles re\xe7u:")," ",r.a.createElement("span",{className:"value-display"},O(s/(a.length||1),3),"\u20ac")),r.a.createElement("div",null,r.a.createElement("span",null,"Tickets de tombola Vendus:")," ",r.a.createElement("span",{className:"value-display"},e)),r.a.createElement("div",null,r.a.createElement("span",null,"Quantit\xe9 de fiches pay\xe9es:")," ",r.a.createElement("span",{className:"value-display"},c))))}(e),!!i.length&&function(e){return r.a.createElement("div",{className:"global-stats"},r.a.createElement("h3",null,"Classement des fournisseurs"),e&&e.map((function(e,t){return r.a.createElement("div",{className:"ladder-entry"},r.a.createElement("span",null,t+1,"."),r.a.createElement("span",null,"[",e[0],"]"),r.a.createElement("span",{className:"value"},O(e[1].total,3),"\u20ac"))})))}(i))}())},P=a(16),B=function(){},_=function(e){e.value;var t=e.label,a=void 0===t?"Upload":t,n=e.onChange,s=void 0===n?B:n,c=Object(P.a)(e,["value","label","onChange"]);return r.a.createElement("span",null,r.a.createElement("label",null,r.a.createElement("span",{className:"clickable"},a),r.a.createElement("input",Object.assign({},c,{style:{display:"none"},type:"file",onChange:function(e){s(Object(v.a)(e.target.files)),e.target.value=null}}))))};a(32);var F=function(e){var t=this,a=e.day,s=e.dayRawData,c=void 0===s?{}:s,u=e.save,p=e.addMessage,m=e.dailyAccounting,d=e.missedTransactions,v=Object(n.useState)([].concat(c.customers)),f=Object(o.a)(v,2),h=f[0],g=f[1],y=Object(n.useState)([]),b=Object(o.a)(y,2),E=b[0],N=b[1],w=Object(n.useState)([].concat(c.suppliers)),x=Object(o.a)(w,2),O=x[0],j=x[1],T=Object(n.useState)([]),S=Object(o.a)(T,2),D=S[0],A=S[1],C=Object(n.useState)(void 0),R=Object(o.a)(C,2),P=R[0],B=R[1],F=Object(n.useState)(m),M=Object(o.a)(F,2),L=M[0],q=M[1],I=Object(n.useRef)(null),U=Object(n.useRef)(null),Y=function(){var e=Object(i.a)(l.a.mark((function e(a){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(n=new FileReader).readAsText(a),e.abrupt("return",new Promise((function(e){n.onload=function(t){e(n.result)}})));case 6:return e.prev=6,e.t0=e.catch(0),t._addMessage("ERREUR",e.t0.message,"error"),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(i.a)(l.a.mark((function e(t){var a,n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(1,a=t.split(/\r\n|\n/),k(1)((function(){return a.shift()})),a.shift().split(","),n=[],r=[];a.length;)(s=a.shift().split(","))[0]&&n.push([Number(s[0]),Number(s[1]),s[2],Number(s[3])]),s[4]&&s[5]&&r.push([Number(s[4]),Number(s[5]),s[6],Number(s[7])]);return e.abrupt("return",{newCustomers:n,newSuppliers:r});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(i.a)(l.a.mark((function e(t){var n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("customer"!==t){e.next=8;break}return r=E,e.next=4,N(["","","",""]);case 4:return(n=h).push(r),e.next=8,g(n);case 8:if("supplier"!==t){e.next=16;break}return s=D,e.next=12,A(["","","",""]);case 12:return(n=O).push(s),e.next=16,j(n);case 16:return e.next=18,u(a,{customers:h,suppliers:O},L);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=4;break}return I.current.focus(),e.next=4,K("customer");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Tab"!==t.key){e.next=6;break}return t.stopPropagation(),t.preventDefault(),I.current.focus(),e.next=6,K("customer");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(){var e=Object(i.a)(l.a.mark((function e(t){var n,r,s,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=t[0]).name.includes(".csv")){e.next=4;break}return p("ERREUR","Le fichier doit \xeatre un .csv","error",8e3),e.abrupt("return");case 4:return e.next=6,B(n);case 6:return e.next=8,Y(n);case 8:return r=e.sent,e.next=11,H(r);case 11:s=e.sent,c=s.newCustomers,i=s.newSuppliers,g(c),j(i),u(a,{customers:c,suppliers:i},L);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=4;break}return U.current.focus(),e.next=4,K("supplier");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Tab"!==t.key){e.next=6;break}return t.stopPropagation(),t.preventDefault(),U.current.focus(),e.next=6,K("supplier");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(e,t,n){var r=h||[];if(!1===e){var s=E.map((function(e){return e||""}));return s[t]=n,void N(s)}r[e]||(r[e]=[]),r[e][t]=n,g(r),u(a,{customers:h,suppliers:O},L)},Z=function(e,t,n){var r=O||[];if(!1===e){var s=D.map((function(e){return e||""}));return s[t]=n,void A(s)}r[e]||(r[e]=[]),r[e][t]=n,j(r),u(a,{customers:h,suppliers:O},L)},X=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q({tombolaTickets:Number(t)});case 2:return e.next=4,u(a,{customers:h,suppliers:O},{tombolaTickets:Number(t)});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"content input-page"},r.a.createElement("div",{className:"title-area ml-10"},r.a.createElement("h1",null,a),r.a.createElement("div",{className:"form-button",onClick:function(e){return function(e){if(e.currentTarget===e.target){var t=e.currentTarget.getElementsByTagName("input");t.length&&(e.stopPropagation(),t[0].click())}}(e)}},r.a.createElement(_,{label:"Ajouter .csv",className:"noselect",value:P,onChange:z}))),r.a.createElement("div",null,r.a.createElement("span",{className:"ml-10"},"Tickets de tombola vendus:"),r.a.createElement("input",{className:"number-input ml-10",pattern:"[0-9]*",type:"number",onChange:function(e){X(e.target.value)},value:L.tombolaTickets})),r.a.createElement("div",{className:"area-container"},r.a.createElement("div",{className:"group-input customers"},r.a.createElement("div",{className:"col-titles"},r.a.createElement("div",{className:"number"},"Client"),r.a.createElement("div",{className:"number"},"Fournisseur"),r.a.createElement("div",{className:"string"},"Article"),r.a.createElement("div",{className:"number"},"Prix")),h.map((function(e,t){var a=d[e[0]];return r.a.createElement("div",{className:"customer-row row saved-row "+(a&&a.paidSurplus&&a.paidSurplus.includes(Number(e[3]))?"unpaid":""),key:"customer_"+t},r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){W(t,0,e.target.value)},value:e[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){W(t,1,e.target.value)},value:e[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){W(t,2,e.target.value)},value:e[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){W(t,3,e.target.value)},value:e[3]}),"\u20ac")})),r.a.createElement("div",{className:"customer-row row new-row",onKeyDown:J},r.a.createElement("input",{ref:I,className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){W(!1,0,e.target.value)},value:E[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){W(!1,1,e.target.value)},value:E[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){W(!1,2,e.target.value)},value:E[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onKeyDown:V,onChange:function(e){W(!1,3,e.target.value)},value:E[3]}),"\u20ac"),r.a.createElement("div",null,"Appuier sur 'Tab' pour naviguer entre les cases. Appuier sur 'Entrer' pour sauver la derni\xe8re ligne.")),r.a.createElement("div",{className:"group-input suppliers"},r.a.createElement("div",{className:"col-titles"},r.a.createElement("div",{className:"number"},"Fournisseur"),r.a.createElement("div",{className:"number"},"Client"),r.a.createElement("div",{className:"string"},"Article"),r.a.createElement("div",{className:"number"},"Prix")),O.map((function(e,t){var a=d[e[1]];return r.a.createElement("div",{className:"supplier-row row saved-row "+(a&&a.suppliedSurplus&&a.suppliedSurplus.includes(Number(e[3]))?"unpaid":""),key:"supplier_"+t},r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){Z(t,0,e.target.value)},value:e[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){Z(t,1,e.target.value)},value:e[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){Z(t,2,e.target.value)},value:e[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){Z(t,3,e.target.value)},value:e[3]}),"\u20ac")})),r.a.createElement("div",{className:"supplier-row row new-row",onKeyDown:G},r.a.createElement("input",{ref:U,className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){Z(!1,0,e.target.value)},value:D[0]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onChange:function(e){Z(!1,1,e.target.value)},value:D[1]}),r.a.createElement("input",{className:"string-input",onChange:function(e){Z(!1,2,e.target.value)},value:D[2]}),r.a.createElement("input",{className:"number-input",pattern:"[0-9]*",type:"number",onKeyDown:Q,onChange:function(e){Z(!1,3,e.target.value)},value:D[3]}),"\u20ac"),r.a.createElement("div",null,"Appuier sur 'Tab' pour naviguer entre les cases. Appuier sur 'Entrer' pour sauver la derni\xe8re ligne."))))};a(33);var M=function(e){var t=e.eventExpenses,a=e.ticketPrice,s=e.save,c=Object(n.useState)(t||{}),u=Object(o.a)(c,2),l=u[0],i=u[1],p=Object(n.useState)(a||0),m=Object(o.a)(p,2),d=m[0],v=m[1],f=["Salle","Transactions","Assurance","Papeterie","Timbres","Courses","Traiteur","Schmitz","Autre"];function h(e){return l[e]||0}return Object(n.useEffect)((function(){return function(){s({eventExpenses:l,ticketPrice:d})}}),[s,l,d]),r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"form"},r.a.createElement("div",{className:"input-grid left"},f.map((function(e){return r.a.createElement("div",null,r.a.createElement("span",{className:"accounting-span"},e,": "),r.a.createElement("input",{className:"accounting-input",onChange:function(t){!function(e,t){var a=Object.assign({},l);a[e]=t,i(a)}(e,Number(t.target.value))},pattern:"[0-9]*",type:"number",value:h(e)})," \u20ac")}))),r.a.createElement("div",{className:"input-grid right"},r.a.createElement("div",null,r.a.createElement("span",{className:"accounting-span"}," Prix des tickets: "),r.a.createElement("input",{className:"accounting-input",onChange:function(e){v(Number(e.target.value))},pattern:"[0-9]*",type:"number",value:d}),"\u20ac"))))};a(34);var L=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],s=t[1];return r.a.createElement("div",{className:"help"},r.a.createElement("div",{className:"help-link ml-auto"},r.a.createElement("a",{className:"help-text",target:"new",href:"https://docs.google.com/spreadsheets/d/1UKT38_RUa3MQ_HEGtWgaPKvedD35wYksaj7-T0sc9N8/edit?usp=sharing"},"Format accept\xe9"),r.a.createElement("i",{className:"fa fa-file-excel-o"})),r.a.createElement("div",{className:"help-link ml-auto",onClick:function(){s(!a)}},r.a.createElement("u",null,"Vid\xe9o d'explication"),r.a.createElement("i",{className:"fa fa-play"})),!!a&&r.a.createElement("iframe",{title:"help video",src:"https://drive.google.com/file/d/1hk40AsnzUJ7gUevslwSnfZGkSvyJ0OKu/preview",width:"900",height:"500"}))},q=function(e){Object(b.a)(a,e);var t=Object(E.a)(a);function a(e){var n;return Object(g.a)(this,a),(n=t.call(this))._loadSave=function(){var e=Object(i.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=localStorage.getItem(t))){e.next=4;break}return e.next=4,n.setState(JSON.parse(a));case 4:return e.next=6,n._addMessage("Charg\xe9","La derni\xe8re sauvegarde \xe0 \xe9t\xe9 charg\xe9e","info",2e3);case 6:return e.next=8,n._computeResults();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._saveState=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.setItem(t,JSON.stringify({daysRawData:n.state.daysRawData,eventExpenses:n.state.eventExpenses,dailyAccounting:n.state.dailyAccounting,ticketPrice:n.state.ticketPrice,costTotal:n.state.costTotal})),e.next=3,n._addMessage("Sauvegard\xe9","Les informations ont \xe9t\xe9 sauvegard\xe9es","info",5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._computeResults=Object(i.a)(l.a.mark((function e(){var t,a,r,s,c,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._processDays();case 2:return t=e.sent,a=t.days,r=t.suppliers,s=t.supplierTotal,c=t.missedPaymentsByDay,u=t.missedTransactionsByDay,e.next=10,n.setState({days:a,suppliers:r,supplierTotal:s,missedPaymentsByDay:c,missedTransactionsByDay:u});case 10:case"end":return e.stop()}}),e)}))),n._addMessage=function(){var e=Object(i.a)(l.a.mark((function e(t,a){var r,s,c,u=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=u.length>2&&void 0!==u[2]?u[2]:"info",s=u.length>3&&void 0!==u[3]?u[3]:5e3,c=w("message"),e.next=5,n.setState({popupIds:n.state.popupIds.concat(c),popups:Object.assign({},n.state.popups,Object(h.a)({},c,{title:t,content:a,type:r}))});case 5:setTimeout(Object(i.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.popupIds.filter((function(e){return e!==c})),delete(a=Object.assign({},n.state.popups))[c],e.next=5,n.setState({popupIds:t,popups:a});case 5:case"end":return e.stop()}}),e)}))),s);case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n._processDays=Object(i.a)(l.a.mark((function e(){var t,a,r,s,c,u,i,p,m,d,v;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=[],a={},r=0,s=n.state.missedPaymentsByDay,c=n.state.missedTransactionsByDay,u=0,i=Object.entries(n.state.daysRawData);u<i.length;u++)p=Object(o.a)(i[u],2),m=p[0],d=p[1],v=n._computeDay({dayName:m,dayRaw:d,suppliers:a}),a=v.suppliers,s[m]=v.missedPayments,c[m]=v.missedTransactions,t.push(v.day);return Object.values(a).forEach((function(e){return r+=e.total})),e.abrupt("return",{days:t,suppliers:a,supplierTotal:r,missedPaymentsByDay:s,missedTransactionsByDay:c});case 8:case"end":return e.stop()}}),e)}))),n._computeDay=function(e){var t,a=e.dayName,r=e.dayRaw,s=e.suppliers,c=r.customers,u=r.suppliers,l={},i={paid:[],paidTotal:0,paymentTransactions:[],recievedTransactions:[],supplied:[],suppliedTotal:0},o=Object(f.a)(c);try{for(o.s();!(t=o.n()).done;){var p=t.value;if(p[0]){l[p[0]]=l[p[0]]||Object.assign({},i);var m=Number(p[3]);l[p[0]].paidTotal+=m||0,l[p[0]].paymentTransactions.push(m),l[p[0]].paid.push({name:p[2],price:p[3],supplierId:p[1]})}}}catch(N){o.e(N)}finally{o.f()}var d,v=Object(f.a)(u);try{for(v.s();!(d=v.n()).done;){var h=d.value;if(h[0]&&h[1]){l[h[1]]=l[h[1]]||Object.assign({},i);var g=Number(h[3]);l[h[1]].suppliedTotal+=g||0,l[h[1]].recievedTransactions.push(g),l[h[1]].supplied.push({name:h[2],price:h[3],supplierId:h[0]}),s[h[0]]=s[h[0]]||{total:0},s[h[0]].total+=Number(h[3])||0}}}catch(N){v.e(N)}finally{v.f()}var y=n._computeDailyStats(l),b=y.missedPayments,E=y.missedTransactions;return{day:{dayName:a,customers:l,missedPayments:b,missedTransactions:E,dailyLoss:y.dailyLoss,customersAverage:y.customersAverage,obtainedAverage:y.obtainedAverage},suppliers:s,missedPayments:b,missedTransactions:E}},n._computeDailyStats=function(e){for(var t={},a={},n=0,r=0,s=0,c=Object.entries(e),u=0,l=c;u<l.length;u++){var i=Object(o.a)(l[u],2),p=i[0],m=i[1],d=m.paidTotal,v=m.suppliedTotal,f=v-d,h=j(m.paymentTransactions,m.recievedTransactions),g=Object(o.a)(h,2),y=g[0],b=g[1];a[p]={paidSurplus:y,suppliedSurplus:b},s+=Number(v),r+=Number(d),0!==f&&(t[p]=f,n+=f)}return{missedPayments:t,missedTransactions:a,dailyLoss:n,customersTotal:r,customersAverage:r/(c.length||0),obtainedAverage:s/(c.length||0)}},n.clearAll=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({daysRawData:Object.fromEntries(x(n.DAYS,Array(3).fill({customers:[],suppliers:[]}))),showDayForm:!1,eventExpenses:{},dailyAccounting:Object.fromEntries(x(n.DAYS,Array(3).fill({tombolaTickets:0}))),supplierTotal:0,costTotal:0,ticketPrice:0});case 2:return e.next=4,n._computeResults();case 4:return e.next=6,n._addMessage("","Tout le contenu a \xe9t\xe9 r\xe9initialis\xe9","error",5e3);case 6:return e.next=8,n.toggleReset();case 8:case"end":return e.stop()}}),e)}))),n.onClickLoad=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._loadSave("saved-state-manual");case 2:return e.next=4,n.toggleLoad();case 4:case"end":return e.stop()}}),e)}))),n.onClickSave=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._saveState("saved-state-manual");case 2:return e.next=4,n.toggleLoad();case 4:case"end":return e.stop()}}),e)}))),n.onClose=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._saveState("saved-state-auto");case 2:case"end":return e.stop()}}),e)}))),n.onSaveDayForm=function(){var e=Object(i.a)(l.a.mark((function e(t,a,r){var s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(s=Object.assign({},n.state.daysRawData))[t]=a,e.next=4,n.setState({daysRawData:s,dailyAccounting:Object.assign(n.state.dailyAccounting,Object(h.a)({},t,r))});case 4:return e.next=6,n._computeResults();case 6:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),n.onSaveEventForm=function(){var e=Object(i.a)(l.a.mark((function e(t){var a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.eventExpenses,r=t.ticketPrice,s=0,Object.values(a).forEach((function(e){return s+=e})),e.next=5,n.setState({eventExpenses:a,ticketPrice:r,costTotal:s});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.toggleDay=function(){var e=Object(i.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.state.showDayForm===t,e.next=3,n.setState({showDayForm:!1,showForm:!1});case 3:if(a){e.next=6;break}return e.next=6,n.setState({showDayForm:t});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.toggleEventForm=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.showForm,e.next=3,n.setState({showForm:!t,showDayForm:!1});case 3:t&&n._computeResults();case 4:case"end":return e.stop()}}),e)}))),n.toggleHelp=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({displayHelp:!n.state.displayHelp});case 2:case"end":return e.stop()}}),e)}))),n.toggleLoad=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({loadRequested:!n.state.loadRequested});case 2:case"end":return e.stop()}}),e)}))),n.toggleReset=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({resetRequested:!n.state.resetRequested});case 2:case"end":return e.stop()}}),e)}))),n.toggleSave=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({saveRequested:!n.state.saveRequested});case 2:case"end":return e.stop()}}),e)}))),n.DAYS=["Vendredi","Samedi","Dimanche"],n.state={daysRawData:Object.fromEntries(x(n.DAYS,Array(3).fill({customers:[],suppliers:[]}))),days:[],missedPaymentsByDay:{},missedTransactionsByDay:{},suppliers:{},resetRequested:!1,loadRequested:!1,saveRequested:!1,showForm:!1,showDayForm:!1,displayHelp:!1,eventExpenses:{},dailyAccounting:Object.fromEntries(x(n.DAYS,Array(3).fill({tombolaTickets:0}))),supplierTotal:0,costTotal:0,ticketPrice:0,popupIds:[],popups:{}},n}return Object(y.a)(a,[{key:"componentDidMount",value:function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.addEventListener("beforeunload",this.onClose),e.next=3,this._loadSave("saved-state-auto");case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){window.removeEventListener("beforeunload",this.onClose)}},{key:"_getButtons",value:function(){var e,t=this,a=[{className:(this.state.showForm?"active":"")+" purple",fa:"fa-eur",content:"Comptabilit\xe9",callBack:this.toggleEventForm}],n=Object(f.a)(this.DAYS);try{var r=function(){var n=e.value;a.push({className:(t.state.showDayForm===n?"active ":"")+(t.state.daysRawData[n].customers.length?"green":"alert"),fa:"fa-calendar",callBack:function(){t.toggleDay(n)},content:n})};for(n.s();!(e=n.n()).done;)r()}catch(l){n.e(l)}finally{n.f()}a.push({content:"Aide",fa:"fa-info-circle",className:"blue order-2 ml-auto",callBack:this.toggleHelp});var s=[{content:"Tout effacer",fa:"fa-trash",className:"warning",callBack:this.toggleReset}];this.state.resetRequested&&(s=[{content:"Annuler",fa:"fa-times",className:"green",callBack:this.toggleReset},{content:"Confirmer: Effacer l'encodage en cours",fa:"fa-check",className:"alert",callBack:this.clearAll}]),a.push.apply(a,Object(v.a)(s));var c=[{content:"Sauvegarder",fa:"fa-upload",className:"green order-2",callBack:this.toggleSave}];this.state.saveRequested&&(c=[{content:"Annuler",fa:"fa-times",className:"green",callBack:this.toggleSave},{content:"Confirmer: Sauvegarder",fa:"fa-check",className:"alert",callBack:this.onClickSave}]),this.state.loadRequested||a.push.apply(a,Object(v.a)(c));var u=[{content:"Charcher",fa:"fa-download",className:"green order-2",callBack:this.toggleLoad}];return this.state.loadRequested&&(u=[{content:"Annuler",fa:"fa-times",className:"green",callBack:this.toggleLoad},{content:"Confirmer: Charder la Sauvegarde",fa:"fa-check",className:"alert",callBack:this.onClickLoad}]),this.state.saveRequested||a.push.apply(a,Object(v.a)(u)),a}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(T,{buttons:this._getButtons()}),!!this.state.popupIds.length&&r.a.createElement(S,{messageIds:this.state.popupIds,messages:this.state.popups}),!!this.state.displayHelp&&r.a.createElement(L,null),!!this.DAYS.includes(this.state.showDayForm)&&r.a.createElement(F,{day:this.state.showDayForm,dayRawData:this.state.daysRawData[this.state.showDayForm],save:this.onSaveDayForm,addMessage:this._addMessage,missedTransactions:this.state.missedTransactionsByDay[this.state.showDayForm],dailyAccounting:this.state.dailyAccounting[this.state.showDayForm]}),this.state.showForm?r.a.createElement(M,{eventExpenses:this.state.eventExpenses,ticketPrice:this.state.ticketPrice,save:this.onSaveEventForm}):r.a.createElement(R,{days:this.state.days,dailyAccounting:this.state.dailyAccounting,ticketPrice:this.state.ticketPrice,costTotal:this.state.costTotal,suppliers:this.state.suppliers,openDay:this.state.showDayForm,supplierTotal:this.state.supplierTotal}))}}]),a}(r.a.Component);a(35);var I=function(e){var t=Object(n.useState)({open:!1}),a=Object(o.a)(t,2),s=a[0],c=a[1];return Object(n.useEffect)((function(){return setTimeout(Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c({open:!0});case 1:case"end":return e.stop()}}),e)}))),15e3),function(){}}),[c]),r.a.createElement("div",{className:"page"},s.open?r.a.createElement("div",{className:"page"},r.a.createElement(q,null)):r.a.createElement("div",{className:"page clickable",onClick:function(){c({open:!0})}},r.a.createElement(d,null)))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root"))}],[[17,1,2]]]);
//# sourceMappingURL=main.00261bb5.chunk.js.map