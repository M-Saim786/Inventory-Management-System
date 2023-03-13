const sideMenu = document.querySelector("aside")
const menu_btn = document.getElementById('menu_btn')
const close_btn = document.getElementById('close_btn')
const theme_toggler = document.querySelector('.theme_toggler')
const total_sales =document.getElementById("total_sales")
// show side menu
menu_btn.addEventListener('click', ()=>{
sideMenu.style.display = 'block'
})
// close side menu
close_btn.addEventListener('click', ()=>{
    sideMenu.style.display = 'none'
})

// change theme
theme_toggler.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme-variables')

theme_toggler.querySelector('span:nth-child(1)').classList.toggle("active")
theme_toggler.querySelector('span:nth-child(2)').classList.toggle("active")

})



// console.log(firebase.auth())


let user_uid = localStorage.getItem("User_UID")
var recent_order_table =document.querySelector('#recent_order_table')
console.log(recent_order_table)
firebase.database().ref('StockOut').once('value',(snapshot)=>{
    const data= Object.values(snapshot.toJSON())
    console.log(data)
    sum=0
    console.log(typeof(sum))
    data.map((v)=>{

if (v.User_UID==user_uid) {
    // console.log('clcik')
    
total_sumof_pro = v.Product_Qty*v.Product_Price
console.log(total_sumof_pro)  //yahan pr aik product ki total sale ki value ai gi 


console.log(typeof(total_sumof_pro))


sum=sum +total_sumof_pro
console.log(sum)
total_sales.innerText ='Rs. ' + sum

        recent_order_table.innerHTML +=`
<tbody>
    <tr>
        <th>${v.Product_Name}</th>
        <th>${v.Product_Qty}</th>
        <th>${v.Product_Payment}</th>
        <th>${v.Product_Status}</th>      
    </tr>
</tbody>
        `
        
}
})

})




console.log(user_uid)


firebase.database().ref('Products').once('value',(snap_data)=>{
    const data = Object.values(snap_data.toJSON())
    console.log(data)
    total_expense=0
    data.map((v)=>{
        console.log(v)

        // console.log(v.User_UID)
        if (v.User_UID == user_uid) {
            console.log("Yes")
            ToPriofProd = (v.Product_Price )*(v.Product_Qty)

            console.log(ToPriofProd)
            total_expense = total_expense+ToPriofProd
            console.log(total_expense)
        }
    })
    console.log(sum)
    console.log(total_expense)
    console.log(sum-total_expense)
    document.getElementById('total_expense').innerText = 'Rs. ' + total_expense
    document.getElementById("total_income").innerHTML = 'Rs. '+
    (sum-total_expense)
})

// today date
const date  = new Date()
curr_date = date.toLocaleDateString('default',{day:'numeric',month:'short',year:'numeric'})
console.log(curr_date)
document.getElementById('today_date').innerText = curr_date
