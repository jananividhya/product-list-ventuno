import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Video = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      let response = await fetch("https://dummyjson.com/products").then((res) =>
        res.json()
      );
      console.log("response", response);
      setProducts(CarouselComponent(response.products));
    };

    fetchAPI();
  }, []);

  const CarouselComponent = (array) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      const index = Math.floor(i / 10);
      if (!newArray[index]) newArray[index] = [];

      newArray[index].push(array[i]);
    }
    console.log("new Array", newArray);
    return newArray;
  };

  return (
    <div>
      <h1>Products</h1>

      <div class="imageListWrapper">
        <Carousel showThumbs={false} showArrows={true}>
          {products?.map((array) => (
            <div class="imageWrapper">
              {array.map(({ images, title, brand, price, stock }) => {
                return (
                  <div className="imageClass">
                    <img
                      src={images[0]}
                      alt="gallary"
                      style={{
                        width: "200px",
                        height: "200px",
                        marginBottom: 10,
                      }}
                    />

                    <div class="imageContentWrapper">
                      <div class="imageContent title">
                        {title} | {brand}
                      </div>
                      <div class="imageContent">$ {price}</div>
                      <div class="imageContent">
                        Only {stock} available in stock
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Video;
