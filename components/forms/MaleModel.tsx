"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/text-area";
import ImageUpload from "../ImageUpload";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { maleModelSchema } from "@/lib/validations";
import { submitModelApplication } from "@/app/(app)/(public)/become-a-model/action";

type ModelFormData = z.infer<typeof maleModelSchema>;

const MaleModel = () => {
  const form = useForm<ModelFormData>({
    resolver: zodResolver(maleModelSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentLocation: "",
      instagram: "",
      birthDate: "",
      height: undefined,
      suit: undefined,
      suitLength: undefined,
      waist: undefined,
      inseam: undefined,
      shoes: undefined,
      eyeColor: "",
      hairColor: "",
      aboutMe: "",
    },
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ModelFormData> = async (data) => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();

      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      formData.append("gender", "male");

      const photoFields = [
        "closeUp",
        "side",
        "upperBody",
        "eyes",
        "fullLength",
      ];
      photoFields.forEach((field) => {
        const photo = form.getValues(field as any);
        if (photo instanceof File) {
          formData.append(field, photo);
        }
      });

      const result = await submitModelApplication(formData);
     
      if (result && result.success) {
        setSuccess(true);
        form.reset();

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError(result?.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        {/* Personal Section */}
        <div className="text-center p-6 font-semibold">PERSONAL</div>
        <div className="grid grid-cols-2 gap-3 max-w-screen-sm m-auto">
          {[
            "firstName",
            "lastName",
            "email",
            "phone",
            "currentLocation",
            "instagram",
          ].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof ModelFormData}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={name
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      className="rounded-none"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-inherit text-xs pr-4 whitespace-nowrap">
                  Birth Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="rounded-none"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Stats Section */}
        <div className="text-center p-6 font-semibold">STATS</div>
        <div className="grid grid-cols-2 gap-3 max-w-screen-sm m-auto">
          {(
            [
              ["height", "Height in cm"],
              ["suit", "Suit size in cm"],
              ["suitLength", "Suit Length in cm"],
              ["inseam", "Inseam in cm"],
              ["waist","Waist in cm"],
              ["shoes", "Shoes"],
              ["eyeColor", "Eye color"],
              ["hairColor", "Hair color"],
            ] as const
          ).map(([name, placeholder]) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      className="rounded-none"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* About Me */}
        <div className="py-4 max-w-screen-sm m-auto">
          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anything else you&apos;d like us to know</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-none"
                    placeholder="Tell us more about yourself"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photo Upload Section */}
        <div className="text-center p-6 font-semibold">PHOTO UPLOAD</div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3 max-w-screen-lg m-auto">
          {(
            [
              ["closeUp", "CLOSE-UP", "/images/Female/close-up.jpg"],
              ["side", "SIDE", "/images/Female/side.jpg"],
              ["upperBody", "UPPER BODY", "/images/Female/upperbody.jpg"],
              ["eyes", "EYES", "/images/Female/eyes.jpg"],
              ["fullLength", "FULL-LENGTH", "/images/Female/full-length.jpg"],
            ] as const
          ).map(([name, label, src]) => (
            <div className="flex flex-col gap-2" key={name}>
              <ImageUpload
                fieldName={name}
                control={form.control}
                src={src}
                disabled={isSubmitting}
              />
              <Button
                type="button"
                className="bg-foreground text-background rounded-none"
                disabled={isSubmitting}
              >
                {label}
              </Button>
              <FormMessage />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center p-5">
          <Button
            type="submit"
            className="bg-foreground text-background rounded-none "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>

      {/* Success Alert */}
      {success && (
        <div className="fixed top-5 right-5 max-w-screen-sm mx-auto mt-4 z-50">
          <Alert
            variant="default"
            className="border-green-600 bg-green-50 text-green-800"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">
              Application Submitted Successfully!
            </AlertTitle>
            <AlertDescription>
              Thank you! We&apos;ve received your application and photos.
              Someone will be in touch soon.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-5 right-5 max-w-screen-sm mx-auto mt-4 z-50">
          <Alert
            variant="destructive"
            className="border-red-600 bg-red-50 text-red-800"
          >
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800">Submission Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </Form>
  );
};

export default MaleModel;
