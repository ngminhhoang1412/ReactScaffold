// assets
import { IconBrandYoutube, IconSocial } from '@tabler/icons';
// constant
const icons = { IconBrandYoutube, IconSocial};
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const item3 = {
    id: 'item3',
    title: 'item3',
    type: 'group',
    children: [
        {
            id: 'item31',
            title: 'item3.1',
            type: 'item',
            url: '/item31',
            icon: icons.IconSocial,
            breadcrumbs: false
        },
        {
            id: 'item32',
            title: 'item32',
            type: 'item',
            url: '/item32',
            icon: icons.IconBrandYoutube,
            breadcrumbs: false
        }
    ]
};
export default item3;
