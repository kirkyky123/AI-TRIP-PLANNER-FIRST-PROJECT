let msg = "```json{HotelOptions: [```";

if (msg.startsWith("```")) {
  msg = msg.slice(7);
}


if (msg.endsWith("```")) {
  msg = msg.slice(0,-3);
}

console.log(msg);