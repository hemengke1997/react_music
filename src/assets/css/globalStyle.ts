
export const text_overflow = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
`

// chrome显示两行
export const text_2 = `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

// chrome显示三行
export const text_3 = `
  ${text_2}
  -webkit-line-clamp: 3;
`

export const break_2 = `
  word-wrap: break-word;
  white-space: normal;
`

export const small_border = `
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-color: #d3d4da;
  border: 0px solid rgba(0, 0, 0, 0.1);
  transform-origin: left top;
  z-index: 2;

  @media screen and (-webkit-min-device-pixel-ratio: 1) {
    width: 150%;
    height: 150%;
    transform: scale(0.666666);
  }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    width: 300%;
    height: 300%;
    transform: scale(0.333333);
  }
`

export const after = `
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

export const loading_img = `
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
`

export const safe = `
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
`

export const title_after = `
  content: "";
  background-color: #d33a31;
  position: absolute;
  width: 2px;
  height: 16px;
  left: 0;
  top: 1px;
`

export const listen_count = `
  z-index: 4;
  position: absolute;
  right: 3px;
  top: 4px;
  font-size: 12px;
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
`

export const listTitle = `
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
`

export const ismv = `
  font-style: normal;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  line-height: 14px;
  font-size: 9px;
  color: #d33a31;
`

export default {
  "color-background": "#F2F3F4",
  "color-background-d": "rgba(0, 0, 0, 0.3)",
  "color-highlight-background": "rgb(196, 71, 59)",
  "color-dialog-background": "rgb(204, 204, 204)",
  "color-theme": "#d43c33", // top的背景色
  white: "#fff",
  red: "#dd001b" //tab的字体颜色
}
