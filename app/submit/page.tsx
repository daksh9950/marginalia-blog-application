import SubmitForm from "@/components/SubmitForm";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-normal text-gray-950">
              Submit a Post
            </h1>
            <p className="max-w-2xl text-base leading-7 text-gray-600">
              Share a draft with Marginalia. Submitted posts are reviewed before
              they appear on the site.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <SubmitForm />
      </section>
    </main>
  );
}
