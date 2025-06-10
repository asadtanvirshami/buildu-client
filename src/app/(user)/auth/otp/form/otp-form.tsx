import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "@/schemas/auth-schema/schema";
import { OTPFormData } from "@/types/auth-type/type";
import { useAuth } from "@/hooks/use-auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLoaderCircle } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { handleError } from "@/utils/error-handler";

const OtpForm = () => {
  const { verifyOtp } = useAuth();
  const form = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: OTPFormData) => {
    verifyOtp.mutate(
      { otp: data.otp },
      {
        onSuccess: (res) => {
          if (res.success === false) {
            setError("root", {
              type: "server",
              message: res.message || "Something went wrong",
            });
          }
        },
        onError: (error) => {
          handleError(error, {
            context: "OtpForm",
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
        <CardTitle className="text-4xl">Verify OTP</CardTitle>
        <CardDescription>
          Enter your otp that was sent on your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-full mx-auto"
          >
            <div className="flex justify-center">
              <FormField
                control={control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isSubmitting || verifyOtp.isPending ? (
                <React.Fragment>
                  Confirming OTP
                  <LucideLoaderCircle size={22} className="animate-spin" />
                </React.Fragment>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </Form>
        <Separator className="my-3" />
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Link
              href="/auth/reset"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              resend OTP
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {errors.root?.message && (
          <div className="text-sm text-red-600 text-center">
            {errors.root.message}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OtpForm;
