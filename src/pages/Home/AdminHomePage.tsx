import { Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useState } from 'react';
import Header from '../../components/atoms/Header';
import Sidebar from '../../components/molecules/Sidebar';
import AddRecyclePoint from '../AdminPanel/AddRecyclePoint';
import RecyclePointList from '../AdminPanel/RecyclePointList';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

var ComponentTitles: { [key: string]: string } = {
    'Kullanıcı İstekleri': 'kullanici-istekleri',
    'Geri Dönüşüm Noktalarını Listele': 'geri-donusum-noktalari',
    'Geri Dönüşüm Noktası Ekle': 'geri-donusum-noktasi-ekle',
    'Etkinlikleri Listele': 'etkinlikler',
    'Etkinlik Ekle': 'etkinlik-ekle',
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
                    <RecyclePointList />
                )}
                {ComponentTitles[component] === 'geri-donusum-noktalari' && (
                    <RecyclePointList />
                )}
                {ComponentTitles[component] === 'geri-donusum-noktasi-ekle' && (
                    <AddRecyclePoint />
                )}
                {ComponentTitles[component] === 'etkinlikler' && (
                    <RecyclePointList />
                )}
                {ComponentTitles[component] === 'etkinlik-ekle' && (
                    <RecyclePointList />
                )}
            </Box>
        </>
    );
};
