import logoImg from "@/public/assets/images/logo.svg";
const Logo = () => {
  return (
    <div className="w-32">
      <img src={logoImg} alt="Logo" className="w-full" />
    </div>
  );
};
export default Logo;
