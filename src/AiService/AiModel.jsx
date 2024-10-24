import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// json schema the ai will follow
const schema = {
  description: "Trip options including hotel options and itinerary details",
  type: FunctionDeclarationSchemaType.OBJECT,
  properties: {
    HotelOptions: {
      type: FunctionDeclarationSchemaType.ARRAY,
      description: "List of hotel options",
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          HotelName: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Name of the hotel",
            nullable: false,
          },
          HotelAddress: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Address of the hotel",
            nullable: false,
          },
          Price: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Price range of the hotel",
            nullable: false,
          },
          Rating: {
            type: FunctionDeclarationSchemaType.NUMBER,
            description: "Rating of the hotel",
            nullable: false,
          },
          Description: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Description of the hotel",
            nullable: false,
          },
        },
        required: [
          "HotelName",
          "HotelAddress",
          "Price",
          "Rating",
          "Description",
        ],
      },
    },
    ItineraryDetails: {
      type: FunctionDeclarationSchemaType.ARRAY,
      description: "List of itinerary details",
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          Day: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "Day number or name",
            nullable: false,
          },
          PlacesToVisit: {
            type: FunctionDeclarationSchemaType.ARRAY,
            description: "List of places to visit",
            items: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                PlaceName: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Name of the place",
                  nullable: false,
                },
                PlaceNameSearch: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Search-friendly name of the place",
                  nullable: false,
                },
                PlaceDetails: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Details about the place",
                  nullable: false,
                },
                PlaceAddress: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Address of the place",
                  nullable: false,
                },
                TicketPricing: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Pricing for tickets",
                  nullable: false,
                },
                BestTimeToVisit: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Best time to visit the place",
                  nullable: false,
                },
                TravelTime: {
                  type: FunctionDeclarationSchemaType.STRING,
                  description: "Time taken to travel to this place from previous place (if it is first place in the day, then just say depends on hotel location)",
                  nullable: false,
                },
              },
              required: [
                "PlaceName",
                "PlaceNameSearch",
                "PlaceDetails",
                "PlaceAddress",
                "TicketPricing",
                "BestTimeToVisit",
                "TravelTime",
              ],
            },
          },
        },
        required: ["Day", "PlacesToVisit"],
      },
    },
  },
  required: ["HotelOptions", "ItineraryDetails"],
};

