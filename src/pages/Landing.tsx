import PopularCommunities from "@/components/PopularCommunities";
import PopularPosts from "@/components/PopularPosts";
import TrendingCommunities from "@/components/TrendingCommunities";
// import { useAppContext } from "@/context/AppContext";
// import { useEffect } from "react";

export default function LandingPage() {
  return (
    <>
      <h1>Welcome to ReditClone</h1>
      <div>
        <PopularPosts></PopularPosts>
        <PopularCommunities></PopularCommunities>
        <TrendingCommunities></TrendingCommunities>
      </div>
    </>
  );
}
