import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function LengthFilter({ lengthFilter, setLengthFilter }) {
  return (
    <div className="flex items-center space-x-2">
      {/* <label className="text-gray-700">Word length</label> */}
      <Select
        value={lengthFilter.operator}
        onValueChange={(value) => setLengthFilter({ ...lengthFilter, operator: value })}
      >
        <SelectTrigger className="w-42">
          <SelectValue placeholder="Word length" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="&gt;">&gt; Greater than</SelectItem>
          <SelectItem value="&lt;">&lt; Smaller than</SelectItem>
          <SelectItem value="=">= Equals</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={lengthFilter.value}
        onChange={(e) => setLengthFilter({ ...lengthFilter, value: parseInt(e.target.value) })}
        className="w-16"
      />
    </div>
  );
}