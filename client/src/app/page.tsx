import LoginCard from "@/ui/views/login/LoginCard";
import LoginLinks from "@/ui/views/login/content/links/LoginLinks";

export default function Home() {
  return (
     <LoginCard isHome>
       <LoginLinks isHome />
     </LoginCard>
  );
}
