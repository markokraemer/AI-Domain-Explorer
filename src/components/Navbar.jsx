
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import DomainAvailabilityCheck from "@/components/DomainAvailabilityCheck";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-20">
      <header className="flex w-full flex-col gap-3 bg-white/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:h-16 md:flex-row md:items-center lg:px-4">
        <div className="flex w-full items-center gap-8">
          <div className="flex items-center gap-2">
              <CompassIcon className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-2xl">Explorer.Domains</span>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-4" data-testid="header-right">
            <DomainAvailabilityCheck />
            <a href="https://twitter.com/markokraemer" target="_blank" rel="noopener noreferrer" className="lg:hidden">
              <Button variant="outline" size="icon" className="hover:text-gray-900">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://twitter.com/markokraemer" target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <Button variant="outline" size="sm" className="hover:text-gray-900">Feedback</Button>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}

function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
