import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export const SelectColumns = () => {
  const [open, setOpen] = useState(false);
  const { url, setUrl } = useWallTypeStore();
  const [columns, setColumns] = useState(3);
  const options = [2, 3, 4];

  const handleColumnsChange = (newColumns: number) => {
    setColumns(newColumns);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("columns", newColumns.toString());
      setUrl(testUrl.toString());
    }
  };

  return (
    <Card
      className={`w-full border-none shadow-none ${
        !open ? "hover:bg-gray-100" : ""
      }`}
    >
      <CardHeader
        className="flex flex-row justify-between gap-0 p-0 py-2 px-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <CardTitle className="text-md font-medium">Columns in Grid</CardTitle>
          {open && (
            <CardDescription className="text-xs">
              Select the number of columns
            </CardDescription>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transform ${open ? "rotate-180" : ""}`}
        />
      </CardHeader>
      {open && (
        <CardContent className="flex flex-col gap-2 pb-2">
          {options.map((option) => (
            <button
              key={option}
              className={`py-1 px-2 rounded-md text-xs ${
                columns === option
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleColumnsChange(option)}
            >
              {option} Columns
            </button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
