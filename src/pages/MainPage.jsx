import React from "react";
import Navbar from "../components/Navbar";
import PictureSlider from "../components/PictureSlider";
import CardSmall from "../components/CardSmall";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <div className="bg-[#D9D9D9] flex flex-col items-center justify-center w-full">
      {/* <h1 className="text-4xl font-bold text-center mt-10">Welcome to the Main Page</h1> */}
      <div className="flex w-full justify-center mt-20">
        <PictureSlider />
      </div>

      <div className="w-full px-20">
        <h3 className="text-3xl text-[#a3301e] my-7">Title</h3>
        <p className="text-sm text-[#193042]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
          dolore ducimus, sint aspernatur omnis nisi illum non, velit ex
          deleniti odit neque dolor, soluta quaerat delectus. Repudiandae amet
          voluptas velit autem quidem ratione vel rem in officiis ullam. Iste,
          ad quibusdam! Beatae nemo aspernatur quam veritatis veniam laboriosam
          ea obcaecati ad. Magnam laudantium corrupti commodi porro nostrum a.
          Modi quidem reprehenderit beatae adipisci tenetur saepe, neque
          voluptas animi, exercitationem pariatur natus optio vel numquam,
          libero quos maxime. Cupiditate, facilis magni.
        </p>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 gap-10 mt-5 mb-10">
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
            <CardSmall />
          </div>

        </div>
      </div>

    </div>
  );
}

export default MainPage;
