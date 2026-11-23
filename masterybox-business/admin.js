const DEFAULTS=[
{letter:"A",name:"Learning Tools",price:3,icon:"🖊️📓",description:"Study Essential",enabled:true,weight:1},
{letter:"B",name:"Accessories",price:4.5,icon:"💍👓",description:"Stylish extras",enabled:true,weight:1},
{letter:"C",name:"Ultensils",price:4,icon:"🍽🥄🍴",description:"Kitchen essentials",enabled:true,weight:1},
{letter:"D",name:"Phone case",price:200,icon:"📱",description:"Phone Cover",enabled:true,weight:1},
{letter:"E",name:"Candies",price:80,icon:"🍫🍬🍟",description:"Sweet treets",enabled:true,weight:1}
];
const KEY="masterybox_products_v2";
let products=load();
function load(){try{const p=JSON.parse(localStorage.getItem(KEY));return Array.isArray(p)&&p.length?p:DEFAULTS.map(x=>({...x}))}catch{return DEFAULTS.map(x=>({...x}))}}
const login=document.getElementById("login"),dashboard=document.getElementById("dashboard");
document.getElementById("loginBtn").onclick=()=>{if(document.getElementById("password").value==="masterybox123"){login.classList.add("hidden");dashboard.classList.remove("hidden");render()}else alert("Incorrect password")};
function render(){
 const wrap=document.getElementById("products");wrap.innerHTML="";
 products.forEach((p,i)=>{
 const card=document.createElement("div");card.className="item";
 card.innerHTML=`<h3>Letter ${p.letter}</h3>
 <label>Product name</label><input data-i="${i}" data-k="name" value="${escapeHtml(p.name)}">
 <label>Price $(</label><input type="number" min="0" data-i="${i}" data-k="price" value="${Number(p.price)}">
 <label>Icon (emoji)</label><input data-i="${i}" data-k="icon" value="${escapeHtml(p.icon||"🎁")}">
 <label>Description</label><input data-i="${i}" data-k="description" value="${escapeHtml(p.description||"")}">
 <label>Selection weight</label><input type="number" min="0" step="1" data-i="${i}" data-k="weight" value="${Number(p.weight)||0}">
 <label><input style="width:auto" type="checkbox" data-i="${i}" data-k="enabled" ${p.enabled?"checked":""}> Active</label>`;
 wrap.appendChild(card);
 });
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
document.getElementById("saveBtn").onclick=()=>{
 document.querySelectorAll("[data-i]").forEach(el=>{const p=products[Number(el.dataset.i)],k=el.dataset.k;p[k]=el.type==="checkbox"?el.checked:(["price","weight"].includes(k)?Number(el.value):el.value)});
 if(products.some(p=>!p.name.trim()||p.price<0||p.weight<0)){alert("Please check product names, prices and weights.");return}
 if(!products.some(p=>p.enabled&&p.weight>0)){alert("At least one product must be active with a weight above zero.");return}
 localStorage.setItem(KEY,JSON.stringify(products));document.getElementById("status").textContent="Product settings saved in this browser.";
};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Restore the sample products?")){products=DEFAULTS.map(x=>({...x}));localStorage.setItem(KEY,JSON.stringify(products));render()}};
document.getElementById("clearBtn").onclick=()=>{localStorage.removeItem("masterybox_customer_result_v2");document.getElementById("status").textContent="Customer result cleared on this browser. Refresh the customer page to test again."};
