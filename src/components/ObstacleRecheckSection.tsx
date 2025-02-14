// src/app/map/components/ObstacleRecheckSection.tsx
"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2, Users } from "lucide-react";

interface RecheckProps {
  obstacleId: string;
  currentStatus: "active" | "resolved";
  onStatusUpdate: (newStatus: "active" | "resolved") => Promise<void>;
  verifyCount: {
    stillPresent: number;
    resolved: number;
  };
}

export function ObstacleRecheckSection({
  currentStatus,
  onStatusUpdate,
  verifyCount = { stillPresent: 0, resolved: 0 },
}: RecheckProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "active" | "resolved"
  >(currentStatus);
  const [localVerifyCount, setLocalVerifyCount] = useState(verifyCount);

  const handleVerification = async (newStatus: "active" | "resolved") => {
    try {
      setIsSubmitting(true);
      await onStatusUpdate(newStatus);
      setVerificationStatus(newStatus);

      setLocalVerifyCount((prev) => ({
        ...prev,
        stillPresent:
          newStatus === "active" ? prev.stillPresent + 1 : prev.stillPresent,
        resolved: newStatus === "resolved" ? prev.resolved + 1 : prev.resolved,
      }));
    } catch (error) {
      console.error("Error updating obstacle status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-3 border-t pt-2">
      <h4 className="text-sm font-medium text-gray-900">
        Verify Current Status
      </h4>
      <p className="text-xs text-gray-500 mb-2">
        Help keep information up to date by verifying if this obstacle is still
        present
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => handleVerification("active")}
          disabled={isSubmitting || verificationStatus === "active"}
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs w-1/2 ${
            verificationStatus === "active"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors disabled:opacity-50`}
        >
          <div className="flex items-center">
            {isSubmitting ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <AlertCircle className="w-3 h-3 mr-1" />
            )}
            <span>Still Present</span>
          </div>
          <div className="flex items-center gap-1 bg-white bg-opacity-50 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span>{localVerifyCount.stillPresent}</span>
          </div>
        </button>

        <button
          onClick={() => handleVerification("resolved")}
          disabled={isSubmitting || verificationStatus === "resolved"}
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs w-1/2 ${
            verificationStatus === "resolved"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors disabled:opacity-50`}
        >
          <div className="flex items-center">
            {isSubmitting ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <CheckCircle className="w-3 h-3 mr-1" />
            )}
            <span>No Longer Present</span>
          </div>
          <div className="flex items-center gap-1 bg-white bg-opacity-50 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" />
            <span>{localVerifyCount.resolved}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
