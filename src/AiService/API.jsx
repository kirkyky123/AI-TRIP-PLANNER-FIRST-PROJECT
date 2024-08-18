import axios from "axios";

const URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const placeDetails = (data) => axios.post(URL, data, config);

export const REFERENCE_PHOTO_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=4000&key="+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;