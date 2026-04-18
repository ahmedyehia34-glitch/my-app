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

      {/* TRIGGER */}
      <SheetTrigger asChild>
        <button className="px-5 py-2.5 bg-black text-white rounded-full shadow-md hover:scale-105 transition duration-300">
          Categories
        </button>
      </SheetTrigger>

      {/* SHEET */}
      <SheetContent
        side="right"
        className="w-[300px] bg-white p-6"
      >

        {/* TITLE */}
        <SheetTitle className="text-xl font-bold mb-6 tracking-wide">
          Shop Categories
        </SheetTitle>

        {/* LIST */}
        <div className="space-y-3">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden
              
              ${
                selected === cat
                  ? "bg-black text-white shadow-lg"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
            >
              {cat}

              {/* active glow line */}
              {selected === cat && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white/40 rounded-r-full" />
              )}
            </button>
          ))}

        </div>

      </SheetContent>

    </Sheet>
  );
}