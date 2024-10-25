import React from 'react';

interface BusinessDetailsProps {
  name: string;
  email: string;
  phone: number;
  address: string;
  biography: string;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({ name, email, phone, address, biography }) => {
  return (
    <div className="w-full lg:w-2/3 space-y-6">
      <h1 className="text-3xl font-semibold text-black">{name}</h1>
      <p className="text-lg font-bold text-yellow-500">Contact: {email}</p>
      <p className="text-lg font-bold text-yellow-500">Phone: {phone}</p>
      <p className="text-lg font-bold text-yellow-500">Address: {address}</p>
      <div className="mt-4">
        <h3 className="font-semibold text-xl">Business Biography</h3>
        <p className='text-black'>{biography}</p>
      </div>
    </div>
  );
};

export default BusinessDetails;
