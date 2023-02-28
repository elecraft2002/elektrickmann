import React, { useEffect, useRef, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import styled, { keyframes, css } from "styled-components";
import { COLOR } from "../../pages/_app";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { Fade } from "react-reveal";

const StyledSection = styled.section`
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
`;

const StyledLineContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50vw;
`;
const StyledLine = styled.span`
  position: absolute;
  transform: translateX(-50%);
  height: 100vh;
  border-left: 1px solid ${COLOR.light};
  border-right: 1px solid ${COLOR.light};
`;
const StyledYear = styled.span`
  position: sticky;
  transform: translateX(calc(50vw - 50%));
  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid ${COLOR.light};
  background: ${COLOR.dark};
  top: 40vh;
  left: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const blink = keyframes`
0%{transform:scale(1)}
50%{transform:scale(1.2)}
100%{transform:scale(1)}
`;
const StyledTime = styled.time`
  animation: ${blink};
  animation-duration: 1s;
`;

const StyledList = styled.ul`
  position: relative;
  @media (min-width: 750px) {
    &::after {
      content: "";
      position: absolute;
      left: 50vw;
      top: 0;
      transform: translateX(-50%);
      height: 100%;
      border-left: 1px solid ${COLOR.light};
      border-right: 1px solid ${COLOR.light};
    }
  }
`;
const StyledDateContainer = styled.div`
  @media (max-width: 750px) {
    display: none;
  }
  position: absolute;
  height: 100%;
  top: 0;
  width: 0;
`;
/**
 * @typedef {import("@prismicio/client").Content.HistorySlice} HistorySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HistorySlice>} HistoryProps
 * @param { HistoryProps }
 */
const StyledItemContainer = styled.li`
  display: grid;
  position: relative;
  ${(props) =>
    props.reverse &&
    css`
      direction: rtl;
    `};
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 50vh;
  max-width: 1200px;
  padding: 1rem;
  gap: 10rem;
  margin: auto;
  @media (max-width: 750px) {
    display: flex;
    gap: 0;
    flex-direction: column;
    margin: 1rem 0;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 80%;
      height: 1px;
      background: ${COLOR.light};
    }
  }
`;
const Item = ({ index, item, setOffsetArray, offset, activeIndex }) => {
  const date = prismicH.asDate(item.date);
  const ref = useRef(null);
  useEffect(() => {
    setOffsetArray((oldArray) => {
      let newArray = oldArray;
      newArray[index] =
        (ref.current.getClientRects()[0].top +
          ref.current.getClientRects()[0].bottom) /
        2;
      // console.log(newArray);
      return newArray;
    });
  }, [offset]);
  return (
    <Fade when={index == activeIndex}>
      <StyledItemContainer reverse={index % 2} ref={ref}>
        <div>
          {date && (
            <time dateTime={date}>
              {date.getUTCDate()}.{date.getMonth()}.{date.getFullYear()}
            </time>
          )}
          <PrismicRichText field={item.title} />
          <span>
            <PrismicRichText field={item.description} />
          </span>
        </div>
        <figure>
          <PrismicNextImage field={item.image} />
          {item.image.alt && <figcaption>{item.image.alt}</figcaption>}
        </figure>
      </StyledItemContainer>
    </Fade>
  );
};
const closestIndex = (num, arr) => {
  let curr = arr[0],
    diff = Math.abs(num - curr);
  let index = 0;
  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
    }
  }
  return index;
};
const History = ({ slice }) => {
  // const handleResize = () => {
  //   setWidth(window.innerWidth);
  // };
  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const [index, setIndex] = useState(-1);
  const [offset, setOffset] = useState([]);
  const [offsetArray, setOffsetArray] = useState([]);
  const [date, setDate] = useState(
    1 || prismicH.asDate(slice.items[0].date).getFullYear()
  );

  const handleScroll = () => {
    setOffset(window.scrollY);
    const newIndex = closestIndex(window.innerHeight / 2, offsetArray);
    setIndex(newIndex);
    setDate(prismicH.asDate(slice.items[newIndex].date).getFullYear());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(slice);
  return (
    <StyledSection id="history">
      {/* <YearLine year={date} /> */}
      <span className="title">
        {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
      </span>
      <StyledList>
        <StyledDateContainer>
          <StyledYear>
            <StyledTime key={date}>{date}</StyledTime>
          </StyledYear>
        </StyledDateContainer>
        {slice.items.map((item, i) => {
          return (
            <Item
              item={item}
              index={i}
              activeIndex={index}
              setOffsetArray={setOffsetArray}
              key={i}
              offset={offset}
            />
          );
        })}
      </StyledList>
    </StyledSection>
  );
};

export default History;
