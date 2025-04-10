// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, BarChart3, BookOpen, Pencil } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=thyroid%20cancer&sortBy=publishedAt&pageSize=20&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        const data = await response.json();

        const healthKeywords = ["thyroid", "cancer", "tumor", "oncology", "treatment", "diagnosis", "health", "medicine"];
        const filteredArticles = data.articles.filter(article => {
          const text = `${article.title} ${article.description} ${article.content}`.toLowerCase();
          return healthKeywords.some(keyword => text.includes(keyword));
        });

        setNews(filteredArticles.slice(0, 4));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "newsletter"), { email });
      toast.success("Thank you for subscribing!");
      e.target.reset();
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header - Improved responsiveness */}
      <header className="bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 text-gray-800 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 shadow-lg rounded-b-lg">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Logo with responsive sizing */}
          <div className="relative flex-shrink-0">
            <img
              src="/logo.png"
              alt="Thyroid Awareness Logo"
              className="w-28 h-auto sm:w-32 md:w-36 lg:w-60 rounded-lg shadow-md border-2 border-teal-200 bg-white p-2"
            />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-teal-500 animate-pulse"></div>
          </div>

          {/* Text Content with improved spacing and alignment */}
          <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Thyroid Cancer Awareness
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
              Stay informed, stay safe. Access reliable insights and tools to understand and manage thyroid cancer risks.
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-1 md:gap-2">
              <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">Early Detection</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Treatment Options</span>
              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">Support Resources</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Improved spacing and grid layouts */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Quick Links - Adjusted grid for better mobile experience */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Explore Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-3" />,
                title: "Check Thyroid Cancer Risk",
                description: "Use our AI-powered tool to assess your thyroid cancer risk.",
                link: "/prediction",
                button: "Get Assessment"
              },
              {
                icon: <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-3" />,
                title: "View Thyroid Data Insights",
                description: "Explore data and visual dashboards on thyroid cancer trends.",
                link: "/dashboard",
                button: "View Dashboard"
              },
              {
                icon: <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-3" />,
                title: "Learn About Thyroid Cancer",
                description: "Access trusted information from WHO and other sources.",
                link: "https://en.wikipedia.org/wiki/Thyroid_cancer",
                button: "Read More"
              }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow rounded-2xl h-full">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3 h-full">
                  {item.icon}
                  <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 flex-grow">{item.description}</p>
                  <Button className="bg-orange-500 hover:bg-purple-700 text-white w-full sm:w-auto mt-2" asChild>
                    <Link to={item.link}>{item.button}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* News Section - Improved grid and card structure */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Latest Thyroid Cancer News</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {newsLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg space-y-3 p-4">
                  <Skeleton className="h-32 sm:h-40 lg:h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))
              : news.map((article, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                  {article.urlToImage ? (
                    <img src={article.urlToImage} alt={article.title} className="h-32 sm:h-40 lg:h-48 w-full object-cover" />
                  ) : (
                    <div className="h-32 sm:h-40 lg:h-48 w-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">No image available</p>
                    </div>
                  )}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-base sm:text-lg font-semibold text-blue-700 hover:underline mb-2 line-clamp-2">{article.title}</h3>
                      </a>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3">{article.description}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Source: {article.source.name}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button variant="outline" className="hover:bg-gray-200" asChild>
              <a href="https://news.google.com/search?q=thyroid+cancer" target="_blank" rel="noopener noreferrer">
                View More News
              </a>
            </Button>
          </div>
        </section>

        {/* About Section - Improved text spacing */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">About This Platform</h2>
          <div className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto space-y-3 sm:space-y-4 leading-relaxed px-4 sm:px-6">
            <p>This platform is dedicated to raising awareness about thyroid cancer, offering tools and trusted information for early detection and prevention.</p>
            <p>We bring together AI predictions, global research, and real stories to empower individuals to take proactive steps in their health journey.</p>
            <p>Our goal is to make thyroid cancer knowledge accessible and actionable for everyone, whether you're looking for guidance or supporting a loved one.</p>
            <p>Early education and informed decisions can save lives. Let's work together towards a healthier future.</p>
          </div>
        </section>

        {/* Testimonials - Improved responsive layout */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold">Community Testimonials</h2>
            <Button variant="outline" className="gap-2 self-start" asChild>
              <Link to="/testimonial">
                <Pencil className="w-4 h-4" /> Share Your Story
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))
            ) : testimonials.length > 0 ? (
              testimonials.slice(0, 4).map(({ id, name, message }) => (
                <div key={id} className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-2 sm:space-y-3 text-gray-700 h-full">
                  <p className="font-semibold text-purple-700">{name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">No testimonials yet. Be the first to share your story!</p>
            )}
          </div>
        </section>

        {/* Newsletter Section - Improved mobile form layout */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Stay Updated</h2>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto text-center space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-gray-700">Subscribe to receive the latest updates and news about thyroid cancer directly to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto mt-2 sm:mt-0">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;