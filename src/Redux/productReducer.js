import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index";
import fetchProductsAsync, { addProductAsync } from "../api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categories, sortOrder, searchText } = {}) => {
    console.log(categories);

    const categoryFilters = [];
    const subCategoryFilters = [];

    if (categories) {
      const { men, women, kids, topWear, bottomWear, winterWear } = categories;

      if (men) categoryFilters.push("Men");
      if (women) categoryFilters.push("Women");
      if (kids) categoryFilters.push("Kids");
      if (topWear) subCategoryFilters.push("Topwear");
      if (bottomWear) subCategoryFilters.push("Bottomwear");
      if (winterWear) subCategoryFilters.push("Winterwear");
    }

    const searchQuery={}
    if (categories) {
      searchQuery.filter = {
        category: {
          $in: categoryFilters,
        },
        subCategory: {
          $in: subCategoryFilters,
        },
      };
    }
    if (searchText) {
      searchQuery.$or = [
        { name: { $regex: searchText, $options: "i" } },
        { category: { $regex: searchText, $options: "i" } },
        { subCategory: { $regex: searchText, $options: "i" } },
      ];
    }
    if (sortOrder) {
      searchQuery.sort = {
        $eq: sortOrder,
      };
    }

    const response = await fetchProductsAsync({ queryParams: searchQuery });

    return response;
  }
);

export const addProduct = createAsyncThunk('addNewProduct', async(product) => {

  const data = await addProductAsync(product)
  return data
})

const initialState = {
  products: [],
  loading: false,
  error: null,
  status: smStates.IS_IDEAL,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.status = smStates.IS_SUCCESSFUL;
      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA;
      }
    })

    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = smStates.IS_FAILED;
    })

    .addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.status = smStates.IS_TRIGGERED;
    })

    .addCase(addProduct.fulfilled, (state,action) => {
      state.loading = false;
      state.status = smStates.IS_SUCCESSFUL;
      if (!action.payload) {
        state.status = smStates.IS_SUCCESS_BUT_NO_DATA;
      }
    })

    .addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = smStates.IS_FAILED;
    })


});
