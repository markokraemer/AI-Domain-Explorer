import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Globe } from 'lucide-react';

const DomainAvailabilityCheck = () => {
  const [domainInput, setDomainInput] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedDomain, setCheckedDomain] = useState('');

  const checkDomainAvailability = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/check_domain_availability?domain=${domainInput}`);
      const data = await response.json();
      setAvailability(data.available);
      setCheckedDomain(domainInput);
    } catch (error) {
      console.error('Error checking domain availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkDomainAvailability();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="outline" size="icon" className="lg:hidden hover:text-gray-900">
            <Globe className="h-5 w-5" />
          </Button>
          <a className="hidden lg:block text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
            Check Domain Availability
          </a>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Check Domain Availability</DialogTitle>
        <DialogDescription>
          Enter a domain name to check if it is available.
        </DialogDescription>
        <Input
          value={domainInput}
          onChange={(e) => setDomainInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="example.com"
        />
        <Button onClick={checkDomainAvailability} disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </Button>
        {availability !== null && (
          <div className="mt-4">
            <p className="flex items-center">
              The domain <strong className="mx-1">{checkedDomain}</strong> is 
              {availability ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500 mx-1" />
                  <span className="text-green-500">available</span>.
                  <a 
                    href={`https://www.namecheap.com/domains/registration/results/?domain=${checkedDomain}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-grey-900 hover:underline"
                  >
                    Buy Now
                  </a>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500 mx-1" />
                  <span className="text-red-500">not available</span>.
                </>
              )}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DomainAvailabilityCheck;

