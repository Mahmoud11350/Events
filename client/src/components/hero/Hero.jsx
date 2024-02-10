import { Button } from "../ui/button";
import heroImg from "@/public/assets/images/hero.png";

const Hero = () => {
  return (
    <section className="bg-[#F6F8FD]">
      <div className="wrapper min-h-[calc(100vh-80px)] ">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 ">
          <div>
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-medium-24 my-4">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button className="text-white rounded-full p-6 text-lg">
              Explore Now{" "}
            </Button>
          </div>
          <div className="flex-center">
            <img
              src={heroImg}
              alt="Hero IMG"
              className="h-[calc(70vh-80px)] md:h-[calc(90vh-80px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
