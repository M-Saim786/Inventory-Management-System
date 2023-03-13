var show_prod = document.getElementById("show_prod");
let user_uid  =localStorage.getItem("User_UID")

firebase
  .database()
  .ref("StockOut")
  .once("value", (snap_data) => {
    var data = Object.values(snap_data.toJSON());
    console.log(data);
    sno = 0;
    data.forEach((items) => {
      console.log(items);
      if (items.User_UID == user_uid) {
        // console.log("due");
        // var span_bg = document.getElementById("p_pay");
        // console.log(span_bg);
        console.log('clc')
      show_prod.innerHTML += `
        <tr>
        <td>${++sno}</td>
       
<td class='p_name'><img src=${items.Product_Img
        }> ${items.Customer_Name}</td>

        <td>${items.Product_Name}</td>
<td>${items.Product_Qty}</td>
<td>${items.Product_Price}</td>
<td>${items.Current_Date}</td>
<td>
<span class=''>${items.Product_Status}
</span></td>
</td>
<td>
<span id='p_pay'  class='p_pay'>${items.Product_Payment}
</span></td>
</td>
<td>
<div class="button ">
    <button class='action_btn' id='${items.Product_UID
        }' onclick='edit_func(this)'><i class="fas fa-pencil"></i></button>
    <button class='action_btn' id='${items.Product_UID
        }' onclick='deletefunc(this)'><i class="fas fa-trash-can"></i></button>
</div>
</td>
</tr>
        `;
      }

    });
  });

const edit_func = (e) => {
  // console.log("Editing")
  console.log(e.id);

  localStorage.setItem("item_uid", e.id);
  // we go to below page for change the status of the product
  window.location.href = "edit_stockout_form.html";
};

const deletefunc = (e) => {
  console.log(e.id);
  firebase.database().ref("StockOut").child(e.id).remove();
  window.location.reload();
};
