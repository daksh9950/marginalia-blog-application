"use client";

import { FormEvent, useState } from "react";

const categories = ["Technology", "Design", "Lifestyle", "Travel", "Food"];

const initialFormState = {
  title: "",
  author: "",
  category: "Technology",
  excerpt: "",
  content: "",
  thumbnail: "",
};

export default function SubmitForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim().length > 0);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to submit post. Please try again.");
      }

      setFormData(initialFormState);
      setSuccessMessage("Post submitted! It will appear after review.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit post. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors focus:border-gray-950"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium text-gray-700">
            Author name
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(event) => updateField("author", event.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors focus:border-gray-950"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors focus:border-gray-950"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="thumbnail"
            className="text-sm font-medium text-gray-700"
          >
            Thumbnail URL
          </label>
          <input
            id="thumbnail"
            type="text"
            value={formData.thumbnail}
            onChange={(event) => updateField("thumbnail", event.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors focus:border-gray-950"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="excerpt"
            className="text-sm font-medium text-gray-700"
          >
            Excerpt
          </label>
          <span className="text-xs text-gray-500">
            {formData.excerpt.length}/200
          </span>
        </div>
        <textarea
          id="excerpt"
          maxLength={200}
          rows={4}
          value={formData.excerpt}
          onChange={(event) => updateField("excerpt", event.target.value)}
          className="w-full resize-y border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none transition-colors focus:border-gray-950"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows={12}
          value={formData.content}
          onChange={(event) => updateField("content", event.target.value)}
          className="w-full resize-y border border-gray-300 bg-white px-4 py-2.5 text-sm leading-6 text-gray-950 outline-none transition-colors focus:border-gray-950"
        />
      </div>

      {successMessage ? (
        <p className="border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : null}
        {isSubmitting ? "Submitting..." : "Submit Post"}
      </button>
    </form>
  );
}
