import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Intro.css";
import { IonButton } from "@ionic/react";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src="" alt="" />
        <h3>Build awesome apps with Ionic UI components</h3>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src="" alt="" />
        <h3>Build awesome apps with Ionic UI components</h3>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src="" alt="" />
        <h3>Build awesome apps with Ionic UI components</h3>
        <IonButton onClick={() => onFinish()}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
