import WelcomeQuestion from "@/components/welcome/welcomeQuestion";

export default function welcome() {
  return ( <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
    <WelcomeQuestion welcomeText="안녕하세요. 우리 만난 적 있나요?"/>
  </div>);
};
