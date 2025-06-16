import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="my-20 px-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#6A38C2]">
        Explore Job Categories
      </h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="flex gap-6 sm:gap-8" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className={`flex justify-center items-center bg-[#F3F4F6] p-6 rounded-lg shadow-md transition-transform transform ${index === currentIndex ? "scale-105" : ""}`}
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="text-[#6A38C2] border-[#6A38C2] rounded-full px-6 py-3 hover:bg-[#6A38C2] hover:text-white transition-colors"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 text-[#6A38C2] hover:text-[#5c2f9c]" />
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[#6A38C2] hover:text-[#5c2f9c]" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
