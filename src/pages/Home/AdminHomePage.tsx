import { Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useState } from "react";
import { Route, Switch } from "react-router";
import Header from "../../components/atoms/Header";
import Sidebar from "../../components/molecules/Sidebar";
import { AddNews } from "../AdminPanel/AddNews";
import AddRecyclePoint from "../AdminPanel/AddRecyclePoint";
import { EventList } from "../AdminPanel/EventList";
import RecyclePointList from "../AdminPanel/RecyclePointList";
import { RequestList } from "../AdminPanel/RequestList";
import { UserPermissions } from "../AdminPanel/UserPermissions";
import { EventPoints } from "../User/EventPoints";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export const AdminHomePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const buttonTitles = {
        "Kullanıcı İstekleri": "/kullanici-istekleri",
        "Geri Dönüşüm Noktalarını Listele": "/geri-donusum-noktalari",
        "Geri Dönüşüm Noktası Ekle": "/geri-donusum-noktasi-ekle",
        "Etkinlikleri Listele": "/etkinlikler",
        "Etkinlik Ekle": "/etkinlik-ekle",
        "Kullanıcı Yetkilerini Düzenle": "/kullanici-yetkileri",
        "Yeni Haber Ekle": "/haber/yeni",
    };

    return (
        <>
            <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                buttonTitles={buttonTitles}
            />
            <Box ml={!variants?.navigationButton ? 300 : 0}>
                <Header
                    showSidebarButton={variants?.navigationButton}
                    onShowSidebar={toggleSidebar}
                    titleText="Admin Paneli"
                />
                {
                    <Switch>
                        <Route path="/kullanici-istekleri" component={RequestList} />
                        <Route path="/geri-donusum-noktalari" component={RecyclePointList} />
                        <Route path="/geri-donusum-noktasi-ekle" component={AddRecyclePoint} />
                        <Route path="/etkinlikler" component={EventList} />
                        <Route path="/etkinlik-ekle" component={RecyclePointList} />
                        <Route path="/kullanici-yetkileri" component={UserPermissions} />
                        <Route path="/haber/yeni" component={AddNews} />
                    </Switch>
                }
            </Box>
        </>
    );
};
