// Path: src/app/review/[id]/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import {
  ArrowLeft,
  Star,
  Camera,
  X,
  Check,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { accessibleLocations } from "@/data/locations";
import type { Location, LocationFeature } from "@/lib/types/location";

interface CategoryImages {
  parking: string[];
  entrance: string[];
  ramp: string[];
  pathway: string[];
  elevator: string[];
  restroom: string[];
  seating: string[];
  staffAssistance: string[];
}

interface ReviewFormData {
  rating: number;
  comment: string;
  categoryImages: Partial<CategoryImages>;
  accessibility: {
    parking?: boolean | null;
    entrance?: boolean | null;
    ramp?: boolean | null;
    pathway?: boolean | null;
    elevator?: boolean | null;
    restroom?: boolean | null;
    seating?: boolean | null;
    staffAssistance?: boolean | null;
  };
}

const FEATURE_ORDER = [
  "parking",
  "entrance",
  "ramp",
  "pathway",
  "elevator",
  "restroom",
  "seating",
  "staffAssistance",
] as const;

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [location, setLocation] = useState<Location>(accessibleLocations[0]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: "",
    categoryImages: {},
    accessibility: {},
  });

  useEffect(() => {
    const found = accessibleLocations.find(
      (loc) => loc.id === Number(unwrappedParams.id)
    );
    if (found) setLocation(found);
  }, [unwrappedParams.id]);

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    window.history.back();
  };

  const handleAccessibilityVote = (
    feature: keyof typeof formData.accessibility,
    value: boolean | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [feature]: value,
      },
    }));
  };

  const handleImageUpload = (
    category: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          categoryImages: {
            ...prev.categoryImages,
            [category]: [
              ...(prev.categoryImages[category as keyof CategoryImages] || []),
              reader.result as string,
            ],
          },
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (category: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      categoryImages: {
        ...prev.categoryImages,
        [category]: (
          prev.categoryImages[category as keyof CategoryImages] || []
        ).filter((_, i) => i !== index),
      },
    }));
  };

  const toggleSection = (category: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const AccessibilityRatingCard = ({
    category,
    title,
  }: {
    category: keyof typeof formData.accessibility;
    title: string;
  }) => {
    const images =
      formData.categoryImages[category as keyof CategoryImages] || [];
    const isExpanded = expandedSections[category];

    const setFileInputRef = (el: HTMLInputElement | null) => {
      if (fileInputRefs.current) {
        fileInputRefs.current[category] = el;
      }
    };

    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="p-4">
          {/* Feature Title and Vote Options */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-base text-gray-700">{title}</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              <button
                type="button"
                onClick={() => handleAccessibilityVote(category, true)}
                className={`px-4 py-1.5 transition-colors ${
                  formData.accessibility[category] === true
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleAccessibilityVote(category, false)}
                className={`px-4 py-1.5 border-l border-r border-gray-200 transition-colors ${
                  formData.accessibility[category] === false
                    ? "bg-red-100 text-red-700"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleAccessibilityVote(category, null)}
                className={`px-4 py-1.5 transition-colors ${
                  formData.accessibility[category] === null
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Photo Count (if any) */}
          {images.length > 0 && (
            <div className="text-sm text-gray-500 mt-2">
              {images.length} {images.length === 1 ? "photo" : "photos"}
            </div>
          )}

          {/* Photo Upload Section */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => toggleSection(category)}
              className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900"
            >
              <span>Add Photos</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {isExpanded && (
              <div className="mt-4">
                <input
                  type="file"
                  ref={setFileInputRef}
                  onChange={(e) => handleImageUpload(category, e)}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${title} image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(category, index)}
                        className="absolute top-1 right-1 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}

                  {images.length < 3 && (
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[category]?.click()}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition-colors"
                    >
                      <Camera className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Add up to 3 photos of {title.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="font-medium text-gray-900">Write a Review</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Location Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {location.name}
          </h2>
          <p className="text-gray-600">{location.category}</p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Accessibility Ratings with Photos */}
          <div className="space-y-4">
            {FEATURE_ORDER.map((key) => (
              <AccessibilityRatingCard
                key={key}
                category={key}
                title={location.accessibilityScores[key].name}
              />
            ))}
          </div>

          {/* Comment */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4 text-gray-900">Your Review</h3>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
              rows={4}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
