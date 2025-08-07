"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Doc } from "@/convex/_generated/dataModel";

export function AssetFinder({
  assets,
  onChange,
  value,
  setCreate,
  create,
}: {
  assets: Doc<"assets">[];
  onChange: (value: string | undefined) => void;
  value: string | undefined;
  setCreate: (value: boolean) => void;
  create: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? assets.find((asset) => asset._id === value)?.name
            : "Виберіть актив"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-[200px] p-0 ${create ? "hidden" : ""}`}
        style={{
          pointerEvents: "auto",
        }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {assets.map((asset) => (
                <CommandItem
                  key={asset._id}
                  value={asset._id}
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === asset._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {asset.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup className="cursor-pointer">
              <CommandItem className="cursor-pointer">
                <div
                  className="cursor-pointer flex content-center gap-2"
                  onClick={() => {
                    onChange(undefined);
                    setCreate(true);
                  }}
                >
                  <Plus />
                  Додати актив
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
