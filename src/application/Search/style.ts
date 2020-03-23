import styled from "styled-components"
import { small_border } from "assets/css/globalStyle"

export const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  .search_form {
    padding: 15px 10px;
    position: relative;
    &::after {
      ${small_border}
    }
    .inputcover {
      position: relative;
      width: 100%;
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;
      .icon-sousuo {
        position: absolute;
        left: 0;
        top: 9px;
        margin: 0 8px;
        vertical-align: middle;
        color: #c9c9c9;
        font-size: 13px;
      }
      .input {
        width: 100%;
        height: 30px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0);
        font-size: 14px;
        color: #333;
        -webkit-appearance: none;
        outline: none;
        border: none;
        padding: 0;
        &::-webkit-search-cancel-button {
          display: none;
        }
        &::-webkit-input-placeholder {
          font-size: 14px;
          color: #c9c9c9;
        }
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #b8b8b8;
        .icon-guanbi- {
          font-size: 14px;
        }
      }
    }
  }
`
