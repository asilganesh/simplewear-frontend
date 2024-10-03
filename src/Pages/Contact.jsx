import React from "react";
import phone from "../assets/phone.jpg";

const Contact = () => {
  return (
    <>
      <div className="home max-w-[1200px] w-[80vw] mx-auto">
        <section className="mb-10">
          <div class="text-center my-10">
            <p class="text-gray-500">
              CONTACT <span class="text-gray-700 font-medium">US</span>
            </p>
          </div>

          <div className="flex ">
            <img src={phone} alt="image" className=" w-1/2" />
            <div className="flex flex-col gap-y-8 p-10 text-gray-500">
              <div>
                Thank you for your interest in Simplewear! We are here to assist
                you with any questions, feedback, or concerns you may have. Our
                dedicated customer service team is committed to providing you
                with the best experience possible.
              </div>
              <div className="flex flex-col gap-y-2">
               <p><span className="font-bold"> Customer Support:</span> If you need assistance with your order,
               product inquiries, or returns, please reach out to us:</p>
                <p> <span className="font-medium">Email:</span> support@simplewear.in </p>
                <p> <span className="font-medium">Phone:</span> +91 123 456 7890 </p>
                <p> <span className="font-medium">Hours:</span>Monday to Friday, 9 AM - 6 PM IST </p>
                
              </div>

              <div className="flex flex-col gap-y-2">
               <p><span className="font-bold">      Visit Us:</span> You can also visit us at our head office: </p>
                <p> Simplewear Pvt. Ltd. </p>
                <p> 123 Fashion Street, </p>
                <p> Mumbai, Maharashtra, 400001, India </p>
                
              </div>


              <div className="flex flex-col gap-y-2">
               <p><span className="font-bold"> Follow Us:</span> Stay connected with us on social media for the latest
               updates, promotions, and fashion tips!  </p>
                <p> facebook </p>
                <p> twitter</p>
                <p> instagram </p>
                
              </div>
              
             
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
