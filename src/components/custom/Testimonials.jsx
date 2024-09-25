import Marquee from "@/components/magicui/marquee";
import UserTestimonial from "./UserTestimonial";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah L.",
      text: "This AI-powered trip planner made my vacation planning so easy! Highly recommended!",
      image: "/testimonial_images/Sarah.jpg",
      border: "border-red-300",
    },
    {
      name: "John D.",
      text: "I was skeptical at first, but the personalized itinerary was perfect for my needs.",
      image: "/testimonial_images/John.jpg",
      border: "border-blue-300",
    },
    {
      name: "Emma W.",
      text: "The seamless booking feature saved me hours of research. Love this app!",
      image: "/testimonial_images/Emma.jpg",
      border: "border-green-300",
    },
    {
      name: "Michael R.",
      text: "As a frequent traveler, this is now my go-to tool for planning trips. Simply amazing!",
      image: "/testimonial_images/Michael.jpg",
      border: "border-purple-300",
    },
    {
      name: "Lisa T.",
      text: "The AI suggestions were spot-on! It felt like having a personal travel agent.",
      image: "/testimonial_images/Lisa.jpg",
      border: "border-yellow-300",
    },
  ];

  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));

  return (
    <Marquee pauseOnHover className="[--duration:20s]">
      {firstRow.map((testimonial, index) => (
        <div
          key={index}
          className="w-80 flex-shrink-0 mx-4 transition-transform duration-300 hover:scale-105 mt-10">
          <UserTestimonial key={index} {...testimonial} />
        </div>
      ))}
    </Marquee>
  );
}

export default Testimonials;
