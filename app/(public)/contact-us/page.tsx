"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Menu, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <nav className="flex justify-center py-8">
        <div className="flex gap-8 text-sm tracking-wider">
          <Link href="/services" className="hover:text-yellow-400 transition-colors">
            SERVICES
          </Link>
          <Link href="/models" className="hover:text-yellow-400 transition-colors">
            MODELS
          </Link>
          <Link href="/become-a-model" className="hover:text-yellow-400 transition-colors">
            BECOME A MODEL
          </Link>
          <Link href="/magazine" className="hover:text-yellow-400 transition-colors">
            MAGAZINE
          </Link>
          <Link href="/contact" className="text-yellow-400">
            CONTACT US
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-wider">CONTACT US</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your modeling journey or collaborate with our agency? Get in touch with us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">GET IN TOUCH</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="First Name"
                    className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
              </div>

              <div>
                <Input
                  placeholder="Subject"
                  className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 resize-none"
                />
              </div>

              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg font-semibold w-full">
                SEND MESSAGE
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">CONTACT INFORMATION</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">ADDRESS</h3>
                  <p className="text-gray-300 leading-relaxed">
                    123 Fashion Avenue
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">PHONE</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">EMAIL</h3>
                  <p className="text-gray-300">info@addor.com</p>
                  <p className="text-gray-300">casting@addor.com</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">OFFICE HOURS</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">FOLLOW US</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
