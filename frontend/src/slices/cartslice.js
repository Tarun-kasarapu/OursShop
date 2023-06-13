import { createSlice } from "@reduxjs/toolkit";
import { FaCommentsDollar } from "react-icons/fa";

const initialState=localStorage.getItem('Cart')?JSON.parse(localStorage.getItem('Cart')):{cartItems:[],shippingAddress:{},paymentMethod:"paypal"};


const cartSlice = createSlice({
    name:"Cart",
    initialState,

    reducers:{
            addtoCart: (state,action) => {
                const item=action.payload;
                const existItem=state.cartItems.find((x)=>{
                    
                    return x._id==item._id;
                })
                
                if(existItem){
                    
                    state.cartItems=state.cartItems.map((x)=>{
                        return x._id==existItem._id?item:x;
                    })
                    
                }else{
                    
                    state.cartItems=[...state.cartItems,item];
                }

                const totcost=()=>{
                    const len=state.cartItems.length;
                    let sum=0;
                    for(let i=0;i<len;i++){
                        let qty=state.cartItems[i].Qty;
                        let price=state.cartItems[i].price;
                       
                        sum+=(qty*price);
                    }
                    return sum;

                };
                state.itemPrices=totcost();

                state.shippingPrice=Number(state.itemPrices)>100?0:10;

                state.taxPrice=(0.15)*Number(state.itemPrices);
                
                state.totalPrice=Number(state.itemPrices)+Number(state.shippingPrice)+Number(state.taxPrice);

                localStorage.setItem('Cart',JSON.stringify(state));
                

            },
            removefromCart:(state,action) => {

                state.cartItems=state.cartItems.filter((x) => x._id!=action.payload);
              

                const totcost=()=>{
                    const len=state.cartItems.length;
                    let sum=0;
                    for(let i=0;i<len;i++){
                        let qty=state.cartItems[i].Qty;
                        let price=state.cartItems[i].price;
                       
                        sum+=(qty*price);
                    }
                    return sum;

                };
                state.itemPrices=totcost();

                state.shippingPrice=Number(state.itemPrices)>100?0:10;

                state.taxPrice=(0.15)*Number(state.itemPrices);
                
                state.totalPrice=Number(state.itemPrices)+Number(state.shippingPrice)+Number(state.taxPrice);

                localStorage.setItem('Cart',JSON.stringify(state));

            },
            saveshippingAddress:(state,action)=>{
                state.shippingAddress=action.payload;
                localStorage.setItem('Cart',JSON.stringify(state));
            },
            savePaymentMethod:(state,action)=>{
                state.paymentMethod=action.payload;
                localStorage.setItem('Cart',JSON.stringify(state));
            },
            clearcartItems:(state,action)=>{
                state.cartItems=[];
                localStorage.setItem('Cart',JSON.stringify(state));
            }
    }

})

export const {addtoCart,removefromCart, saveshippingAddress, savePaymentMethod,clearcartItems}=cartSlice.actions;


export default cartSlice.reducer;