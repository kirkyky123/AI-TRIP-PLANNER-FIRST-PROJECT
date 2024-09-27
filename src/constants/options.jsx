export const selectBudget = [
  {
    id: 1,
    img: "💵",
    title: "Cheap",
    description: "Low cost, high enjoyment",
  },
  {
    id: 2,
    img: "💰",
    title: "Mid Range",
    description: "Well balanced spending",
  },
  {
    id: 3,
    img: "💎",
    title: "Premium",
    description: "Luxury at its finest",
  },
];

export const selectTravelers = [
  {
    id: 1,
    img: "✈️",
    title: "Solo",
    description: "Lone adventurer",
    amount: "1",
    amount2: "Solo"
  },
  {
    id: 2,
    img: "👫",
    title: "Pair",
    description: "A trip for two",
    amount: "2",
    amount2: "2 Friends"
  },
  {
    id: 3,
    img: "💏",
    title: "Couple",
    description: "Tandem together",
    amount: "2",
    amount2: "A Couple"
  },
  {
    id: 4,
    img: "👨‍👩‍👧‍👦",
    title: "Family",
    description: "Journeys with the gang",
    amount: "3-5",
    amount2: "Family of 3-5"
  },
  {
    id: 5,
    img: "🚐",
    title: "Group",
    description: "Travels with the crew",
    amount: "5+",
    amount2: "Group of 5+"
  },
];
export const PROMPT = "Generate a detailed travel itinerary for a {days}-day trip to {location} for a {people} on a {budget} budget. Include the following elements in JSON format: Hotel Options: (give at least 4 hotel options) HotelName: The name of the hotel. HotelAddress: The full address of the hotel. Price: The nightly cost of staying at the hotel (in a range of what it normally costs per night at the hotel. Ex output: $200-300 per night. Rating: The hotel’s rating out of 5. Description: A brief description of the hotel, including amenities, proximity to key attractions, and any special features. ItineraryDetails for Each Day (Day 1, Day 2, Day 3, etc also ensure that the itinerary is for the full day (so in order from day to night) and then make sure there is at least 5 things each day. Also make sure to pick events for the itinerary depending on the budget. If its a cheap budget pick cheap but good options and if its a more expensive budget, pick expensive things): Day: The specific day of the itinerary. PlacesToVisit: A list of places to visit each day. (Make sure the itinerary is not vague, for example don’t include arrival and leaving of the hotel and make sure every place is specific (with location). So don’t say “relaxing spa treatment” and say the address of it to be “Your Hotel Spa or Recommended Spa”. So, include specific names for each of the places) PlaceName: The name of the place to visit. PlaceNameSearch: This is almost the same as PlaceName but give me JUST the exact name of the place so don’t include “Dinner at (Place Name) or Lunch at (Place Name) or Evening at (Place Name). I will only use this to use it for my backend to search for this exact location so including other things besides JUST the name is useless for PlaceNameSearch. PlaceDetails: A description of the place, including what it’s known for, activities available, and any special considerations. Make sure the description is NO MORE than 3 sentences while keeping it appealing and concise. PlaceAddress: The full address of the place. TicketPricing: The cost of entry or any associated fees. (DO NOT say “depends on order or location” in any way. DO NOT be vague. Give a range if you need to and then add (depends on order for example if there is a restaurant, do not say “depends on order”, instead include the average range of price for a meal at that restaurant and then say depends on order like so “$10-15 (depends on order)” and if its not a place to eat, do not say “depends on order” say something else that makes sense, for example at a spa place, you would say something like “$50-100 (depends on service).” BestTimeToVisit: The exact time to visit the place (e.g., 10:00 AM, 2:30 PM) based on crowd levels, weather, or other factors. Also include in this how long someone should stay there for (e.g., if they got to a park at 10:00 AM, they might leave at 11:30 AM so the output will be like: 10:00 AM - 11:30 AM) and ensure that all times are specific (e.g., 9:00 AM, 2:00 PM) rather than vague (e.g., morning, evening) TravelTime: The estimated travel time from the hotel or previous location to this place in minutes. Make SURE to put this in the format of: (travel time from previous location) so for example if you went to a lake beforehand: (10 mins from the lake) you should use the PlaceNameSearch as the location so like so: (travel time from PlaceNameSearch). Format Requirements: Keep the budget considerations in mind for both the hotel and the itinerary, so if its a cheap budget, make sure to pick affordable options for the hotel and places to visit, if its a medium range budget, make sure to pick medium ranged options for the hotel and places to visit, and if its a premium budget, make sure to pick premium options for the hotel and places to visit. Ensure the itinerary is well-balanced, including a mix of iconic attractions, leisure time, and local experiences. And make sure all fields are filled and DO NOT have “N/A”. For the url fields the max url length is 100, so if the url is any bigger just stop. For the itinerary DO NOT include checking into a hotel as a part of the itinerary. I want you to create things to do without assuming a hotel. So don’t include hotel spas and massages for example. Lastly, if its for a couple, include couple things in the itinerary, if its for a family, include family things in the itinerary, etc. Provide the information in JSON format.";