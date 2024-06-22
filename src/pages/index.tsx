import { Link } from "react-router-dom";

import Logo from "../components/logo";

import Icon from "../assets/svg";
import {
  uk,
  forCompanies,
  ethereum,
  ens,
  fleek,
  filecoin,
  galadriel,
} from "../assets/img";
import { socialOnClick } from "../utils/functions";

const HomePage = () => {
  const brands: any = [ethereum, ens, fleek, filecoin, galadriel];

  const socials: any = [
    { name: "facebook", handle: "id.cv_jobs" },
    { name: "instagram", handle: "id.cv_jobs" },
    { name: "linkedin", handle: "id.cv_jobs" },
    { name: "twitter", handle: "id.cv_jobs" },
  ];

  return (
    <div className="home_page_container">
      <div className="hero_section">
        <div className="navbar">
          <Logo />

          <div className="flex_end">
            <div className="language">
              <img src={uk} alt="Language icon" />
              <p>EN</p>
            </div>

            <Link to="/register" className="btn_secondary">
              Get Started
            </Link>
          </div>
        </div>

        <div className="hero_content">
          <p className="built">BUILT WITH LOVE AT ETHGLOBAL 🖤</p>
          <h1>Find the perfect talent or service for your project</h1>
          <p className="sub_title">
            Connecting businesses with top professionals worldwide. Secure
            transactions. Crypto payments.
          </p>

          <Link to="/register" className="btn_primary">
            Get Started
          </Link>
          <p className="free_and_paid">Join ID.CV Gigs today</p>
        </div>
      </div>

      <div className="truly_yours">
        <div className="d_flex">
          <div className="info">
            <h4>Easily Connect and Collaborate with Top Professionals.</h4>
            <p>
              📝 <strong>Post or Find:</strong> Describe your project or browse
              available services.
              <br />
              🔍 <strong>Connect:</strong> Review bids and proposals, and select
              the best fit.
              <br />
              🤝 <strong>Collaborate:</strong> Complete the project with secure
              crypto payments.
              <br />
              🌍 <strong>Global Opportunities:</strong> We empower global
              freelance opportunities, breaking down geographical barriers.
              <br />
              🔐<strong>Smart Contract Security:</strong> Utilize our secure
              smart contract system to ensure transparent and reliable
              transactions.
            </p>

            <Link to="/register" className="btn_primary">
              Get started <Icon name="arrow" />
            </Link>
          </div>

          <img src={forCompanies} alt="Security Img" />
        </div>

        <div className="brands vertical_scroll">
          {brands?.map((item: any, i: number) => (
            <img key={i} className="brand" src={item} alt="Brand logo" />
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="info">
          <Logo />
          <p>Connecting businesses with top professionals.</p>

          <div className="socials">
            {socials?.map((item: any, i: number) => (
              <div key={i} className="icon" onClick={() => socialOnClick(item)}>
                <Icon name={item?.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="links">
          <h6>Products</h6>

          <Link to="/">For Companies</Link>
          <Link to="/">For Professionals</Link>
        </div>

        <div className="links">
          <h6>Company</h6>

          <Link to="/">About Us</Link>
          <Link to="/">Blog</Link>
        </div>

        <div className="links">
          <h6>FAQ</h6>

          <Link to="/">Help Center</Link>
          <Link to="/">FAQ</Link>
        </div>

        <div className="links">
          <h6>Legal</h6>

          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>

        <div className="animated_text">
          <p>
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>{" "}
            Connecting businesses with top professionals 🖤 <span>✦</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
