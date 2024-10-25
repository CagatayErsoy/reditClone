// PostPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { Post } from "@/interfaces/interfaces";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the post ID from the URL
  const { posts, castVote, user } = useAppContext();
  const [post, setPost] = useState<Post>();
  const [voteCount, setVoteCount] = useState<number>(0);

  useEffect(() => {
    // Find the post in the posts array
    const selectedPost = posts.find((p) => p.id === id);
    if (selectedPost) {
      setPost(selectedPost);
      setVoteCount(selectedPost.votes); // Initialize vote count from the post data
    }
  }, [id, posts]);

  const handleVote = async (voteValue: number) => {
    if (!user) {
      alert("Please sign in to vote");
      return;
    }
    if (post) await castVote(user.id, voteValue, post.id);
    setVoteCount(voteCount + voteValue);
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{post.content}</p>
          <div className="mt-4 flex items-center space-x-4">
            <Button onClick={() => handleVote(1)} variant="outline">
              Upvote
            </Button>
            <Button onClick={() => handleVote(-1)} variant="secondary">
              Downvote
            </Button>
            <span className="text-gray-600">Votes: {voteCount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
