import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Marginalia",
  description: "Learn more about the mission and statistics behind Marginalia.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          About Marginalia
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Curating ideas, thoughts, and discoveries across the digital landscape.
        </p>
      </header>

      <div className="mx-auto mb-16 max-w-prose text-lg text-gray-700">
        <p className="mb-6 leading-[1.8]">
          Marginalia was founded with a simple yet ambitious mission: to carve out a quiet corner on the internet for deep thinking, thoughtful discussion, and the sharing of diverse ideas. In a world characterized by fleeting attention spans and endless scrolling, we believe in the power of the written word to inspire, challenge, and connect us.
        </p>
        <p className="mb-6 leading-[1.8]">
          Our writers come from all walks of life—technologists, artists, philosophers, and everyday observers—bringing their unique perspectives to the table. We curate content that ranges from in-depth technical tutorials and design explorations to personal essays and cultural commentary. Every piece published here is carefully crafted to offer value, spark curiosity, and encourage meaningful engagement.
        </p>
        <p className="leading-[1.8]">
          As we continue to grow, our commitment remains the same: prioritizing quality over quantity, fostering a respectful community, and maintaining an ad-free, distraction-free reading experience. We invite you to explore our categories, read deeply, and perhaps even leave your own marginalia along the way. Thank you for being a part of our journey.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="mb-8 text-center text-xl font-semibold text-gray-900">
              Marginalia at a Glance
            </h2>
            <div className="grid grid-cols-2 gap-8 divide-x divide-gray-200">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold tracking-tight text-gray-900">42+</span>
                <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Published Posts
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pl-8">
                <span className="text-4xl font-bold tracking-tight text-gray-900">6</span>
                <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Categories Covered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
