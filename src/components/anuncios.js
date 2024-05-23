import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Anuncios = () => {
  const imageURL1 = 'https://portalalumnos.ucm.cl/v2/assets/avisos/beca_fotocopias_2024.jpg';
  const imageURL2 = 'https://portalalumnos.ucm.cl/v2/assets/avisos/lms_2024.png';

  // Configuración del Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Anuncio>
      <FotosAnuncios>
        <Slider {...settings}>
          <ImageContainer>
            <RuletaFotos src={imageURL1} alt="Anuncio 1" />
          </ImageContainer>
          <ImageContainer>
            <RuletaFotos src={imageURL2} alt="Anuncio 2" />
          </ImageContainer>
        </Slider>
      </FotosAnuncios>
    </Anuncio>
  );
};

export default Anuncios;

const Anuncio = styled.div`
  
  width: 40%;
  height: 35%;
  margin-left:10%;
`;

const FotosAnuncios = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RuletaFotos = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Cambiado de 'cover' a 'contain' */
  border-radius: 10px;
`;
