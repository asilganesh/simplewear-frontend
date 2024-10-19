import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index";
import { addItemToCartAsync, deleteItemFromCartAsync, fetcthCartDetailsAsync } from "../api/cart";

export const fetchCartDetails = createAsyncThunk('getCartDetails', async (userId) => {

  const data = await fetcthCartDetailsAsync(userId)

  return data
})

export const addItemToCart = createAsyncThunk("addToCart", async (product) => {
  const response = await addItemToCartAsync(product)

  return response;
});


export const updateItemSize = createAsyncThunk('updateSize', async ({ product, size }) => {
  const data = { product, size }

  return data
})

export const updateItemQuantity = createAsyncThunk('updateQuantity', async ({ product, quantity }) => {
  const data = { product, quantity }

  return data
})






export const removeProductFromCart = createAsyncThunk('removeItemFromCart', async(userAndCarId) => {
  
  const {itemId,userId} = userAndCarId
  const data = await deleteItemFromCartAsync(itemId,userId)
  return data
});



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

    .addCase(fetchCartDetails.pending, (state) => {
      state.loading = true,
        state.status = smStates.IS_TRIGGERED
    })

    .addCase(fetchCartDetails.fulfilled, (state, action) => {
      state.loading = false,
        state.status = smStates.IS_SUCCESSFUL
      state.cart = action.payload.cartData
      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA
      }
    })

    .addCase(fetchCartDetails.rejected, (state, action) => {
      state.loading = false,
        state.status = smStates.IS_FAILED,
        state.error = action.error.message;
    })

    .addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.status =smStates.IS_SUCCESSFUL
      state.cart =action.payload.data.data

      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA;
      }
    })

    .addCase(addItemToCart.rejected, (state, action) => {
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
      state.status = smStates.IS_SUCCESSFUL
      
      state.cart =action.payload.data.data
      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA;
      }
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

      if (existingProduct) {
        const productExistWithNewSize = state.cart.find(
          (item) =>
            item.id === action.payload.product._id &&
            item.sizes === action.payload.size
        )

        if (productExistWithNewSize) {
          state.cart = state.cart.map(val => {
            if (val.id === action.payload.product._id &&
              val.sizes === action.payload.size) {
              return { ...val, quantity: val.quantity + action.payload.product.quantity }
            }
            else {
              return val
            }
          })
        }

        state.cart = state.cart.map(item => {
          if (item._id === action.payload.product._id &&
            item.sizes === action.payload.product.sizes) {


            return { ...item, sizes: action.payload.size }
          }
          else {
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
