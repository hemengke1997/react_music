import styled from 'styled-components'
import { after, loading_img } from 'assets/css/globalStyle'

export default styled.div`
  ${after}
  background-color: #fff;
  z-index: 4;
  .loading_img {
    ${loading_img}
  }
`