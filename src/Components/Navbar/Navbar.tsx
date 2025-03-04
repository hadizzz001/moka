import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useEffect, useState } from 'react';
import { CartContext, DrawerContext } from '../../../pages/_app';
import SearchModal from './SearchModal';
import Link from 'next/link';
import SearchInput from './SearchInput';
import { Badge, Typography } from '@mui/material';
import { loadState } from '../../Utils/LocalstorageFn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/router';
import SideBar from '../Drawer/SideBar';


export default function Navbar() {
    const [open, setOpen] = useContext(DrawerContext);
    const [openModal, setOpenModal] = useState(false);
    const [localCart, setLocalCart] = useState([]);
    const [q,setQ] = useState('')
    const [cartOpen, setCartOpen] = useContext(CartContext);
    
    // const localCart = [1]
    useEffect(() => {
        const cart = loadState('usercart') || []
        if (cart) {

            setLocalCart(cart)
        }
    }, [cartOpen])
    
    const router = useRouter()
    const handleSearch = (e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault()
      if (q.length > 2) {
        router.push(`/category/products?limit=80&search=${q}`)
      }
    }
   
    
    return (
        <Box sx={{
            background: 'black',

            flexGrow: 1
        }}>
            <AppBar
                className='bb'
                sx={{
                    maxWidth:'xl',
                    margin:'0 auto',
                // background: 'white',
                color: 'black',
            background: 'black',

                boxShadow: 'none'
            }}position="static">
                <> 
                <Toolbar sx={{
                    position: 'relative'
                }}>
                  {/* <IconButton
                        
                        onClick={()=>setOpen(!open)}
                        size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        sx={{
                            color:'white',
                            margin:'0.1em',
                            display:{sm:'none'},
                    }}>
                        <MenuIcon/>
                    </IconButton> */}
                    <Box
                        sx={{
                        mx:{sm:'1em'},
                        // position: 'absolute',
                        // right: '50%',
                        // transform: 'translateX(50%)'
                        // ,
                        maxWidth:'180px'
                    }}>
                          
                        <Link href='/' color='inherit'>
                            <img
                            className='img'
                            src="https://res.cloudinary.com/dtilcqpqn/image/upload/v1741088776/jlnajjbmntdrvp1tfat9.png"
                            alt="Moka Coffee eshop logo" style={{width:'75%'}}/>
                        </Link>
                    </Box>
                    
                    <Box
                        sx={{
                        width: '100%',
                        // justifyContent: 'flex-end',
                        justifyContent: {xs:'right',sm:'left'},
                        display: 'flex',
                    }}>
                        <Box >
                            <SearchInput
                            onSubmit={handleSearch}
                            value={q}
                            setValue={setQ}
                            sx={{display:{xs:'none',sm:'flex'}}}/>
                            </Box>
                            <Box 
                            sx={{    width: '100%',
                                justifyContent: 'end',}}
                            className='flex right'>

                            {/* <IconButton
                             sx={{display:{xs:'flex',sm:'none'},color:'white'}}
                            onClick={()=>setOpenModal(!openModal)}
                            color='inherit'>
 
                             <SearchOutlinedIcon/>
 
                         </IconButton>  */}


                        <IconButton 
                        onClick={()=>setCartOpen(!cartOpen)}
                        sx={{color:'white'}}
                        >
                        <Badge color='warning' badgeContent={`${localCart.length || '0'}`} >

                            <LocalMallOutlinedIcon
                            
                             sx={{color:'white'}} />
                            </Badge>
                            <Typography sx={{display:{xs:'none',sm:'flex'}}} component='p'>
                            cart
                            </Typography>
                        </IconButton>


                        <IconButton 
                        onClick={()=>setCartOpen(!cartOpen)}
                        sx={{display:{xs:'none',sm:'flex'}}}
                        >
                        <Badge color='warning' badgeContent={`0`} >

                            <FavoriteBorderIcon sx={{color:'white'}} />
                            </Badge>
                            <Typography sx={{color:'white',display:{xs:'none',sm:'flex'}}} component='p'>
                            favourites
                            </Typography>
                        </IconButton>
                        <IconButton
                        
                        onClick={()=>setOpen(!open)}
                        size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        sx={{
                            color:'white',
                            margin:'0.1em',
                            display:{sm:'none'},
                    }}>
                        <MenuIcon/>
                    </IconButton>
                    </Box>

                    </Box>
                </Toolbar>

                <Toolbar sx={{ display:{xs:'flex',sm:'none'},}}>
                <Box sx={{
                    
                    width:'100%'}}>
                <SearchInput
                            onSubmit={handleSearch}
                            value={q}
                            setValue={setQ}
                            sx={{width:'100%',
                               }}/>
                            </Box>
                </Toolbar>
                </>

            </AppBar>
            <SearchModal openModal={openModal} setOpenModal={setOpenModal}/>
        </Box>
    );
}