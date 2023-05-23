// assets
import { IconEyeCheck } from '@tabler/icons';
// constant
const icons = { IconEyeCheck };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const item2 = {
    id: 'item2',
    title: 'item2',
    type: 'group',
    children: [
        {
            id: 'item21',
            title: 'item2.1',
            type: 'item',
            url: '/item21',
            icon: icons.IconEyeCheck,
            breadcrumbs: false
        }
    ]
};
export default item2;
