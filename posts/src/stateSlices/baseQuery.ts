import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from '../baseApi/serverbase'

// Define a service using a base URL and expected endpoints
export const currentUserApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Score'],
  endpoints: (build) => ({
    getCurrentUser: build.query({
      async queryFn(uid) {
        try {
          const ref = doc(dbservice, `members/${uid}`)
          const query = await getDoc(ref)
          const response = query.data()
          console.log('practice')
          return { data: response }
        } catch (error) {
          console.log(error)
          return { error: error.message }
        }
      },
      providesTags: ['Score'],
    }),
    getCard: build.query({
      async queryFn(uid) {
        try {
          const ref = doc(dbservice, `num/${uid}`)
          const query = await getDoc(ref)
          const response = query.data()
          console.log('practice')
          return { data: response }
        } catch (error) {
          console.log(error)
          return { error: error.message }
        }
      },
      providesTags: ['Score'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrentUserQuery } = currentUserApi
