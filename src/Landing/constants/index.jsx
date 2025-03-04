import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../../assets/profile-pictures/user1.jpg";
import user2 from "../../assets/profile-pictures/user2.jpg";
import user3 from "../../assets/profile-pictures/user3.jpg";
import user4 from "../../assets/profile-pictures/user4.jpg";
import user5 from "../../assets/profile-pictures/user5.jpg";
import user6 from "../../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Investments",
    image: user1,
    text: "OptiTrade has transformed my trading strategy. The portfolio optimization tools are top-notch and have significantly boosted my returns.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Capital",
    image: user2,
    text: "The insights and analytics provided by OptiTrade are invaluable. It's like having a personal financial advisor at my fingertips.",
  },
  {
    user: "David Johnson",
    company: "Quantum Finance",
    image: user3,
    text: "OptiTrade's user-friendly interface and powerful features make it a must-have for any serious trader.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Wealth Management",
    image: user4,
    text: "The team at OptiTrade has created a game-changing platform. Their tools have helped us achieve our financial goals faster than expected.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Investments",
    image: user5,
    text: "I am amazed by the level of detail and customization available in OptiTrade. It has exceeded all my expectations.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Trading",
    image: user6,
    text: "OptiTrade's portfolio optimization features are unmatched. I look forward to using it for many years to come.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Intuitive Dashboard",
    description:
        "Monitor your investments and track market trends with our easy-to-use dashboard.",
  },
  {
    icon: <Fingerprint />,
    text: "Advanced Analytics",
    description:
        "Gain deep insights into your portfolio's performance with our comprehensive analytics tools.",
  },
  {
    icon: <ShieldHalf />,
    text: "Customizable Alerts",
    description:
        "Stay informed with real-time alerts tailored to your trading preferences.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Data",
    description:
        "Access up-to-the-minute market data to make informed trading decisions.",
  },
  {
    icon: <PlugZap />,
    text: "Collaborative Tools",
    description:
        "Work with your team to develop and refine trading strategies in real-time.",
  },
  {
    icon: <GlobeLock />,
    text: "Secure Transactions",
    description:
        "Trade with confidence knowing your transactions are protected by industry-leading security measures.",
  },
];

export const checklistItems = [
  {
    title: "Optimize Your Portfolio",
    description:
        "Use our tools to maximize returns and minimize risk in your investment portfolio.",
  },
  {
    title: "Stay Ahead of the Market",
    description:
        "Receive timely alerts and insights to keep you informed of market changes.",
  },
  {
    title: "Leverage AI for Better Decisions",
    description:
        "Utilize AI-driven analytics to enhance your trading strategies.",
  },
  {
    title: "Collaborate with Experts",
    description:
        "Connect with financial experts and peers to share insights and strategies.",
  },
];

export const pricingOptions = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "Access to basic analytics",
      "Real-time market data",
      "Community support",
    ],
  },
  {
    title: "Pro",
    price: "$20",
    features: [
      "Advanced analytics",
      "Customizable alerts",
      "Priority support",
    ],
  },
  {
    title: "Enterprise",
    price: "$100",
    features: [
      "Full suite of tools",
      "Dedicated account manager",
      "Custom solutions",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Platforms" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Webinars" },
  { href: "#", text: "Careers" },
];
