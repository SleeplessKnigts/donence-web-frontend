import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import {Link as RouterLink} from 'react-router-dom'

export const SidebarContent = () => {
    return (
        <VStack>
            <Button w='100%'>Kullanıcı İstekleri</Button>
            <Button w='100%'>Geri Dönüşüm Noktalari</Button>
            <Button as={RouterLink} to="/admin/recycle-point/new" w='100%'>Yeni Geri Dönüşüm Noktası Ekle</Button>
            <Button as={RouterLink} to="/admin/kullanici-yetkileri" w='100%'>Kullanıcı Yetkilerini Düzenle</Button>
        </VStack>
    );
};
