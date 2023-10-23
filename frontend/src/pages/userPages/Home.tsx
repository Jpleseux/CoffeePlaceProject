<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import "../../../public/layouts/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatewayContext } from "../../gateway/gatewayContext";
import ProductCard from "../../components/cards/productCard/productCard";

function Home() {
  const gatewayContext = useContext(GatewayContext);
  const productGateway = gatewayContext?.productGateway;
  const [newProducts, setNewProducts] = useState([]);  
  const [topProducts, setTopProducts] = useState([]);
  const [recomendProducts, setRecomendProducts] = useState([]);


  async function getNewProducts() {
    // @ts-ignore
    const response = await productGateway.getNewProducts();
    setNewProducts(response.output);
  }

  async function getTopProducts() {
    const response = await productGateway?.getTopProducts();
    // @ts-ignore
    setTopProducts(response.output);
  }

  async function getRecomendProducts() {
    const response = await productGateway?.getRecomendProducts();
    // @ts-ignore
    setRecomendProducts(response.output);
  }

  useEffect(() => {
    getNewProducts();
    // @ts-ignore
  }, [newProducts]);

  useEffect(()=>{
    getTopProducts();
    // @ts-ignore
  }, [topProducts]);

  useEffect(()=>{
    getRecomendProducts();
    // @ts-ignore
  }, [recomendProducts]);

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="carousel-container">
      <h1>Coffee Place recomenda</h1>
      <div className="carousel">
      <Slider {...carouselSettings}>
          {recomendProducts.map((product) => (
            // @ts-ignore
            <ProductCard key={product.idProduct} imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount}
            />
          ))}
          {recomendProducts.length ==0 &&
            <h1>Sem Produtos recomendados por Coffeeplace</h1>
          }
        </Slider>
      </div>
      <h1>Novidades do dia</h1>
      <div className="carousel">
        <Slider {...carouselSettings}>
          {newProducts.length != 0  && newProducts.map((product) => (
            // @ts-ignore
            <ProductCard key={product.idProduct} imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount}
            />
          ))}
          {newProducts.length ==0 &&
            <h1>Sem Produtos adicionados hoje</h1>
          }
        </Slider>
      </div>
      <h1>Mais Avaliados</h1>
      <div className="carousel">
      <Slider {...carouselSettings}>
          {topProducts.map((product) => (
            // @ts-ignore
            <ProductCard key={product.idProduct} imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount}
            />
            
          ))}
          {topProducts.length ==0 &&
            <h1>Sem Produtos com grande avaliações.</h1>
          }
        </Slider>
      </div>
    </div>
  );
}

export default Home;
=======
import {useState } from "react";
import Message from "../../components/interface/Message";
function Home(){

    const [message, setMessage] = useState<string | null>(null);

        return(
        <div className="">
            <h1>

            </h1>
            {message&&<Message msg={"error"} timers={5000}/>}
        </div>
    )
}

export default Home
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
