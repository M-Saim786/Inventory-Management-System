var e_id = localStorage.getItem("stockIn_Prod_Uid");
console.log(e_id);
var imgUrl_Old;
var inps = document.getElementsByClassName("form-control");
parseInt(inps[2].value)
console.log(typeof(inps[2].value))


firebase
  .database()
  .ref("Products")
  .child(e_id)
  .once("value", (snap_data) => {
    var data = Object.values(snap_data.toJSON());
    console.log(data);
    parseInt(data[7])
    
console.log(typeof(data[7]))
    inps[0].value = data[5]; //pname
    inps[1].value = data[6]; //pprice
    // inps[2].value = data[7]; //pqty
    inps[3].value = data[3]; //pdesc
    inps[4].value = data[2]; //p_category
    inps[6].value = data[9]; //sup_id
    inps[7].value = data[10]; //sup_name
    inps[8].value = data[0]; //company
    imgUrl_Old = data[4];
    console.log(imgUrl_Old);

    // Converting Image to Url
imgUrl_New = "";

inps[5].onchange = async (e) => {
  // console.log('fjkdf')
  img_file = e.target.files;
  var reader = new FileReader();
  reader.readAsDataURL(img_file[0]);
  console.log(img_file[0]);
  console.log(img_file[0].name);

  var img_upload = firebase
    .storage()
    .ref("Images")
    .child(img_file[0].name)
    .put(img_file[0]);

  await img_upload.snapshot.ref.getDownloadURL().then((url) => {
    console.log(url);
    imgUrl_New = url;
    console.log(imgUrl_New);
  });
};
});





var update_stockIn = document.getElementById("update_stockIn");
update_stockIn.addEventListener("click",async () => {
  console.log(imgUrl_New);
console.log(imgUrl_Old);
// imgUrl_New =''? console.log('true'): console.log('Updated');
 console.log('click')


await firebase
 .database()
 .ref("Products")
 .child(e_id)
 .once("value", async(snap_data) => {
   var data = Object.values(snap_data.toJSON());
   console.log(data);
   parseInt(data[7])
   
// console.log(typeof(data[7]))


var datato= Number(data[7])
console.log(datato)
console.log(typeof(datato))

let daat= Number(inps[2].value)
console.log (daat)
console.log(typeof(daat))

sum = daat+datato
console.log(sum)
await firebase
 .database()
 .ref("Products")
 .child(e_id)
 .update({
   Product_Name: inps[0].value,
   Product_Price: inps[1].value,
   Product_Qty: daat+datato,
   Product_Desc: inps[3].value,
   Product_Category: inps[4].value,
   Product_Image: imgUrl_New == "" ? imgUrl_Old : imgUrl_New,
   Supplier_Id: inps[6].value,
   Supplier_Name: inps[7].value,
   Company_Name: inps[8].value,
 });

 })
    window.location.href = 'stockIn.html'
});



firebase.database().ref("Products").child(e_id).once('value',(snap)=>{
  const data = Object.values(snap.toJSON())
  console.log(data)
  // parseInt(data[7])

  console.log(data[7])
  console.log(typeof(data[7]))
})