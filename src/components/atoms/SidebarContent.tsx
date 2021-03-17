import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';

export const SidebarContent = () => {
    return (
        <VStack>
            <Button w='100%'>Kullanıcı İstekleri</Button>
            <Button w='100%'>Geri Dönüşüm Noktalari</Button>
            <Button w='100%'>Yeni Geri Dönüşüm Noktası Ekle</Button>
        </VStack>
    );
};
