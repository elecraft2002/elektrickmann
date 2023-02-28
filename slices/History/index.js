import React, { useEffect, useRef, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../../pages/_app";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

const StyledSection = styled.section`
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
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
  position: absolute;
  transform: translateX(-50%);
  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid ${COLOR.light};
  background: ${COLOR.dark};
  top: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/**
 * @typedef {import("@prismicio/client").Content.HistorySlice} HistorySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HistorySlice>} HistoryProps
 * @param { HistoryProps }
 */

const YearLine = ({ year }) => {
  return (
    <StyledLineContainer>
      <StyledLine></StyledLine>
      <StyledYear>
        <time>{year}</time>
      </StyledYear>
    </StyledLineContainer>
  );
};

const Item = ({ index, item, setOffsetArray, offset }) => {
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
      return [...newArray];
    });
  }, [offset]);
  return (
    <li ref={ref}>
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
    </li>
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
  const [width, setWidth] = useState(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [offset, setOffset] = useState([]);
  const [offsetArray, setOffsetArray] = useState([]);
  const [date, setDate] = useState(
    1 || prismicH.asDate(slice.items[0].date).getFullYear()
  );

  const handleScroll = () => {
    setOffset(window.scrollY);
    const newIndex = closestIndex(window.innerHeight / 2, offsetArray);
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
    <StyledSection>
      <YearLine year={date} />
      <span className="title">
        {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
      </span>
      <ul>
        {slice.items.map((item, i) => {
          return (
            <Item
              item={item}
              index={i}
              setOffsetArray={setOffsetArray}
              key={i}
              offset={offset}
            />
          );
        })}
      </ul>
    </StyledSection>
  );
};

export default History;
