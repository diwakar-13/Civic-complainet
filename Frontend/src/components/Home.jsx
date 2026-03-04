import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";

const commonStyles = {
  header: "py-4 md:py-6",
  container: "px-4 mx-auto sm:px-6 lg:px-8",
  flexCenter: "flex items-center justify-between",
  logo: "w-auto h-8",
  menuButton: "text-gray-900",
  menuIcon: "w-7 h-7",
  navLink:
    "text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2",
  signUpButton:
    "inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900",
  sectionTitle: "px-6 text-lg text-gray-800 font-inter",
  sectionHeading:
    "mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj",
  gradientText: "relative inline-flex sm:inline",
  gradientBackground:
    "bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0",
  callToActionButton:
    "inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900",
  demoButton:
    "inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900",
  textMuted: "mt-8 text-base text-gray-500 font-inter",
  imageContainer: "relative mx-auto",
  image: "transform scale-110",
};

function Home({ openSignup }) {
  return (
    <div id="home" className="  overflow-x-hidden bg-gray-50">
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className={commonStyles.container}>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className={commonStyles.sectionTitle}>
              Smart Civic Complaint Management System
            </h1>
            <p className={`${commonStyles.sectionHeading} mt-5`}>
              Report civic issues quickly and help build a
              <span className={commonStyles.gradientText}>
                <span className={commonStyles.gradientBackground}></span>
                <span className="relative"> better city </span>
              </span>
            </p>

            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <a
                onClick={ openSignup }
                title="Get more customers"
                className= "inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Report an issue 
              </a>

            </div>

            <p className={commonStyles.textMuted}>
              Helping citizens report issues and authorities resolve them
              efficiently.
            </p>
          </div>
        </div>

    
      </section>
    </div>
  );
}

export default Home;
