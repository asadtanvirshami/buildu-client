"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverySchema } from "@/schemas/auth-schema/schema";
import { RecoveryFormData } from "@/types/auth-type/type";
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

const RecoveryForm = () => {
  const router = useRouter();
  const { account_recovery } = useAuth();

  const form = useForm<RecoveryFormData>({
    resolver: yupResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: RecoveryFormData) => {
    account_recovery.mutate(
      { email: data.email },
      {
        onSuccess: (res) => {
          if (res?.success === false) {
            setError("root", {
              type: "server",
              message: res?.message || "Something went wrong",
            });
            return;
          }
          sessionStorage.setItem("email", data.email);
          router.push("/auth/otp");
        },
        onError: (error) => {
          handleError(error, {
            context: "accountRecoveryForm",
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
        <CardTitle className="text-4xl">Account Recovery</CardTitle>
        <CardDescription>
          Enter your email address associated with your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="abc@gmail.com"
                      {...field}
                    />
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
              disabled={isSubmitting || account_recovery.isPending}
            >
              {isSubmitting || account_recovery.isPending ? (
                <React.Fragment>
                  Finding
                  <LucideLoaderCircle size={22} className="animate-spin ml-2" />
                </React.Fragment>
              ) : (
                "Continue"
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

export default RecoveryForm;
