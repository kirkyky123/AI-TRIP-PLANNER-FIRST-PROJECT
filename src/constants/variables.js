export const MAX_DAYS = 7;

// //testing to remove ""
// function escapeInnerQuotes(jsonString) {
//   return jsonString.replace(/(?<=: ?")(.+?)(?="[,}])/g, function(match) {
//     return match.replace(/"/g, '\\"');
//   });
// }

// let badJson = '{"PlaceDetails": "Relax and enjoy breathtaking views of the Grand Harbour from these "picturesque" gardens. Take a stroll, admire the flowers, and soak in the tranquility."}';
// let fixedJson = escapeInnerQuotes(badJson);
// let parsedJson = JSON.parse(fixedJson);
// console.log(parsedJson);