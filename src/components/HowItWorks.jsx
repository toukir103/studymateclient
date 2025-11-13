import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your free account and complete your profile.",
      icon: "📝",
    },
    {
      id: 2,
      title: "Find Partners",
      description: "Search top study partners based on subject or rating.",
      icon: "🔍",
    },
    {
      id: 3,
      title: "Start Learning",
      description: "Connect and collaborate to achieve your study goals.",
      icon: "🎓",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="text-blue-600 text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
