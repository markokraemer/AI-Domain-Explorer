import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function HeroFormCenterAlignedSearchWithTags() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const request = event.target.elements["domain-search-query"].value;

    const response = await fetch("http://localhost:8000/generate_and_check_domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request }),
    });

    if (response.ok) {
      const data = await response.json();
      setDomains(data.domains);
      localStorage.setItem("search_request_id", data.search_request_id); // Store search_request_id in local storage
    } else {
      console.error("Failed to fetch domains");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container py-24 lg:py-32">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Explore Domains with AI
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              1. We find cool words 2. Check for available domains 3. Show them to you
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                  <div className="flex-[1_0_0%]">
                    <Label htmlFor="domain-search-query" className="sr-only">
                      Generate domains based on a description of what you´re looking for
                    </Label>
                    <Input
                      name="domain-search-query"
                      className="h-full"
                      id="domain-search-query"
                      placeholder="Generate domains based on a description of what you´re looking for..."
                      disabled={loading}
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <Button size={"icon"} disabled={loading}>
                      {loading ? <Spinner size="small" className="text-white" /> : <SearchIcon />}
                    </Button>
                  </div>
                </div>
              </form>
              {/* End Form */}
              {/* Display Domains */}
              {/* {domains.length > 0 && (
                <div className="mt-5">
                  <h2 className="text-2xl font-bold">Available Domains:</h2>
                  <ul>
                    {domains.map((domain, index) => (
                      <li key={index}>{domain.domain}</li>
                    ))}
                  </ul>
                </div>
              )} */}
              {/* End Display Domains */}
              {/* SVG Elements */}
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
            </div>
            {/* <div className="mt-10 sm:mt-20 flex flex-wrap gap-2 justify-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="all-styles" />
                <Label htmlFor="all-styles">All styles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brandable-names" />
                <Label htmlFor="brandable-names">Brandable names</Label>
                <span className="text-sm text-muted-foreground">like Google and Rolex</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="evocative" />
                <Label htmlFor="evocative">Evocative</Label>
                <span className="text-sm text-muted-foreground">like RedBull and Forever21</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="short-phrase" />
                <Label htmlFor="short-phrase">Short phrase</Label>
                <span className="text-sm text-muted-foreground">like Dollar shave club</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="compound-words" />
                <Label htmlFor="compound-words">Compound words</Label>
                <span className="text-sm text-muted-foreground">like FedEx and Microsoft</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="alternate-spelling" />
                <Label htmlFor="alternate-spelling">Alternate spelling</Label>
                <span className="text-sm text-muted-foreground">like Lyft and Fiverr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="non-english-words" />
                <Label htmlFor="non-english-words">Non-English words</Label>
                <span className="text-sm text-muted-foreground">like Toyota and Audi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="real-words" />
                <Label htmlFor="real-words">Real words</Label>
                <span className="text-sm text-muted-foreground">like Apple and Amazon</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

