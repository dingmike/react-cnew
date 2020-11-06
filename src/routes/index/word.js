
// tab栏高阶组件
import TabNav from "@/components/tabnav/index";
import loadable from "@/components/lazy";

const Word = loadable({ loader: () => import(/* webpackChunkName: "word" */ '@/pages/index/word/index.js') });

export const CategoryRoutes = [
    {
        path: "/word",
        component: TabNav(Word)
    }
];
