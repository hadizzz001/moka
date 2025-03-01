import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode,Autoplay, Pagination} from "swiper";
import 'swiper/css';
import { Box } from '@mui/material';
import ReactPlayer from 'react-player'
import {  useEffect, useState } from 'react';

const ProductCarousel = ({images,fullscreen,video,videoUrl,mw} : {fullscreen?:boolean,video?:boolean,videoUrl?:string,images: string[],mw ?: string}) => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
          setHasWindow(true);
        }
      }, []);
      let imagesArray : any= images?.map((str) => {
        return { img: str };
      });
    return (
        <Swiper
            pagination={{
                clickable: true,
              }}
              autoplay={{
                delay:  3000,
                disableOnInteraction: true,
              }}
              navigation={true}
            spaceBetween={10}
            slidesPerView={1}
            modules={[FreeMode,Autoplay, Pagination]}
         >

            {images && imagesArray && imagesArray.length>0 && [{videoUrl : videoUrl ? videoUrl : null },...imagesArray].map(product => {

                if (!product?.videoUrl && !product?.img ) return;
                
                return (
                  
                 <SwiperSlide style={{width : fullscreen && '100% !important' || 'auto'}} className={fullscreen ? 'full' : ''} key={product?.img}>
                        {product?.videoUrl && !product?.img && hasWindow ?
                            <Box sx={{ width: { xs: '100%', sm: '500px' } }}>
                                <ReactPlayer
                                muted 
                                loop width={'100%'} style={{
                                    width: '100%',
                                }} controls playing={true} url={`${videoUrl}`} />

           
                            </Box>

:  (product?.img?.length > 4 && product?.img && <Box sx={{ display: 'flex', margin: '0 auto',width:'100%', maxWidth: `${mw || '200px'}` }}>
<img className='img' src={product?.img?.length > 4 && product?.img } alt=" product carousel img" />
</Box>)
                         }
                    </SwiperSlide>


            
                
                )
                

            })
}

        </Swiper>
    );
};

export default ProductCarousel