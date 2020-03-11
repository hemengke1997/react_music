import React from 'react';
import LoadingWrapper from './style'

const Loading:React.FC = () => {
  return(
    <LoadingWrapper>
      <img src={require('assets/img/loading.gif')} alt="loading" className="loading_img" />
    </LoadingWrapper>
  )
}

export default React.memo(Loading)