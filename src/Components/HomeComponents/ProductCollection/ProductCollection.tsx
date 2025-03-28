import {Box, Button, Typography} from '@mui/material'
import ProductCard from '../Cards/ProductCard'
import SwiperCarousel from '../../SwiperCarousel/SwiperCarousel'
import { Dispatch, SetStateAction } from 'react'
import Btn from '../../Btn/Btn'
import Link from 'next/link'
import { IProduct } from '../../../Types/Types'

const ProductCollection = ({sx,enableVideo,Collectiontitle,data,setQuickView} : {
    Collectiontitle: string,
    enableVideo?:boolean,
    data: IProduct[] | null,
    sx ?: any;
    setQuickView ?: Dispatch<SetStateAction<{
        isOpen: boolean;
        productId: null | string;
    }>>
}) => {
    
    
    const handleQuickView = (id: string) => {
       if (setQuickView) {
           setQuickView({isOpen:true,productId: id})
       } 
    }
    return (
        <Box
            sx={{
            maxWidth: 'lg', 
            
            margin: '1em auto',
            my: '3em',
            ...sx,
        }}>
            <Box
                sx={{ 
                padding: '.5em',
                fontSize: '2em',
                fontWeight: '500'
            }}>{Collectiontitle}</Box>
            {/* <Box
                sx={{
                display: {
                    xs: "none",
                    md: 'flex'
                },
                gap: '1em',
                justifyContent: 'space-between'
            }}>
            
                {data && data.length > 0 ? data.map(item => {
                        if (!item._id || !item?.title) return;
                    return <ProductCard
                        title={item.title}
                        images={item.images}
                        price={item.price}
                        _id={item._id}
                        category={item.category}
                        handleQuickView={handleQuickView}
                        sx={{
                        height: '100%'
                    }}
                        key={item._id}/>
                })
:
<Typography>
    No products found!
</Typography>
}
            </Box> */}
            <Box
                sx={{
                display: { 
                    xs: "flex",  
                    // md: 'none'
                }
            }}>
                <SwiperCarousel
                enableVideo={enableVideo}
                      handleQuickView={handleQuickView}
                data={data && data.length >0 && data?.slice(0,20)}/>
            </Box>
            <Link  href='/category/products' className="decor-none">

            <Btn v2={true}

                sx={{border:'none',fontSize:'14px',margin:'2em auto',':hover':{background:'white'}}}>View All</Btn>
                </Link>
        
                </Box>
                
                )
                
            }

export default ProductCollection