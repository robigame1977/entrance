import fetch from "node-fetch";
import { validate_v1 } from "@/lib/whitelist";

async function handler(req, res, code) {

  if (!code) {
    return {status:400, content:"No code provided"};
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

    if (!userResponse) {
      res.status(400);
      return {status: 400, content: "Invalid code. Please try again."};
    }

    const userJson = await userResponse.json();

    if (!userJson.id) {
      return {status: 400, content: "Invalid code. Please try again."};
    }

    // userJson contains the user ID, username, discriminator, etc.
    return {status:200, content:userJson.id}
  } catch (err) {
    console.error(err);
    return {status: 500, content: "Soemthing went wrong during processing this request."};
    //res.status(500).json({ error: "Something went wrong" });
  }
}


export async function GET(req, res) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No code provided.", { status: 400 });
  }

  try {
    const result = await handler(req, res, code); 
    console.log(result.content) // USERID lub ERROR

    if (result.status == 200)
    {
      if (validate_v1(result.content)) {
        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": `auth=${encodeURIComponent(result.content)}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=3600`,
            "Location": `${process.env.NEXT_PUBLIC_BASE_URL}/discord_chillout`,
          },
        });
      } else {
        return new Response("Not verified.", {
          status: result.status,
          headers: { "Content-Type": "text/plain" },
        });
      }
    } else
    {
      return new Response(result.content, {
        status: result.status,
        headers: { "Content-Type": "text/plain" },
      });
    }

    
  } catch (err) {
    console.error("Discord callback error:", err);

    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
    
  
}