import Image from "next/image";
import styled, { keyframes, css } from "styled-components";
import Czech from "../../../assets/svgs/Czech";
import czech from "../../../assets/svgs/czech.svg";
import { COLOR } from "../../../pages/_app";
const StyledContainer = styled.div`
  position: relative;
`;
const StyledMarkContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const pulse = keyframes`
  0% {
    transform: scale(1.2) translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  
  70% {
    transform: scale(1.3) translate(-50%, -50%);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  
  100% {
    transform: scale(1.2) translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;
const StyledMarker = styled.span`
  width: 15px;
  aspect-ratio: 1;
  background: ${COLOR.light};
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.3);
  top: 0;
  transition: 0.5s;
  cursor: pointer;
  position: absolute;
  ${(props) =>
    props.active &&
    css`
      animation: ${pulse} 2s infinite;
    `}
`;

export default function FlatMap({ locations, index, setActiveIndex }) {
  const normalizeCords = (cords) => {
    const sides = {
      top: 51.020666012558124,
      bottom: 48.55229639575042,
      left: 12.100281715393068,
      right: 18.82919311523438,
    };
    return {
      latitude:
        ((sides.top - cords.latitude) / (sides.top - sides.bottom)) * 100,
      longitude:
        ((sides.left - cords.longitude) / (sides.left - sides.right)) * 100,
    };
  };
  return (
    <StyledContainer>
      {/* <Czech  /> */}
      <Image {...czech} style={{ objectFit: "contain" }} />
      <StyledMarkContainer>
        {locations.map((location, i) => {
          const normalized = normalizeCords(location);
          return (
            <StyledMarker
              style={{
                left: normalized.longitude + "%",
                top: normalized.latitude + "%",
              }}
              key={i}
              active={i == index || index == null}
              onClick={() => {
                console.log(i);
                setActiveIndex(i);
              }}
            ></StyledMarker>
          );
        })}
      </StyledMarkContainer>
    </StyledContainer>
  );
}
