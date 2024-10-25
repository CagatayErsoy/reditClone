import * as React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/services/supabase";
// Import AppContext

export default function LandingLayout() {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const { addUser } = useAppContext(); // Access addUser from AppContext
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAndAddUser = async () => {
      if (isLoaded && userId && user) {
        const { emailAddresses, username } = user;
        const emailAddress = emailAddresses[0].emailAddress;

        // Check if user exists in the database
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("id", userId)
          .single();

        if (error || !data) {
          // User does not exist, add them to the database using addUser
          addUser(username || "Anonymous", emailAddress);
        }

        // User exists or has been added, navigate to the homepage
        navigate("/");
      }
    };

    checkAndAddUser();
  }, [isLoaded, userId, user, addUser]);

  if (!isLoaded) return "Loading..."; // Loading state until auth is fully loaded

  return <Outlet />; // Render the LandingPage for unauthenticated users
}
