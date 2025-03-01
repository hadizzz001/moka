import {Box, Button,  TextField, Typography} from '@mui/material'
import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAccordion from '../FilterAccordion'
import Btn from '../../Btn/Btn';
import { server } from '../../../Utils/Server';

const FilterSection = ({handleReset,sx,setProducts}:any) => {
    const [options,setOptions] = useState({
        price : [1,100000],
        sort : 'products',
        // category : 'products',
        // query : '',
        
    })
    const handleSubmit = async () => {
        const url =  `/api/sort?min=${options.price[0]}&max=${options.price[1]}&order=${options.sort}`  ;
        const req = await fetch(`${server}${url}`)
        const res = await req.json()
        if (res) [

            setProducts(res)
        ]
    }
    return (
      <></>
    )
}

export default FilterSection