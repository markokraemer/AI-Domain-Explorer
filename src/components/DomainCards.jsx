import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TldFilter } from "@/components/TldFilter";
import LengthFilter from "@/components/LengthFilter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { prices } from "@/components/domain-price-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import HeroFormCenterAlignedSearchWithTags from './Hero'; // Ensure the path is correct

export default function Component() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div>
      <HeroFormCenterAlignedSearchWithTags setActiveTab={setActiveTab} />
      <DomainTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function DomainTabs({ activeTab, setActiveTab }) {
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [tldFilter, setTldFilter] = useState("");
  const [lengthFilter, setLengthFilter] = useState({ operator: ">", value: 0 });
  const [selectedTlds, setSelectedTlds] = useState([]);
  const [favoriteDomains, setFavoriteDomains] = useState([]);
  const [previousSearchDomains, setPreviousSearchDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDomains = async (url, setDomainsCallback) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const formattedDomains = data.domains.map((item) => {
          const [domainText, domain] = item.domain.split(".");
          return { domainText, domain: `.${domain}` };
        });
        setDomainsCallback(formattedDomains);
        setTotalPages(data.pagination.total_pages);
      } else {
        throw new Error("Failed to fetch domains");
      }
    } catch (error) {
      console.error("Failed to fetch domains", error);
    }
  };

  useEffect(() => {
    if (activeTab === "explore") {
      fetchDomains(`http://65.108.219.251:2085/available_domains?page=${currentPage}`, setDomains);
    } else if (activeTab === "previous") {
      const searchRequestId = localStorage.getItem("search_request_id");
      fetchDomains(`http://65.108.219.251:2085/available_domains?search_request_id=${searchRequestId}&page=${currentPage}`, setPreviousSearchDomains);
    } else if (activeTab === "favorites") {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteDomains = favorites.map(fav => {
        const [domainText, domain] = fav.split(".");
        return { domainText, domain: `.${domain}` };
      });
      setFavoriteDomains(favoriteDomains);
    }
  }, [currentPage, activeTab]);

  useEffect(() => {
    filterDomains();
  }, [tldFilter, lengthFilter, domains, previousSearchDomains, favoriteDomains]);

  useEffect(() => {
    setTldFilter(selectedTlds.join(","));
  }, [selectedTlds]);

  const filterDomains = () => {
    let filtered = [];
    if (activeTab === "explore") {
      filtered = domains;
    } else if (activeTab === "previous") {
      filtered = previousSearchDomains;
    } else if (activeTab === "favorites") {
      filtered = favoriteDomains;
    }

    if (selectedTlds.length > 0) {
      filtered = filtered.filter((domain) => selectedTlds.some(tld => domain.domain.includes(tld)));
    }

    if (lengthFilter.operator && lengthFilter.value !== null) {
      filtered = filtered.filter((domain) => {
        const length = domain.domainText.length;
        switch (lengthFilter.operator) {
          case ">":
            return length > lengthFilter.value;
          case "<":
            return length < lengthFilter.value;
          case "=":
            return length === lengthFilter.value;
          default:
            return true;
        }
      });
    }

    setFilteredDomains(filtered);
  };

  const generateColorCombo = (index) => {
    const colors = [
      { bgColor: "#F3F1F5", textColor: "#6D28D9", domainBGColor: "#6D28D9" },
      { bgColor: "#FCE7F3", textColor: "#DB2777", domainBGColor: "#DB2777" },
      { bgColor: "#E2E8F0", textColor: "#1E40AF", domainBGColor: "#1E40AF" },
      { bgColor: "#FEF3C7", textColor: "#D97706", domainBGColor: "#D97706" },
      { bgColor: "#FEE2E2", textColor: "#DC2626", domainBGColor: "#DC2626" },
      { bgColor: "#111827", textColor: "white", domainBGColor: "#2F4163" },
      { bgColor: "#4B5563", textColor: "white", domainBGColor: "#A1AFC2" },
      { bgColor: "#F1F5F9", textColor: "#1E293B", domainBGColor: "#1E293B" },
      { bgColor: "#60A5FA", textColor: "white", domainBGColor: "black" },
      { bgColor: "#1E3A8A", textColor: "white", domainBGColor: "#93C5FD" },
      { bgColor: "#FFEDD5", textColor: "#EA580C", domainBGColor: "#EA580C" },
      { bgColor: "#D1FAE5", textColor: "#059669", domainBGColor: "#059669" },
      { bgColor: "#E0F2FE", textColor: "#0284C7", domainBGColor: "#0284C7" },
      { bgColor: "#F3E8FF", textColor: "#7C3AED", domainBGColor: "#7C3AED" },
      { bgColor: "#FFF7ED", textColor: "#EA580C", domainBGColor: "#EA580C" },
      { bgColor: "#FEE2E2", textColor: "#B91C1C", domainBGColor: "#B91C1C" },
      { bgColor: "#F3F4F6", textColor: "#1F2937", domainBGColor: "#1F2937" },
      { bgColor: "#EDE9FE", textColor: "#5B21B6", domainBGColor: "#5B21B6" },
      { bgColor: "#FEF9C3", textColor: "#CA8A04", domainBGColor: "#CA8A04" },
      { bgColor: "#FDF2F8", textColor: "#DB2777", domainBGColor: "#DB2777" },
      { bgColor: "#EFF6FF", textColor: "#2563EB", domainBGColor: "#2563EB" },
      { bgColor: "#ECFDF5", textColor: "#10B981", domainBGColor: "#10B981" },
      { bgColor: "#F0F9FF", textColor: "#0EA5E9", domainBGColor: "#0EA5E9" },
    ];
    return colors[index % colors.length];
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="previous">Search results</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <div className="filters flex space-x-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <TldFilter selectedTlds={selectedTlds} setSelectedTlds={setSelectedTlds} />
          </div>
          <LengthFilter lengthFilter={lengthFilter} setLengthFilter={setLengthFilter} />
        </div>
      </div>
      <TabsContent value="explore">
        <DomainList domains={filteredDomains} prices={prices} generateColorCombo={generateColorCombo} />
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent className="flex flex-wrap justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index} className="flex-shrink-0">
                  <PaginationLink 
                    href="#" 
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-2 py-1 rounded ${currentPage === index + 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </TabsContent>
      <TabsContent value="previous">
        <DomainList domains={filteredDomains} prices={prices} generateColorCombo={generateColorCombo} />
      </TabsContent>
      <TabsContent value="favorites">
        <DomainList domains={filteredDomains} prices={prices} generateColorCombo={generateColorCombo} />
      </TabsContent>
    </Tabs>
  );
}
                 
