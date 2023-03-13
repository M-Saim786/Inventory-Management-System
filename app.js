// var addNewpro = document.getElementById('addNewpro');
// addNewpro.addEventListener('click', ()=>{
//   console.log("Click")
// var key = firebase.database().ref('StockIn').push().getKey()
// console.log("Key: " + key)
// localStorage.setItem('key',key)
// var stockIn = parseInt(prompt("Enter Stock In"))
// // var stockOUT = parseInt(prompt("Enter Stock Out"))
// stockOUT = 0
// firebase.database().ref('StockIn').child(key).set({
//   stockIn :stockIn,
//   stock: stockIn - stockOUT,
//   stockout:stockOUT,
//   Prod_Key :key
// })
// })
// key = localStorage.getItem('key')

// var stockIn =document.getElementById('stockIn')
// console.log("Stock In: " + stockIn)
// stockIn.addEventListener('click', ()=>{
// console.log("Click")
// console.log("Key: " + key)
// var stockin = parseInt(prompt("Enter Stock"))
// stockOUT =0
// firebase.database().ref('StockIn').child(key).once('value',(snap)=>{
//   var data = Object.values(snap.toJSON())
//   console.log(data)
//   console.log(data[0])
//   console.log(data[1])
// firebase.database().ref('StockIn').child(key).update({
// New_stockIn:stockin,
// stock :stockin+data[1]-stockOUT,
// stockout:stockOUT
// })
// })

// })


// function stockOut(){
//   // console.log('Stock Out')
//   var stockOut = parseInt(prompt("Enter Stock Out"))
//   console.log("Stock Out: " + stockOut)
//   firebase.database().ref('StockIn').child(key).once('value',(snap)=>{
// var data = Object.values(snap.toJSON())
// console.log(data)
// firebase.database().ref('StockIn').child(key).update({
//   stock:data[1]-stockOut,
//   stockout:stockOut
// })
//   })
// }




// Login and Sign Up Account
var username= document.getElementById("name")
var email= document.getElementById("email")
var password= document.getElementById("password")

console.log(username, email, password)

const loader = document.getElementById("loader")
const main_div =document.getElementById("main_div")
// loader.style.display = 'none'

var signUp_btn = document.getElementById('signUp_btn')
signUp_btn.addEventListener('click',(e)=>{
e.preventDefault()

firebase.auth().createUserWithEmailAndPassword(email.value , password.value)
  .then(async()=>{
    var key  =firebase.database().ref('Users').push().getKey()
    console.log(key)
    var obj ={
      User_name:username.value,
      Email : email.value,
      Password: password.value
    }
    loader.style.display = 'block'
    main_div.style.display = 'none'
   await firebase.database().ref('Users').child(key).set(obj)
    localStorage.setItem('User_UID' , key)
        // alert("Your account has been created successfully...!")
window.location.href='Components/Dashboard.html'

  })
  .catch((error)=>{
    alert(error.message)
    console.log(error)
  })
   
})

var sign_up_div= document.getElementById('sign_up_div')

// GOTO SignUp Page Function
var signUp_a_btn = document.getElementById('signUp_a')
signUp_a.addEventListener('click',(e)=>{
  e.preventDefault()
  console.log('Sign Up')
  sign_up_div.removeAttribute("style" ,'display:none')
  document.getElementById('login_div').setAttribute('style', 'display:none')

})
// GOTO Login Page Function

var login_a_btn= document.getElementById("login_a")
login_a_btn.addEventListener("click",(e)=>{
  e.preventDefault()
  sign_up_div.setAttribute("style", 'display:none')
  document.getElementById('login_div').removeAttribute('style', 'display:none')
})

// Login Account Function
var login_email = document.getElementById('lemail')
 var login_password = document.getElementById('lpassword')
document.getElementById('login_btn').addEventListener('click',async (e)=>{
 e.preventDefault() 
 
 
 console.log(login_email.value)
 if ((login_email.value && login_password.value) == '') {
  alert("Please enter your email and password")
 }
else{
loader.style.display = 'block'
main_div.style.display = 'none'

 await firebase.auth().signInWithEmailAndPassword(login_email.value, login_password.value)
 .then(async(user)=>{
   // console.log(user)
   console.log(user.user.uid)
 await  localStorage.setItem('User_UID',user.user.uid)
   window.location.replace('Components/Dashboard.html')
 })
 .catch((err)=>{
alert('Incorrect Email or Password')
 })
//  age hum password ghalat daal den tou iski condition lgani h
}


  
})




// var google_signUp= document.getElementById("google_signUp")
// console.log(google_signUp)
const authGoogle= async ()=>{
console.log("Google")
var authProvider = new firebase.auth.GoogleAuthProvider()
console.log(authProvider)
await firebase.auth().signInWithPopup(authProvider)
.then((user)=>{
  console.log(user.user.uid)
  firebase.database().ref('Users').child(user.user.uid).set({
     Email : user.user.email,
    User_name:user.user.displayName,
    User_UID:user.user.uid
  })
  window.location.href='Components/Dashboard.html'
  localStorage.setItem('User_UID' , user.user.uid)

})
.catch((error)=>{
 console.log(error) 
})

}



// var facebook_signUp= document.getElementById("facebook_signUp")
// facebook_signUp.addEventListener("click",async()=>{
//   // console.log("Facebook")

// var facebook_provider = new firebase.auth.FacebookAuthProvider()
// await firebase.auth().signInWithPopup(facebook_provider)
// .then((user)=>{
//   console.log(user)
// })
// .catch((error)=>{
//  console.log(error) 
// })
// window.location.href='Components/Dashboard.html'

// })


// Show and Hide password
var show_pass = document.getElementsByClassName("show_pass")
console.log(show_pass)
var hide_pass = document.getElementById("hide_pass")
show_pass[0].addEventListener("click",()=>{
  if (password.type =='text') {
    password.type = 'password'
    
  }
  else{
    password.type = 'text'
// show_pass.style.display= 'block'
// hide_pass.style.display= 'none'
  }
})
show_pass[1].addEventListener("click",()=>{
  if (login_password.type =='text') {
    login_password.type = 'password'
  }
  else{
    login_password.type = 'text'
// show_pass.style.display= 'block'
// hide_pass.style.display= 'none'
  }
})