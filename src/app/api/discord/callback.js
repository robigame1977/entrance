import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const data = new URLSearchParams();
  data.append("client_id", process.env.DISCORD_CLIENT_ID);
  data.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("redirect_uri", process.env.DISCORD_REDIRECT_URI);

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });

    const tokenJson = await tokenResponse.json();
    const accessToken = tokenJson.access_token;

    // Fetch user info
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userJson = await userResponse.json();

    // userJson contains the user ID, username, discriminator, etc.
    res.status(200).json({ userId: userJson.id, username: userJson.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
