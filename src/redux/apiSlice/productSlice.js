import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    status: 'idle',
    filteredProducts:[],
    filterType:['HighLow','LowHigh']
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProducts(state, action) {
            state.data = action.payload
        },
        filterProducts(state,action){
           // state.filteredProducts = action.payload
            state.filteredProducts = state.data.sort((a,b)=>{
               return b.price - a.price
            })
            // console.log('first')
            // state.filteredProducts = ['1','2']
        }
    },
   

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.status = '    2';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.filteredProducts = state.data.sort((a, b) => {
                    return b.price - a.price
                })
                state.status = 'idle';
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'error';
            })
    },
})

export const { fetchProducts, filterProducts } = productSlice.actions;
export default productSlice.reducer;


export const getProducts = createAsyncThunk('/products/get', async () => {

    const data = await fetch(`https://fakestoreapi.com/products`);
    const result = await data.json();
    return result;
    // await axios.get(`https://fakestoreapi.com/products`)
    //     .then(response => {
    //         const result = response.data;
    //         // dispatch(fetchProducts(result))
    //         return result
    //     })
})

// export function getProducts() {
//     return async function getProductsThunk(dispatch, getState) {
//         await axios.get(`https://fakestoreapi.com/products`)
//              .then(response => {
//                 const result = response.data;
//                  dispatch(fetchProducts(result))
//              })
//     }
// }

