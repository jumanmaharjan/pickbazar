import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = [
    {
      section: "USEFUL LINKS",
      links: [
        { name: "FAQs", to: "/faqs" },
        { name: "Pricing Plans", to: "/pricing" },
        { name: "Tracks", to: "/tracks" },
        { name: "Your Orders", to: "/orders" },
      ],
    },
    {
      section: "WITH LINKS",
      links: [
        { name: "Our Story", to: "/our-story" },
        { name: "Job / Career", to: "/careers" },
        { name: "Store Locator", to: "/store-locator" },
        { name: "Contact Us", to: "/contact" },
      ],
    },
    {
      section: "CUSTOMER SERVICES",
      links: [
        { name: "My Account", to: "/account" },
        { name: "Terms Of Use", to: "/terms" },
        { name: "Deliveries & Returns", to: "/deliveries-returns" },
        { name: "Gift Cards", to: "/gift-cards" },
      ],
    },
  ];

  return (
    <footer className="bg-[#f7f7f7] pt-15 pb-6 mt-12">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] sm:grid-cols-2 grid-cols-1  gap-5">
          {/* Brand Section */}
          <div className="footer-item  sm:col-span-1 col-span-2 ">
            <figure className="brand-logo min-w-25 mb-6">
              <Link to="/">
                <img src="Logo-new.png" alt="brand logo" />
              </Link>
            </figure>
            <p className="text-gray-500 text-sm ">
              Voluptatibus atque habitasse? Cum, parturient, irure. Nunc, illo,
              vehicula. Temporibus, laoreet et, praesentium enim quidem,
              imperdiet facilisis unde, lacinia, eligendi? Animi architecto
              netus ridiculus harum volutpat asperiores. Vehicula, pariatur orci
              aliquip porttitor augue est.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div className="footer-items" key={section.section}>
              <h4 className="text-lg primary-color font-semibold mb-4 whitespace-normal break-words">
                {section.section}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li className="text-gray-500 text-sm" key={link.name}>
                    <Link to={link.to} className="hover:text-gray-700">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center primary-color mt-8 ">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
