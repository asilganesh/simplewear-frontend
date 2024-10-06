import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index";

export const addToCart = createAsyncThunk("addToCart", async (product) => {
  // const response = await fetchProductsAsync()
  
  return product;
});


export const updateItemSize = createAsyncThunk('updateSize',async({product,size}) => {
    const data = {product,size}
  
    return data
})

export const updateItemQuantity = createAsyncThunk('updateQuantity',async({product,quantity}) => {
    const data = {product,quantity}
  
    return data
})






export const removeProductFromCart = createAsyncThunk(
  "removeProduct",
  async (product) => {
    return product;
  }
);



export const clearCart = createAsyncThunk("clearCart", async () => {
  return [];
});

const initialState = {
  cart: [],
  loading: false,
  error: null,
  status: smStates.IS_IDEAL,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;

      if (!state.cart.length) {
        state.cart = [...state.cart, action.payload];
        debugger;
      } else {
        const existingProduct = state.cart.find(
          (item) =>
            item._id === action.payload._id &&
            item.sizes === action.payload.sizes
        );

        if (existingProduct) {
          state.cart = state.cart.map((item) =>
            item._id === action.payload._id &&
            item.sizes === action.payload.sizes
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
        }
      }

      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA;
      }
    })

    .addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = smStates.IS_FAILED;
    })

    .addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })

    .addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = smStates.IS_FAILED;
    })

    .addCase(removeProductFromCart.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((val) => {
          return !(val._id === action.payload._id && val.sizes === action.payload.sizes);
        });
      })

    .addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = smStates.IS_FAILED;
    })

    .addCase(updateItemSize.pending, (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
      })
  
      .addCase(updateItemSize.fulfilled, (state, action) => {
          state.loading = false;

          const existingProduct = state.cart.find(
            (item) =>
              item._id === action.payload.product._id &&
              item.sizes === action.payload.product.sizes
          );

          if(existingProduct) {
            const productExistWithNewSize = state.cart.find(
                (item) => 
                    item.id === action.payload.product._id &&
                item.sizes === action.payload.size
            )

            if(productExistWithNewSize) {
                state.cart = state.cart.map(val=>{
                    if(val.id === action.payload.product._id &&
                        val.sizes === action.payload.size){
                            return {...val,quantity:val.quantity+action.payload.product.quantity}
                        }
                        else{
                            return val
                        }
                })
            }

            state.cart = state.cart.map(item=>{
                if( item._id === action.payload.product._id &&
                    item.sizes === action.payload.product.sizes){
                        
                   
                        return {...item,sizes:action.payload.size}
                    }
                    else{
                        return item
                    }
            })
          }
         
          })
        
  
      .addCase(updateItemSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = smStates.IS_FAILED;
      })

      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
      })
  
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
          state.loading = false;

         
  
         
            state.cart = state.cart.map((item) =>
              item._id === action.payload.product._id &&
              item.sizes === action.payload.product.sizes
                ? { ...item, quantity: action.payload.quantity }
                : item
            );
         
         
          })
        
  
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = smStates.IS_FAILED;
      })
});
