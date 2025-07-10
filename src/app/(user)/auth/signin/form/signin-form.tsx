import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/auth-schema/schema";
import { SignInFormData } from "@/types/auth-type/type";
import { useGoogleSignin } from "@/hooks/auth/use-auth";
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
import { loginSuccess } from "@/redux/actions/user-action";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { handleError } from "@/utils/error-handler";
import { useUser } from "@/hooks/user/use-user";
import { useSignin } from "@/hooks/auth/use-auth";
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
  const signin = useSignin();
  const googleSignin = useGoogleSignin();
  const dispatch = useDispatch();
  const { refetch } = useUser();
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
    signin.mutate(
      { email: data.email, password: data.password },
      {
        /**
         * @description Handle successful login response
         * @param {SignInResponse} data Response data
         * @returns {void}
         */
        onSuccess: async (data) => {
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

          const result = await refetch();
          if (result.isError) return;

          if (result.data.valid && result.data.user) {
            dispatch(loginSuccess(result.data.user));
            router.push("/protected-route/dashboard");
            form.reset();
          }
        },
        onError: (error) => {
          handleError(error, {
            context: "Signin-Form",
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

  /**
   * @description Handle successful response from Google Sign-in
   * @param {GoogleCredentialResponse} credentialResponse Response from Google
   * @returns {Promise<void>}
   */
  const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    if (!credentialResponse?.credential) return;

    const googleCredentials = credentialResponse.credential;
    googleSignin.mutate(
      { token: googleCredentials },
      {
        onSuccess: async (data) => {
          if (data.accessToken === null || data.success === false) {
            return;
          }

          const result = await refetch();
          if (result.isError) return;

          dispatch(loginSuccess(result.data.user));
          router.push("/");
        },
        onError: (error) => {
          handleError(error, {
            context: "Signin-Form",
            notify: false,
            setFormError: (msg) => {
              form.setError("root", {
                type: "manual",
                message: msg,
              });
            },
          });
        }
      }
    );
  };

  /**
   * @description Handle an error from the Google Sign-in
   * @returns {void}
   */
  const handleGoogleError = () => {
    handleError("Google-Signin-Error", {
      context: "Google-Signin",
      notify: false,
      setFormError: (msg) => {
        form.setError("root", {
          type: "manual",
          message: msg,
        });
      },
    });

  };

  return (
    <Card className="w-[28rem] font-[family-name:var(--font-poppins)] shadow-lg fade-left">
      <CardHeader>
        <CardTitle className="text-4xl !text-pink-400">Sign In</CardTitle>
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
            <div className="flex flex-col">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isSubmitting || signin.isPending ? (
                  <React.Fragment>
                    Signing in
                    <LucideLoaderCircle size={22} className="animate-spin" />
                  </React.Fragment>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="flex justify-center mt-5">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </div>
            </div>


          </form>
        </Form>
        <Separator className="my-3" />
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Link
              href="/auth/account-recovery"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              Forgot password?
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
