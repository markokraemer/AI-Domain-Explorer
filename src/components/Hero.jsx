import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useToast, ToastAction } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { useEffect } from "react";

const formSchema = z.object({
  request: z.string().min(1).optional(),
  similar_to: z.string().optional(),
  word_length: z.preprocess((val) => val === "" ? undefined : Number(val), z.number().min(1).optional()),
  accepted_tlds: z.string().optional(),
});

export default function HeroFormCenterAlignedSearchWithTags({ setActiveTab }) {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      request: "",
      similar_to: "",
      word_length: 5,
      accepted_tlds: ".com, .ai, .io",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    toast({
      title: "Domain generation started",
      description: "It can take up to 30 seconds to generate the domains.",
    });
    const { request, similar_to, word_length, accepted_tlds } = values;
    const tldsArray = accepted_tlds.split(',').map(tld => tld.trim());

    try {
      const response = await fetch("http://localhost:8000/generate_and_check_domains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request, similar_to, word_length, accepted_tlds: tldsArray }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.domains.length === 0) {
          toast({
            variant: "destructive",
            title: "No available domains found",
            description: "We generated 100 domains for your search query, but all were unavailable. Please adjust your search query.",
          });
        } else {
          setDomains(data.domains);
          localStorage.setItem("search_request_id", data.search_request_id);

          // Temporarily switch tabs to refresh data (data fetching like a Pro)
          setActiveTab("explore");
          setTimeout(() => {
            setActiveTab("previous");
          }, 100); // Small delay to ensure the tab switch is registered

          toast({
            title: `${data.domains_found} Domains found`,
            description: `Added to your search results list.`,
          });
        }
      } else {
        throw new Error("Failed to fetch domains");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while fetching domains. Please try again.",
      });
      console.error("Failed to fetch domains", error);
    } finally {
      setLoading(false);
    }
  };

  const options = ["Your Startup Name", "A Dope Domain", "A Domain To Resell For 10b$"];
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOption((prevOption) => (prevOption + 1) % options.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="container py-24 lg:py-32">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">
              AI To Find <motion.span
                key={options[currentOption]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="underline"
              >
                {options[currentOption]}
              </motion.span> 
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              1. Input your search query 2. We find cool words 3. Check for available domains 4. Recommend you the best
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="relative z-10 flex flex-col space-y-3 p-3 border bg-background text-gray-900 rounded-lg shadow-lg">
                    <FormField
                      control={form.control}
                      name="request"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Generate domains based on a description..." {...field} disabled={loading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 text-gray-900 sm:space-y-0">
                      <FormField
                        control={form.control}
                        name="similar_to"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Similar to (Google, Trello, Asana)" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="word_length"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input type="number" placeholder="Word Length (Chars)" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accepted_tlds"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="TLDs (.com, .ai, .io)" {...field} disabled={loading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full flex items-center justify-center bg-gray-900 space-x-2" 
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="small" className="text-white" />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <SearchIcon />
                          <span className="font-semibold">Search</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
