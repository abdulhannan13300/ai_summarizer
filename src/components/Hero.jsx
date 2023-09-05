import { logo } from "../assets";

const Hero = () => {
   return (
      <header className="w-full flex justify-center items-center flex-col">
         {/* Navbar */}
         <nav className="flex justify-between items-center w-full mb-10 pt-3">
            {/* logo */}
            <img src={logo} alt="sumz_logo" className="object-contain w-28" />
            {/* github button */}
            <button
               type="button"
               onClick={() =>
                  window.open(
                     "https://github.com/abdulhannan13300/ai_summarizer"
                  )
               }
               className="black_btn"
            >
               Github
            </button>
         </nav>

         <h1 className="head_text">
            Summarize Articles with <br className="max-md:hidden" />
            <span className="orange_gradient">OpenAI GPT-4</span>
         </h1>

         <h2 className="desc">
            Simplify your reading with Summize, an open-source article
            summarizer that transforms lengthy articles into clear and concise
            summaries.
         </h2>
      </header>
   );
};

export default Hero;
