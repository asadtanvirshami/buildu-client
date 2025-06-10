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
import { decodeToken } from "@/utils/jwt";
import { loginSuccess } from "@/redux/actions/user-action";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleError } from "@/utils/error-handler";

/**
 * SignInForm
 *
 * @description Form component for signing in.
 *
 * @param {Object} props Component props
 * @param {ReactNode} children Form children
 *
 * @returns {ReactElement} Form element
 */
export const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const form = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;
  /**
   * @description Handle form submission, login the user and redirect to dashboard
   * @param {SignInFormData} data Form data
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: SignInFormData) => {
    login.mutate(
      { email: data.email, password: data.password },
      {
        /**
         * @description Handle successful login response
         * @param {SignInResponse} data Response data
         * @returns {void}
         */
        onSuccess: (data) => {
          if (data.accessToken === null || data.success === false) {
            setError("email", {
              type: "server",
            });
            setError("password", {
              type: "server",
              message: "Invalid email or password",
            });
            return;
          }
          const token = decodeToken(data.accessToken);
          dispatch(loginSuccess(token));
          router.push("/");
          form.reset();
        },
        onError: (error) => {
          handleError(error, {
            context: "SigninForm",
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isSubmitting || login.isPending ? (
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
        <Separator className="my-3" />
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Link
              href="/auth/reset"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              Forget password?
            </Link>
            <Link
              href="/auth/signup"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              Create a new acccount.
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
