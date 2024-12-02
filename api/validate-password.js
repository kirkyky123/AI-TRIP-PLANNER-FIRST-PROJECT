export default function handler(req, res) {
  const { password } = req.body; // Get the password from the request body

  // Compare the input password with the environment variable
  if (password === import.meta.env.VERCEL_PASSWORD_KEY) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
}
