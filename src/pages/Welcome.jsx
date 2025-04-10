import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center p-8 bg-white shadow">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to the Cancer & Thyroid Awareness Platform
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl">
          Empowering communities with knowledge and resources about Cancer and Thyroid diseases.
          Explore reliable data, AI-powered insights, and trusted resources to stay informed.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="secondary" className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 rounded-full shadow transition-all">
            <a href="#learn-more">Learn More</a>
          </Button>
          <Button asChild variant="secondary" className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 rounded-full shadow transition-all">
            <a href="#resources">Resources</a>
          </Button>
        </div>
      </header>

      {/* Image Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gray-100">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DpkDI1fmUEfzfuH5pYYPmdopIggNkAkYQA&s"
          alt="Cancer Awareness"
          className="rounded-xl shadow-lg w-80"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAGbEpT3D5CkK7YMM9UoBVFR3rdzM6eAg7w&s"
          alt="Thyroid Awareness"
          className="rounded-xl shadow-lg w-80"
        />
      </section>

      {/* About Section */}
      <section id="learn-more" className="p-8 bg-white shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">About Cancer & Thyroid Diseases</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Cancer</strong> is a large group of diseases that can start in almost any organ or tissue of the body when abnormal cells grow uncontrollably, go beyond their usual boundaries to invade adjoining parts of the body and/or spread to other organs. The latter process is called metastasizing and is a major cause of death from cancer. <a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Learn more about cancer</a>.
          </p>
          <p>
            Cancer is the second leading cause of death globally, accounting for an estimated 9.6 million deaths, or 1 in 6 deaths, in 2018. The most common types of cancer in men are lung, prostate, colorectal, stomach, and liver cancer, while in women, they are breast, colorectal, lung, cervical, and thyroid cancer. <a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">See more statistics</a>.
          </p>
          <p>
            <strong>Thyroid diseases</strong> primarily affect the butterfly-shaped thyroid gland located in the neck below the Adam's apple. This gland secretes hormones that influence the metabolic rate and protein synthesis and play a crucial role in growth and development in children. Disorders include hypothyroidism, hyperthyroidism, thyroid nodules, and thyroid cancer. <a href="https://en.wikipedia.org/wiki/Thyroid" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Learn more about the thyroid gland</a>.
          </p>
          <p>
            Thyroid diseases are relatively common, affecting millions of people worldwide. Women are disproportionately affected, especially by thyroid cancer, which is more common in younger females. Iodine deficiency is a major cause of hypothyroidism in some regions. <a href="https://www.who.int/health-topics/thyroid-disease" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">See more on thyroid diseases</a>.
          </p>
          <p>
            Our platform is dedicated to spreading awareness, offering AI-based insights to help in early identification, and providing access to trusted global resources like the WHO and educational articles. Knowledge is power, and informed choices can save lives.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6 text-center space-y-6">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
      What Can You Do After Logging In?
    </h2>
    <p className="text-muted-foreground max-w-xl mx-auto">
      Access personalized tools and insights to help you understand cancer and thyroid conditions better.
      Use our prediction tool, explore interactive dashboards, and share your experiences to help others.
    </p>
    <div className="space-y-2">
      <ul className="list-disc text-left inline-block space-y-1">
        <li>Get predictions based on your health data</li>
        <li>Explore real-time dashboards and statistics</li>
        <li>Submit your own testimonial to inspire others</li>
        <li>Stay updated with the latest research and news</li>
      </ul>
    </div>
    <Button asChild className="mt-6">
      <a href="/login">Log In</a>
    </Button>
  </div>
</section>


      {/* Resources Section */}
      <section id="resources" className="p-8 bg-gray-100 shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Trusted Resources</h2>
        <ul className="space-y-4 max-w-3xl mx-auto text-lg">
          <li>
            <a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              World Health Organization - Cancer
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              Wikipedia - Cancer Overview
            </a>
          </li>
          <li>
            <a href="https://www.who.int/health-topics/thyroid-disease" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              World Health Organization - Thyroid Disease
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Thyroid" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              Wikipedia - Thyroid Information
            </a>
          </li>
        </ul>
      </section>


      {/* FAQ Section with Accordion */}
      <section className="p-8 bg-white shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto text-lg">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is early detection for cancer?</AccordionTrigger>
              <AccordionContent>
                Early detection means identifying cancer before symptoms arise, which significantly increases the chances of successful treatment. Regular screenings and knowing the warning signs are key. <a href="https://www.cancer.org/healthy/find-cancer-early.html" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Learn more about early detection</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What are common thyroid symptoms?</AccordionTrigger>
              <AccordionContent>
                Common symptoms include weight changes, fatigue, temperature sensitivity, and swelling in the neck. Always consult a doctor for accurate diagnosis. <a href="https://www.mayoclinic.org/diseases-conditions/thyroid-disease/symptoms-causes/syc-20351653" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">See more symptoms</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is this platform a replacement for medical advice?</AccordionTrigger>
              <AccordionContent>
                No, this platform is purely educational. Always seek professional medical advice for personal health concerns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can stress contribute to thyroid problems?</AccordionTrigger>
              <AccordionContent>
                Yes, stress can influence thyroid function indirectly by affecting immune response and hormonal balance. <a href="https://www.healthline.com/health/stress-and-thyroid" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Learn more about stress and thyroid health</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Are thyroid problems hereditary?</AccordionTrigger>
              <AccordionContent>
                Thyroid diseases can run in families, especially autoimmune thyroid conditions like Hashimoto's thyroiditis or Graves' disease. <a href="https://www.thyroid.org/thyroid-disease-and-genetics/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">See more on thyroid genetics</a>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
