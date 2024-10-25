// CommunityPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Community } from "@/interfaces/interfaces";
import { useAppContext } from "@/context/AppContext";

const CommunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the community ID from the URL
  const { communities, fetchCommunities } = useAppContext();
  const [community, setCommunity] = useState<Community>();

  useEffect(() => {
    const loadCommunity = async () => {
      if (!communities.length) {
        await fetchCommunities(); // Fetch communities if not already loaded
      }
      const selectedCommunity = communities.find((c) => c.id === id);
      console.log(id);
      setCommunity(selectedCommunity);
    };

    loadCommunity();
  }, [id, communities, fetchCommunities]);

  if (!community) return <p>Loading community...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="text-gray-700 mt-2">{community.description}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Guidelines</h3>
        <p className="text-gray-600">
          {community.guidelines || "No guidelines available."}
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;
