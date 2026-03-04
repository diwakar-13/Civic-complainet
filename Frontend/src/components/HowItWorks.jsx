import React from "react";

const steps = [
  {
    number: "1",
    title: "Report Civic Issue",
    description:
      "Citizens submit complaints through a secure digital form with supporting details, images, and location information.",
  },
  {
    number: "2",
    title: "Administrative Review",
    description:
      "Authorized officials review the complaint and assign appropriate departments for action.",
  },
  {
    number: "3",
    title: "Resolution Process",
    description:
      "The concerned department addresses the issue and updates the system with progress details.",
  },
  {
    number: "4",
    title: "Status Update & Closure",
    description:
      "Once resolved, the complaint status is updated, ensuring transparency and documented closure.",
  },
];

const HowItWorks = () => {
  return (
    <section id="howItWork" className="py-16 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="max-w-2xl text-lg mx-auto mt-4 text-base leading-relaxed text-gray-700">
            A structured digital workflow ensures efficient handling of civic
            complaints from submission to final resolution with full
            transparency.
          </p>
        </div>

        <div className="relative grid grid-cols-1 mt-16 md:mt-20 text-center gap-y-12 md:grid-cols-2 lg:grid-cols-4 gap-x-12">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="flex items-center justify-center w-15 h-15 mx-auto bg-white border-2 border-gray-300 rounded-full shadow-md">
                <span className="text-xl font-semibold text-gray-700">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {step.title}
              </h3>
              <p className="mt-4  text-base text-gray-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
