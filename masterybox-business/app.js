// Demo products. Edit these defaults in admin.html or in your browser's Admin page.
const DEFAULT_PRODUCTS = [
  {letter:"A",name:"Learning Tools",price:3,icon:"🖊️📓",description:"Study Essential",enabled:true,weight:1},
  {letter:"B",name:"Accessories",price:4.5,icon:"💍👓",description:"Stylish extras",enabled:true,weight:1},
  {letter:"C",name:"Ultensils",price:4,icon:"🍽🥄🍴",description:"Kitchen essentials",enabled:true,weight:1},
  {letter:"D",name:"Phone case",price:3.5,icon:"📱",description:"Phone Cover",enabled:true,weight:1},
  {letter:"E",name:"Candies",price:2.5,icon:"🍫🍬🍟",description:"Sweet treets",enabled:true,weight:1}
];
const PRODUCTS_KEY="masterybox_products_v2";
const RESULT_KEY="masterybox_customer_result_v2";
function getProducts(){try{const saved=JSON.parse(localStorage.getItem(PRODUCTS_KEY));return Array.isArray(saved)&&saved.length?saved:DEFAULT_PRODUCTS}catch{return DEFAULT_PRODUCTS}}
function chooseProduct(products){
  const active=products.filter(p=>p.enabled && Number(p.weight)>0);
  const total=active.reduce((sum,p)=>sum+Number(p.weight),0);
  if(!total) return null;
  let random=Math.random()*total;
  for(const product of active){random-=Number(product.weight);if(random<0)return product}
  return active[active.length-1];
}
const openBtn=document.getElementById("openBtn");
const result=document.getElementById("result");
document.getElementById("year").textContent=new Date().getFullYear();
function showResult(product){
  document.getElementById("letter").textContent=product.letter;
  document.getElementById("productName").textContent=product.name;
  document.getElementById("productIcon").textContent=product.icon||"🎁";
  document.getElementById("productDescription").textContent=product.description||"A surprise selected for you.";
  document.getElementById("productPrice").textContent=Number(product.price).toLocaleString()+"$";
  document.getElementById("payAmount").textContent=Number(product.price).toLocaleString()+"$";
  document.getElementById("resultTitle").textContent="Your mystery is revealed!";
  result.classList.remove("hidden");
  openBtn.classList.add("hidden");
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
const previous=localStorage.getItem(RESULT_KEY);
if(previous){try{showResult(JSON.parse(previous))}catch{localStorage.removeItem(RESULT_KEY)}}
openBtn.addEventListener("click",()=>{
  if(localStorage.getItem(RESULT_KEY)){showResult(JSON.parse(localStorage.getItem(RESULT_KEY)));return}
  openBtn.disabled=true;openBtn.textContent="OPENING YOUR BOX...";
  document.getElementById("boxStage").classList.add("opening");
  setTimeout(()=>{
    const product=chooseProduct(getProducts());
    if(!product){openBtn.disabled=false;openBtn.textContent="OPEN MY MYSTERY BOX";alert("No active products are available. Please contact the shop.");return}
    localStorage.setItem(RESULT_KEY,JSON.stringify(product));
    showResult(product);
  },1100);
});
