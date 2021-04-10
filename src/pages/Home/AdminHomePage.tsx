import { Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Header from '../../components/atoms/Header';
import Sidebar from '../../components/molecules/Sidebar';
import { AddNews } from '../AdminPanel/AddNews';
import AddRecyclePoint from '../AdminPanel/AddRecyclePoint';
import { EventList } from '../AdminPanel/EventList';
import RecyclePointList from '../AdminPanel/RecyclePointList';
import { RequestList } from '../AdminPanel/RequestList';
import { UserPermissions } from '../AdminPanel/UserPermissions';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

export const AdminHomePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const buttonTitles = {
        'Kullanıcı İstekleri': '/admin/kullanici-istekleri',
        'Geri Dönüşüm Noktalarını Listele': '/admin/geri-donusum-noktalari',
        'Geri Dönüşüm Noktası Ekle': '/admin/geri-donusum-noktasi-ekle',
        'Etkinlikleri Listele': '/admin/etkinlikler',
        'Etkinlik Ekle': '/admin/etkinlik-ekle',
        'Kullanıcı Yetkilerini Düzenle': '/admin/kullanici-yetkileri',
        'Yeni Haber Ekle': '/admin/haber/yeni',
    };

    return (
        <>
            <Redirect exact from='/' to='/admin/kullanici-istekleri' />
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
                    titleText='Admin Paneli'
                />
                {
                    <Switch>
                        <Route
                            path='/admin/kullanici-istekleri'
                            component={RequestList}
                        />
                        <Route
                            path='/admin/geri-donusum-noktalari'
                            component={RecyclePointList}
                        />
                        <Route
                            path='/admin/geri-donusum-noktasi-ekle'
                            component={AddRecyclePoint}
                        />
                        <Route
                            path='/admin/etkinlikler'
                            component={EventList}
                        />
                        <Route
                            path='/admin/etkinlik-ekle'
                            component={RecyclePointList}
                        />
                        <Route
                            path='/admin/kullanici-yetkileri'
                            component={UserPermissions}
                        />
                        <Route path='/admin/haber/yeni' component={AddNews} />
                    </Switch>
                }
            </Box>
        </>
    );
};
