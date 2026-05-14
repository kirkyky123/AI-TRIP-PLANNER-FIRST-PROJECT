import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

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
                  description: "Travel time from the previous place (or 'depends on hotel location' for the first place of the day)",
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

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200_000,
  responseMimeType: "application/json",
  responseSchema: schema,
};

// Each call gets a fresh session so users never share chat history.
export const startChatSession = () => model.startChat({ generationConfig });
