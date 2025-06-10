// utils/errorHandler.ts

interface HandleErrorOptions {
  context?: string; // e.g. "SignUpForm"
  notify?: boolean; // whether to show toast to user
  setFormError?: (msg: string) => void; // callback for react-hook-form
}

export function handleError(error: unknown, options?: HandleErrorOptions) {
  const { context = "Unknown", notify = false, setFormError } = options || {};

  // Default user-facing message
  const userMessage = "Something went wrong. Please try again.";

  // Extract message safely
  let devMessage = "Unknown error";
  if (error instanceof Error) {
    devMessage = error.message;
  } else if (typeof error === "string") {
    devMessage = error;
  }

  // Log in dev
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error, devMessage);
  }

  // Send to monitoring service
  // sendErrorToMonitoringService(error, context); // e.g. Sentry

  // Optionally show toast
  if (notify) {
    // Replace with your toast library
    alert(userMessage); // or toast.error(userMessage)
  }

  // Optionally hook into form
  if (setFormError) {
    setFormError(userMessage);
  }
}
