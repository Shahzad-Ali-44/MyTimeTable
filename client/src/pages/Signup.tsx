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
import {toast} from 'react-toastify';
import { Loader2 } from "lucide-react";


export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_MyTimeTable_BACKEND_URL;
    const [loading, setLoading] = useState(false);


    // Helper to get current theme for toasts:-
    const getToastTheme = () => {
        const theme = localStorage.getItem("vite-ui-theme") || "dark"
        if (theme === "dark") return "dark"
        if (theme === "light") return "light"
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${apiUrl}/api/users/signup`, { email, password })
            .then((response) => {
                toast.success(response.data.msg, { theme: getToastTheme() })
                navigate("/login")
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.msg || err.message || "An error occurred";
                toast.error(errorMessage, {
                    theme: getToastTheme(),
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
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin h-5 w-5" /> Creating Account...
                                    </span>
                                ) : "Signup"}
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
        <div className="flex w-full justify-center p-6 md:p-10">
            <div className="flex flex-col justify-center w-full max-w-sm mx-auto min-h-[calc(100vh-150px)]">
                <SignupForm />
            </div>
        </div>
    )
}

