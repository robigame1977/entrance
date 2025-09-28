import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import '@styles/nav.css';
import '@styles/card.css';

const base_url = encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL!)
const discord_url = `https://discord.com/oauth2/authorize?client_id=1421609386333180067&response_type=code&redirect_uri=${base_url}%2Fapi%2Fdiscord%2Fcallback&scope=identify`

export default function Request() {
  return (
    <h1 
      style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white', 
        zIndex: 10 
      }}
    >
    <Card className="card">
      <CardHeader className="card_header">
        <CardTitle className="card_h1">Register</CardTitle>
        <CardDescription className="card_h2">Security checkpoint powered by <a href="https://projects.isopl.pl/">ICv2</a> systems</CardDescription>
      </CardHeader>
      <CardContent className="card_p">
        <p>In order to access resources below, you will be required to connect your ICv2 account with you Discord account and then request Level 1 access. To register ICv2 account, please head to panel.isopl.pl website.</p>
        <div className="buttons">
          <Button variant="outline" className="login_btn" asChild><Link href={discord_url}>Login with Discord</Link></Button>
          <Button variant="outline" className="req_btn"><Link href="/">Go back</Link></Button>
        </div>
      </CardContent>
      <CardFooter className="card_f">
        <p>Created with ❤️ by ISOPL</p>
      </CardFooter>
    </Card>
    </h1>
  );
}

/*

<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    </main>
  </div>

*/