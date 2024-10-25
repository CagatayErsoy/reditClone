import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="flex justify-end">
      <NavigationMenu className="bg-white border shadow-sm w-screen ">
        <NavigationMenuList className="flex items-center justify-end space-x-6 px-4 h-full ">
          <NavigationMenuItem className="text-lg font-medium">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in" className="hover:text-blue-500">
                Sign In
              </Link>
              <Link to="/sign-up" className="ml-4 hover:text-blue-500">
                Sign Up
              </Link>
            </SignedOut>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
