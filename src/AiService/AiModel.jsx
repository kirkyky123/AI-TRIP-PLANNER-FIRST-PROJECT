import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200_000,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a detailed travel itinerary for a 7-day trip to Napoli, Italy for a couple on a cheap budget. Include the following elements in JSON format: Hotel Options: (give at least 4 hotel options) HotelName: The name of the hotel. HotelAddress: The full address of the hotel. Price: The nightly cost of staying at the hotel (in a range of what it normally costs per night at the hotel. Ex output: $200-300 per night). Rating: The hotel’s rating out of 5. Description: A brief description of the hotel, including amenities, proximity to key attractions, and any special features. ItineraryDetails for Each Day (Day 1, Day 2, Day 3, etc also ensure that the itinerary is for the full day (so in order from day to night) and then make sure there is at least 5 things each day. Also make sure to pick events for the itinerary depending on the budget. If its a cheap budget pick cheap but good options and if its a more expensive budget, pick expensive things): Day: The specific day of the itinerary. PlacesToVisit: A list of places to visit each day. (Make sure the itinerary is not vague, for example don’t include arrival and leaving of the hotel and make sure every place is specific (with location). So don’t say “relaxing spa treatment” and say the address of it to be “Your Hotel Spa or Recommended Spa”. So, include specific names for each of the places) PlaceName: The name of the place to visit. PlaceNameSearch: This is almost the same as PlaceName but give me JUST the exact name of the place so don’t include “Dinner at (Place Name) or Lunch at (Place Name) or Evening at (Place Name). I will only use this to use it for my backend to search for this exact location so including other things besides JUST the name is useless for PlaceNameSearch. PlaceDetails: A description of the place, including what it’s known for, activities available, and any special considerations. Make sure the description is NO MORE than 3 sentences while keeping it appealing and concise. PlaceAddress: The full address of the place. TicketPricing: The cost of entry or any associated fees. (DO NOT say “depends on order or location” in any way. DO NOT be vague. Give a range if you need to and then add (depends on order for example if there is a restaurant, do not say “depends on order”, instead include the average range of price for a meal at that restaurant and then say depends on order like so “$10-15 (depends on order)” and if its not a place to eat, do not say “depends on order” say something else that makes sense, for example at a spa place, you would say something like “$50-100 (depends on service)” Rating: The place’s rating out of 5. BestTimeToVisit: The exact time to visit the place (e.g., 10:00 AM, 2:30 PM) based on crowd levels, weather, or other factors. Also include in this how long someone should stay there for (e.g., if they got to a park at 10:00 AM, they might leave at 11:30 AM so the output will be like: 10:00 AM - 11:30 AM) and ensure that all times are specific (e.g., 9:00 AM, 2:00 PM) rather than vague (e.g., morning, evening) TravelTime: The estimated travel time from the hotel or previous location to this place in minutes. Make SURE to put this in the format of: (travel time from previous location) so for example if you went to a lake beforehand: (10 mins from the lake) you should use the PlaceNameSearch as the location so like so: (travel time from PlaceNameSearch). Format Requirements: Keep the budget considerations in mind for both the hotel and the itinerary, so if its a cheap budget, make sure to pick affordable options for the hotel and places to visit, if its a medium range budget, make sure to pick medium ranged options for the hotel and places to visit, and if its a premium budget, make sure to pick premium options for the hotel and places to visit. Ensure the itinerary is well-balanced, including a mix of iconic attractions, leisure time, and local experiences. And make sure all fields are filled and DO NOT have “N/A”. For the url fields the max url length is 100, so if the url is any bigger just stop. For the itinerary DO NOT include checking into a hotel as a part of the itinerary. I want you to create things to do without assuming a hotel. So don’t include hotel spas and massages for example. Lastly, if its for a couple, include couple things in the itinerary, if its for a family, include family things in the itinerary, etc. Provide the information in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "HotelOptions": [\n    {\n      "HotelName": "Hotel Piazza Bellini",\n      "HotelAddress": "Via Benedetto Croce, 10, 80138 Napoli NA, Italy",\n      "Price": "$100-150 per night",\n      "Rating": 4.5,\n      "Description": "A charming boutique hotel in the heart of Naples\' historic center, offering stylish rooms and a convenient location near Piazza Bellini, the San Carlo Theatre, and many restaurants and shops. It\'s a great choice for those seeking a central location without the high price tag."\n    },\n    {\n      "HotelName": "B&B Il Sogno di Napoli",\n      "HotelAddress": "Via S. Biagio dei Librai, 35, 80134 Napoli NA, Italy",\n      "Price": "$75-100 per night",\n      "Rating": 4,\n      "Description": "This cozy bed and breakfast provides a comfortable and affordable stay in the historic center, offering rooms with traditional Neapolitan charm and a friendly atmosphere. It\'s ideal for those on a tight budget and who prefer a more intimate setting."\n    },\n    {\n      "HotelName": "Hotel Santa Chiara",\n      "HotelAddress": "Via Santa Chiara, 49, 80134 Napoli NA, Italy",\n      "Price": "$150-200 per night",\n      "Rating": 4,\n      "Description": "Located near the Santa Chiara Monastery and the historic center, this hotel offers modern and spacious rooms, a rooftop terrace with stunning views, and a convenient location for exploring Naples\' main attractions."\n    },\n    {\n      "HotelName": "Hotel Il Salotto",\n      "HotelAddress": "Via Toledo, 326, 80132 Napoli NA, Italy",\n      "Price": "$120-170 per night",\n      "Rating": 4.5,\n      "Description": "This stylish hotel on Via Toledo features modern, minimalist design, a cozy lounge area, and a convenient location for accessing public transportation and nearby shopping districts. It\'s a great option for those who value comfort and style."\n    }\n  ],\n  "ItineraryDetails": [\n    {\n      "Day": "Day 1",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning Stroll through Piazza del Plebiscito",\n          "PlaceNameSearch": "Piazza del Plebiscito",\n          "PlaceDetails": "Start your day in Naples\' grandest square, surrounded by stunning architecture like the Royal Palace and the San Francesco di Paola Basilica. Take a leisurely stroll and enjoy the vibrant atmosphere.",\n          "PlaceAddress": "Piazza del Plebiscito, 80132 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 AM - 10:30 AM",\n          "TravelTime": "(5 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at Trattoria da Michele",\n          "PlaceNameSearch": "Trattoria da Michele",\n          "PlaceDetails": "Indulge in authentic Neapolitan pizza at this legendary pizzeria, known for its simple yet delicious Margherita and Marinara pizzas. Be prepared for a queue, as it\'s a popular spot.",\n          "PlaceAddress": "Via Cesare Sersale, 1/2, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "12:30 PM - 1:30 PM",\n          "TravelTime": "(10 mins from Piazza del Plebiscito)"\n        },\n        {\n          "PlaceName": "Afternoon at the Museo Archeologico Nazionale di Napoli",\n          "PlaceNameSearch": "Museo Archeologico Nazionale di Napoli",\n          "PlaceDetails": "Immerse yourself in ancient history at this world-renowned museum, home to an extensive collection of Roman artifacts, including the Farnese Collection and the Secret Cabinet.",\n          "PlaceAddress": "Piazza Museo, 19, 80135 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(15 mins from Trattoria da Michele)"\n        },\n        {\n          "PlaceName": "Evening at the Teatro San Carlo",\n          "PlaceNameSearch": "Teatro San Carlo",\n          "PlaceDetails": "Experience the grandeur of one of the world\'s most famous opera houses, offering a range of performances throughout the year. Book tickets in advance for a special evening.",\n          "PlaceAddress": "Via San Carlo, 95, 80132 Napoli NA, Italy",\n          "TicketPricing": "$30-80 (depends on performance)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "7:30 PM - 10:00 PM",\n          "TravelTime": "(10 mins from Museo Archeologico Nazionale di Napoli)"\n        },\n        {\n          "PlaceName": "Dinner at L\'Antica Pizzeria da Michele",\n          "PlaceNameSearch": "L\'Antica Pizzeria da Michele",\n          "PlaceDetails": "Enjoy a traditional Neapolitan pizza experience at this legendary pizzeria, renowned for its simple yet delicious Margherita and Marinara pizzas. Be prepared for a queue, as it\'s a popular spot.",\n          "PlaceAddress": "Via Cesare Sersale, 1/2, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "10:00 PM - 11:00 PM",\n          "TravelTime": "(10 mins from Teatro San Carlo)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 2",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Spaccanapoli",\n          "PlaceNameSearch": "Spaccanapoli",\n          "PlaceDetails": "Explore the heart of Naples\' historic center, wandering through this bustling pedestrian street lined with shops, cafes, and historical landmarks. Soak up the vibrant atmosphere and discover hidden gems.",\n          "PlaceAddress": "Spaccanapoli, 80134 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(5 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at Trattoria Nennella",\n          "PlaceNameSearch": "Trattoria Nennella",\n          "PlaceDetails": "Enjoy a traditional Neapolitan lunch at this popular trattoria, known for its home-style cooking and generous portions. Try the pasta with ragu or the fried seafood.",\n          "PlaceAddress": "Via dei Tribunali, 118, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "12:00 PM - 1:00 PM",\n          "TravelTime": "(10 mins from Spaccanapoli)"\n        },\n        {\n          "PlaceName": "Afternoon at the Museo Cappella Sansevero",\n          "PlaceNameSearch": "Museo Cappella Sansevero",\n          "PlaceDetails": "Admire the exquisite sculptures and intricate details of this 18th-century chapel, featuring the famous veiled Christ statue and other remarkable works of art.",\n          "PlaceAddress": "Via Francesco de Sanctis, 19, 80134 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(15 mins from Trattoria Nennella)"\n        },\n        {\n          "PlaceName": "Evening at the Quartieri Spagnoli",\n          "PlaceNameSearch": "Quartieri Spagnoli",\n          "PlaceDetails": "Immerse yourself in the lively atmosphere of Naples\' Spanish Quarter, exploring its narrow streets, local shops, and vibrant street art. Enjoy a traditional Neapolitan coffee at a local cafe.",\n          "PlaceAddress": "Quartieri Spagnoli, 80134 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4,\n          "BestTimeToVisit": "6:00 PM - 8:00 PM",\n          "TravelTime": "(10 mins from Museo Cappella Sansevero)"\n        },\n        {\n          "PlaceName": "Dinner at Pizzeria Starita a Materdei",\n          "PlaceNameSearch": "Pizzeria Starita a Materdei",\n          "PlaceDetails": "Indulge in another authentic Neapolitan pizza experience at this historic pizzeria, known for its delicious pizzas and its connection to the film "L\'oro di Napoli".",\n          "PlaceAddress": "Via Materdei, 27/28, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "8:30 PM - 10:00 PM",\n          "TravelTime": "(15 mins from Quartieri Spagnoli)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 3",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Castel Nuovo",\n          "PlaceNameSearch": "Castel Nuovo",\n          "PlaceDetails": "Explore this majestic medieval castle, offering stunning views of the city from its ramparts. Admire the impressive architecture and visit the Museo Civico, which houses a collection of art and historical artifacts.",\n          "PlaceAddress": "Piazza Municipio, 1, 80133 Napoli NA, Italy",\n          "TicketPricing": "$6",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(15 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at La Cantina del Poeta",\n          "PlaceNameSearch": "La Cantina del Poeta",\n          "PlaceDetails": "Enjoy a delicious and affordable lunch at this charming restaurant, known for its traditional Neapolitan dishes and its warm atmosphere.",\n          "PlaceAddress": "Via dei Tribunali, 153, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "12:30 PM - 1:30 PM",\n          "TravelTime": "(10 mins from Castel Nuovo)"\n        },\n        {\n          "PlaceName": "Afternoon at the Museo di Capodimonte",\n          "PlaceNameSearch": "Museo di Capodimonte",\n          "PlaceDetails": "Discover a diverse collection of art, from Renaissance masterpieces to modern works, housed in a stunning 17th-century palace offering panoramic views of the city.",\n          "PlaceAddress": "Via Miano, 2, 80131 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(20 mins from La Cantina del Poeta)"\n        },\n        {\n          "PlaceName": "Evening at the Vomero",\n          "PlaceNameSearch": "Vomero",\n          "PlaceDetails": "Ascend to the hilltop neighborhood of Vomero, known for its charming streets, elegant cafes, and breathtaking views of the city. Take a leisurely stroll and enjoy the peaceful atmosphere.",\n          "PlaceAddress": "Vomero, 80129 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "6:00 PM - 8:00 PM",\n          "TravelTime": "(15 mins from Museo di Capodimonte)"\n        },\n        {\n          "PlaceName": "Dinner at Pizzeria Gino Sorbillo",\n          "PlaceNameSearch": "Pizzeria Gino Sorbillo",\n          "PlaceDetails": "Enjoy a delicious Neapolitan pizza at this popular pizzeria, known for its long queues and its flavorful pizzas made with fresh ingredients.",\n          "PlaceAddress": "Via dei Tribunali, 32, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "8:30 PM - 10:00 PM",\n          "TravelTime": "(20 mins from Vomero)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 4",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Catacombs of San Gennaro",\n          "PlaceNameSearch": "Catacombs of San Gennaro",\n          "PlaceDetails": "Descend into the underground catacombs, a network of ancient tunnels used as burial grounds for early Christians. Experience the eerie atmosphere and learn about the history of these fascinating sites.",\n          "PlaceAddress": "Via San Gennaro, 377, 80138 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(15 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at La Taverna del Capitano",\n          "PlaceNameSearch": "La Taverna del Capitano",\n          "PlaceDetails": "Enjoy a traditional Neapolitan lunch at this charming taverna, known for its cozy atmosphere and its authentic dishes. Try the pasta with seafood or the Neapolitan ragù.",\n          "PlaceAddress": "Vico Lungo Teatro Nuovo, 11, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "12:00 PM - 1:00 PM",\n          "TravelTime": "(10 mins from Catacombs of San Gennaro)"\n        },\n        {\n          "PlaceName": "Afternoon at the Museo del Tesoro di San Gennaro",\n          "PlaceNameSearch": "Museo del Tesoro di San Gennaro",\n          "PlaceDetails": "Admire the magnificent treasures of the Cathedral of Naples, including the golden reliquary of St. Januarius, and explore the rich history and traditions surrounding this important patron saint.",\n          "PlaceAddress": "Duomo, Via Duomo, 142, 80138 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(10 mins from La Taverna del Capitano)"\n        },\n        {\n          "PlaceName": "Evening at the Piazza Bellini",\n          "PlaceNameSearch": "Piazza Bellini",\n          "PlaceDetails": "Experience the vibrant nightlife of Naples\' historic center, enjoying street performers, live music, and a lively atmosphere in this popular square.",\n          "PlaceAddress": "Piazza Bellini, 80138 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(10 mins from Museo del Tesoro di San Gennaro)"\n        },\n        {\n          "PlaceName": "Dinner at Trattoria Mario",\n          "PlaceNameSearch": "Trattoria Mario",\n          "PlaceDetails": "Indulge in authentic Neapolitan cuisine at this legendary trattoria, known for its simple yet delicious pasta dishes and its lively atmosphere. Be prepared for a queue, as it\'s a popular spot.",\n          "PlaceAddress": "Via Santa Brigida, 41, 80138 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 PM - 10:00 PM",\n          "TravelTime": "(5 mins from Piazza Bellini)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 5",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Certosa di San Martino",\n          "PlaceNameSearch": "Certosa di San Martino",\n          "PlaceDetails": "Escape the city buzz and explore this peaceful monastery, offering stunning views of Naples from its hilltop location. Admire the intricate cloisters, visit the museum, and enjoy the serene atmosphere.",\n          "PlaceAddress": "Largo San Martino, 5, 80134 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(20 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at L\'Osteria del Gambero",\n          "PlaceNameSearch": "L\'Osteria del Gambero",\n          "PlaceDetails": "Enjoy a traditional Neapolitan lunch at this charming osteria, known for its cozy atmosphere and its authentic dishes. Try the pasta with seafood or the Neapolitan ragù.",\n          "PlaceAddress": "Via S. Sebastiano, 20, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "12:00 PM - 1:00 PM",\n          "TravelTime": "(15 mins from Certosa di San Martino)"\n        },\n        {\n          "PlaceName": "Afternoon at the Parco Virgiliano",\n          "PlaceNameSearch": "Parco Virgiliano",\n          "PlaceDetails": "Relax in this peaceful park, offering stunning panoramic views of the city, the bay, and Mount Vesuvius. Take a leisurely stroll, enjoy a picnic, or simply soak up the tranquility.",\n          "PlaceAddress": "Via Aniello Falcone, 18, 80129 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(20 mins from L\'Osteria del Gambero)"\n        },\n        {\n          "PlaceName": "Evening at the Piazza dei Martiri",\n          "PlaceNameSearch": "Piazza dei Martiri",\n          "PlaceDetails": "Experience the lively atmosphere of this elegant square in the Vomero neighborhood, lined with upscale cafes, restaurants, and shops. Enjoy a leisurely stroll and soak up the city vibe.",\n          "PlaceAddress": "Piazza dei Martiri, 80129 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "6:00 PM - 8:00 PM",\n          "TravelTime": "(15 mins from Parco Virgiliano)"\n        },\n        {\n          "PlaceName": "Dinner at La Terrazza",\n          "PlaceNameSearch": "La Terrazza",\n          "PlaceDetails": "Enjoy a romantic dinner with stunning views at this restaurant in the Vomero neighborhood, offering a selection of traditional Neapolitan dishes and modern cuisine.",\n          "PlaceAddress": "Via Aniello Falcone, 36, 80129 Napoli NA, Italy",\n          "TicketPricing": "$25-35 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "8:30 PM - 10:00 PM",\n          "TravelTime": "(5 mins from Piazza dei Martiri)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 6",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Naples National Archaeological Museum",\n          "PlaceNameSearch": "Naples National Archaeological Museum",\n          "PlaceDetails": "Delve into the ancient world at this museum, home to an extensive collection of Roman artifacts, including the Farnese Collection and the Secret Cabinet.",\n          "PlaceAddress": "Piazza Museo, 19, 80135 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(15 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at La Locanda del Borgo Antico",\n          "PlaceNameSearch": "La Locanda del Borgo Antico",\n          "PlaceDetails": "Enjoy a traditional Neapolitan lunch at this charming restaurant, known for its cozy atmosphere and its authentic dishes.",\n          "PlaceAddress": "Via S. Giovanni Maggiore Pignatelli, 51, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "12:30 PM - 1:30 PM",\n          "TravelTime": "(10 mins from Naples National Archaeological Museum)"\n        },\n        {\n          "PlaceName": "Afternoon at the Royal Palace of Caserta",\n          "PlaceNameSearch": "Royal Palace of Caserta",\n          "PlaceDetails": "Embark on a day trip to this magnificent palace, a UNESCO World Heritage site, known for its opulent interiors, extensive gardens, and its association with the Bourbon dynasty.",\n          "PlaceAddress": "Viale Douhet, 2, 81100 Caserta CE, Italy",\n          "TicketPricing": "$12",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(1 hour from La Locanda del Borgo Antico)"\n        },\n        {\n          "PlaceName": "Evening at the Piazza del Plebiscito",\n          "PlaceNameSearch": "Piazza del Plebiscito",\n          "PlaceDetails": "Enjoy a relaxing evening in this grand square, surrounded by stunning architecture like the Royal Palace and the San Francesco di Paola Basilica.",\n          "PlaceAddress": "Piazza del Plebiscito, 80132 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(1 hour from Royal Palace of Caserta)"\n        },\n        {\n          "PlaceName": "Dinner at Pizzeria Starita a Materdei",\n          "PlaceNameSearch": "Pizzeria Starita a Materdei",\n          "PlaceDetails": "Indulge in a delicious Neapolitan pizza at this historic pizzeria, known for its long queues and its flavorful pizzas made with fresh ingredients.",\n          "PlaceAddress": "Via Materdei, 27/28, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "9:00 PM - 10:00 PM",\n          "TravelTime": "(10 mins from Piazza del Plebiscito)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 7",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Morning at the Museo di San Domenico Maggiore",\n          "PlaceNameSearch": "Museo di San Domenico Maggiore",\n          "PlaceDetails": "Explore the history and art of this beautiful church, featuring frescoes, sculptures, and a collection of liturgical objects. Enjoy the peaceful atmosphere and the stunning architectural details.",\n          "PlaceAddress": "Via San Domenico Maggiore, 10, 80134 Napoli NA, Italy",\n          "TicketPricing": "$6",\n          "Rating": 4,\n          "BestTimeToVisit": "9:00 AM - 11:00 AM",\n          "TravelTime": "(10 mins from Hotel Piazza Bellini)"\n        },\n        {\n          "PlaceName": "Lunch at La Cantina del Poeta",\n          "PlaceNameSearch": "La Cantina del Poeta",\n          "PlaceDetails": "Enjoy a delicious and affordable lunch at this charming restaurant, known for its traditional Neapolitan dishes and its warm atmosphere.",\n          "PlaceAddress": "Via dei Tribunali, 153, 80134 Napoli NA, Italy",\n          "TicketPricing": "$15-20 (depends on order)",\n          "Rating": 4,\n          "BestTimeToVisit": "12:30 PM - 1:30 PM",\n          "TravelTime": "(5 mins from Museo di San Domenico Maggiore)"\n        },\n        {\n          "PlaceName": "Afternoon at the Museo di Palazzo Reale",\n          "PlaceNameSearch": "Museo di Palazzo Reale",\n          "PlaceDetails": "Step back in time at this historic palace, exploring its opulent interiors, royal apartments, and stunning art collection. Learn about the history of the Bourbon dynasty and the palace\'s role in Naples\' past.",\n          "PlaceAddress": "Piazza del Plebiscito, 1, 80132 Napoli NA, Italy",\n          "TicketPricing": "$8",\n          "Rating": 4.5,\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(10 mins from La Cantina del Poeta)"\n        },\n        {\n          "PlaceName": "Evening at the Piazza Dante",\n          "PlaceNameSearch": "Piazza Dante",\n          "PlaceDetails": "Experience the lively atmosphere of this bustling square, lined with cafes, restaurants, and street vendors. Enjoy a leisurely stroll and soak up the city vibe.",\n          "PlaceAddress": "Piazza Dante, 80134 Napoli NA, Italy",\n          "TicketPricing": "Free",\n          "Rating": 4.5,\n          "BestTimeToVisit": "6:00 PM - 8:00 PM",\n          "TravelTime": "(10 mins from Museo di Palazzo Reale)"\n        },\n        {\n          "PlaceName": "Dinner at Pizzeria Trianon",\n          "PlaceNameSearch": "Pizzeria Trianon",\n          "PlaceDetails": "Enjoy a delicious Neapolitan pizza at this popular pizzeria, known for its long queues and its flavorful pizzas made with fresh ingredients.",\n          "PlaceAddress": "Via Pietro Colletta, 21, 80134 Napoli NA, Italy",\n          "TicketPricing": "$10-15 (depends on order)",\n          "Rating": 4.5,\n          "BestTimeToVisit": "8:30 PM - 10:00 PM",\n          "TravelTime": "(5 mins from Piazza Dante)"\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
