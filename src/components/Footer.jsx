export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
          <span className="text-lg font-medium">Made with love</span>
          <HeartIcon className="w-5 h-5 text-red-500" />
          <span className="text-lg font-medium text-center md:text-left">
            by <a href="https://markokraemer.com" className="hover:text-gray-300 text-lg font-medium underline">AI</a> under orchestration of
          </span>
          <a href="https://twitter.com/markokraemer" className="hover:text-gray-300 text-lg font-medium underline">
            Marko Kraemer
          </a>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
