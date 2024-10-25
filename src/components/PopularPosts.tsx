import React, { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";
import { Post } from "@/interfaces/interfaces";
import { Link } from "react-router-dom";

const PopularPosts: React.FC = () => {
  const { posts } = useAppContext();
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  useEffect(() => {
    const highVotedPosts = posts
      .filter((post) => post.votes > 50)
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5);
    setPopularPosts(highVotedPosts);
  }, [posts]);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Popular Posts</h2>
      <div className="flex">
        {popularPosts.map((post) => (
          <Card key={post.id} className="w-full max-w-md">
            <Link
              to={`/post/${post.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              <CardTitle>{post.title}</CardTitle>
            </Link>
            <CardHeader>
              <Badge variant="secondary">Votes: {post.votes}</Badge>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
