// types.ts

export interface User {
  id: string;
  username: string;
  email: string;
  karma: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  created_by: string;
  guidelines: string; // user id
}

export interface Post {
  id: string;
  title: string;
  content: string;
  community_id: string;
  created_by: string;
  created_at: string;
  votes: number;
}

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  created_by: string;
  created_at: string;
  parent_comment_id?: string;
}

export interface Vote {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  vote_value: number;
}
