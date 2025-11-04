import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Globe, TrendingUp } from "lucide-react";
import  Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ElementType;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Victoria Sterling",
    role: "Founder & CEO",
    image: "/images/model-closeup.jpg",
    bio: "With over 15 years in fashion, Victoria founded PRESTIGE to bridge talent with global opportunities.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Creative Director",
    image: "/images/model-closeup.jpg",
    bio: "Award-winning photographer and creative visionary behind our most iconic campaigns.",
  },
  {
    id: 3,
    name: "Isabella Rodriguez",
    role: "Talent Director",
    image: "/images/model-closeup.jpg",
    bio: "Former international model turned talent scout, discovering the next generation of stars.",
  },
  {
    id: 4,
    name: "James Thompson",
    role: "Business Development",
    image: "/images/model-closeup.jpg",
    bio: "Strategic partnerships expert with connections across luxury brands and media outlets.",
  },
];

const stats: Stat[] = [
  { number: "500+", label: "Models Represented", icon: Users },
  { number: "50+", label: "Countries Worldwide", icon: Globe },
  { number: "1000+", label: "Successful Campaigns", icon: TrendingUp },
  { number: "25+", label: "Industry Awards", icon: Award },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">{/*...*/}
      {/* Hero Section */}
      <section className="py-20 bg-gradient-fashion text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-wide">
            About PRESTIGE
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-light tracking-wide">
            Defining excellence in modeling representation since 2010
          </p>
        </div>
      </section>

      {/* Story Section */}
  <section className="py-16">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif font-bold mb-6">Leadership Team</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Meet the visionaries behind ADDOR&apos;s continued success and innovation
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member) => (
        <Card
          key={member.id}
          className="overflow-hidden border-0 shadow-elegant hover:shadow-editorial transition-all duration-300 group"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
            <Badge variant="secondary" className="mb-3 text-xs">
              {member.role}
            </Badge>
            <p className="text-sm text-muted-foreground">{member.bio}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">By the Numbers</h2>
            <p className="text-xl text-muted-foreground">
              Our impact across the global fashion industry
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="p-8 text-center border-0 shadow-elegant hover:shadow-editorial transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the visionaries behind ADDOR&apos;s continued success and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-editorial transition-all duration-300 group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    height={300}
                    width={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We maintain the highest standards in everything we do, from talent representation to client service.",
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and approaches to stay ahead of industry trends and changes.",
              },
              {
                title: "Integrity",
                description: "Trust and transparency form the foundation of all our relationships with talent and clients.",
              },
              {
                title: "Diversity",
                description: "We celebrate and promote diversity in all its forms, reflecting the world we live in.",
              },
              {
                title: "Sustainability",
                description: "We're committed to sustainable practices that benefit both our industry and the planet.",
              },
              {
                title: "Growth",
                description: "We invest in the long-term success and development of our talent and team members.",
              },
            ].map((value, index) => (
              <Card key={index} className="p-8 text-center border-0 shadow-elegant">
                <h3 className="font-serif text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-fashion text-white text-center border-0">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re seeking representation or looking to collaborate with exceptional talent, 
              PRESTIGE is your gateway to success in the fashion industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-3"
              >
                Join Our Talent
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              >
                Partner With Us
              </Button>
            </div>
          </Card>
        </div>
      </section>
      
      </div>
    </div>
  );
};

export default About;