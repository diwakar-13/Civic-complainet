import React from "react";

const CallToAction = ({ openLogin, openSignup }) => {
  return (
    <section className="py-16 bg-gray-50 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto text-center max-w-4xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          Begin Reporting Civic Issues Today
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Access the Smart Civic Complaint Management System to securely submit
          complaints, monitor progress, and contribute to improved public
          service delivery.
        </p>

        <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
          <button onClick={openSignup} className="cursor-pointer px-8 py-4 text-lg font-semibold text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-700">
            Register Account
          </button>

          <button onClick={openLogin} className="cursor-pointer px-8 py-4 text-lg font-semibold text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Login to Portal
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
