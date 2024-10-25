import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className=" flex align-middle justify-center">
      <SignIn path="/sign-in" />;
    </div>
  );
}
