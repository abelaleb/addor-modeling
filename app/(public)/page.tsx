"use client";
import HeroVideo from "@/components/HeroVideo";
// import HeroVideo from "@/components/Hero-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { menus } from "@/utils/constants/menus";
import { ArrowRight, Camera, Star, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const featuredModels = [
    {
      name: "Sofia Martinez",
      category: "Fashion",
      image: "/images/model-closeup.jpg",
    },
    {
      name: "Alessandro Chen",
      category: "Commercial",
      image: "/images/male-model.jpg",
    },
    {
      name: "Isabella Romano",
      category: "Runway",
      image: "/images/model-fullbody.jpg",
    },
  ];
  return (
    <main className="flex flex-col items-center justify-between ">
      {/* Hero Section */}
      <section className="bg-background">
        <HeroVideo />
      </section>

      {/* Features */}
      <section className="py-16 border-y-[1px] border-primary dark:bg-blac">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Why Choose ADDOR
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We set the standard for excellence in model representation and
              fashion industry partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Elite Talent Network",
                description:
                  "Access to exceptional models across fashion, commercial, and editorial markets worldwide.",
              },
              {
                icon: Camera,
                title: "Industry Expertise",
                description:
                  "15+ years of experience creating iconic campaigns and launching successful careers.",
              },
              {
                icon: Star,
                title: "Global Reach",
                description:
                  "Representing talent in 50+ countries with partnerships across major fashion capitals.",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center border-0 shadow-elegant hover:shadow-editorial transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Featured Models */}
      <section className="py-16 bg-muted/30  w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">
                Featured Talent
              </h2>
              <p className="text-xl text-muted-foreground">
                Meet some of our exceptional models making waves in the industry
              </p>
            </div>
            <Button
              className="bg-gradient-fashion text-black hover:bg-black hover:text-white dark:text-white dark:border-white border-black border-2 hover:dark:text-black dark:hover:bg-white mt-4 md:mt-0"
              size="lg"
            >
              View All Models
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredModels.map((model, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-elegant hover:shadow-editorial transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={model.image}
                    alt={model.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {model.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif text-xl font-bold">
                      {model.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient text-text">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-text/90 mb-8 max-w-2xl mx-auto">
            Join the ADDOR family and discover what it means to work with the
            industry&apos;s most respected agency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-primary hover:bg-white/90 hover:text-black px-8 py-3"
            >
              Apply as Model
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-primary hover:bg-white/90 hover:text-black px-8 py-3"
            >
              Book Our Talent
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
