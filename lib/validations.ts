import { z } from "zod";

const femaleModelSchema = z.object({
  // Personal
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be under 15 digits"),
  currentLocation: z.string().min(1, "Location is required"),
  instagram: z.string().optional(),
  birthDate: z.string().min(1, "Birth date is required"),

  // Stats 
  height: z.coerce
    .number()
    .min(140, "Height must be at least 140 cm")
    .max(210, "Height must be below 210 cm"),

  cupSize: z.coerce
    .number()
    .min(60, "Cup size must be at least 60 cm")
    .max(120, "Cup size must be below 120 cm"),
  hips: z.coerce
    .number()
    .min(70, "Hips must be at least 70 cm")
    .max(130, "Hips must be below 130 cm"),
  waist: z.coerce
    .number()
    .min(50, "Waist must be at least 50 cm")
    .max(100, "Waist must be below 100 cm"),
  bust: z.coerce
    .number()
    .min(70, "Bust must be at least 70 cm")
    .max(130, "Bust must be below 130 cm"),
  shoes: z.coerce
    .number()
    .min(30, "Shoe size must be at least 30 EU")
    .max(50, "Shoe size must be below 50 EU"),
  eyeColor: z.string().min(1, "Eye color is required"),
  hairColor: z.string().min(1, "Hair color is required"),

  aboutMe: z.string().max(1000, "Maximum 1000 characters").optional(),

  // Photos
  closeUp: z.any().optional(),
  side: z.any().optional(),
  upperBody: z.any().optional(),
  eyes: z.any().optional(),
  fullLength: z.any().optional(),
});

const maleModelSchema = z.object({
  // Personal
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  currentLocation: z.string().min(2, "City name too short"),
  instagram: z.string().optional(),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid birth date",
  }),

  // Stats
  height: z.coerce.number().min(100).max(250), 
  suit: z.coerce.number().min(30).max(70), 
  suitLength: z.coerce.number().min(30).max(120),
  waist: z.coerce.number().min(40).max(150),
  inseam: z.coerce.number().min(40).max(120),
  shoes: z.coerce.number().min(3).max(20),
  eyeColor: z.string().min(2, "Enter a valid eye color"),
  hairColor: z.string().min(2, "Enter a valid hair color"),

  aboutMe: z.string().max(1000,"Maximum 1000 characters").optional(),

  // Photos
  closeUp: z.any().optional(),
  side: z.any().optional(),
  upperBody: z.any().optional(),
  eyes: z.any().optional(),
  fullLength: z.any().optional(),
});

export { femaleModelSchema, maleModelSchema };
