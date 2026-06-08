"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, Loader2, CheckCircle2 } from "lucide-react";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [globalError, setGlobalError] = useState("");

  const charCount = formData.excerpt.length;

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((curr) => ({ ...curr, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Required";
    if (!formData.author.trim()) newErrors.author = "Required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Required";
    if (formData.excerpt.length > 200) newErrors.excerpt = "Too long";
    if (!formData.content.trim()) newErrors.content = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGlobalError("");

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

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

      setStatus("success");
    } catch (error) {
      setGlobalError(
        error instanceof Error ? error.message : "Unable to submit post."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl p-12 text-center"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <CheckCircle2 size={48} style={{ color: "var(--accent)" }} />
        <h2
          className="mt-6 text-[28px]"
          style={{
            fontFamily: "var(--font-heading), serif",
            color: "#F5F5F0",
          }}
        >
          Post Submitted!
        </h2>
        <p className="mt-2 text-[#888880]">
          Your post is under review and will appear once approved.
        </p>
        <button
          onClick={() => {
            setFormData(initialFormState);
            setStatus("idle");
          }}
          className="mt-6 rounded-lg border px-6 py-2.5 transition-colors duration-200"
          style={{
            borderColor: "var(--border)",
            color: "#888880",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "#888880";
          }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {globalError && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-500">
          {globalError}
        </div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
          style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Your post title"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={`form-input w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none ${
            errors.title ? "has-error" : ""
          }`}
          style={{
            background: "var(--surface)",
            borderColor: errors.title ? "rgba(239, 68, 68, 0.5)" : "var(--border)",
            color: "#F5F5F0",
          }}
        />
      </div>

      {/* Author & Category Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium"
            style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
          >
            Author Name
          </label>
          <input
            id="author"
            type="text"
            placeholder="Your full name"
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
            className={`form-input w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none ${
              errors.author ? "has-error" : ""
            }`}
            style={{
              background: "var(--surface)",
              borderColor: errors.author
                ? "rgba(239, 68, 68, 0.5)"
                : "var(--border)",
              color: "#F5F5F0",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium"
            style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="form-input w-full appearance-none rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "#F5F5F0",
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "#444440" }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label
          htmlFor="thumbnail"
          className="mb-2 block text-sm font-medium"
          style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
        >
          Thumbnail URL
        </label>
        <input
          id="thumbnail"
          type="text"
          placeholder="https://..."
          value={formData.thumbnail}
          onChange={(e) => updateField("thumbnail", e.target.value)}
          className="form-input w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "#F5F5F0",
          }}
        />
        {formData.thumbnail && (
          <div
            className="mt-3 overflow-hidden rounded-md border"
            style={{
              borderColor: "var(--border)",
              width: "60px",
              height: "60px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label
          htmlFor="excerpt"
          className="mb-2 block text-sm font-medium"
          style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
        >
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          value={formData.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          className={`form-input w-full resize-y rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none ${
            errors.excerpt ? "has-error" : ""
          }`}
          style={{
            background: "var(--surface)",
            borderColor: errors.excerpt
              ? "rgba(239, 68, 68, 0.5)"
              : "var(--border)",
            color: "#F5F5F0",
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-[#444440]">
          <span>Brief summary shown on the post card</span>
          <span
            style={{
              color: charCount > 180 ? "rgba(239, 68, 68, 1)" : "#444440",
            }}
          >
            {charCount}/200
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium"
          style={{ fontFamily: "var(--font-mono), monospace", color: "#888880" }}
        >
          Content
        </label>
        <textarea
          id="content"
          rows={10}
          placeholder="Write your full article here..."
          value={formData.content}
          onChange={(e) => updateField("content", e.target.value)}
          className={`form-input w-full resize-y rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none ${
            errors.content ? "has-error" : ""
          }`}
          style={{
            background: "var(--surface)",
            borderColor: errors.content
              ? "rgba(239, 68, 68, 0.5)"
              : "var(--border)",
            color: "#F5F5F0",
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-semibold transition-all duration-200"
        style={{
          background:
            status === "loading" ? "rgba(232,197,71,0.5)" : "var(--accent)",
          color: "#000",
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading")
            e.currentTarget.style.filter = "brightness(1.1)";
        }}
        onMouseLeave={(e) => {
          if (status !== "loading")
            e.currentTarget.style.filter = "brightness(1)";
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit the Blog"
        )}
      </button>
    </form>
  );
}
