import styled from 'styled-components'

export const SongWrapper = styled.div`
`

interface rankStyle {
  red: boolean
  index: number
}
export const Rank = styled.div<rankStyle>`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -10px;
  color: ${props => props.red && props.index < 3 ?  '#df3436' : '#999'}
`

export const ContentWrapper = styled.div`

`