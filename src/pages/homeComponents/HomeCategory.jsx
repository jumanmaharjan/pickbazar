import React, { useState, useEffect } from "react";
import { supabase } from "../../SupabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function HomeCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("productCategory")
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategory(data);
      }
    };

    fetchCategories();
  }, []);

  const getImageUrl = (path) => {
    return supabase.storage.from("food").getPublicUrl(path).data.publicUrl;
  };
  //   console.log(category);
  return (
    <>
      <div>
        <h4>What food you love to order</h4>
        <p>Here order your favorite foods from different categories</p>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="pb-8"
        >
          {category.map((p) => (
            <SwiperSlide key={p.id}>
              {p.imageName && (
                <img
                  src={getImageUrl(p.imageName)}
                  alt={p.productCat}
                  width={120}
                  height={120}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    backgroundColor: "#e6e8eb",
                    margin: "0 auto 10px",
                  }}
                />
              )}
              <h3 className="text-center">{p.productCat}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomeCategory;
