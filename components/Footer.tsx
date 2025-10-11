"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quickLinks = [
    { label: "Models", href: "/models" },
    { label: "Magazine", href: "/magazine" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ];

  const services = [
    "Model Management",
    "Editorial Shoots",
    "Commercial Campaigns",
    "Runway & Events",
    "Brand Partnerships",
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/addormodels/", label: "Instagram" },
    { icon: Twitter, href: "https://www.x.com/addormodels/", label: "Twitter" },
    { icon: Facebook, href: "https://www.facebook.com/addormodels/", label: "Facebook" },
  ];

  return (
    <footer className="bg-primary dark:bg-black text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-64 h-14 flex items-center justify-center">
                <Link href="/" className="w-full h-full">
                  {/* only render logos after client mount to avoid flicker */}
                  {mounted ? (
                    <>
                      <Image
                        src="/images/textonlywhite.png"
                        alt="Logo light"
                        width={256}
                        height={56}
                        className="object-contain block "
                        priority
                      />
                    </>
                  ) : (
                    // optional: show one logo while waiting to avoid empty space (choose one consistent with your default theme)
                    <Image
                      src="/images/textonlyblack.png"
                      alt="Logo"
                      className="object-contain block"
                      width={256}
                      height={56}
                    />
                  )}
                </Link>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Elite modeling agency representing the Ethiopia&apos;s most
              sought-after talent. Where fashion meets excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                  asChild
                >
                  <a href={social.href} target="_blank" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl text-white font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl text-white font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground">+251-xxxx-xxxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground">
                  info@addormodels.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © {currentYear} ADDOR Models. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
