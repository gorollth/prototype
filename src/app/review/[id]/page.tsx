// src/app/review/[id]/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Camera, X } from "lucide-react";
import { accessibleLocations } from "@/data/locations";

interface LocationFeature {
  name: string;
  isLiked: boolean;
  totalVotes: number;
  description: string;
}

interface Location {
  id: number;
  name: string;
  position: [number, number];
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  features: string[];
  description: string;
  accessibilityScores: {
    parking?: LocationFeature;
    elevator?: LocationFeature;
    restroom?: LocationFeature;
    entrance?: LocationFeature;
    pathway?: LocationFeature;
    assistance?: LocationFeature;
  };
}

interface CategoryImages {
  parking?: string[];
  elevator?: string[];
  restroom?: string[];
  entrance?: string[];
  pathway?: string[];
  assistance?: string[];
}

interface ReviewFormData {
  rating: number;
  comment: string;
  categoryImages: CategoryImages;
  accessibility: {
    parking?: boolean;
    elevator?: boolean;
    restroom?: boolean;
    entrance?: boolean;
    pathway?: boolean;
    assistance?: boolean;
  };
}

interface ImageUploadSectionProps {
  category: keyof Location["accessibilityScores"];
  title: string;
  onUpload: (category: string, files: FileList) => void;
  onRemove: (category: string, index: number) => void;
  images: string[];
}

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [location, setLocation] = useState<Location>(accessibleLocations[0]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
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

  const handleAccessibilityVote = (feature: string, isLiked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [feature]: isLiked,
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

  const ImageUploadSection = ({
    category,
    title,
  }: {
    category: string;
    title: string;
  }) => {
    const images =
      formData.categoryImages[category as keyof CategoryImages] || [];

    const setFileInputRef = (el: HTMLInputElement | null) => {
      if (fileInputRefs.current) {
        fileInputRefs.current[category] = el;
      }
    };

    return (
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-3">{title}</h4>
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
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(category, index)}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {images.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRefs.current[category]?.click()}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-600">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">Write a Review</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Location Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <p className="text-gray-600">{location.category}</p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Add Photos</h3>
            <div className="space-y-4">
              {Object.entries(location.accessibilityScores).map(
                ([key, score]) => (
                  <ImageUploadSection
                    key={key}
                    category={key}
                    title={score.name}
                  />
                )
              )}
            </div>
          </div>

          {/* Overall Rating */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Overall Rating</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  className={`p-1 ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Ratings */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Accessibility Ratings</h3>
            <div className="space-y-4">
              {Object.entries(location.accessibilityScores).map(
                ([key, score]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {score.name}
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleAccessibilityVote(key, true)}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
                          formData.accessibility[
                            key as keyof typeof formData.accessibility
                          ] === true
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>Like</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAccessibilityVote(key, false)}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
                          formData.accessibility[
                            key as keyof typeof formData.accessibility
                          ] === false
                            ? "bg-red-100 border-red-500 text-red-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        <span>Dislike</span>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Your Review</h3>
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
