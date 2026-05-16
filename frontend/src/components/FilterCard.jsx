import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { MapPin, Briefcase, IndianRupee, X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin className="w-4 h-4 text-purple-500" />,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    icon: <Briefcase className="w-4 h-4 text-purple-500" />,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    icon: <IndianRupee className="w-4 h-4 text-purple-500" />,
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-lg text-gray-800">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-800"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <hr className="mb-4 border-gray-100" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              {data.icon}
              <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                {data.filterType}
              </h2>
            </div>

            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={itemId}
                  className={`flex items-center space-x-2 my-1 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    selectedValue === item
                      ? "bg-purple-50 border border-purple-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="text-purple-600 border-gray-300"
                  />
                  <Label
                    htmlFor={itemId}
                    className={`cursor-pointer text-sm ${
                      selectedValue === item
                        ? "text-purple-700 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {item}
                  </Label>
                </div>
              );
            })}

            {index < filterData.length - 1 && (
              <hr className="mt-4 border-gray-100" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
