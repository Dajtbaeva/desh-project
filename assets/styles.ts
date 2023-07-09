export class Styles {
    // Base
    whiteBg: string = 'bg-white';
    whiteText: string = 'text-white';
    blackText: string = 'text-black';
    bodyBg: string = '!bg-[#F5F5F5]';
  
    whiteTextHover: string = 'hover:text-[#FFFFFF]';
    // Blue
    blueBg: string = 'bg-[#A0B3D8]';
    blueBgHover: string = 'hover:bg-[#96abd6]';
    blueBgLight: string = 'bg-[#F3F6FC]';
    blueBgLightHover: string = 'hover:bg-[#f5f8fd]';
    blueText: string = 'text-[#A0B3D8]';
    blueTextLight: string = 'text-[#F3F6FC]';
  
    // Green
    greenBg: string = 'bg-[#009C73]';
    greenBgHover: string = 'hover:bg-[#00a277]';
    greenBgLight: string = 'bg-[#EAF6EF]';
    greenText: string = '!text-[#009C73]';
    greenTextHover: string = 'hover:text-[#009C73]';
    greenBgLightHover: string = 'hover:bg-[#dbf0e4]';
  
    // Yellow
    yellowText: string = 'text-[#FAB31C]';
    yellowBg: string = 'bg-[#FAB31C]';
    yellowBgHover: string = 'hover:bg-[#FAB31C]';
  
    // Grey
    greyBg: string = 'bg-[#B8B8B8]';
    greyText: string = 'text-[#B8B8B8]';
    greyTextLight: string = 'text-[#B8B8B8]';
    greyIcon: string = 'text-[#DADADA]';
    greyIconBg: string = 'bg-[#DADADA]';
    greyBtnBg: string = 'bg-[#EEE6E6]';
    greyBtnDisabledBg: string = 'bg-[#919191]';
    blueLightBgHover: string = 'hover:bg-[#F3F6FC]';
    greyTextDark: string = 'text-[#9197A1]';
  
    // Red
    redText: string = 'text-[#FD2D39]';
    redBg: string = 'bg-[#FF897D]';
    redBgHover: string = 'hover:bg-[#ff9b91]';
    // Error
    errorBg: string = 'bg-[#FF5449]';
    errorText: string = 'text-[#FF5449]';
  
    // Border
    rounded: string = 'rounded-[8px]';
  
    // Text
    textSimple: string = 'text-[14px] leading-5';
    textTitle: string = 'text-[16px] leading-6';
    textBold: string = 'font-bold';
  
    // Button
    btnHSm: string = 'h-[40px]';
    btnHMd: string = 'h-[60px]';
    btnHLg: string = 'h-[60px]';
    greenBtn: string;
    blueBtn: string;
    redBtn: string;
    yellowBtn: string;
    whiteBtn: string;
    blueLightBtn: string;
    greenLightBtn: string;
  
    // Complex
    flexColNav: string;
    emptyBlockCol: string;
    scrollPage: string;
  
    // Muted or disabled
    mutedText: string = 'text-[#99A3B3]';
    disabled: string = 'cursor-not-allowed opacity-50';
  
    constructor() {
      // Button
      this.greenBtn = ${this.greenBg} ${this.whiteText} ${this.textTitle} ${this.rounded} w-full ${this.greenBgHover};
      this.redBtn = ${this.redBg} ${this.whiteText} ${this.textTitle} ${this.rounded} w-full ${this.redBgHover};
      this.yellowBtn = ${this.yellowBg} ${this.whiteText} ${this.textTitle} ${this.rounded} w-full ${this.yellowBgHover};
      this.blueBtn = ${this.blueBg} ${this.whiteText} ${this.textTitle} ${this.rounded} w-full ${this.blueBgHover};
      this.whiteBtn =  ${this.blackText} ${this.textTitle} ${this.rounded} w-full ${this.blueLightBgHover};
      this.blueLightBtn = ${this.blueBgLight} ${this.greyTextLight} ${this.textTitle} ${this.rounded} w-full ${this.blueBgLightHover};
      this.greenLightBtn = ${this.greenBgLight} ${this.greenText} ${this.textTitle} ${this.rounded} w-full ${this.greenBgLightHover};
  
      // Complex
      this.flexColNav = 'flex flex-col gap-[10px] px-2 pt-[14px]';
      this.emptyBlockCol = 'w-[60px] sm:w-[100px] h-[30%] rounded-[8px] bg-[#f5f5f5]';
      this.scrollPage = 'max-h-[90vh] overflow-y-scroll';
    }
  }
  
  export const useStyles = () => new Styles();