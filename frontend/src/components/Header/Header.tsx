import React, { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "header compact" : "header"}>
      {!scrolled && (
        <div className="header-large-logo">
          <img src={import.meta.env.BASE_URL + "images/boboq_logo/_cropped.png"} alt="BoboQ Logo groß" className="logo-large" />
        </div>
      )}
      <nav className="header-nav">
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </nav>
      <div className="header-small-logo">
        <img src={import.meta.env.BASE_URL + "images/boboq_logo/_cropped.png"} alt="BoboQ Logo klein" className="logo-small" />
      </div>
    </header>
  );
}
