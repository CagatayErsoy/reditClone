import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Community {
  id: string;
  name: string;
  description: string;
  community_members: { count: number }[]; // Adjusted to handle the community_members structure
}

const TrendingCommunities = () => {
  const [popularCommunities, setPopularCommunities] = useState<Community[]>([]);
  const { fetchPopularCommunities } = useAppContext();

  useEffect(() => {
    const getPopularCommunities = async () => {
      const data = await fetchPopularCommunities();
      setPopularCommunities(data);
    };

    getPopularCommunities();
  }, [fetchPopularCommunities]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Trending Communities</h2>
      <div className="flex">
        {popularCommunities.map((community) => (
          <Card key={community.id} className="w-full max-w-md">
            <Link
              to={`/community/${community.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {community.name}
            </Link>
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
              <Badge variant="secondary">
                Members: {community.community_members[0]?.count || 0}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingCommunities;
