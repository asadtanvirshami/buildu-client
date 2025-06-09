import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/auth-schema/schema";
import { SignInFormData } from "@/types/auth-type/type";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLoaderCircle } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const SignInForm = () => {
  const { login } = useAuth();
  const form = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: SignInFormData) => {
    console.log(data);

    await login.mutateAsync(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => console.log("Logged in:", data),
        onError: (error) => console.error("Login failed:", error),
      }
    );
  };

  return (
    <Card className="w-[28rem] font-[family-name:var(--font-poppins)] shadow-lg">
      <CardHeader>
        <CardTitle className="text-4xl">Sign In</CardTitle>
        <CardDescription>Enter credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting || login.isPending ? (
                <React.Fragment>
                  Signing in
                  <LucideLoaderCircle size={22} className="animate-spin" />
                </React.Fragment>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <Separator className="my-3"/>
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Link href="/auth/reset" className="text-xs text-gray-600 hover:text-blue-500">
              Forget password?
            </Link>
            <Link href="/auth/signup" className="text-xs text-gray-600 hover:text-blue-500">
              Create a new acccount.
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
