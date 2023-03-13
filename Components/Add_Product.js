// window.location.reload()
// console.log(user_uid);



const pname = document.getElementById("pname");
const pprice = document.getElementById("pprice");
const pqty = document.getElementById("pqty");
const pdesc = document.getElementById("pdesc");
const pimg = document.getElementById("pimg");
const p_category = document.getElementById("p_category");
const sup_Id = document.getElementById("sup_Id");
const sup_Name = document.getElementById("sup_name");
const com_name = document.getElementById("com_name");
const user_uid = localStorage.getItem("User_UID");

pimg.onchange = (e) => {
  // console.log('image')
  img_file = e.target.files;
  const reader = new FileReader();
  reader.onload = function () {};
  reader.readAsDataURL(img_file[0]);
  console.log(img_file[0]);
};


const add_pro = document.getElementById("add_pro");
add_pro.addEventListener("click", async (e) => {
  const store_Img = firebase
    .storage()
    .ref("Images")
    .child(img_file[0].name)
    .put(img_file[0]);

  // firebase.storage().ref("Images/").child(img_file[0].name).put(img_file[0]);

  // console.log(imgUpload)
  var imgUrl = "";
  await store_Img.snapshot.ref.getDownloadURL().then((url) => {
    console.log(url);
    imgUrl = url;
    url = imgUrl;
    console.log(imgUrl);
  });
  // console.log(imgUrl)
  const date = new Date();
  curr_date = date.toLocaleDateString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  console.log("curr_date: " + curr_date);
;
  e.preventDefault();

  const key = firebase.database().ref("Products").push().getKey();
  console.log("key: " + key);
const get_user_uid =localStorage.getItem('User_UID')
console.log(get_user_uid)
  console.log(sup_Id.value);
  const obj = {
    User_UID:user_uid,
    Product_UID: key,
    Product_Name: pname.value,
    Product_Price: pprice.value,
    Product_Qty: pqty.value,
    Product_Desc: pdesc.value,
    Product_Image: imgUrl,
    Product_Category: p_category.value,
    // User_UID:
    Current_Date: curr_date,
    Supplier_Id: sup_Id.value,
    Supplier_Name: sup_Name.value,
    Company_Name: com_name.value,
  };
  await firebase.database().ref("Products").child(key).set(obj);

  window.location.href = "stockIn.html";
});
