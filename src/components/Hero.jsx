import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        {/* logo */}
        <img src={logo} alt="sumz_logo" className="object-contain w-28" />
        {/* Contact button */}

        <a className="black_btn" href="mailto:abdul.hannan13300@gmail.com">
          Contact
        </a>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  );
};

export default Hero;