// using gemini 1.5 flash
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// config
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200_000,
  responseMimeType: "application/json",
  responseSchema: schema,
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        // my sample input
        {
          text: "Generate a detailed travel itinerary for a 7-day trip to Paris, France for a couple on a cheap budget. Include the following elements in JSON format: Hotel Options: (give at least 4 hotel options) HotelName: The name of the hotel. HotelAddress: The full address of the hotel. Price: The nightly cost of staying at the hotel (in a range of what it normally costs per night at the hotel. Ex output: $200-300 per night. Rating: The hotel’s rating out of 5. Description: A brief description of the hotel, including amenities, proximity to key attractions, and any special features. ItineraryDetails for Each Day (Day 1, Day 2, Day 3, etc also ensure that the itinerary is for the full day (so in order from day to night) and then make sure there is at least 5 things each day. Also make sure to pick events for the itinerary depending on the budget. If its a cheap budget pick cheap but good options and if its a more expensive budget, pick expensive things): Day: The specific day of the itinerary. PlacesToVisit: A list of places to visit each day. (Make sure the itinerary is not vague, for example don’t include arrival and leaving of the hotel and make sure every place is specific (with location). So don’t say “relaxing spa treatment” and say the address of it to be “Your Hotel Spa or Recommended Spa”. So, include specific names for each of the places) PlaceName: The name of the place to visit. PlaceNameSearch: This is almost the same as PlaceName but give me JUST the exact name of the place so don’t include “Dinner at (Place Name) or Lunch at (Place Name) or Evening at (Place Name). I will only use this to use it for my backend to search for this exact location so including other things besides JUST the name is useless for PlaceNameSearch. PlaceDetails: A description of the place, including what it’s known for, activities available, and any special considerations. Make sure the description is NO MORE than 3 sentences while keeping it appealing and concise. PlaceAddress: The full address of the place. TicketPricing: The cost of entry or any associated fees. (DO NOT say “depends on order or location” in any way. DO NOT be vague. Give a range if you need to and then add (depends on order for example if there is a restaurant, do not say “depends on order”, instead include the average range of price for a meal at that restaurant and then say depends on order like so “$10-15 (depends on order)” and if its not a place to eat, do not say “depends on order” say something else that makes sense, for example at a spa place, you would say something like “$50-100 (depends on service).” BestTimeToVisit: The exact time to visit the place (e.g., 10:00 AM, 2:30 PM) based on crowd levels, weather, or other factors. Also include in this how long someone should stay there for (e.g., if they got to a park at 10:00 AM, they might leave at 11:30 AM so the output will be like: 10:00 AM - 11:30 AM) and ensure that all times are specific (e.g., 9:00 AM, 2:00 PM) rather than vague (e.g., morning, evening) TravelTime: The estimated travel time from the hotel or previous location to this place in minutes. Make SURE to put this in the format of: (travel time from previous location) so for example if you went to a lake beforehand: (10 mins from the lake) you should use the PlaceNameSearch as the location so like so: (travel time from PlaceNameSearch). Format Requirements: Keep the budget considerations in mind for both the hotel and the itinerary, so if its a cheap budget, make sure to pick affordable options for the hotel and places to visit, if its a medium range budget, make sure to pick medium ranged options for the hotel and places to visit, and if its a premium budget, make sure to pick premium options for the hotel and places to visit. Ensure the itinerary is well-balanced, including a mix of iconic attractions, leisure time, and local experiences. And make sure all fields are filled and DO NOT have “N/A”. For the url fields the max url length is 100, so if the url is any bigger just stop. For the itinerary DO NOT include checking into a hotel as a part of the itinerary. I want you to create things to do without assuming a hotel. So don’t include hotel spas and massages for example. Lastly, if its for a couple, include couple things in the itinerary, if its for a family, include family things in the itinerary, etc. Provide the information in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        // what the ai outputted
        {
          text: '```json\n{\n  "HotelOptions": [\n    {\n      "HotelName": "Hôtel du Nord",\n      "HotelAddress": "102 Rue du Faubourg du Temple, 75010 Paris, France",\n      "Price": "$100-150 per night",\n      "Rating": 4,\n      "Description": "A charming budget-friendly hotel located in the vibrant 10th arrondissement. It offers basic but comfortable rooms and is within walking distance of Canal Saint-Martin and the Place de la République."\n    },\n    {\n      "HotelName": "Hôtel de France",\n      "HotelAddress": "14 Rue de France, 75010 Paris, France",\n      "Price": "$150-200 per night",\n      "Rating": 4.5,\n      "Description": "A stylish hotel with a modern design, offering comfortable rooms and a friendly atmosphere. It is located in the heart of the Canal Saint-Martin district, close to many bars, restaurants, and shops."\n    },\n    {\n      "HotelName": "Hôtel Le Petit Paris",\n      "HotelAddress": "5 Rue de la Parcheminerie, 75005 Paris, France",\n      "Price": "$200-250 per night",\n      "Rating": 4.5,\n      "Description": "A boutique hotel with a charming Parisian vibe, offering beautifully decorated rooms and a prime location in the Latin Quarter, close to the Sorbonne University and the Seine River."\n    },\n    {\n      "HotelName": "Hôtel Saint-André des Arts",\n      "HotelAddress": "6 Rue Saint-André des Arts, 75006 Paris, France",\n      "Price": "$250-300 per night",\n      "Rating": 4.5,\n      "Description": "A historic hotel in the heart of Saint-Germain-des-Prés, offering elegant rooms and a traditional Parisian ambiance. It is close to many famous cafes, art galleries, and boutiques."\n    }\n  ],\n  "ItineraryDetails": [\n    {\n      "Day": "Day 1",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Explore the Louvre Museum",\n          "PlaceNameSearch": "Louvre Museum",\n          "PlaceDetails": "One of the world\'s largest and most famous museums, housing masterpieces like the Mona Lisa and Venus de Milo. Take your time to admire the extensive collection of art, sculpture, and artifacts.",\n          "PlaceAddress": "Musée du Louvre, 75001 Paris, France",\n          "TicketPricing": "€17 for adults (online purchase recommended)",\n          "BestTimeToVisit": "9:00 AM - 11:00 AM (to avoid the crowds)",\n          "TravelTime": "(30 mins from Hôtel du Nord)"\n        },\n        {\n          "PlaceName": "Lunch at a local cafe in the Latin Quarter",\n          "PlaceNameSearch": "Le Petit Cambodge",\n          "PlaceDetails": "Enjoy a delicious and affordable meal at this popular Cambodian restaurant in the Latin Quarter. The atmosphere is vibrant, and the food is flavorful.",\n          "PlaceAddress": "12 Rue Alibert, 75010 Paris, France",\n          "TicketPricing": "$10-15 (depends on order)",\n          "BestTimeToVisit": "12:00 PM - 1:30 PM",\n          "TravelTime": "(30 mins from Louvre Museum)"\n        },\n        {\n          "PlaceName": "Visit the Pantheon",\n          "PlaceNameSearch": "Pantheon",\n          "PlaceDetails": "A magnificent neoclassical church housing the tombs of famous French figures like Victor Hugo and Marie Curie. Climb to the top for panoramic views of the city.",\n          "PlaceAddress": "Place du Panthéon, 75005 Paris, France",\n          "TicketPricing": "€9.50 for adults",\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(10 mins from Le Petit Cambodge)"\n        },\n        {\n          "PlaceName": "Relax and enjoy a picnic in the Jardin du Luxembourg",\n          "PlaceNameSearch": "Jardin du Luxembourg",\n          "PlaceDetails": "A beautiful formal garden with manicured lawns, fountains, and statues. It\'s a perfect place to unwind and enjoy the Parisian atmosphere.",\n          "PlaceAddress": "75006 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "4:00 PM - 6:00 PM",\n          "TravelTime": "(15 mins from Pantheon)"\n        },\n        {\n          "PlaceName": "Dinner at a traditional French bistro",\n          "PlaceNameSearch": "Le Bouillon Chartier",\n          "PlaceDetails": "A historic and bustling bistro serving classic French dishes at affordable prices. It offers a lively atmosphere and authentic Parisian cuisine.",\n          "PlaceAddress": "7 Rue du Faubourg Montmartre, 75009 Paris, France",\n          "TicketPricing": "$15-20 (depends on order)",\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(25 mins from Jardin du Luxembourg)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 2",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Explore the charming streets of Montmartre",\n          "PlaceNameSearch": "Montmartre",\n          "PlaceDetails": "A historic and artistic neighborhood known for its cobblestone streets, charming cafes, and the iconic Sacré-Coeur Basilica. Wander through the streets and soak up the Bohemian atmosphere.",\n          "PlaceAddress": "18th arrondissement, 75018 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM",\n          "TravelTime": "(45 mins from Le Bouillon Chartier)"\n        },\n        {\n          "PlaceName": "Visit the Sacré-Coeur Basilica",\n          "PlaceNameSearch": "Sacré-Coeur Basilica",\n          "PlaceDetails": "A stunning white-domed basilica offering breathtaking panoramic views of Paris from its terrace. Admire the intricate mosaics and stained glass windows.",\n          "PlaceAddress": "Place du Tertre, 75018 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "12:00 PM - 2:00 PM",\n          "TravelTime": "(5 mins from Montmartre)"\n        },\n        {\n          "PlaceName": "Lunch at a cafe in the Place du Tertre",\n          "PlaceNameSearch": "Le Lapin Agile",\n          "PlaceDetails": "A historic and charming cafe in Montmartre known for its lively atmosphere, cabaret performances, and traditional French cuisine.",\n          "PlaceAddress": "22 Rue de l\'Abreuvoir, 75018 Paris, France",\n          "TicketPricing": "$15-20 (depends on order)",\n          "BestTimeToVisit": "2:00 PM - 3:30 PM",\n          "TravelTime": "(5 mins from Sacré-Coeur Basilica)"\n        },\n        {\n          "PlaceName": "Visit the Musée de Montmartre",\n          "PlaceNameSearch": "Musée de Montmartre",\n          "PlaceDetails": "A museum dedicated to the history of Montmartre, showcasing art and artifacts related to the artists and bohemians who lived in the area.",\n          "PlaceAddress": "12 Rue Cortot, 75018 Paris, France",\n          "TicketPricing": "€10 for adults",\n          "BestTimeToVisit": "4:00 PM - 5:30 PM",\n          "TravelTime": "(10 mins from Le Lapin Agile)"\n        },\n        {\n          "PlaceName": "Enjoy a romantic evening stroll along the Seine River",\n          "PlaceNameSearch": "Seine River",\n          "PlaceDetails": "Take a romantic stroll along the banks of the Seine River, admiring the iconic sights like the Eiffel Tower and Notre Dame Cathedral. Enjoy a leisurely walk and soak up the charm of Paris.",\n          "PlaceAddress": "75000 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(45 mins from Musée de Montmartre)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 3",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Explore the charming streets of Le Marais",\n          "PlaceNameSearch": "Le Marais",\n          "PlaceDetails": "A historic and trendy neighborhood known for its cobblestone streets, boutiques, art galleries, and charming cafes. Wander through the streets and discover hidden gems.",\n          "PlaceAddress": "4th arrondissement, 75004 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM",\n          "TravelTime": "(45 mins from Seine River)"\n        },\n        {\n          "PlaceName": "Visit the Musée Carnavalet",\n          "PlaceNameSearch": "Musée Carnavalet",\n          "PlaceDetails": "A museum dedicated to the history of Paris, showcasing artifacts, paintings, and sculptures that tell the story of the city\'s evolution.",\n          "PlaceAddress": "23 Rue de Sévigné, 75003 Paris, France",\n          "TicketPricing": "€10 for adults",\n          "BestTimeToVisit": "12:00 PM - 2:00 PM",\n          "TravelTime": "(10 mins from Le Marais)"\n        },\n        {\n          "PlaceName": "Lunch at a traditional French bakery",\n          "PlaceNameSearch": "Boulangerie Poilâne",\n          "PlaceDetails": "Enjoy a delicious and authentic French lunch at this famous bakery, known for its sourdough bread and pastries. Try the traditional pain au chocolat or a croissant.",\n          "PlaceAddress": "8 Rue du Cherche-Midi, 75006 Paris, France",\n          "TicketPricing": "$5-10 (depends on order)",\n          "BestTimeToVisit": "2:00 PM - 3:30 PM",\n          "TravelTime": "(20 mins from Musée Carnavalet)"\n        },\n        {\n          "PlaceName": "Visit the Centre Pompidou",\n          "PlaceNameSearch": "Centre Pompidou",\n          "PlaceDetails": "A modern art museum housed in a unique and iconic building. Explore the vast collection of contemporary art, including works by Picasso, Kandinsky, and Matisse.",\n          "PlaceAddress": "Place Georges-Pompidou, 75004 Paris, France",\n          "TicketPricing": "€16 for adults",\n          "BestTimeToVisit": "4:00 PM - 6:00 PM",\n          "TravelTime": "(25 mins from Boulangerie Poilâne)"\n        },\n        {\n          "PlaceName": "Enjoy a romantic dinner at a restaurant with a view",\n          "PlaceNameSearch": "Le Jules Verne",\n          "PlaceDetails": "Indulge in a memorable dining experience at this elegant restaurant located on the second floor of the Eiffel Tower, offering breathtaking panoramic views of the city.",\n          "PlaceAddress": "Avenue Gustave Eiffel, 75007 Paris, France",\n          "TicketPricing": "$80-120 (depends on order)",\n          "BestTimeToVisit": "8:00 PM - 10:00 PM",\n          "TravelTime": "(45 mins from Centre Pompidou)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 4",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Explore the Palace of Versailles",\n          "PlaceNameSearch": "Palace of Versailles",\n          "PlaceDetails": "A grand royal palace located just outside of Paris, known for its opulent interiors, manicured gardens, and historical significance. Take a guided tour or wander through the grounds at your own pace.",\n          "PlaceAddress": "Place d\'Armes, 78000 Versailles, France",\n          "TicketPricing": "€20 for adults (online purchase recommended)",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM",\n          "TravelTime": "(1 hour from Le Jules Verne)"\n        },\n        {\n          "PlaceName": "Lunch at a cafe in the Palace of Versailles",\n          "PlaceNameSearch": "Le Café de la Régence",\n          "PlaceDetails": "Enjoy a traditional French lunch at this charming cafe located within the Palace of Versailles. The atmosphere is elegant and the food is delicious.",\n          "PlaceAddress": "Place d\'Armes, 78000 Versailles, France",\n          "TicketPricing": "$10-15 (depends on order)",\n          "BestTimeToVisit": "12:00 PM - 1:30 PM",\n          "TravelTime": "(5 mins from Palace of Versailles)"\n        },\n        {\n          "PlaceName": "Explore the gardens of Versailles",\n          "PlaceNameSearch": "Gardens of Versailles",\n          "PlaceDetails": "Take a leisurely stroll through the manicured gardens of Versailles, admiring the fountains, statues, and intricate flowerbeds. It\'s a peaceful and serene escape from the city.",\n          "PlaceAddress": "Place d\'Armes, 78000 Versailles, France",\n          "TicketPricing": "Free entry (with Palace of Versailles ticket)",\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(5 mins from Le Café de la Régence)"\n        },\n        {\n          "PlaceName": "Enjoy a romantic boat ride on the Grand Canal",\n          "PlaceNameSearch": "Grand Canal",\n          "PlaceDetails": "Take a relaxing boat ride on the Grand Canal, a picturesque waterway running through the gardens of Versailles. It\'s a unique and romantic way to experience the beauty of the palace grounds.",\n          "PlaceAddress": "Place d\'Armes, 78000 Versailles, France",\n          "TicketPricing": "€10 for adults",\n          "BestTimeToVisit": "4:00 PM - 5:30 PM",\n          "TravelTime": "(10 mins from Gardens of Versailles)"\n        },\n        {\n          "PlaceName": "Dinner at a local restaurant in Versailles",\n          "PlaceNameSearch": "La Table du Roy",\n          "PlaceDetails": "Enjoy a delicious and affordable dinner at this local restaurant in Versailles, serving traditional French cuisine and a warm atmosphere.",\n          "PlaceAddress": "1 Rue de la Paroisse, 78000 Versailles, France",\n          "TicketPricing": "$20-25 (depends on order)",\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(10 mins from Grand Canal)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 5",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Visit the Eiffel Tower",\n          "PlaceNameSearch": "Eiffel Tower",\n          "PlaceDetails": "An iconic landmark of Paris, offering stunning panoramic views of the city from its observation decks. Take a lift or climb to the top and enjoy the breathtaking scenery.",\n          "PlaceAddress": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",\n          "TicketPricing": "€26 for adults (online purchase recommended)",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM (to avoid the crowds)",\n          "TravelTime": "(1 hour from La Table du Roy)"\n        },\n        {\n          "PlaceName": "Lunch at a cafe near the Eiffel Tower",\n          "PlaceNameSearch": "Le Café de l\'Avenue",\n          "PlaceDetails": "Enjoy a light and affordable lunch at this charming cafe located near the Eiffel Tower. It offers a relaxed atmosphere and a variety of sandwiches and salads.",\n          "PlaceAddress": "49 Avenue de la Bourdonnais, 75007 Paris, France",\n          "TicketPricing": "$10-15 (depends on order)",\n          "BestTimeToVisit": "12:00 PM - 1:30 PM",\n          "TravelTime": "(5 mins from Eiffel Tower)"\n        },\n        {\n          "PlaceName": "Explore the Champ de Mars",\n          "PlaceNameSearch": "Champ de Mars",\n          "PlaceDetails": "A large park located at the foot of the Eiffel Tower, offering a green space for relaxation and enjoyment. It\'s a perfect place for a picnic or a leisurely stroll.",\n          "PlaceAddress": "Champ de Mars, 75007 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(5 mins from Le Café de l\'Avenue)"\n        },\n        {\n          "PlaceName": "Visit the Musée d\'Orsay",\n          "PlaceNameSearch": "Musée d\'Orsay",\n          "PlaceDetails": "A museum housed in a former railway station, showcasing Impressionist and Post-Impressionist art, including works by Monet, Renoir, and Van Gogh.",\n          "PlaceAddress": "1 Rue de la Légion d\'Honneur, 75007 Paris, France",\n          "TicketPricing": "€16 for adults",\n          "BestTimeToVisit": "4:00 PM - 6:00 PM",\n          "TravelTime": "(30 mins from Champ de Mars)"\n        },\n        {\n          "PlaceName": "Enjoy a romantic evening dinner cruise on the Seine River",\n          "PlaceNameSearch": "Bateaux Mouches",\n          "PlaceDetails": "Experience the charm of Paris from the water with a romantic dinner cruise on the Seine River. Admire the illuminated city lights and enjoy a delicious meal while cruising past iconic landmarks.",\n          "PlaceAddress": "Port de la Conférence, 75008 Paris, France",\n          "TicketPricing": "$80-120 (depends on order)",\n          "BestTimeToVisit": "8:00 PM - 10:00 PM",\n          "TravelTime": "(30 mins from Musée d\'Orsay)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 6",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Explore the Latin Quarter",\n          "PlaceNameSearch": "Latin Quarter",\n          "PlaceDetails": "A vibrant and historic neighborhood known for its student population, charming cafes, and bookstores. Wander through the streets and discover hidden gems.",\n          "PlaceAddress": "5th arrondissement, 75005 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM",\n          "TravelTime": "(45 mins from Bateaux Mouches)"\n        },\n        {\n          "PlaceName": "Visit the Sorbonne University",\n          "PlaceNameSearch": "Sorbonne University",\n          "PlaceDetails": "A prestigious university that has been a center of learning for centuries. Take a tour of the historic buildings and admire the architecture.",\n          "PlaceAddress": "17 Rue de la Sorbonne, 75005 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "12:00 PM - 2:00 PM",\n          "TravelTime": "(10 mins from Latin Quarter)"\n        },\n        {\n          "PlaceName": "Lunch at a traditional French creperie",\n          "PlaceNameSearch": "Crêperie de la Sorbonne",\n          "PlaceDetails": "Enjoy a delicious and affordable lunch at this traditional French creperie in the Latin Quarter. Try the classic savory or sweet crepes.",\n          "PlaceAddress": "10 Rue de la Sorbonne, 75005 Paris, France",\n          "TicketPricing": "$10-15 (depends on order)",\n          "BestTimeToVisit": "2:00 PM - 3:30 PM",\n          "TravelTime": "(5 mins from Sorbonne University)"\n        },\n        {\n          "PlaceName": "Visit the Shakespeare and Company bookstore",\n          "PlaceNameSearch": "Shakespeare and Company",\n          "PlaceDetails": "A famous and historic bookstore in the Latin Quarter, known for its literary atmosphere and wide selection of books. Browse the shelves and find a unique treasure.",\n          "PlaceAddress": "37 Rue de la Bûcherie, 75005 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "4:00 PM - 5:30 PM",\n          "TravelTime": "(10 mins from Crêperie de la Sorbonne)"\n        },\n        {\n          "PlaceName": "Enjoy a romantic evening walk through the Jardin des Plantes",\n          "PlaceNameSearch": "Jardin des Plantes",\n          "PlaceDetails": "A beautiful botanical garden and zoo located in the Latin Quarter. Stroll through the gardens, admire the plants and flowers, and visit the zoo to see a variety of animals.",\n          "PlaceAddress": "57 Rue Cuvier, 75005 Paris, France",\n          "TicketPricing": "Free entry to the gardens, €20 for the zoo",\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(15 mins from Shakespeare and Company)"\n        }\n      ]\n    },\n    {\n      "Day": "Day 7",\n      "PlacesToVisit": [\n        {\n          "PlaceName": "Visit the Notre Dame Cathedral",\n          "PlaceNameSearch": "Notre Dame Cathedral",\n          "PlaceDetails": "A majestic gothic cathedral on the Île de la Cité, known for its iconic architecture and historical significance. Admire the stained glass windows and the intricate carvings.",\n          "PlaceAddress": "6 Parvis Notre-Dame - Place Jean-Paul II, 75004 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "10:00 AM - 12:00 PM",\n          "TravelTime": "(45 mins from Jardin des Plantes)"\n        },\n        {\n          "PlaceName": "Lunch at a cafe near Notre Dame Cathedral",\n          "PlaceNameSearch": "Le Petit Paris",\n          "PlaceDetails": "Enjoy a light and affordable lunch at this charming cafe located near Notre Dame Cathedral. It offers a relaxed atmosphere and a variety of sandwiches and salads.",\n          "PlaceAddress": "4 Rue du Cloître Notre-Dame, 75004 Paris, France",\n          "TicketPricing": "$10-15 (depends on order)",\n          "BestTimeToVisit": "12:00 PM - 1:30 PM",\n          "TravelTime": "(5 mins from Notre Dame Cathedral)"\n        },\n        {\n          "PlaceName": "Explore the Île de la Cité",\n          "PlaceNameSearch": "Île de la Cité",\n          "PlaceDetails": "The historical heart of Paris, home to Notre Dame Cathedral, the Conciergerie, and the Sainte-Chapelle. Take a leisurely stroll and discover the island\'s rich history.",\n          "PlaceAddress": "75001 Paris, France",\n          "TicketPricing": "Free entry",\n          "BestTimeToVisit": "2:00 PM - 4:00 PM",\n          "TravelTime": "(5 mins from Le Petit Paris)"\n        },\n        {\n          "PlaceName": "Visit the Conciergerie",\n          "PlaceNameSearch": "Conciergerie",\n          "PlaceDetails": "A former royal palace turned prison during the French Revolution, now a historic monument and a museum. Explore the cells and learn about the history of the French Revolution.",\n          "PlaceAddress": "2 Rue de la Cité, 75001 Paris, France",\n          "TicketPricing": "€9 for adults",\n          "BestTimeToVisit": "4:00 PM - 5:30 PM",\n          "TravelTime": "(10 mins from Île de la Cité)"\n        },\n        {\n          "PlaceName": "Enjoy a final farewell dinner at a traditional French restaurant",\n          "PlaceNameSearch": "Le Bouillon Chartier",\n          "PlaceDetails": "Indulge in a delicious and affordable final meal at this historic and bustling bistro, serving classic French dishes at affordable prices. It offers a lively atmosphere and authentic Parisian cuisine.",\n          "PlaceAddress": "7 Rue du Faubourg Montmartre, 75009 Paris, France",\n          "TicketPricing": "$15-20 (depends on order)",\n          "BestTimeToVisit": "7:00 PM - 9:00 PM",\n          "TravelTime": "(30 mins from Conciergerie)"\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
