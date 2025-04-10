// src/components/admin/WheelchairInfoAdmin.tsx
import React, { useState } from "react";
import { Edit2, CheckSquare, Trash2 } from "lucide-react";

interface WheelchairInfo {
  type: string;
  brand: string;
  model: string;
  foldability: "foldable" | "non-foldable";
  regularDimensions: {
    width: number;
    length: number;
    weight: number;
  };
  foldedDimensions?: {
    width: number;
    length: number;
    height: number;
  };
  customizations: string[];
  additionalNotes: string;
}

interface WheelchairInfoAdminProps {
  initialData?: WheelchairInfo;
  onSave: (data: WheelchairInfo) => void;
}

const defaultWheelchairInfo: WheelchairInfo = {
  type: "manual",
  brand: "",
  model: "",
  foldability: "foldable",
  regularDimensions: {
    width: 65,
    length: 107,
    weight: 15,
  },
  foldedDimensions: {
    width: 30,
    length: 80,
    height: 75,
  },
  customizations: [],
  additionalNotes: "",
};

export function WheelchairInfoAdmin({
  initialData = defaultWheelchairInfo,
  onSave,
}: WheelchairInfoAdminProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [wheelchairData, setWheelchairData] =
    useState<WheelchairInfo>(initialData);
  const [newCustomization, setNewCustomization] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      // แก้ไขตรงนี้เพื่อปัองกัน "Spread types may only be created from object types"
      if (parent === "regularDimensions" || parent === "foldedDimensions") {
        const parentObj = wheelchairData[parent as keyof WheelchairInfo];
        if (typeof parentObj === "object" && parentObj !== null) {
          setWheelchairData((prev) => ({
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: parseFloat(value) || 0,
            },
          }));
        }
      }
    } else {
      setWheelchairData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addCustomization = () => {
    if (newCustomization.trim()) {
      setWheelchairData((prev) => ({
        ...prev,
        customizations: [...prev.customizations, newCustomization.trim()],
      }));
      setNewCustomization("");
    }
  };

  const removeCustomization = (index: number) => {
    setWheelchairData((prev) => ({
      ...prev,
      customizations: prev.customizations.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave(wheelchairData);
    setIsEditing(false);
  };

  const getWheelchairTypeLabel = (type: string): string => {
    switch (type) {
      case "manual":
        return "รถเข็นแบบใช้แรง";
      case "electric":
        return "รถเข็นไฟฟ้า";
      case "sport":
        return "รถเข็นสำหรับกีฬา";
      default:
        return "ไม่ระบุ";
    }
  };

  const getFoldabilityLabel = (foldability: string): string => {
    switch (foldability) {
      case "foldable":
        return "พับได้";
      case "non-foldable":
        return "พับไม่ได้";
      default:
        return "ไม่ระบุ";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">ข้อมูลรถเข็น</h3>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-blue-600 hover:text-blue-800"
        >
          {isEditing ? <CheckSquare size={20} /> : <Edit2 size={20} />}
        </button>
      </div>

      <div className="space-y-6">
        {isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="wheelchair-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ประเภทรถเข็น
                </label>
                <select
                  id="wheelchair-type"
                  name="type"
                  value={wheelchairData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="manual">รถเข็นแบบใช้แรง</option>
                  <option value="electric">รถเข็นไฟฟ้า</option>
                  <option value="sport">รถเข็นสำหรับกีฬา</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="foldability"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ความสามารถในการพับ
                </label>
                <select
                  id="foldability"
                  name="foldability"
                  value={wheelchairData.foldability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="foldable">พับได้</option>
                  <option value="non-foldable">พับไม่ได้</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="wheelchair-brand"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ยี่ห้อ
                </label>
                <input
                  type="text"
                  id="wheelchair-brand"
                  name="brand"
                  value={wheelchairData.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ระบุยี่ห้อรถเข็น"
                />
              </div>

              <div>
                <label
                  htmlFor="wheelchair-model"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  รุ่น
                </label>
                <input
                  type="text"
                  id="wheelchair-model"
                  name="model"
                  value={wheelchairData.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ระบุรุ่นรถเข็น"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                ขนาดปกติ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="regular-width"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    ความกว้าง (ซม.)
                  </label>
                  <input
                    type="number"
                    id="regular-width"
                    name="regularDimensions.width"
                    value={wheelchairData.regularDimensions.width}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="regular-length"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    ความยาว (ซม.)
                  </label>
                  <input
                    type="number"
                    id="regular-length"
                    name="regularDimensions.length"
                    value={wheelchairData.regularDimensions.length}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="regular-weight"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    น้ำหนัก (กก.)
                  </label>
                  <input
                    type="number"
                    id="regular-weight"
                    name="regularDimensions.weight"
                    value={wheelchairData.regularDimensions.weight}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {wheelchairData.foldability === "foldable" && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  ขนาดเมื่อพับ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="folded-width"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      ความกว้าง (ซม.)
                    </label>
                    <input
                      type="number"
                      id="folded-width"
                      name="foldedDimensions.width"
                      value={wheelchairData.foldedDimensions?.width || 0}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="folded-length"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      ความยาว (ซม.)
                    </label>
                    <input
                      type="number"
                      id="folded-length"
                      name="foldedDimensions.length"
                      value={wheelchairData.foldedDimensions?.length || 0}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="folded-height"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      ความสูง (ซม.)
                    </label>
                    <input
                      type="number"
                      id="folded-height"
                      name="foldedDimensions.height"
                      value={wheelchairData.foldedDimensions?.height || 0}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="additional-notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                หมายเหตุเพิ่มเติม
              </label>
              <textarea
                id="additional-notes"
                name="additionalNotes"
                value={wheelchairData.additionalNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุข้อมูลเพิ่มเติมเกี่ยวกับรถเข็น"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                การปรับแต่งเพิ่มเติม
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newCustomization}
                  onChange={(e) => setNewCustomization(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="เพิ่มการปรับแต่ง"
                />
                <button
                  type="button"
                  onClick={addCustomization}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  เพิ่ม
                </button>
              </div>
              <div className="mt-2">
                {wheelchairData.customizations.map((custom, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2"
                  >
                    <span>{custom}</span>
                    <button
                      onClick={() => removeCustomization(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ประเภท</p>
                <p className="font-medium">
                  {getWheelchairTypeLabel(wheelchairData.type)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ความสามารถในการพับ</p>
                <p className="font-medium">
                  {getFoldabilityLabel(wheelchairData.foldability)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ยี่ห้อ</p>
                <p className="font-medium">
                  {wheelchairData.brand || "ไม่ระบุ"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">รุ่น</p>
                <p className="font-medium">
                  {wheelchairData.model || "ไม่ระบุ"}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">ขนาดปกติ</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ความกว้าง</p>
                  <p className="font-medium">
                    {wheelchairData.regularDimensions.width} ซม.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ความยาว</p>
                  <p className="font-medium">
                    {wheelchairData.regularDimensions.length} ซม.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">น้ำหนัก</p>
                  <p className="font-medium">
                    {wheelchairData.regularDimensions.weight} กก.
                  </p>
                </div>
              </div>
            </div>

            {wheelchairData.foldability === "foldable" &&
              wheelchairData.foldedDimensions && (
                <div>
                  <h4 className="text-md font-medium mb-2">ขนาดเมื่อพับ</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ความกว้าง</p>
                      <p className="font-medium">
                        {wheelchairData.foldedDimensions.width} ซม.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ความยาว</p>
                      <p className="font-medium">
                        {wheelchairData.foldedDimensions.length} ซม.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ความสูง</p>
                      <p className="font-medium">
                        {wheelchairData.foldedDimensions.height} ซม.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {wheelchairData.additionalNotes && (
              <div>
                <h4 className="text-md font-medium mb-1">หมายเหตุเพิ่มเติม</h4>
                <p className="text-gray-700">
                  {wheelchairData.additionalNotes}
                </p>
              </div>
            )}

            {wheelchairData.customizations.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-1">
                  การปรับแต่งเพิ่มเติม
                </h4>
                <div className="flex flex-wrap">
                  {wheelchairData.customizations.map((custom, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2"
                    >
                      {custom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!wheelchairData.brand &&
              !wheelchairData.model &&
              !wheelchairData.additionalNotes &&
              wheelchairData.customizations.length === 0 && (
                <p className="text-gray-500 italic mt-2">
                  ไม่มีข้อมูลรถเข็น คลิกไอคอนแก้ไขเพื่อเพิ่มข้อมูล
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
