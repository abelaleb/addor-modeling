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
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { femaleModelSchema } from "@/lib/validations";
type ModelFormData = z.infer<typeof femaleModelSchema>;

const BecomeAModelForm = () => {
  const form = useForm<ModelFormData>({
    resolver: zodResolver(femaleModelSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentLocation: "",
      instagram: "",
      birthDate: "",
      height: undefined,
      cupSize: undefined,
      hips: undefined,
      waist: undefined,
      bust: undefined,
      shoes: undefined,
      eyeColor: "",
      hairColor: "",
      aboutMe: "",
    },
  });
  
  const [success, setSuccess] = useState(false);
  const onSubmit: SubmitHandler<ModelFormData> = (data) => {
    console.log(data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
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
                      placeholder={
                        name
                          .replace(/([A-Z])/g, " $1") // Inserts space before capital letters
                          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first character
                      }
                      className="rounded-none"
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
                <FormLabel className="text-inherit text-xs pr-4  whitespace-nowrap">
                  Birth Date
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="rounded-none" />
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
              ["cupSize", "Cup size in cm"],
              ["hips", "Hips in cm"],
              ["waist", "Waist in cm"],
              ["bust", "Bust in cm"],
              ["shoes", "Shoe size"],
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
              ["closeUp", "CLOSE-UP", "/img/Female/close-up.jpg"],
              ["side", "SIDE", "/img/Female/side.jpg"],
              ["upperBody", "UPPER BODY", "/img/Female/upperbody.jpg"],
              ["eyes", "EYES", "/img/Female/eyes.jpg"],
              ["fullLength", "FULL-LENGTH", "/img/Female/full-length.jpg"],
            ] as const
          ).map(([name, label, src]) => (
            <div className="flex flex-col gap-2" key={name}>
              <ImageUpload fieldName={name} control={form.control} src={src} />
              <Button className="bg-foreground text-background rounded-none">
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
            className="bg-foreground text-background rounded-none"
          >
            Submit Application
          </Button>
        </div>
      </form>
      {success && (
        <div className="fixed top-5 right-5 max-w-screen-sm mx-auto mt-4">
          <Alert
            variant="default"
            className="border-green-600 bg-green-50 text-green-800"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">
              Application Submitted
            </AlertTitle>
            <AlertDescription>
              Thank you! We&apos;ve received your information.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Form>
  );
};

export default BecomeAModelForm;
