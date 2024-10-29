"use client";

import BusinessDetails from '@/components/businessDetails';
import BusinessImages from '@/components/businessImages';
import { useParams } from 'next/navigation'; // Import useParams hook
import { useEffect, useState } from 'react';

interface Business {
  id: number;
  businessName: string;
  businessEmail: string;
  businessPhoneNo: number;
  businessAddress: string;
  businessBiography: string;
  businessLogo: string;
  // Add other properties as necessary
}

// Explicitly declare the return type of the component as JSX.Element
const BusinessDetailsPage: React.FC = (): JSX.Element => {
  const params = useParams(); // Use useParams() to access the dynamic route
  const { id } = params; // Destructure the id from params
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch business data by ID
      const fetchBusiness = async () => {
        try {
          const response = await fetch(`https://unwomenmarketsquare.online/businessProfile-details/${id}`);
          const data = await response.json();
          setBusiness(data);
        } catch (error) {
          console.error('Error fetching business:', error);
        }
      };

      fetchBusiness();
    }
  }, [id]);

  if (!business) {
    return <p>Loading business...</p>;
  }

  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap lg:flex-nowrap space-x-6">
          {/* Business Logo */}
          <div className="w-full lg:w-1/3">
            <BusinessImages logo={business.businessLogo} />
          </div>

          {/* Business Details */}
          <div className="w-full lg:w-2/3 space-y-6">
            <BusinessDetails
              name={business.businessName}
              email={business.businessEmail}
              phone={business.businessPhoneNo}
              address={business.businessAddress}
              biography={business.businessBiography}
            />

            {/* Store and User Information */}
            <div className="flex items-center p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <div className="bg-gray-200 rounded-full">
                    <img src={business.user.url} alt={business.user.name} srcset="" className='rounded-full w-12 h-12 object-cover' />
                </div> {/* Placeholder for profile image */}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-blue-400 ">Owner: {business.user.name}</h4>
                <p className="text-gray-500">Location: {business.businessAddress}</p>
              </div>
              <div className="ml-auto">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Follow</button>
                <button className="ml-2 border px-4 py-2 rounded-lg">Visit Store</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BusinessDetailsPage;
