import { Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useState } from 'react';
import Header from '../../components/atoms/Header';
import Sidebar from '../../components/molecules/Sidebar';
import AddRecyclePoint from '../AdminPanel/AddRecyclePoint';
import { EventList } from '../AdminPanel/EventList';
import RecyclePointList from '../AdminPanel/RecyclePointList';
import { RequestList } from '../AdminPanel/RequestList';
import { UserPermissions } from '../AdminPanel/UserPermissions';
import { EventPoints } from '../User/EventPoints';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

var ComponentTitles: { [key: string]: string } = {
    'Kullanıcı İstekleri': 'kullanici-istekleri',
    'Geri Dönüşüm Noktalarını Listele': 'geri-donusum-noktalari',
    'Geri Dönüşüm Noktası Ekle': 'geri-donusum-noktasi-ekle',
    'Etkinlikleri Listele': 'etkinlikler',
    'Etkinlik Ekle': 'etkinlik-ekle',
    'Kullanıcı Yetkilerini Düzenle': 'kullanici-yetkileri',
};
//TODO @marfsahin refactor component invoking
export const AdminHomePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const [component, setComponent] = useState<string>('');
    const buttonTitles = [
        'Kullanıcı İstekleri',
        'Geri Dönüşüm Noktalarını Listele',
        'Geri Dönüşüm Noktası Ekle',
        'Etkinlikleri Listele',
        'Etkinlik Ekle',
        'Kullanıcı Yetkilerini Düzenle',
    ];
    console.log(component);

    return (
        <>
            <Sidebar
                setComponent={setComponent}
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
                {ComponentTitles[component] === 'kullanici-istekleri' && (
                    <RequestList />
                )}
                {ComponentTitles[component] === 'geri-donusum-noktalari' && (
                    <RecyclePointList />
                )}
                {ComponentTitles[component] === 'geri-donusum-noktasi-ekle' && (
                    <AddRecyclePoint />
                )}
                {ComponentTitles[component] === 'etkinlikler' && <EventList />}
                {ComponentTitles[component] === 'etkinlik-ekle' && (
                    <RecyclePointList />
                )}
                {ComponentTitles[component] === 'kullanici-yetkileri' && (
                    <UserPermissions />
                )}
            </Box>
        </>
    );
};
