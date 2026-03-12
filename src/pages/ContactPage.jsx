import React from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <>
      <div className="bg-[#f7f7f7]">
        <div className="container">
          <div className="flex gap-5 flex-wrap py-10 ">
            <div className=" basis-[35%] rounded-lg bg-white p-5">
              <figure className="mb-8">
                <img
                  src="/assets/img/contact-img.svg"
                  alt="contact image"
                  className="mx-auto block"
                />
              </figure>
              <div className="detial">
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold ">Address</h5>
                  <span className="text-sm ">
                    <a
                      className="text-[#6b7280] hover:text-primary-hover"
                      target="_blank"
                      title="Grow by Data"
                      href="https://maps.app.goo.gl/kKbCTMP5J8ZBRgmH7"
                    >
                      Grow by Data
                    </a>
                  </span>
                </div>
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold ">Phone</h5>
                  <span className="text-sm ">
                    <a
                      href="tel:+129290122122"
                      className="text-[#6b7280] hover:text-primary-hover"
                    >
                      +1 292 901 22122
                    </a>
                  </span>
                </div>
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold  ">Email</h5>
                  <span className="text-sm text-[#6b7280]">
                    Addressdemo@demo.com
                  </span>
                </div>
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold ">Website</h5>
                  <span className="text-sm ">
                    <a
                      className="text-[#6b7280] hover:text-primary-hover"
                      target="_blank"
                      href="https://redq.io"
                    >
                      https://redq.io
                    </a>
                  </span>
                </div>
                <div className="mb-6">
                  <h5 className="mb-2 font-semibold ">Address</h5>
                  <span className="text-sm  text-[#6b7280]">
                    <a
                      className=" hover:text-primary-hover"
                      target="_blank"
                      title="Grow by Data"
                      href="https://maps.app.goo.gl/kKbCTMP5J8ZBRgmH7"
                    >
                      Grow by Data
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white basis-[60%] p-5">
              <h4 className="mb-7  text-xl font-bold  md:text-2xl">
                How can we improve your experience?
              </h4>
              <form className="max-w-3xl mx-auto p-4">
                {/* Grid: Name & Email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                      autoComplete="off"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="my-6">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    autoComplete="off"
                  />
                </div>

                {/* Description */}
                <div className="my-6">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-400 outline-none"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
