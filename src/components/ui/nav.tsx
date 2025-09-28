import { Button } from "@/components/ui/button"

export async function Navbar() {
  return (
    <nav>
      <h1>ISOPL.PL</h1>
      <ol>
        <li><a href="#" className="sel_item">Entrance</a></li>
        <li><a href="#">Biography</a></li>
      </ol>
      <Button variant="outline"><a href="#">Admin Mode</a></Button>
    </nav>
  )
}