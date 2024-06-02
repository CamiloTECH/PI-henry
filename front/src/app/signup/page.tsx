import FormSignup from "@/components/FormSignup";
import Link from "next/link";

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-max py-14">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <FormSignup />

        <div className="text-sm text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link href="/login">
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
              {" "}
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
