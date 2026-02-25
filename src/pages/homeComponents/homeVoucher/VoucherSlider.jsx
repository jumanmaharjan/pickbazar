import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const vouchers = [
  {
    id: 1,
    bg: "#ffeed6",
    img: "/assets/img/1.png",
    title: "Spring cleaning for home appliance",
    desc: "Get your clean on supplies.",
  },
  {
    id: 2,
    bg: "#d9ecd2",
    img: "/assets/img/2.png",
    title: "Your pet choice for fresh healthy food",
    desc: "Get your pet food supplies.",
  },
  {
    id: 3,
    bg: "#efd8d4",
    img: "/assets/img/4.png",
    title: "Fresh grocery deals every day",
    desc: "Save more on daily essentials.",
  },
  {
    id: 4,
    bg: "#dbe5ef",
    img: "/assets/img/3.png",
    title: "Washing item with discount product",
    desc: "Save more on daily essentials.",
  },
];

function VoucherSlider() {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-8"
    >
      {vouchers.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="rounded-md flex gap-3 items-center overflow-hidden"
            style={{ backgroundColor: item.bg }}
          >
            <img src={item.img} alt={item.title} />
            <div className="py-3 pr-4">
              <h5 className="text-xl font-semibold leading-tight mb-1.5">
                {item.title}
              </h5>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default VoucherSlider;
