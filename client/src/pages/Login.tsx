import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_MyTimeTable_BACKEND_URL;
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${apiUrl}/api/users/login`, { email, password })
      .then((response) => {
        localStorage.setItem("isAuthenticated", "true");
        const token = response.data.token; 
        localStorage.setItem("token", token); 
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/timetable")
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.msg || err.message || "An error occurred";
        toast.error(errorMessage, {
          position: "top-right",
        });
      }).finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="current-email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <Input  id="password" 
                 type="password" 
                 required 
                 onChange={(e) => setPassword(e.target.value)}
                 autoComplete="current-password"
                  />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
              </span>
            ) : "Login" }
              </Button>

            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


export default function Page() {
  return (
    <div className="flex w-full justify-center p-6 md:p-10">
      <div className="flex flex-col justify-center w-full max-w-sm mx-auto min-h-[calc(100vh-150px)]">
        <LoginForm />
      </div>
    </div>
  )
}

