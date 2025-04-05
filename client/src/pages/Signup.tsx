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
import { useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast';



export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {



    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_MyTimeTable_BACKEND_URL;
    const [loading, setLoading] = useState(false); 



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${apiUrl}/api/users/signup`, { email, password })
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/login")
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
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your email and password for signup.
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
                                <Input id="password"
                                    type="password"
                                    required onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Signup" }
                            </Button>

                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Login Now
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
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    )
}
