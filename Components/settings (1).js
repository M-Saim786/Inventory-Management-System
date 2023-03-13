const user_name = document.getElementById("user_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const prof_img  =document.getElementById("prof_img")
const upload_img = document.getElementById("upload_img");

upload_img.onchange = (e) => {
  img_file = e.target.files;
  reader = new FileReader();
  reader.onload = function () {};
  reader.readAsDataURL(img_file[0]);
  console.log(img_file[0]);

  const img_upload = firebase.storage().ref('Images').child(img_file[0].name).put(img_file[0]);

  img_upload.snapshot.ref.getDownloadURL().then((url)=>{
    console.log(url);
    prof_img.src = url
  })
};

// console.log(firebase.auth())
const user_uid = localStorage.getItem("User_UID");
firebase
  .database()
  .ref("Users")
  .child(user_uid)
  .once("value", (snapshot) => {
    const data = Object.values(snapshot.toJSON());
    console.log(data);
    email.value = data[0];
    password.value = data[1];
    prof_img.src = data[2];
    user_name.value = data[3];
  });


  const update_pro =document.getElementById("update_pro");
  update_pro.addEventListener("click", (e) => {
    e.preventDefault()
   console.log('fsdfd' )
firebase.database().ref("Users").child(user_uid).update({
  Email: email.value,
  Password: password.value,
  User_name:user_name.value,
  Profile_Img:prof_img.src,
})
window.location.reload()
  })

  const logout=async()=>
{
  console.log("click")
 await localStorage.removeItem('User_UID')
}
