import { ModeItem } from '~/interfaces'
export const Standard: React.FC<ModeItem> = ({fill='#000000'}: ModeItem) => {
    return(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.912656 0.83252V2.24318H11.0508V0.83252H0.912656ZM1.11769 3.11908V12.9659H1.99364V3.11913H1.11773L1.11769 3.11908ZM2.95167 3.11908C2.98439 6.01652 4.13878 7.63947 5.42714 7.98536C4.12181 8.33575 2.95327 9.9963 2.95013 12.9658H8.95894C8.95584 9.99616 7.78931 8.33618 6.48487 7.98536C7.77244 7.63914 8.92472 6.01671 8.95753 3.11913H2.95162L2.95167 3.11908ZM9.88617 3.11908V12.9659H10.7622V3.11913H9.88617V3.11908ZM0.912656 13.8418V15.251H11.0508V13.8418H0.912656Z" fill={fill}/>
            <defs>
                <linearGradient id="paint0_linear_687_13610" x1="-1.40197" y1="-8.26913" x2="6.44127" y2="14.7933" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#019AFF" stop-opacity="0.65"/>
                    <stop offset="1" stop-color="#0151FF"/>
                </linearGradient>
            </defs>
        </svg>
    )
}
