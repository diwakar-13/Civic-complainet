import { ShieldCheck, Clock, LayoutDashboard, FileText } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Complaint Registration",
    description:
      "Submit civic complaints through a secure digital interface with structured details, image attachments, and precise location tagging.",
  },
  {
    icon: Clock,
    title: "Real-Time Status Tracking",
    description:
      "Track complaint progress transparently from submission to resolution through a structured status lifecycle.",
  },
  {
    icon: LayoutDashboard,
    title: "Administrative Dashboard",
    description:
      "Authorized officials access a centralized dashboard to manage, review, and update complaints efficiently.",
  },
  {
    icon: FileText,
    title: "Accountability & Audit Records",
    description:
      "Time-stamped records and structured workflows ensure transparency, traceability, and administrative accountability.",
  },
];

const Feature = () => {
  return (
    <section id="feature" className="lg:py-30 py-16 bg-gray-50 ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Core Capabilities of the Platform
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            A structured digital framework for reporting, tracking, and
            resolving public grievances with transparency and administrative
            control.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:mt-20 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="p-8 transition duration-300 bg-white shadow-lg border border-gray-200 rounded-xl hover:shadow-xl hover:scale-102"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-50 border border-gray-300 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-700 text-md leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feature;
