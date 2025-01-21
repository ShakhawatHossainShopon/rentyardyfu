// src/components/ChipComponent.js
import { useState } from "react";
import { ChipData, content } from "./Data"; // Adjust the import path as necessary
import { Chip } from "./../Chip/Chip";

export const ChipComponent = () => {
  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipClick = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {ChipData.map((chip, index) => (
        <Chip
          key={index}
          label={chip.label}
          isSelected={selectedChips.includes(chip)}
          onClick={() => handleChipClick(chip)}
        />
      ))}
      <div className="px-5">
        {content.map((item, index) => (
          <ul className="list-disc px-6" key={index}>
            <li className="text-xl font-semibold">
              Application Fee - {item.applicationFee}
            </li>
            <li className="text-xl font-semibold">
              Water Bill-{item.waterBill}
            </li>
            <li className="text-xl font-semibold">Trash Fee-{item.trashFee}</li>
          </ul>
        ))}
        <p className="text-lg font-semibold">
          Total: 60(Will be added to your Monthly Rent)
        </p>
      </div>
    </div>
  );
};
