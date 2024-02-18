import React from "react";
import styled from "styled-components";
import Card from "./Card";

const SliderContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 47px;
  margin-top: 0px;
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Disable vertical scrolling */
  scrollbar-width: none;
  white-space: nowrap;
  // position: relative;
  // z-index: 0; /* Set a z-index value */

  div {
    display: flex;
  }
`;

const Heading = styled.h2`
  color: white;
  padding-left: 71px;
  margin: 50px 0px 5px 0px;
  font-size: 1.5rem;
  font-weight: 500;
`;

function CardSlider(props) {
  const Data = props.movieData;
  // console.log("CardSlider data List", Data);
  return (
    <>
      <Heading>{props.heading}</Heading>
      <SliderContainer>
        <div>
          {Data?.map((data) => (
            <Card key={data.id} movieData={data} />
          ))}
        </div>
      </SliderContainer>
    </>
  );
}

export default CardSlider;
