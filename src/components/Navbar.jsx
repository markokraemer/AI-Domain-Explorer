import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

export default function Navbar() {
  return (
    <header className="bg-gray-900 text-white py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <CompassIcon className="h-6 w-6 mr-2 text-blue-400" />
          <span className="font-bold text-2xl">EXPLOR.domains</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="hover:text-gray-300 text-lg font-medium" prefetch={false}>
          Follow me on Twitter @markokraemer
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-white hover:bg-gray-800 active:bg-gray-700 font-medium"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-4 p-4">
              <Link href="#" className="hover:text-gray-300 text-lg font-medium" prefetch={false}>
                Follow me on Twitter
              </Link>
              <Link href="#" className="hover:text-gray-300 text-lg font-medium" prefetch={false}>
              Buy me a coffee
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
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

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}