import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { prices } from "@/components/domain-price-data";

const tlds = Object.keys(prices).map(tld => ({ value: tld, label: tld }));

export function TldFilter({ selectedTlds, setSelectedTlds }) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (tld) => {
    setSelectedTlds((prev) => {
      if (prev.includes(tld)) {
        return prev.filter((item) => item !== tld);
      } else {
        return [...prev, tld];
      }
    });
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[80px] justify-between">
            {selectedTlds.length > 0 ? "TLD" : "TLD"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search TLD..." />
            <CommandList>
              <CommandEmpty>No TLD found.</CommandEmpty>
              <CommandGroup>
                {tlds.map((tld) => (
                  <CommandItem key={tld.value} value={tld.value} onSelect={() => handleSelect(tld.value)} className="hover:text-gray-900 !important">
                    <Check className={cn("mr-2 h-4 w-4", selectedTlds.includes(tld.value) ? "opacity-100" : "opacity-0")} />
                    {tld.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <div className="flex flex-wrap gap-2">
        {selectedTlds.map((tld) => (
          <Badge key={tld} variant="secondary" className="flex items-center space-x-2">
            {tld}
            <button onClick={() => handleSelect(tld)} className="ml-2 text-red-500 hover:text-red-700">
              &times;
            </button>
          </Badge>
        ))}
      </div> */}
    </div>
  );
}