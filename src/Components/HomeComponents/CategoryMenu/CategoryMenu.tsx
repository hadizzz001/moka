import {Box, Button, Typography} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const CategoryMenu = ({category}:{category:string[] | undefined}) => {
    const router = useRouter()
    return (
        <Box
            className='bb CategoryMenu'
            sx={{
            display: {
                xs: 'none',
                sm: 'flex'
            },
            px: '1.25em',
            maxWidth: 'xl'
        }}>
            {['Coffee','Coffee machine', 'espresso pod', 'Espresso capsules', 'Machine spareparts', 'Discount sales', 'Cold & beverage', 'Tea & leaves'].map((item) => {
                return <Box  sx={{cursor:'pointer'}} key={item} onClick={()=> item !== 'videos' ? 
                
                router.push(`/category/${item.replace(/\s+/g, '-')}`) :  router.push(`/videos`)
            
            }>
                    {/* <Link key={item} > */}
                        <Typography sx={{color:"#4b4b4b",
                        textTransform: 'capitalize'
                    }} component='h5'>
                        {item}
                        </Typography>

                    {/* </Link> */}
                </Box>
            })
}
        </Box>
    )
}

export default CategoryMenu