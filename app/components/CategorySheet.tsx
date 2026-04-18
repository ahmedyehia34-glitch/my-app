"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const categories = [
  "All",
  "Kaftan",
  "Hoodies",
  "Scarf",
  "Accessories",
];

export default function CategorySheet({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (cat: string) => void;
}) {
  return (
    <Sheet>

      <SheetTrigger asChild>
        <button className="px-4 py-2 bg-black text-white rounded-full">
          Categories
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[280px]">

        <SheetTitle className="text-lg font-semibold mb-4">
          Categories
        </SheetTitle>

        <div className="space-y-2">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selected === cat
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}

        </div>

      </SheetContent>

    </Sheet>
  );
}