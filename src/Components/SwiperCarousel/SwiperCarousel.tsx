import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode,Autoplay, Pagination} from "swiper";
import 'swiper/css';
import { Box } from '@mui/material';
import ProductCard from '../HomeComponents/Cards/ProductCard';


const SwiperCarousel = ({data,  enableVideo,    handleQuickView}:any) => {
    return (
        <Box
        sx={{
        py: {xs:'.5em',sm:'2em'},
        width: '100%',
        maxWidth: 'lg',
        margin: '1em auto',
        display: { 
            xs: 'flex'
        },
        height: '100%'
    }}>

        <Swiper
            pagination={{
                clickable: true,
              }}
              autoplay={{
                delay:  2000,
                disableOnInteraction: true,
              }}
              navigation={false}
            spaceBetween={1.5}
            modules={[FreeMode,Autoplay, Pagination]}
              slidesPerView={2}
        //         breakpoints={{
                
        //         200: {
        //             width: 200,
        //             slidesPerView: 2
        //         },
        //         768: {
        //             width: 768,
        //             slidesPerView: 2
        //         },
        //         1020: {
        //             width: 1020,
        //             slidesPerView: 3
        //         },
             
               
        // }}
            
        >

            {data && data.length>0 && data.map((item:any) => {
                    if (!item.title) return
                return <SwiperSlide className='swiper-wrapper1' style={{width:'100%',height:'100%'}} key={item._id}>
                    {/* <HouseCard
                        img={property.images[0] || property.images[1]}
                        width='95%'
                        id={property.id}
                        isFeatured={isFeatured !== undefined ? isFeatured : true}
                        propertySize={property.propertySize}
                        type={property.type}
                        baths={property.bathrooms}
                        rooms={property.rooms}
                        currency={property.currency}
                        price={property.price}
                        title={property.title}
                        location={property.location}/> */}
                         <ProductCard 
                         videoUrl={enableVideo ? item?.videoUrl: null}
                        //  sx={{width:'50% !important',margin : '0 !important'}}
                        handleQuickView={handleQuickView}
                         title={item.title}
                         images={item.images}
                         price={item.price}
                         _id={item._id}
                         category={item.category}
                         />
                </SwiperSlide>

            })
}

        </Swiper>
        </Box>

    );
};

export default SwiperCarousel