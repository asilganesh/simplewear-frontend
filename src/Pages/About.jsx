import React from "react";
import { AiFillCustomerService } from "react-icons/ai";
import { RiExchangeFundsLine, RiVerifiedBadgeFill } from "react-icons/ri";
import hangedShirts from "../assets/hangedShirts.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="home max-w-[1200px] w-[80vw] mx-auto">
        <section className="banner relative mb-10">
          <img
            src={hangedShirts}
            alt="Banner Image"
            className="w-full object-cover border-gray-400 border xsm:h-72 "
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
            <h1 className="lg:text-4xl md:text-3xl font-sans font-medium text-white ">
              <Link to="/">Home</Link> > About Us{" "}
            </h1>
          </div>
        </section>

        <section className="aboutUs my-10">
          <div className="text-center mb-10">
            <p class="text-gray-500">
              ABOUT <span class="text-gray-700 font-medium">US</span>
            </p>
          </div>
          <div className="grid lg:grid-rows-2 lg:grid-cols-2 gap-5 md:grid-rows-1">
            <div className="flex flex-col justify-center items-center lg:text-6xl md:text-5xl xsm:text-3xl">
              Why Choose Us
            </div>
            <div className="text-gray-600 flex flex-col gap-y-4 ">
              <p>
                At Simplewear, we pride ourselves on offering high-quality,
                stylish, and affordable clothing for all. Based in India, our
                mission is to provide customers with a seamless shopping
                experience, delivering fashion that combines comfort and
                durability. Whether you're looking for everyday essentials or
                the latest trends, Simplewear has something for everyone.
              </p>

              <p>
                We source only the best materials to ensure our clothes are both
                soft to the touch and long-lasting. Each piece is carefully
                crafted to meet the diverse fashion needs of our customers,
                while also focusing on sustainability and ethical practices.
                With our easy-to-use online platform and dedicated customer
                support, shopping with us is hassle-free.
              </p>

              <p>
                Choose Simplewear for our commitment to quality, style, and
                customer satisfaction. We believe that looking good should never
                compromise comfort or sustainability. Trust us to bring you the
                best in modern fashion, designed to suit every occasion.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center lg:text-6xl md:text-5xl  xsm:text-3xl lg:order-4 ">
             Our Mission
            </div>

            <div className="text-gray-600 flex flex-col gap-y-4 lg:order-3 ">
              <p>
                At Simplewear, our mission is to redefine the clothing
                experience by providing high-quality, stylish, and affordable
                apparel that meets the diverse needs of our customers. We strive
                to empower individuals through fashion that combines comfort,
                durability, and contemporary design. Our commitment to
                sustainability drives us to source eco-friendly materials and
                implement ethical practices in our production processes.
              </p>

              <p>
              We aim
                to create a positive impact on the community while ensuring
                customer satisfaction through exceptional service and innovative
                products. At Simplewear, we believe that everyone deserves
                access to fashionable clothing that not only looks good but also
                feels good to wear. Join us on our journey to make quality
                fashion accessible to all.
              </p>
            </div>
            
          </div>
        </section>

        
      </div>
    </>
  );
};

export default About;
