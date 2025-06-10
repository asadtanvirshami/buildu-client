"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/auth-schema/schema";
import { SignUpFormData } from "@/types/auth-type/type";
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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { handleError } from "@/utils/error-handler";

const SignUpForm = () => {
  const router = useRouter();
  const { signup } = useAuth();

  const form = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpFormData) => {
    signup.mutate(
      { ...data },
      {
        onSuccess: (res) => {
          if (res?.success === false) {
            setError("root", {
              type: "server",
              message: res?.message || "Something went wrong",
            });
            return;
          }

          sessionStorage.setItem("email", res.email);
          router.push("/auth/otp");
        },
        onError: (error) => {
          handleError(error, {
            context: "SignupForm",
            notify: false,
            setFormError: (msg) => {
              form.setError("root", {
                type: "manual",
                message: msg,
              });
            },
          });
        },
      }
    );
  };

  return (
    <Card className="w-[28rem] font-[family-name:var(--font-poppins)] shadow-lg fade-left">
      <CardHeader>
        <CardTitle className="text-4xl">Sign In</CardTitle>
        <CardDescription>Enter credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
              control={control}
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

            {errors.root?.message && (
              <div className="text-sm text-red-600 text-center">
                {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || signup.isPending}
              className="w-full"
            >
              {isSubmitting || signup.isPending ? (
                <React.Fragment>
                  Signing up
                  <LucideLoaderCircle size={22} className="animate-spin ml-2" />
                </React.Fragment>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <Separator className="my-4" />

        <div className="flex justify-between mt-4">
          <Link
            href="/auth/signin"
            className="text-xs text-gray-600 hover:text-blue-500"
          >
            Already have an account.
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