function DomainList({ domains, prices, generateColorCombo }) {
  if (domains.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">No domains found :/ </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {domains.map((data, index) => (
          <CardComponent key={index} {...data} price={prices[data.domain]} {...generateColorCombo(index)} />
        ))}
      </div>
    </div>
  );
}

function CardComponent({ bgColor, textColor, domainText, domainBGColor, domain, price }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(`${domainText}${domain}`);
  });
  const { toast } = useToast();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(`${domainText}${domain}`));
  }, [domainText, domain]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav !== `${domainText}${domain}`);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast({
        title: "Removed from Favorites",
        description: `${domainText}${domain} has been removed from your favorites.`,
      });
    } else {
      favorites.push(`${domainText}${domain}`);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast({
        title: "Added to Favorites",
        description: `${domainText}${domain} has been added to your favorites.`,
      });
    }
    setIsFavorite(!isFavorite);
  };

  const domainUrl = `https://www.namecheap.com/domains/registration/results/?domain=${domainText}${domain}`;

  return (
    <a href={domainUrl} target="_blank" rel="noopener noreferrer">
      <Card style={{ backgroundColor: bgColor, borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', cursor: 'pointer' }} className="hover:scale-105">
        <CardContent className="flex flex-col items-start justify-between p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold" style={{ color: textColor }}>{domainText}</h2>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: domainBGColor, color: "white" }}>{domain}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium" style={{ color: textColor }}>{price}</span>
            <button 
              className="transition-colors hover:text-red-500 active:text-red-700" 
              style={{ color: textColor }} 
              onClick={(e) => { e.preventDefault(); handleFavoriteClick(); }}
            >
              <HeartIcon className="w-6 h-6" filled={isFavorite} />
            </button>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function HeartIcon({ filled, ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
