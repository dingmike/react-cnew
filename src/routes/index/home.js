// tab栏高阶组件
import TabNav from "@/components/tabnav/index";
import loadable from "@/components/lazy";

export const Home = loadable({loader: () => import(/* webpackChunkName: "home" */ '@/pages/index/home/index.js')});
export const HomeInfo = loadable({loader: () => import(/* webpackChunkName: "home" */ '@/pages/index/home/info.js')});
export const Auth = loadable({loader: () => import(/* webpackChunkName: "home" */ '@/pages/index/auth/index.js')});

// 首页
export const HomeRoutes = [
    {
        path: "/home",
        component: TabNav(Home)
    },
    {
        path: "/auth",
        component: Auth
    },
    {
        path: "/info/:id",
        component: HomeInfo,
        onEnter: function (nextState, replaceState) {
            debugger
            replaceState(null, '/messages/' + nextState.params.id)
        }
    },
];
