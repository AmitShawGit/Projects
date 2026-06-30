import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

let addProduct = (state, action) => { 
    const product ={
        id:nanoid(),
        productName: action.payload.productName,
        productDescription: action.payload.productDescription,
        costPrice: action.payload.costPrice,
        basePrice: action.payload.basePrice,
        discount: action.payload.discount,
        sku: action.payload.sku,
        barcode: action.payload.barcode,
        stocks: action.payload.stocks,
        category: action.payload.category,
        tags: action.payload.tags,
        sellingPrice: action.payload.sellingPrice
    }

    state.products.push(product)

    // console.log(state.products);
    localStorage.setItem("products",JSON.stringify(state.products))
}

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProducts: addProduct,
        removeProduct: (state, action) => { 
           state.products= state.products.filter(product => product.id !== action.payload.id)
        }
    }

})


export const {addProducts,removeProduct} = productSlice.actions;
export default productSlice.reducer