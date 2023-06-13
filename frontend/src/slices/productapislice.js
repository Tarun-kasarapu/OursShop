// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getProducts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (keyword) => ({
        
        url:'/api/products',
        params:{
          keyword,
        }
      
      }),
      
      providesTags:['Product'],

    }),
    getProduct: builder.query({
        query: postId => `/api/products/${postId}`,
    }),
    getTopProducts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/api/products/top'
    }),
    login : builder.mutation({
      query: (data) => ({
        url: '/api/users/login',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: data
      })
    }),
    logout : builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
        // Include the entire post object as the body of the request

      })
    }),
    register : builder.mutation({
      query: (data) => ({
        url: '/api/users/',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: data
      })
    }),
    createOrder : builder.mutation({
      query: (data) => ({
        url: '/api/orders',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: {...data}
      })
    }),
    profile : builder.mutation({
      query: (data) => ({
        url: '/api/users/profile',
        method: 'PUT',
        // Include the entire post object as the body of the request
        body: data
      }),
      providesTags:['Delivery']
    }),
    getmyorders: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/api/orders/myorders',
      providesTags:['Delivery']
    }),
    getorderdetails: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: id => `/api/orders/${id}`,
      providesTags:['Delivery']
    }),
    getallorders: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/api/orders',
      providesTags:['Delivery'],
    }),
    deliverOrder : builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/deliver`,
        method: 'PUT',
        // Include the entire post object as the body of the request
       
      }),
      invalidatesTags:['Delivery'],
    }),
    createProduct : builder.mutation({
      query: () => ({
        url: '/api/products',
        method: 'POST',
        // Include the entire post object as the body of the request
      
      }),
      invalidatesTags:['Product'],

    }),
    updateProduct : builder.mutation({
      query: (data) => ({
        url: `/api/products/${data._id}`,
        method: 'PUT',
        // Include the entire post object as the body of the request
        body: data
      }),
      invalidatesTags:['Product'],
      
    }),
    uploadimage:builder.mutation({
        query:(data)=>({
          url: '/api/upload/',
          method:'POST',
          body:data
        })

    }),
    deleteProduct : builder.mutation({
      query:(id)=>({
        url: `/api/products/${id}`,
        method: 'DELETE',

      }),
      invalidatesTags:['Product'],
    })
    



  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetProductsQuery,useGetProductQuery,useLoginMutation , useLogoutMutation ,useRegisterMutation,useCreateOrderMutation , useProfileMutation ,  useGetmyordersQuery ,useGetorderdetailsQuery, useGetallordersQuery

, useDeliverOrderMutation , useCreateProductMutation , useUpdateProductMutation ,useUploadimageMutation, useDeleteProductMutation , useGetTopProductsQuery } = apiSlice