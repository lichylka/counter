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

export function Finder({
  data,
  onChange,
  value,
  setCreate,
  create,
  placeholder,
  actionButtonText,
}: {
  data: { id: string; value: string }[];
  onChange: (value: string | undefined) => void;
  value: string | undefined;
  setCreate: (value: boolean) => void;
  create: boolean;
  placeholder: string;
  actionButtonText: string;
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
            ? data.find((asset) => asset.id === value)?.value
            : placeholder}
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
              {data.map((el) => (
                <CommandItem
                  key={el.id}
                  value={el.id}
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === el.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {el.value}
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
                  {actionButtonText}
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
