import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TldFilter } from "@/components/TldFilter";
import LengthFilter from "@/components/LengthFilter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function Component() {
  return (
    <div>
      <DomainTabs />
    </div>
  );
}

function DomainTabs() {
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [tldFilter, setTldFilter] = useState("");
  const [lengthFilter, setLengthFilter] = useState({ operator: ">", value: 0 });
  const [selectedTlds, setSelectedTlds] = useState([]);
  const [favoriteDomains, setFavoriteDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const prices = {
    ".com": "$12.99/year",
    ".io": "$39.99/year",
    ".org": "$9.99/year",
    ".net": "$10.99/year",
    ".ai": "$55.00/year",
    ".tv": "$45.00/year",
    ".co": "$29.99/year",
    ".biz": "$8.99/year",
    ".tech": "$49.99/year",
    ".app": "$14.99/year",
  };

  const fetchDomains = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const formattedDomains = data.domains.map((item) => {
          const [domainText, domain] = item.domain.split(".");
          return { domainText, domain: `.${domain}` };
        });
        setDomains(formattedDomains);
        setFilteredDomains(formattedDomains);
        setTotalPages(data.pagination.total_pages);
      })
      .catch((error) => console.error("Error fetching domains:", error));
  };

  useEffect(() => {
    fetchDomains(`http://127.0.0.1:8000/available_domains?page=${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    filterDomains();
  }, [tldFilter, lengthFilter, domains]);

  useEffect(() => {
    setTldFilter(selectedTlds.join(","));
  }, [selectedTlds]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteDomains = domains.filter(domain => favorites.includes(`${domain.domainText}${domain.domain}`));
    setFavoriteDomains(favoriteDomains);
  }, [domains]);

  const filterDomains = () => {
    let filtered = domains;

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
      { bgColor: "#111827", textColor: "white", domainBGColor: "#F3F4F6" },
      { bgColor: "#4B5563", textColor: "white", domainBGColor: "#D1D5DB" },
      { bgColor: "#F1F5F9", textColor: "#1E293B", domainBGColor: "#1E293B" },
      { bgColor: "#60A5FA", textColor: "white", domainBGColor: "#BFDBFE" },
      { bgColor: "#1E3A8A", textColor: "white", domainBGColor: "#93C5FD" },
      { bgColor: "#FFEDD5", textColor: "#EA580C", domainBGColor: "#EA580C" },
      { bgColor: "#D1FAE5", textColor: "#059669", domainBGColor: "#059669" },
      { bgColor: "#E0F2FE", textColor: "#0284C7", domainBGColor: "#0284C7" },
      { bgColor: "#F3E8FF", textColor: "#7C3AED", domainBGColor: "#7C3AED" },
      { bgColor: "#FFF7ED", textColor: "#EA580C", domainBGColor: "#EA580C" },
      { bgColor: "#FEE2E2", textColor: "#B91C1C", domainBGColor: "#B91C1C" },
      { bgColor: "#F3F4F6", textColor: "#1F2937", domainBGColor: "#1F2937" },
      { bgColor: "#E5E7EB", textColor: "#374151", domainBGColor: "#374151" },
      { bgColor: "#D1D5DB", textColor: "#4B5563", domainBGColor: "#4B5563" },
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
    if (value === "previous") {
      const searchRequestId = localStorage.getItem("search_request_id");
      fetchDomains(`http://127.0.0.1:8000/available_domains?search_request_id=${searchRequestId}&page=${currentPage}`);
    } else {
      fetchDomains(`http://127.0.0.1:8000/available_domains?page=${currentPage}`);
    }
  };

  return (
    <Tabs defaultValue="explore" onValueChange={handleTabChange}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="previous">Your previous search</TabsTrigger>
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
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
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
        <DomainList domains={favoriteDomains} prices={prices} generateColorCombo={generateColorCombo} />
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
