var pname = document.getElementById("pname");
var pprice = document.getElementById("pprice");
var pqty = document.getElementById("pqty");
var pdesc = document.getElementById("pdesc");
var p_category = document.getElementById("p_category");
var pstatus = document.getElementById("pstatus");
var payment = document.getElementById("payment");
var key = localStorage.getItem("e_id");

var cus_Id = document.getElementById("cus_Id");
var cus_name = document.getElementById("cus_name");

console.log(key);


firebase.database().ref("StockOut").child(key).once("value", async function (snap) {
  var data = Object.values(snap.toJSON());
  console.log(data);

})



firebase
  .database()
  .ref("Products")
  .child(key)
  .once("value", (snap_data) => {
    var data = Object.values(snap_data.toJSON());
    console.log(data);
    (pname.value = data[5]), (pprice.value = data[6]), (Img_Url = data[4]);
    pdesc.value = data[3];

    p_category.value = data[2];
  });

var add_sale = document.getElementById("add_sale");
add_sale.addEventListener("click", async (e) => {
  e.preventDefault();
  var date = new Date();
  curr_date = date.toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' });
  console.log("curr_date: " + curr_date);
  // var key = firebase.database().ref("StockOut").push().getKey();
  // console.log(key);
  const user_uid = localStorage.getItem("User_UID")
  console.log("user_uid: " + user_uid)



  await firebase.database().ref("StockOut").child(key).set({
    Product_Name: pname.value,
    Product_Price: pprice.value,
    Product_Qty: pqty.value,
    Product_Desc: pdesc.value,
    Product_Img: Img_Url,
    Product_Category: p_category.value,
    Product_UID: key,
    Product_Status: pstatus.value,
    Product_Payment: payment.value,
    Current_Date: curr_date,
    Customer_ID: cus_Id.value,
    Customer_Name: cus_name.value,
    User_UID: user_uid
  });

  var e_id = localStorage.getItem("e_id");


  firebase
    .database()
    .ref("StockOut")
    .child(key)
    .once("value", async function (snap) {
      var data_out = Object.values(snap.toJSON());
      console.log(data_out);
      await firebase
        .database()
        .ref("Products")
        .child(e_id)
        .once("value", function (snap_data) {
          var data = Object.values(snap_data.toJSON());
          console.log(data);

          firebase
            .database()
            .ref("Products")
            .child(key)
            .update({
              Product_Qty: data[7] - data_out[9],
            });
        });
      window.location.href = "stockout.html";
    });

  // console.log(data)
  // window.location.href = 'stockout.html'
});



// firebase.database().ref("StockOut").child(key).once("value", (snap) => {
//   var data = Object.values(snap.toJSON())
//   console.log(data)
// })