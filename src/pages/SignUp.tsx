import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className=" flex align-middle justify-center">
      <SignUp path="/sign-up" />;
    </div>
  );
}
