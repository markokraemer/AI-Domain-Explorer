import React, { useEffect, useState } from 'react';

const messages = [
  "Looking for domains...",
  "Voyaging the internet...",
  "Scouring the web...",
  "Hunting for the perfect name...",
  "Exploring the digital realm...",
  "Navigating the domain seas...",
  "Searching the cyberspace...",
  "Probing the online universe...",
  "Investigating the net...",
  "Surveying the web landscape..."
];

const GeneratingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16 mb-4">
        <svg
          className="w-full h-full text-orange-500 animate-spin"
          width={64}
          height={64}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0ZM32 58.6667C17.3333 58.6667 5.33333 46.6667 5.33333 32C5.33333 17.3333 17.3333 5.33333 32 5.33333C46.6667 5.33333 58.6667 17.3333 58.6667 32C58.6667 46.6667 46.6667 58.6667 32 58.6667Z"
            fill="currentColor"
          />
          <path
            d="M32 0C14.3269 0 0 14.3269 0 32H5.33333C5.33333 17.3333 17.3333 5.33333 32 5.33333V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold text-gray-700">{messages[messageIndex]}</p>
    </div>
  );
};

export default GeneratingScreen;

