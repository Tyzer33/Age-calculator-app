import styled from 'styled-components'
import { device } from '../styles/variables'

const Svg = styled.svg`
  height: 1.5rem;
  width: 1.75rem;
  stroke-width: 4;

  @media ${device.desktop} {
    height: 2.75rem;
    width: 2.75rem;
    stroke-width: 2;
  }
`

function ArrowIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
      <g fill="none" stroke="#FFF">
        <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
      </g>
    </Svg>
  )
}

export default ArrowIcon
