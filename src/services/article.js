import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey),
        headers.set(
          "X-RapidAPI-Host",
          "article-extractor-and-summarizer.p.rapidapi.com"
        );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      //when passing a user generated content in the URL pass it in the
      //the built int 'encodeURIComponent'.
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

//We we want to call this at the start use "useGetSummaryQuery"
//But we want to call it when we enter the URL and enter the button so we use
// 'useLazyGetSummaryQuery'
export const { useLazyGetSummaryQuery } = articleApi;
