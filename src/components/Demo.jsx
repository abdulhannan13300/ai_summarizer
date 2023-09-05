import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
   const [article, setArticle] = useState({
      url: "",
      summary: "",
   });
   const [allArticle, setAllArticle] = useState([]);
   const [copied, setCopied] = useState(true);

   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

   //to not loose data when reloading or to store data in local storage
   useEffect(() => {
      const articlesFromLocalStorage = JSON.parse(
         localStorage.getItem("articles")
      );

      if (articlesFromLocalStorage) {
         setAllArticle(articlesFromLocalStorage);
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      //Fetch Summary
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
         const newArticle = { ...article, summary: data.summary };
         //add the new article to the all article array
         const updatedArticle = [newArticle, ...allArticle];

         setArticle(newArticle);
         //update the all article list
         setAllArticle(updatedArticle);

         localStorage.setItem("articles", JSON.stringify(updatedArticle));
      }
   };

   //Copy the URL using the icon
   const hanldeCopy = (copyURL) => {
      setCopied(copyURL);
      navigator.clipboard.writeText(copyURL);
      setTimeout(() => setCopied(false), 3000);
   };

   return (
      <section className="mt-16 w-full max-w-xl">
         {/* Search */}
         <div className="flex flex-col w-full gap-2">
            <form
               className="relative flex justify-center items-center"
               onSubmit={handleSubmit}
            >
               <img
                  src={linkIcon}
                  alt="link_icon"
                  className="absolute left-0 my-2 ml-3 w-5"
               />
               <input
                  type="url"
                  placeholder="Enter a URL"
                  value={article.url}
                  onChange={(e) =>
                     setArticle({ ...article, url: e.target.value })
                  }
                  required
                  className="url_input peer"
               />

               <button
                  type="submit"
                  className="submit_btn peer-focus:border-gray-700
          peer-focus:text-gray-700"
               >
                  ↲
               </button>
            </form>

            {/* Browser URL history */}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
               {allArticle.map((item, index) => (
                  <div
                     key={`link-${index}`}
                     onClick={() => setArticle(item)}
                     className="link_card"
                  >
                     <div
                        className="copy_btn"
                        onClick={() => hanldeCopy(item.url)}
                     >
                        <img
                           src={copied === item.url ? tick : copy}
                           alt="copy_icon"
                           className="w-[40%] h-[40%] object-contain"
                        />
                     </div>
                     <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                        {item.url}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* Display Result */}
         <div className="flex justify-center items-center my-10 max-w-full">
            {isFetching ? (
               <img
                  src={loader}
                  alt="loader"
                  className="w-20 h-20 object-contain"
               />
            ) : error ? (
               <p className="font-inter font-bold text-black text-center">
                  Well, that wasn't supposed to happen...
                  <span className="font-satoshi font-normal text-gray-700">
                     {error?.data?.error}
                  </span>
                  <br />
               </p>
            ) : (
               article.summary && (
                  <div className="flex flex-col gap-3">
                     <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                        Article <span className="orange_gradient">Summary</span>
                     </h2>
                     <div className="summary_box">
                        <p className="font-inter font-medium text-sm text-gray-700">
                           {article.summary}
                        </p>
                     </div>
                  </div>
               )
            )}
         </div>
      </section>
   );
};

export default Demo;
