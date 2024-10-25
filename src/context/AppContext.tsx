// AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

import { User, Post, Community, Comment } from "../interfaces/interfaces";
import { supabase } from "@/services/supabase";

interface AppContextType {
  user: User | null | undefined;
  posts: Post[];
  communities: Community[];
  comments: Comment[];
  fetchPosts: () => void;
  fetchCommunities: () => void;
  addUser: (username: string, email: string) => void;
  addPost: (
    title: string,
    content: string,
    communityId: string,
    userId: string
  ) => void;
  addComment: (
    postId: string,
    content: string,
    userId: string,
    parentCommentId?: string
  ) => void;
  castVote: (
    userId: string,
    voteValue: number,
    postId?: string,
    commentId?: string
  ) => Promise<void>;
  addCommunity: (
    name: string,
    description: string,
    guidelines: string,
    userId: string
  ) => void;
  addMemberToCommunity: (communityId: string, userId: string) => void;
  fetchPopularCommunities: () => Promise<
    {
      id: string;
      name: string;
      description: string;
      community_members: { count: number }[];
    }[]
  >;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: React.ReactNode; // This defines the type of children
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(); // Assuming Clerk Auth handles user
  const [posts, setPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchCommunities();
  }, []);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
  };

  // Fetch communities from Supabase
  const fetchCommunities = async () => {
    const { data, error } = await supabase.from("communities").select("*");
    if (error) {
      console.error("Error fetching communities:", error);
    } else {
      setCommunities(data || []);
    }
  };

  // Add a new user
  const addUser = async (username: string, email: string) => {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, karma: 0 }]); // Assuming initial karma is 0
    if (error) {
      console.error("Error adding user:", error);
    } else {
      setUser(data ? data[0] : null); // Set user in state if added successfully
    }
  };

  // Add a new post to a community
  const addPost = async (
    title: string,
    content: string,
    communityId: string,
    userId: string
  ) => {
    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        community_id: communityId,
        created_by: userId,
        votes: 0,
      },
    ]);
    if (error) {
      console.error("Error adding post:", error);
    } else {
      setPosts([...(data || []), ...posts]);
    }
  };

  // Add a new comment to a post
  const addComment = async (
    postId: string,
    content: string,
    userId: string,
    parentCommentId?: string
  ) => {
    const { data, error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        content,
        created_by: userId,
        parent_comment_id: parentCommentId || null,
      },
    ]);
    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setComments([...(data || []), ...comments]);
    }
  };

  const castVote = async (
    userId: string,
    voteValue: number,
    postId?: string,
    commentId?: string
  ): Promise<void> => {
    const { error } = await supabase.from("votes").upsert(
      {
        user_id: userId,
        post_id: postId || null,
        comment_id: commentId || null,
        vote_value: voteValue,
      },
      { onConflict: "user_id, post_id, comment_id" } // Correct this to a string
    );

    if (error) {
      console.error("Error casting vote:", error);
      return;
    }

    // Update the votes count for the post or comment
    if (postId) {
      await supabase.rpc("update_post_votes", { post_id: postId });
    } else if (commentId) {
      await supabase.rpc("update_comment_votes", { comment_id: commentId });
    }
  };
  const addCommunity = async (
    name: string,
    description: string,
    guidelines: string,
    userId: string
  ) => {
    const { data, error } = await supabase
      .from("communities")
      .insert([{ name, description, guidelines, created_by: userId }]);

    if (error) {
      console.error("Error adding community:", error);
    } else {
      // Update the communities state with the new community
      setCommunities([...communities, ...(data || [])]);
    }
  };
  const addMemberToCommunity = async (communityId: string, userId: string) => {
    const { error } = await supabase
      .from("community_members")
      .insert([{ community_id: communityId, user_id: userId }]);

    if (error) {
      console.error("Error adding member to community:", error);
    } else {
      console.log("Member added successfully");
    }
  };
  const fetchPopularCommunities = async () => {
    const { data, error } = await supabase.from("communities").select(
      `
        id, name, description,
        community_members(count)
      `
    );
    // .order("community_members.count", { ascending: false })
    // .limit(5);

    if (error) {
      console.error("Error fetching popular communities:", error);
      return [];
    }

    return data;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        posts,
        communities,
        comments,
        fetchPosts,
        fetchCommunities,
        addUser,
        addPost,
        addComment,
        castVote,
        addCommunity,
        addMemberToCommunity,
        fetchPopularCommunities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
