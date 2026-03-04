import React from "react";

const impactData = [
  {
    title: "Enhanced Transparency",
    description:
      "Citizens can track complaint status at every stage, eliminating uncertainty and improving communication between public authorities and communities.",
  },
  {
    title: "Strengthened Accountability",
    description:
      "Role-based access control and time-stamped updates ensure traceability of administrative actions and responsible governance.",
  },
  {
    title: "Operational Efficiency",
    description:
      "Centralized monitoring and structured workflows enable faster response times and systematic resolution of civic issues.",
  },
];

const ImpactSection = () => {
  return (
    <section className="py-16 bg-gray-50 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl ">
            Strengthening Public Trust Through Digital Governance
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            The Smart Civic platform improves transparency, accountability,
            and administrative efficiency in civic grievance management.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {impactData.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;