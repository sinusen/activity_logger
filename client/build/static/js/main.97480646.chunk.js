(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{29:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(3),c=a.n(r),s=a(21),i=a.n(s),o=a(2),l=a.n(o),u=a(4),h=a(6),d=a(7),p=a(9),m=a(8),j=(a(29),a(11)),b=a.n(j),v=a(5),f=a(12),O=function(e){var t=e.label,a=e.selected,r=e.options,c=e.onSelectedChange,s=r.length>0?r.map((function(e){return Object(n.jsx)("option",{value:e.value,children:e.label},e.value)})):null;return Object(n.jsxs)("div",{children:[Object(n.jsx)("label",{children:t}),Object(n.jsx)("select",{value:a,onChange:c,className:"form-select","aria-label":"Default select example",children:s})]})};function x(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=new Date(Number(e)),a=""+(t.getMonth()+1),n=""+t.getDate(),r=t.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[r,a,n].join("-")}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=new Date(Number(e)),a=""+(t.getMonth()+1),n=""+t.getDate(),r=t.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[n,a,r].join("/")}function D(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=new Date(e),a=""+t.getMinutes(),n=""+t.getHours();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[n,a].join(":")}var y=a(22),S=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).areas=[],n.machines=[],n.operators=[],n.setDefaultStates=function(){var e=Object(f.a)(Object(f.a)({},n.state),{},{maintenanceActivity:"",selectedDate:x(),selectedTime:D()});n.setState(e)},n.updateMachines=function(){var e;n.machines=(e=n.state.currentArea,n.props.machinesList.filter((function(t){return t.machine_location===e})).map((function(e){var t=e.id;return{label:e.machine_name,value:t}}))),n.setState({currentMachine:n.machines[0].value})},n.updateAreas=function(){n.areas=function(e){var t=[];return Object(y.a)(new Set(e.map((function(e){return e.machine_location})))).forEach((function(e,a,n){t.push({label:e,value:e})})),t}(n.props.machinesList),n.setState({currentArea:n.areas[0].value},(function(){n.updateMachines()}))},n.handleAreaChange=function(e,t){n.setState(Object(v.a)({},t,e.target.value),(function(){n.updateMachines()}))},n.handleChange=function(e,t){n.setState(Object(v.a)({},t,e.target.value))},n.handleFormSubmission=function(e){var t,a;e.preventDefault(),n.props.onFormSubmit({epochMilliSeconds:(t=n.state.selectedDate,a=n.state.selectedTime,new Date("".concat(t," ").concat(a)).getTime()),machineId:Number(n.state.currentMachine),operatorId:Number(n.state.currentOperator),activity:n.state.maintenanceActivity})},n.state={maintenanceActivity:"",currentArea:"",currentMachine:"",selectedDate:x(),selectedTime:D(),currentOperator:""},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.onFormMount();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){this.props.machinesList!==e.machinesList&&this.props.machinesList&&this.updateAreas(),this.props.operatorsList!==e.operatorsList&&this.props.operatorsList&&(this.operators=this.props.operatorsList.map((function(e){var t=e.id;return{label:e.name,value:t}})),this.setState({currentOperator:this.operators[0].value}),console.log(this.operators)),this.props.postSuccessCount!==e.postSuccessCount&&this.setDefaultStates()}},{key:"render",value:function(){var e=this;return Object(n.jsx)("form",{onSubmit:this.handleFormSubmission,children:Object(n.jsxs)("div",{className:"row g-5",children:[Object(n.jsx)("div",{className:"col-md-6",children:Object(n.jsx)(O,{label:"Select an area",selected:this.state.currentArea,options:this.areas,onSelectedChange:function(t){e.handleAreaChange(t,"currentArea")}})}),Object(n.jsx)("div",{className:"col-md-6",children:Object(n.jsx)(O,{label:"Select a machine",selected:this.state.currentMachine,options:this.machines,onSelectedChange:function(t){e.handleChange(t,"currentMachine")}})}),Object(n.jsxs)("div",{className:"col-md-6",children:[Object(n.jsx)("label",{htmlFor:"datePicker",className:"form-label",children:"Select the date"}),Object(n.jsx)("input",{className:"form-control",id:"datePicker",type:"date",value:this.state.selectedDate,onChange:function(t){e.handleChange(t,"selectedDate")}})]}),Object(n.jsxs)("div",{className:"col-md-6",children:[Object(n.jsx)("label",{htmlFor:"timePicker",className:"form-label",children:"Select the time"}),Object(n.jsx)("input",{className:"form-control",id:"timePicker",type:"time",value:this.state.selectedTime,onChange:function(t){e.handleChange(t,"selectedTime")}})]}),Object(n.jsx)("div",{className:"col-md-12",children:Object(n.jsx)(O,{label:"Please input the initials",selected:this.state.currentOperator,options:this.operators,onSelectedChange:function(t){e.handleChange(t,"currentOperator")}})}),Object(n.jsxs)("div",{className:"col-12",children:[Object(n.jsx)("label",{htmlFor:"maintenanceActivities",className:"form-label",children:"Maintenance Activities"}),Object(n.jsx)("textarea",{id:"maintenanceActivities",className:"form-control",placeholder:"Enter activity",style:{height:"200px"},value:this.state.maintenanceActivity,onChange:function(t){e.handleChange(t,"maintenanceActivity")},required:!0})]}),Object(n.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Submit"})]})})}}]),a}(c.a.Component),N=function(e){var t=e.activityData;return Object(n.jsx)("div",{children:Object(n.jsxs)("table",{className:"table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{scope:"col",children:"Sl No"}),Object(n.jsx)("th",{scope:"col",children:"Date"}),Object(n.jsx)("th",{scope:"col",children:"Time"}),Object(n.jsx)("th",{scope:"col",children:"Machine"}),Object(n.jsx)("th",{scope:"col",children:"Operator"}),Object(n.jsx)("th",{scope:"col",children:"Activity"})]})}),Object(n.jsx)("tbody",{children:t.length<=0?null:t.map((function(e,t){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{scope:"row",children:t+1}),Object(n.jsx)("td",{children:g(Number(e.epoch_ms))}),Object(n.jsx)("td",{children:D(Number(e.epoch_ms))}),Object(n.jsx)("td",{children:e.machine_name}),Object(n.jsx)("td",{children:e.machine_operator}),Object(n.jsx)("td",{children:e.activity})]},t)}))})]})})},w=function(e){var t=e.activityData;return Object(n.jsx)("div",{children:Object(n.jsx)(N,{activityData:t})})},C=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={formDataError:!1,tableDataError:!1,activityData:[],postSuccessCount:0,machinesList:null,operatorsList:null},e.fetchOperationData=function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("/activity-log/".concat(t));case 3:return a=e.sent,e.abrupt("return",{error:a.data.serverError,data:a.data.data});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{error:!0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),e.fetchDropdownData=Object(u.a)(l.a.mark((function t(){var a,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchOperationData("area-and-machines");case 2:return a=t.sent,t.next=5,e.fetchOperationData("operators");case 5:if(n=t.sent,!a.error&&!n.error){t.next=9;break}return e.setState({formDataError:!0}),t.abrupt("return");case 9:e.setState({machinesList:a.data}),e.setState({operatorsList:n.data});case 11:case"end":return t.stop()}}),t)}))),e.postFormData=function(){var t=Object(u.a)(l.a.mark((function t(a){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.post("/activity-log/submit-form-data",a);case 3:n=t.sent,alert(n.data.message),n.data.error||e.setState({postSuccessCount:e.state.postSuccessCount+1}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0),alert("Form submit error");case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(d.a)(a,[{key:"renderForm",value:function(){return this.state.formDataError?"Error loading data":Object(n.jsx)("div",{className:"activity-form",children:Object(n.jsx)(S,{onFormMount:this.fetchDropdownData,machinesList:this.state.machinesList,operatorsList:this.state.operatorsList,onFormSubmit:this.postFormData,postSuccessCount:this.state.postSuccessCount})})}},{key:"renderTable",value:function(){return this.state.tableDataError?"Error loading data":Object(n.jsx)("div",{children:Object(n.jsx)(w,{activityData:this.state.activityData})})}},{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchOperationData("activity-logs");case 2:if(!(t=e.sent).error){e.next=6;break}return this.setState({tableDataError:t.error}),e.abrupt("return");case 6:this.setState({activityData:t.data});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("h1",{className:"text-center main-title",children:"Activity Logger"}),this.renderForm(),this.renderTable()]})}}]),a}(c.a.Component);i.a.render(Object(n.jsx)(C,{}),document.querySelector("#root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.97480646.chunk.js.map