import { createSlice } from "@reduxjs/toolkit";


// const initialState = [];
const initialState = {
    items: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    quantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            // state.items.push(action.payload)
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.items[itemIndex].cartQuantity += 1
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.items.push(tempProduct)
            }

        },
        remove: (state, action) => {
            // return state.filter(item=>item.id !== action.payload)
            state.items = state.items.filter(item => item.id !== action.payload)
         
        },
        clearCart: (state, action) => {
            state.items = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            state.quantity = 0;
        },
        getCartTotal: (state, action) => {

            let { total, quantity } = state.items.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity

                return cartTotal;
            },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;

        },
        decrease: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id)

            if (state.items[itemIndex].cartQuantity > 1) {
                state.items[itemIndex].cartQuantity -= 1
            }
            else if (state.items[itemIndex].cartQuantity == 1) {
                state.items = state.items.filter(item => item.id !== action.payload.id)
            }
        },

        increase: (state, action) => {
            // state.items = state.items.map((item)=>{
            //     if(item.id===action.payload){
            //         return {...item,cartQuantity:item.cartQuantity+1}
            //     }
            // })

            const itemIndex = state.items.findIndex(item => item.id === action.payload.id)

            if (state.items[itemIndex].cartQuantity >= 1) {
                state.items[itemIndex].cartQuantity += 1
            }
            else {
                const nextCartItems = state.items.filter((item) => item.id !== action.payload)
                state.items = nextCartItems
            }
        }
    }
})

export const { add, remove, clearCart, increase, decrease, getCartTotal } = cartSlice.actions;

export default cartSlice.reducer