var show_prod = document.getElementById("show_prod");
let user_uid  =localStorage.getItem("User_UID")
firebase
  .database()
  .ref("Products")
  .once("value", function (snap_data) {
    console.log(snap_data);
    var data = Object.values(snap_data.toJSON());

    if (data.length != undefined) {
      console.log(data);
      sno = 1;
      //  firebase.database().ref("StockOut").child()
      data.forEach((datai) => {
        console.log(datai);
        if (datai.User_UID ==user_uid) {
          // console.log('click')
        show_prod.innerHTML += `
<tr>
<td>${sno++}</td>
<td class='p_name'><img src=${datai.Product_Image}> ${datai.Product_Name}</td>
<td>${datai.Product_Qty}</td>
<td>${datai.Product_Price}</td>
<td>${datai.Supplier_Name}</td>

<td>${datai.Current_Date}</td>
<td>
<div class="button ">

    <button class='action_btn'  id=${
      datai.Product_UID
    } onclick='edit(this)'><i class="fas fa-pencil"></i></button>
    <button  class='action_btn' id=${
      datai.Product_UID
    } onclick='deletefunc(this)'><i class="fas fa-trash-can"></i></button>
    <button  class='action_btn' id=${
      datai.Product_UID
    } onclick='salestock(this)'><i class="fas fa-scale-unbalanced"></i></button>
</div>
</td>
`;}
      });
    } 
  
    
    else {
      // console.log("No data")
      show_prod.innerHTML = `
     <tr>
     <th> <h2 class='text-center my-3'>No Data Found </h2> </th></tr>
        `;
    }
  });

const edit = (e) => {
  console.log(e.id);
  console.log("edit");
  localStorage.setItem("stockIn_Prod_Uid", e.id);
  window.location.href = "Edit_stockIn_Form.html";
};

const salestock = async (e) => {
  console.log(e.id);
  window.location.href = "stock_out_form.html";
  await localStorage.setItem("e_id", e.id);
};

const deletefunc = (e) => {
  // e.preventDefault()
  console.log(e.id);
  console.log("delete");
  firebase.database().ref("Products").child(e.id).remove();
  window.location.reload()
};
