// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, BarChart3, BookOpen, Pencil } from "lucide-react";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=cancer%20OR%20thyroid&sortBy=publishedAt&pageSize=20&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        const data = await response.json();
  
        // Filter out irrelevant news
        const healthKeywords = ["cancer", "thyroid", "tumor", "oncology", "treatment", "diagnosis", "health", "medicine"];
        const filteredArticles = data.articles.filter(article => {
          const text = `${article.title} ${article.description} ${article.content}`.toLowerCase();
          return healthKeywords.some(keyword => text.includes(keyword));
        });
  
        setNews(filteredArticles.slice(0, 4)); // show top 4
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-t from-gray-50 to-gray-200 text-black py-16 text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Your Health Dashboard</h1>
        <p className="text-lg font-medium max-w-2xl mx-auto">Empowering you with tools, insights, and community support for early detection and holistic well-being.</p>
      </header>

      {/* Main */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-12 space-y-24">

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cards */}
            {[{
              icon: <Brain className="w-10 h-10 text-purple-600 mb-4" />,
              title: "Check Your Health Risk",
              description: "Get insights from our AI-powered prediction model.",
              link: "/prediction",
              button: "Go to Prediction"
            }, {
              icon: <BarChart3 className="w-10 h-10 text-purple-600 mb-4" />,
              title: "Explore Health Data",
              description: "Interactive visualizations on cancer and thyroid stats.",
              link: "/dashboard",
              button: "View Dashboard"
            }, {
              icon: <BookOpen className="w-10 h-10 text-purple-600 mb-4" />,
              title: "Learn About Diseases",
              description: "Trusted info from WHO, Wikipedia & more.",
              link: "/resources",
              button: "Explore Resources"
            }].map((item, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow rounded-2xl">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link to={item.link}>{item.button}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">Latest News on Cancer & Thyroid</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {newsLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg space-y-3 p-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))
              : news.map((article, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt={article.title} className="h-48 w-full object-cover" />
                  )}
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-lg font-semibold text-blue-700 hover:underline mb-2">{article.title}</h3>
                      </a>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.description}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-auto">Source: {article.source.name}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="hover:bg-gray-200" asChild>
              <a href="https://news.google.com/search?q=cancer%20thyroid" target="_blank" rel="noopener noreferrer">
                View More News
              </a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">About This Platform</h2>
          <div className="text-lg text-gray-700 max-w-3xl mx-auto space-y-5 leading-relaxed">
            <p>This platform is designed with care to help individuals stay informed about cancer and thyroid-related conditions.</p>
            <p>By combining reliable educational resources, user testimonials, and cutting-edge AI prediction models, we create a comprehensive and user-friendly experience.</p>
            <p>Whether you're here to assess your health, support a loved one, or simply learn, our mission is to equip you with the right tools and knowledge.</p>
            <p>Remember, early awareness and education can make a world of difference. We’re here to help you make empowered health decisions.</p>
          </div>
        </section>

       {/* Testimonials Section */}
<section>
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">What People Are Saying</h2>
    <Button variant="outline" className="gap-2" asChild>
      <Link to="/testimonial">
        <Pencil className="w-4 h-4" /> Write Your Review
      </Link>
    </Button>
  </div>

  <div className="grid gap-8 md:grid-cols-4">
    {loading ? (
      Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-md p-6 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))
    ) : testimonials.length > 0 ? (
      testimonials.slice(0, 4).map(({ id, name, message }) => (
        <div key={id} className="bg-white rounded-xl shadow-md p-6 space-y-3 text-gray-700">
          <p className="text-lg italic">"{message}"</p>
          <p className="text-sm text-gray-500">- {name}</p>
        </div>
      ))
    ) : (
      // Fallback if no testimonials in Firebase
      [
        { id: "fake1", name: "Alex", testimonial: "This platform helped me detect early signs. A real life saver." },
        { id: "fake2", name: "Maria", testimonial: "The dashboard is clean, simple, and extremely informative." }
      ].map(({ id, name, testimonial }) => (
        <div key={id} className="bg-white rounded-xl shadow-md p-6 space-y-3 text-gray-700">
          <p className="text-lg italic">"{testimonial}"</p>
          <p className="text-sm text-gray-500">- {name}</p>
        </div>
      ))
    )}
  </div>
</section>


        {/* External Links */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Helpful Links</h2>
          <ul className="list-disc pl-8 space-y-3 text-blue-700 text-lg max-w-3xl mx-auto">
            <li><a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer">WHO - Cancer Information</a></li>
            <li><a href="https://www.who.int/health-topics/thyroid-disease" target="_blank" rel="noopener noreferrer">WHO - Thyroid Diseases</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Cancer" target="_blank" rel="noopener noreferrer">Wikipedia - Cancer Overview</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Thyroid" target="_blank" rel="noopener noreferrer">Wikipedia - Thyroid Gland</a></li>
          </ul>
        </section>

        {/* Newsletter Section */}
        <section className="bg-white text-center p-12 rounded-2xl shadow-xl mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 text-gray-600">Subscribe to receive health tips, early detection strategies, and platform updates.</p>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-md border border-gray-300 w-72 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <Button className="rounded-r-md px-6 bg-purple-600 text-white hover:bg-purple-700">
              Subscribe
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
