// tab栏高阶组件
import TabNav from "@/components/tabnav/index";
import loadable from "@/components/lazy";

const Course = loadable({ loader: () => import(/* webpackChunkName: "course" */ '@/pages/index/course/index.js') });

export const CartRoutes = [
    {
        path: "/course",
        component: TabNav(Course)
    }
];
