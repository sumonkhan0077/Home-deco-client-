import React from "react";
import "./home.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import imagepng from "../../assets/pngimage.png";
import { MdOutlineArrowOutward } from "react-icons/md";

import CategoryHome from "./Shared/CategoryHome/CategoryHome.jsx";
import NewsLetters from "./Shared/NewsLetters/NewsLetters.jsx";
import TopCard from "./Shared/TopCard/TopCard.jsx";
import QuestionAnswer from "./Shared/QuestionAnswer/QuestionAnswer.jsx";
import TopEventer from "./Shared/TopEventer/TopEventer.jsx";
import MapShow from "./Shared/MapShow/MapShow.jsx";
import Header from "./Shared/Header/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import Loading from "../../Components/Loading/Loading.jsx";
import SmoothScroll from "../../Utility/SmoothScroll.jsx";
import AnimatedSection from "../../Utility/AnimatedSection.jsx";

const Home = () => {
  const {loading} = useAuth();
  if(loading){
    return <Loading></Loading>
  }
  SmoothScroll()
  return (
    <div className="">
      <AnimatedSection variant="fadeUp"> 

      <Header />
      </AnimatedSection>

      <CategoryHome />
      <TopCard />
      <TopEventer />
      <QuestionAnswer />
      <NewsLetters />
      <MapShow />
    </div>
  );
};

export default Home;
