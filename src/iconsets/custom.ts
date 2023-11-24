import {h} from "vue";
import type {IconSet, IconProps} from "vuetify";
// @ts-ignore
import translateKorean from '../components/icons/translate-korean-icon.vue';

const customSvgIcon: any = {
    'translate-korean': {...translateKorean, color: '#000000'}
};

const customIcons: IconSet = {
    component: (props: IconProps) => {
        console.log(props);
        // @ts-ignore
        return h(customSvgIcon[props.icon])
    },
};

export {customIcons /* aliases */};