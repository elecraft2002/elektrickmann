import Image from "next/image";
import styled from "styled-components";
import Czech from "../../../assets/svgs/Czech";
import czech from "../../../assets/svgs/czech.svg";
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
const StyledMarker = styled.span`
  width: 15px;
  aspect-ratio: 1;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 0;
  position: absolute;
`;
export default function FlatMap({ locations, index }) {
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
      <Image {...czech} style={{objectFit:"contain"}}/>
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
            ></StyledMarker>
          );
        })}
      </StyledMarkContainer>
    </StyledContainer>
  );
}
