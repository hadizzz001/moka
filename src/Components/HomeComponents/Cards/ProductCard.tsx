import {Box, IconButton, Tooltip, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useRef} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
// import Link from 'next/link';
// import {loadState, pushState, saveState} from '../../../Utils/LocalstorageFn';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import useCart from '../../../Hooks/useCart';
import Btn from '../../Btn/Btn';
import ReactPlayer from 'react-player/lazy';
const defaultImages = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTvTcD234f-GRtvhN-xdfrqckgfNZbgS6fRdIeAQ-vBdHlkvqjmM6MZQfmFBHpjxoc1Q&usqp=CAU']
const ProductCard = ({title,videoUrl,_id,price,images,category,sx, handleQuickView,className} : {
    className?: string,
    handleQuickView ?: (id: string)=> void;
    sx?: any,
    title: string;
    price: number;
    _id: string;
    videoUrl ?: string;
    images: string[] | any[];
    category: string;
}) => {
    let img = images?.length > 0 ? images[0] : defaultImages
    const ref : any = useRef()
    const {addToCart}= useCart()    
    const [currentImg,
        setCurrentImg] = useState(img)
    const [playing,setPlay] = useState(false)
        const router = useRouter()
    const handleonMouseIn = () => {
        if (ref
            ?.current && images?.length > 1) {
            setCurrentImg(images[1]);
        }
    }
    const handleonMouseOut = () => {
        if (ref
            ?.current && images?.length > 1) {
            setCurrentImg(images[0]);
        }
    }
    const handleClick = () => {
        router.push(`/product/${_id}?title=${`${title}`.substring(0,100).replace(/\s+/g, '-')}&category=${category ? category : 'products'}`)
        
    }
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
          setHasWindow(true);
        }
      }, []);
    return (
        <Box
        // onClick={()=>router.push('/product/product-name')}
            onMouseOver={() => handleonMouseIn()}
            onMouseOut={() => handleonMouseOut()}
            sx={{
                boxShadow:'1px 1px 3px #eeeeee',
            position: 'relative',
            minHeight: {lg:"440px", xs:"350px"},
            maxHeight: {lg:"640px", xs:"200px"},
            maxWidth:{lg:"500px", xs:"300px"},
            width: '100%',
            overflow: 'hidden', 
            ...sx,
            ':hover': {
                '& .productOptions': {
                    display: 'flex'
                }
            }
        }}>
            {/* <Link
                style={{
                position: 'relative'
            }}
                className='link scale'
                href='/'> */}
                <Box
                    sx={{
                    position: 'relative',

                }}>
                {videoUrl &&    <Box
                        onClick={()=>setPlay(!playing)}
                        sx={{
                      
                        zIndex:515125,
                        right: '50%',
                        bottom : '5%',
                        transform: {
                            sm: 'translateY(50%)'
                        },
                        cursor:'pointer',
                        backgroundColor:'transparent',
                        display: 
                             'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        gap: '.15em'
                    }}>
                            <PlayCircleOutlineIcon fontSize='large'/>
                    </Box>}
                <Box sx={{height:{lg:"350px", xs:"200px"}}}>
                 {!videoUrl ?   <img
                 
                    onClick={handleClick}
                    style={{maxHeight:'400px'}}
                    ref={ref} src={currentImg} className='img contain pointer' alt="Product Image"/>
                :
               (hasWindow && <Box sx={{ width: { xs: '100%', sm: '500px' } }}>

                <ReactPlayer
                controls
                  onClick={handleClick}
                fallback={<img
                    onClick={handleClick}
                    style={{maxHeight:'400px'}}
                    ref={ref} src={currentImg} className='img contain pointer' alt="Product Image"/>}
                loop
                height={'auto !important'}
                width={'100%'} style={{
                    width: '100%',
                    height:'auto !important'
                }}   playing={playing} muted  url={`${videoUrl}`} />

            </Box>)
                }
                    </Box>
                    <Box
                        className='productOptions'
                        sx={{
                        bottom: {
                            xs: '85%',
                            sm: '50%'
                        },
                        right: '2%',
                        transform: {
                            sm: 'translateY(50%)'
                        },
                        
                        display: {
                            xs: 'flex',
                            sm: ' none'
                        },
                        flexDirection: 'column',
                        position: 'absolute',
                        gap: '.15em'
                    }}>
                        <Tooltip placement='left' title={'Quick View'}>
                            <IconButton
                                onClick={()=>handleQuickView && _id ? handleQuickView(`${_id}`) : ''}
                                sx={{
                                ':hover': {
                                    background: 'white'
                                },
                                background: 'white',
                                color: '#333',
                                display: {
                                    xs: 'none',
                                    sm: 'flex'
                                },
                                boxShadow: '1px 1px 3px grey'

                            }}>
                                <RemoveRedEyeIcon fontSize={'small'}/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip placement='left' title={'Add To Favourites'}>
                            <IconButton
                                sx={{
                                ':hover': {
                                    background: 'white'
                                },
                                background: 'white',
                                color: '#333',
                                boxShadow: '1px 1px 3px grey'
                            }}>
                                <FavoriteBorderIcon fontSize={'small'}/>
                            </IconButton>
                        </Tooltip>

                    </Box>
                </Box>
                
                <Typography
                className='titleMax'
                onClick={()=>handleClick()}
                    sx={{
                    cursor:'pointer',
                    pt: '.25em',
              
                    width:'100%',
                    // wordBreak:'break-all',
                    mt: '.25em',
                    fontSize: {lg:'1em',xs:'.5em'}
                }}>{title}</Typography>

                <span className='gray' style={{fontSize:'.76em'}}>
                    {category}
                    </span>
            <Box sx={{mx:'.15em',justifyContent:'space-between',display:{xs:'block'} }} className='flexed'>
                <Typography
                    className='clr'
                    sx={{
                    fontSize: {lg:'1em',xs:'.5em'}
                }}>${price}</Typography>
                {/* boxShadow:'1px 1px 3px #0000005e', */}
                {/* <IconButton
                onClick={()=>addToCart(_id,{price,img,title,_id})}
                sx={{':hover':{background:'#eaeaea'}}}>
                    <ShoppingCartIcon />
                </IconButton> */}
                <Tooltip title='Add To Cart' placement='left'>
                <Btn
                v2={true}
                onClick={()=>addToCart(_id,{price,img,title,_id})}
                sx={{':hover':{background:'#935525',color:'white',border:'1px solid #935525'}}}>
                       <Typography
                   className='flex items-center'
                   sx={{fontSize:'.5em',gap:'.3em' }}>

                   add to cart <ShoppingCartIcon sx={{fontSize:{lg:'5em', xs:'2em'} }} />
                   </Typography>
                </Btn>
                </Tooltip>
            </Box>

        </Box>
    )
}

export default ProductCard