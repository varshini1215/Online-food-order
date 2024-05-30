import React,{useState} from 'react'

export const CheckOut = (props) => {
    const [total,setTotal]=useState(props.amount)
  
    const handlePay=(e)=>{
      e.preventDefault();
      if(total===0 || ""){
       alert("please select the items")
      } else{
          var options ={
              key:"rzp_test_sWPXXeO9FkIFdi",
              secret_key:"cNI8GaI65rSEsHcbw0LMD0jQ",
              amount:total*100,
              currency:"INR",
              name:"Food Delivery Demo",
              description:"for testing purpose",
              handler:function(response){
                alert(response.razorpay_payment_id)
                window.location.reload();
              },
          prefill:{
              name:"Varshini",
              email:"sivavarshini127@gmail.com",
              contact:"8489833478"
          },
          notes:{
              address:"Razorpay Corporate"
            },
            theme:{
              color:"#3399cc"
            }
          };
   
// create payment folder inside components
// next create CheckOut.js inside payment and then copy this code


       var pay = new window.Razorpay(options);
          pay.open()
         }
  }
  
    return (
      <div>
          <form >
          <h1 className='fw-bold'>PAYMENT</h1>
          <hr />
          <h1 style={{color:'rgb(255, 69, 0)'}} value={total} onChange={e=>setTotal(e.target.value)}>Total:  &#8377;{props.amount}</h1>
          <button className='btn btn-outline-danger' onClick={handlePay}>pay</button>
  
          </form>
      </div>
    )
}