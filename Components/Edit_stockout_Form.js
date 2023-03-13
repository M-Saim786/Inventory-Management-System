var item_uid = localStorage.getItem("item_uid");
var inps = document.getElementsByTagName("input");
console.log(inps)
var imgUrl_Old
var update_sale = document.getElementById("update_sale");
firebase
  .database()
  .ref("StockOut")
  .child(item_uid)
  .once("value", (snap_data) => {
    var data = Object.values(snap_data.toJSON());
    console.log(data);
    inps[0].value = data[6]; //pname
    inps[1].value = data[8]; //pprice
    inps[2].value = data[9]; //pqty
    inps[3].value = data[4]; //pdescription
    inps[4].value = data[3]; //p_category
    inps[6].value = data[10] //p_status
    inps[7].value = data[7] //payment
    inps[8].value =  data[1]//cus_id
    inps[9].value = data[2]; //cus_name
 imgUrl_Old = data[6]
console.log(imgUrl_Old)
  });
  // console.log(imgUrl_Old)
update_sale.addEventListener("click",async () => {
  console.log("click");
  console.log(item_uid);
  console.log(imgUrl_Old)

// firebase.database().ref('Products').child()



 await firebase.database().ref("StockOut").child(item_uid).update({
    Product_Name: inps[0].value,
    Product_Price: inps[1].value,
    Product_Qty: inps[2].value,
    Product_Desc: inps[3].value,
    Product_Category: inps[4].value,
    Product_Status : inps[6].value,
    Product_Payment: inps[7].value,
    Customer_ID: inps[8].value,
    Customer_Name: inps[9].value,
  });

window.location.href = 'stockout.html'
localStorage.removeItem("item_uid")

});
