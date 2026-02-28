"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, Linkedin, Award, Plane, Users, Globe, Star } from "lucide-react"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Alexander Sterling",
      position: "Chief Executive Officer",
      department: "Executive",
      image: "professional executive in luxury suit with private jet background",
      bio: "With over 20 years in luxury aviation, Alexander founded Aerolux Charter with a vision to redefine private jet travel. His leadership has established the company as a premier choice for discerning travelers worldwide.",
      experience: "20+ Years",
      specialties: ["Strategic Leadership", "Aviation Industry", "Luxury Services"],
      achievements: ["Founded SkyLux Charter", "Former VP at NetJets", "Aviation Industry Award Winner"],
      contact: {
        email: "a.sterling@skylux.com",
        phone: "+1 (555) 123-0001",
        linkedin: "alexander-sterling",
      },
    },
    {
      id: 2,
      name: "Victoria Chen",
      position: "Chief Operating Officer",
      department: "Operations",
      image: "professional Asian woman in business attire with aviation operations background",
      bio: "Victoria oversees all operational aspects of SkyLux Charter, ensuring seamless flight experiences and maintaining our industry-leading safety standards. Her expertise in aviation operations is unmatched.",
      experience: "15+ Years",
      specialties: ["Flight Operations", "Safety Management", "Team Leadership"],
      achievements: ["Zero Safety Incidents Record", "FAA Safety Award", "Operations Excellence Recognition"],
      contact: {
        email: "v.chen@skylux.com",
        phone: "+1 (555) 123-0002",
        linkedin: "victoria-chen",
      },
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      position: "Head of Client Relations",
      department: "Client Services",
      image: "professional Hispanic man in elegant suit with luxury travel background",
      bio: "Marcus leads our client relations team, ensuring every SkyLux experience exceeds expectations. His dedication to personalized service has earned him recognition as a leader in luxury hospitality.",
      experience: "12+ Years",
      specialties: ["Client Relations", "Luxury Hospitality", "Concierge Services"],
      achievements: ["Client Satisfaction Award", "Luxury Service Excellence", "Hospitality Leadership Recognition"],
      contact: {
        email: "m.rodriguez@skylux.com",
        phone: "+1 (555) 123-0003",
        linkedin: "marcus-rodriguez",
      },
    },
    {
      id: 4,
      name: "Dr. Sarah Mitchell",
      position: "Director of Safety & Compliance",
      department: "Safety",
      image: "professional woman doctor in aviation safety uniform with aircraft background",
      bio: "Dr. Mitchell brings extensive experience in aviation safety and regulatory compliance. Her medical background and aviation expertise ensure the highest safety standards across all operations.",
      experience: "18+ Years",
      specialties: ["Aviation Safety", "Medical Aviation", "Regulatory Compliance"],
      achievements: ["Aviation Medical Director", "Safety Innovation Award", "Regulatory Excellence Recognition"],
      contact: {
        email: "s.mitchell@skylux.com",
        phone: "+1 (555) 123-0004",
        linkedin: "sarah-mitchell-md",
      },
    },
    {
      id: 5,
      name: "James Thompson",
      position: "Chief Pilot",
      department: "Flight Operations",
      image: "experienced pilot in captain uniform with modern cockpit background",
      bio: "Captain Thompson leads our elite pilot team with over 25 years of aviation experience. His expertise spans multiple aircraft types and international operations, ensuring safe and smooth flights.",
      experience: "25+ Years",
      specialties: ["Multi-Type Rated", "International Operations", "Flight Training"],
      achievements: ["25,000+ Flight Hours", "Master Pilot Award", "International Aviation Recognition"],
      contact: {
        email: "j.thompson@skylux.com",
        phone: "+1 (555) 123-0005",
        linkedin: "james-thompson-pilot",
      },
    },
    {
      id: 6,
      name: "Elena Volkov",
      position: "Director of Global Operations",
      department: "Operations",
      image: "professional European woman with global aviation operations background",
      bio: "Elena manages our worldwide operations network, coordinating with international partners and ensuring seamless global service delivery. Her multilingual skills and cultural expertise are invaluable.",
      experience: "14+ Years",
      specialties: ["Global Operations", "International Relations", "Multi-Cultural Management"],
      achievements: ["Global Expansion Leader", "International Partnership Awards", "Cultural Excellence Recognition"],
      contact: {
        email: "e.volkov@skylux.com",
        phone: "+1 (555) 123-0006",
        linkedin: "elena-volkov",
      },
    },
  ]

  const departments = [
    { name: "Executive", count: 1, icon: Star },
    { name: "Operations", count: 2, icon: Plane },
    { name: "Client Services", count: 1, icon: Users },
    { name: "Safety", count: 1, icon: Award },
    { name: "Flight Operations", count: 1, icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center glass rounded-full px-6 py-3 mb-8"
            >
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Meet Our Team</span>
            </motion.div>
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Excellence in Every Role
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Meet the exceptional professionals who make SkyLux Charter the world's premier private aviation service.
              Our team combines decades of experience with unwavering commitment to excellence.
            </p>
          </motion.div>

          {/* Department Overview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-5 gap-4 mb-16"
          >
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass p-4 text-center hover:scale-105 transition-transform duration-300">
                  <dept.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-serif font-bold text-lg">{dept.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {dept.count} member{dept.count > 1 ? "s" : ""}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Card className="glass-strong p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start space-x-6 mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden glass-strong">
                          <img
                            src={`/abstract-geometric-shapes.png?height=200&width=200&query=${member.image}`}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 glass rounded-full p-2">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-2xl mb-1">{member.name}</h3>
                        <div className="text-primary font-medium mb-2">{member.position}</div>
                        <div className="inline-flex items-center glass rounded-full px-3 py-1 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          {member.department}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

                    {/* Experience & Specialties */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-serif font-bold text-lg mb-3">Experience</h4>
                        <div className="text-2xl font-bold text-primary mb-2">{member.experience}</div>
                        <div className="text-sm text-muted-foreground">Industry Experience</div>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-lg mb-3">Specialties</h4>
                        <div className="space-y-2">
                          {member.specialties.map((specialty) => (
                            <div key={specialty} className="flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                              <span className="text-sm">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-serif font-bold text-lg mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {member.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-center">
                            <Star className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-primary/30 hover:bg-primary/10 bg-transparent"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-primary/30 hover:bg-primary/10 bg-transparent"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-primary/30 hover:bg-primary/10 bg-transparent"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}