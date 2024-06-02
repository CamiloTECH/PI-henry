import FormLogin from "@/components/FormLogin";
import Link from "next/link";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-max py-14">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <FormLogin />
        <div className="text-sm text-center">
          <span className="text-gray-600">Don&rsquo;t have an account?</span>
          <Link href="/signup">
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
              {" "}
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
