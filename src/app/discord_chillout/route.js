export async function GET(req, res) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [key, ...v] = c.trim().split("=");
      return [key, decodeURIComponent(v.join("="))];
    })
  );

  const userId = cookies["auth"];

  if (!userId) {
    return new Response("Unauthorized.", { status: 401, headers: {"Location": `${process.env.NEXT_PUBLIC_BASE_URL}`} });
  }

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "https://discord.gg/YeZZDxMj4u",
    },
  });
}