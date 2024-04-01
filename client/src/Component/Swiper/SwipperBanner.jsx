import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide><img alt="" src="https://www.davaocity.gov.ph/wp-content/uploads/2022/11/DSCF6328-scaled.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://ips-dc.org/wp-content/uploads/2023/05/waste-collector-scaled.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.slidesharecdn.com/ss_thumbnails/solidwastemanagementofdhakacitycorporation-150626125030-lva1-app6891-thumbnail.jpg?width=640&height=640&fit=bounds" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://www.blue-cloud.fr/wp-content/uploads/2019/01/Image1.png" alt="" /></SwiperSlide>
                <SwiperSlide><img alt="" src="https://media.licdn.com/dms/image/C5112AQHfbj9Uve3J2Q/article-cover_image-shrink_600_2000/0/1533013630729?e=2147483647&v=beta&t=eiroNvGByT9kAzzST5Jb1UvRVPxlTA1g9eBjVFCAuY8" /></SwiperSlide>
                <SwiperSlide><img alt="" src="https://media.licdn.com/dms/image/D4D12AQEVw9CAU1zN_A/article-cover_image-shrink_720_1280/0/1690969980589?e=2147483647&v=beta&t=agYqiX85mFM-54u6KjfbxrtQLyUC8BZwnZzzmSGfcPU" /></SwiperSlide>
            </Swiper>
        </>
    );
}
