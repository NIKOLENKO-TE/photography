import React, { useState } from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { restoredPhotos } from "../data/data";
import { orderRestorePhotos } from "../data/data";
import arrow from "./img/arrow.png";
import { useTranslation } from "react-i18next";

const cursorStyle =
  "absolute flex left-[8px] ml-[105px] h-[30px] w-[60px] cursor-pointer rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  border-blue-600 shadow-blue-500/50  hover:bg-gradient-to-br ";
const cursorBGStyle =
  "bg-white/1 top-[10px] ml-[-90px] backdrop-blur-[40px] rounded-[14px] h-[35px] w-[250px] rounded-xl shadow-xl shadow-black/50";
const buttonStyle =
  "h-[40px] text-white text-2xl pt-0.5 justify-center rounded-[15px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 border-blue-600 shadow-lg shadow-blue-500/50 ";

const ImageRestoration: React.FC = ({
  beforeImage,
  afterImage,
  onClick,
}): JSX.Element => {
  const { t } = useTranslation("ImageRestoration");
  const handleClick = onClick;
  const [isDragging, setIsDragging] = useState(false);
  const [sliderX, setSliderX] = useState("50%");

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMove = (e: any) => {
    if (isDragging) {
      const container = e.currentTarget;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - container.getBoundingClientRect().left;
      setSliderX(`${(offsetX / container.offsetWidth) * 100}%`);
    }
  };

  const preventRightClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      id="restored_images"
      className="relative ssm:h-[440px] sm:h-[620px] w-[820px] overflow-hidden object-cover rounded-2xl cursor-pointer"
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onContextMenu={preventRightClick}
      onClick={handleClick}
    >
      <img
        src={beforeImage}
        className="absolute h-full object-cover select-none"
        alt="before left"
      />
      <div className="absolute h-full overflow-hidden">
        <img
          src={afterImage}
          className={`h-full object-cover `}
          alt="after right"
          style={{
            userSelect: "none",
            clipPath: `inset(0 0 0 ${sliderX})`,
            pointerEvents: "auto",
          }}
        />
      </div>
      <div
        id="cursorButtonTop"
        className={`relative select-none ssm:mt-[335px] sm:mt-[550px] ${cursorBGStyle}`}
        style={{ left: `calc(${sliderX} - 45px)`, userSelect: "none" }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className="flex">
          <span className="ml-[10px] my-[-2px] text-white text-[25px]">
            {t("before_after_text")}
          </span>
        </div>
        <div className={`bottom-[2.5px] ml-[97px] border ${cursorStyle}`}>
          <img
            src={arrow}
            alt="Arrows"
            className="h-5 mt-[4px] ml-[3.5px] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

const Restoration: React.FC = (): JSX.Element => {
  const { t } = useTranslation("Restoration");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImages, setCurrentImages] = useState({
    beforeImage: restoredPhotos[currentIndex].img,
    afterImage: isHovered
      ? orderRestorePhotos[4].img
      : restoredPhotos[currentIndex + 1].img,
  });

  const handleClick = () => {
    const nextIndex = (currentIndex + 2) % restoredPhotos.length;
    setCurrentIndex(nextIndex);
    setCurrentImages({
      beforeImage: restoredPhotos[nextIndex].img,
      afterImage: isHovered
        ? orderRestorePhotos[4].img
        : restoredPhotos[nextIndex + 1].img,
    });
  };
  const PaginationDots: React.FC = ({ count, activeIndex }) => {
    const dots = Array(Math.ceil(count / 2)).fill(null);

    return (
      <div className="flex justify-center mt-4">
        {dots.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 mx-1 rounded-full ${
              Math.floor(activeIndex / 2) === index
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    );
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput")?.click();
  };
  const orderSteps = (
    <div id="order_steps">
      <ol className="flex items-center w-full text-sm font-medium text-center text-black sm:text-base">
        <li className="flex w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden ssm:after:inline-block after:mx-6 xl:after:mx-10">
          <span className="flex items-center after:content-['/'] ssm:after:hidden after:mx-2 after:text-black">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Load <span className="hidden sm:inline-flex ssm:ms-2">photo</span>
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden ssm:after:inline-block after:mx-6 xl:after:mx-10">
          <span className="flex items-center after:content-['/'] ssm:after:hidden after:mx-2 after:text-black">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Write{" "}
            <span className="hidden sm:inline-flex ssm:ms-2">message</span>
          </span>
        </li>
        <li className="flex items-center">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          Get <span className="hidden ssm:inline-flex ssm:ms-2">result</span>
        </li>
      </ol>
    </div>
  );
  const orderStepsIcons = (
    <div
      id="services_buttons"
      className="ssm:h-[90px] sm:h-[110px] flex justify-center items-center "
    >
      <div
        id="services_buttons_background"
        className=" w-full max-w-[800px] grid grid-cols-5 bg-white/70 rounded-2xl shadow-xl py-2 ssm:px-2 md:px-5 lg:px-7"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <img
          src={orderRestorePhotos[0].img}
          alt="Send"
          className="ssm:h-[60px] h-[80px] mt-[3px] cursor-pointer"
          onClick={handleFileUpload}
        />
        <img
          src={orderRestorePhotos[1].img}
          alt="Text"
          className="ssm:h-[60px] h-[80px] mt-[3px]"
        />
        <img
          src={orderRestorePhotos[2].img}
          alt="Price"
          className="ssm:h-[60px] h-[80px] mt-[3px]"
        />
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="ssm:h-[60px] h-[80px] mt-[3px]"
        >
          {isHovered ? (
            <img
              src={orderRestorePhotos[4].img}
              alt="Alternate"
              className="ssm:h-[60px] h-[80px] mt-[3px]"
            />
          ) : (
            <img
              src={orderRestorePhotos[3].img}
              alt="Send"
              className="ssm:h-[60px] h-[80px] mt-[3px]"
            />
          )}
        </div>
        <img
          src={orderRestorePhotos[5].img}
          alt="Shipping"
          className="ssm:h-[60px] h-[80px] mt-[3px]"
        />
      </div>
    </div>
  );
  const inputFile = (
    <input
      type="file"
      id="fileInput"
      style={{ display: "none" }}
      onChange={handleFileUpload}
    />
  );
  const paginationDots = (
    <PaginationDots count={restoredPhotos.length} activeIndex={currentIndex} />
  );
  const imageRestorationBlock = (
    <div className="grid grid-cols-1">
      <div className="flex flex-column justify-center ">
        <ImageRestoration
          beforeImage={currentImages.beforeImage}
          afterImage={currentImages.afterImage}
          onClick={handleClick}
        />
      </div>
      <div className="relative top-[-37px]">{paginationDots}</div>
    </div>
  );
  const restorationTextTitle = (
    <h2 className="text-center ssm:text-2xl md:text-4xl font-bold select-none">
      {t("restoration_text")}
    </h2>
  );
  const restorationTextFull = (
    <p className="pr-3 ssm:text-xl md:text-2xl text-justify select-none">
      {t("restoration_full_text")}
    </p>
  );
  const buttonChangePhotoTitle = (
    <button
      className={`px-2 cursor-pointer ${buttonStyle}`}
      onClick={handleClick}
    >
      {t("change_photo_text")}
    </button>
  );
  return (
    <div className="pb-2">
      <div className="flex flex-col items-center justify-center">
        {buttonChangePhotoTitle}
      </div>
      <div
        id="container_main"
        className="w-flex h-flex max-w-auto mt-2 ssm:mx-2 md:mx-4 grid ssm:grid-cols-1 lg:grid-cols-2 bg-white bg-opacity-30 backdrop-blur-[10px]  justify-between rounded-2xl shadow-xl p-2 "
      >
        <div
          id="container_left"
          className="min-w-[250px] ssm:md-1 md:px-2 py-auto sm:p-1 md:p-2"
        >
          {imageRestorationBlock}
        </div>
        <div id="container_right" className="flex-col grid m-2 items-center">
          {restorationTextTitle}
          {restorationTextFull}
          {orderStepsIcons}
          {orderSteps}
        </div>
      </div>
      {inputFile}
    </div>
  );
};

export default Restoration;
