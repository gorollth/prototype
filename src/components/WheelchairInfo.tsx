// src/components/WheelchairInfo.tsx
"use client";

import { useState } from "react";
import { ChevronRight, Edit2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface WheelchairDetails {
  isFoldable: boolean;
  width: string;
  length: string;
  weight: string;
  foldedWidth?: string;
  foldedLength?: string;
  foldedHeight?: string;
  additionalNeeds: string[];
  notes?: string; // เพิ่มฟิลด์ notes
}

export function WheelchairInfo() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [wheelchairInfo, setWheelchairInfo] = useState<WheelchairDetails>({
    isFoldable: true,
    width: "65",
    length: "107",
    weight: "15",
    foldedWidth: "30",
    foldedLength: "80",
    foldedHeight: "75",
    additionalNeeds: [
      t("wheelchair.needs.ramp"),
      t("wheelchair.needs.doorways"),
    ],
    notes:
      "ต้องการความช่วยเหลือเล็กน้อยเวลาขึ้นทางลาดชัน และต้องการที่จอดรถใกล้ทางเข้า", // เพิ่มค่าเริ่มต้นสำหรับบันทึก
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">{t("wheelchair.info.title")}</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-blue-600 text-sm"
          >
            {t("common.cancel")}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Foldable Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("wheelchair.foldable.question")}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={wheelchairInfo.isFoldable}
                  onChange={() =>
                    setWheelchairInfo((prev) => ({ ...prev, isFoldable: true }))
                  }
                  className="mr-2"
                />
                {t("common.yes")}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!wheelchairInfo.isFoldable}
                  onChange={() =>
                    setWheelchairInfo((prev) => ({
                      ...prev,
                      isFoldable: false,
                    }))
                  }
                  className="mr-2"
                />
                {t("common.no")}
              </label>
            </div>
          </div>

          {/* Normal Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("wheelchair.regular.dimensions")}
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("wheelchair.width.label")}
                </label>
                <input
                  type="number"
                  value={wheelchairInfo.width}
                  onChange={(e) =>
                    setWheelchairInfo((prev) => ({
                      ...prev,
                      width: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("wheelchair.length.label")}
                </label>
                <input
                  type="number"
                  value={wheelchairInfo.length}
                  onChange={(e) =>
                    setWheelchairInfo((prev) => ({
                      ...prev,
                      length: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("wheelchair.weight.label")}
                </label>
                <input
                  type="number"
                  value={wheelchairInfo.weight}
                  onChange={(e) =>
                    setWheelchairInfo((prev) => ({
                      ...prev,
                      weight: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Folded Dimensions (only shown if foldable) */}
          {wheelchairInfo.isFoldable && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("wheelchair.folded.dimensions")}
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {t("wheelchair.width.label")}
                  </label>
                  <input
                    type="number"
                    value={wheelchairInfo.foldedWidth}
                    onChange={(e) =>
                      setWheelchairInfo((prev) => ({
                        ...prev,
                        foldedWidth: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {t("wheelchair.length.label")}
                  </label>
                  <input
                    type="number"
                    value={wheelchairInfo.foldedLength}
                    onChange={(e) =>
                      setWheelchairInfo((prev) => ({
                        ...prev,
                        foldedLength: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    {t("wheelchair.height.label")}
                  </label>
                  <input
                    type="number"
                    value={wheelchairInfo.foldedHeight}
                    onChange={(e) =>
                      setWheelchairInfo((prev) => ({
                        ...prev,
                        foldedHeight: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* บันทึกเพิ่มเติม */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บันทึกเพิ่มเติม
            </label>
            <textarea
              value={wheelchairInfo.notes}
              onChange={(e) =>
                setWheelchairInfo((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              rows={4}
              className="w-full p-2 border rounded-lg"
              placeholder="บันทึกความต้องการพิเศษหรือข้อมูลเพิ่มเติมที่ต้องการให้ผู้อื่นทราบ..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("common.save.changes")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium">{t("wheelchair.info.title")}</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600"
          aria-label={t("wheelchair.edit.info")}
        >
          <Edit2 size={18} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">
              {t("wheelchair.foldable.status")}
            </p>
            <p className="font-medium">
              {wheelchairInfo.isFoldable
                ? t("wheelchair.is.foldable")
                : t("wheelchair.not.foldable")}
            </p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-2">
            {t("wheelchair.regular.dimensions")}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">{t("wheelchair.width")}</p>
              <p className="font-medium">
                {wheelchairInfo.width} {t("common.cm")}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("wheelchair.length")}</p>
              <p className="font-medium">
                {wheelchairInfo.length} {t("common.cm")}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{t("wheelchair.weight")}</p>
              <p className="font-medium">
                {wheelchairInfo.weight} {t("common.kg")}
              </p>
            </div>
          </div>
        </div>
        {wheelchairInfo.isFoldable && (
          <div>
            <p className="text-gray-600 text-sm mb-2">
              {t("wheelchair.folded.dimensions")}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm">{t("wheelchair.width")}</p>
                <p className="font-medium">
                  {wheelchairInfo.foldedWidth} {t("common.cm")}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("wheelchair.length")}
                </p>
                <p className="font-medium">
                  {wheelchairInfo.foldedLength} {t("common.cm")}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("wheelchair.height")}
                </p>
                <p className="font-medium">
                  {wheelchairInfo.foldedHeight} {t("common.cm")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* แสดงบันทึกเพิ่มเติม */}
        <div className="border-t pt-4">
          <p className="text-gray-600 text-sm mb-2">บันทึกเพิ่มเติม</p>
          <p className="text-gray-600">
            {wheelchairInfo.notes || "ไม่มีบันทึกเพิ่มเติม"}
          </p>
        </div>
      </div>
    </div>
  );
}
