import { Button } from "../ui/button";

// PricingCard component definition with props
function PricingCard({ title, price, features, customPrice = false }) {
  // Determine the outline color based on the pricing tier
  const outline =
    title === "Business"
      ? "border-[#fb7272]"
      : title === "Pro"
      ? "border-[#34f0ac]"
      : "border-[#f9e42b]";

  return (
    // Outer container with hover effect
    <div className="relative z-10 items-center overflow-hidden rounded-xl p-[2.5px] hover:scale-110 h-full transform transition duration-300">
      {/* Inner container with gradient background and custom outline */}
      <div className={`relative z-20 flex rounded-[0.60rem] bg-gradient-to-b from-white to-orange-200 dark:from-black dark:to-black p-[4px] h-full ${outline} border-2`}>
        <div className=" rounded-[0.55rem] p-[2px] flex-grow">
          {/* Main content container */}
          <div
            className={`rounded-lg p-6 shadow-lg border-4 border-transparent flex flex-col justify-between h-full relative`}>
            {/* "On Sale" badge for Pro tier */}
            {title === "Pro" && (
              <div className="absolute top-0 right-0 bg-[#37e08b] text-gray-800 font-bold py-1 px-3 rounded-bl-lg rounded-tr-xl transform rotate-0 translate-x-1 -translate-y-2 text-sm">
                On Sale!
              </div>
            )}
            <div className="text-black dark:text-white">
              {/* Pricing tier title */}
              <h3 className="text-2xl font-semibold mb-2 underline underline-offset-4">
                {title}
              </h3>
              {/* Price display with special formatting for Pro tier */}
              <p className="text-xl sm:text-3xl lg:text-xl xl:text-3xl font-bold mb-4">
                {title === "Pro" ? <span className="text-lg text-gray-400 line-through mr-2">$19.99</span> : ""}
                {price === "$9.99/month" ? <span className="bg-gradient-to-l to-[#38da97] via-red-600 from-blue-400
            text-transparent bg-clip-text">{price}</span> : price}{" "}
                {customPrice && (
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-normal">
                    (contact for pricing)
                  </span>
                )}
              </p>
              {/* Feature list */}
              <ul className="text-black dark:text-white min-h-32">
                {features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* Call-to-action button */}
            <Button
              className={`w-full mt-6 dark:bg-black border-2 dark:border-white font-bold dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white`}>
              {title === "Business" ? "Contact Us" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
