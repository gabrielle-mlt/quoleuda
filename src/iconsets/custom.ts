import {h} from "vue";
import type {IconSet, IconProps} from "vuetify";
// @ts-ignore
import translateKorean from '../components/icons/translate-korean-icon.vue';
// @ts-ignore
import quoleudaLogo from "../components/icons/quoleuda-logo-icon.vue";

const customSvgIcon: any = {
    'translate-korean': {...translateKorean, color: '#000000'},
    'quoleuda-logo': {...quoleudaLogo, color: '#000000'}
};

const customIcons: IconSet = {
    component: (props: IconProps) => {
        // @ts-ignore
        return h(customSvgIcon[props.icon])
    },
};

export {customIcons /* aliases */};