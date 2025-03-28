import Head from 'next/head'
import CategoryMenu from '../src/Components/HomeComponents/CategoryMenu/CategoryMenu'
// import MainCarousel from '../src/Components/HomeComponents/MainCarousel/MainCarousel';
import WhatsApp from '../src/Components/HomeComponents/SocialLinks/WhatsApp';
import ProductCollection from '../src/Components/HomeComponents/ProductCollection/ProductCollection';
// import FullscreenPoster from '../src/Components/HomeComponents/FullscreenPoster/FullscreenPoster';
// import CategoryList from '../src/Components/HomeComponents/CategoryList/CategoryList';
import Perks from '../src/Components/HomeComponents/Perks/Perks';
import TopAd from '../src/Components/HomeComponents/TopAd/TopAd';
import Navbar from '../src/Components/Navbar/Navbar';
// import SideBar from '../src/Components/Drawer/SideBar';
// import { Dialog } from '@mui/material';
import QuickView from '../src/Components/Dialog/QuickView';
import { useContext, useEffect, useState } from 'react';
import { server } from '../src/Utils/Server'
// import CategoryImages from '../src/Components/HomeComponents/CategoryImages/CategoryImages';
// import Btn from '../src/Components/Btn/Btn';
import { IProduct } from '../src/Types/Types';
// import { Typography } from '@mui/material';
import { Categories } from './_app';
// import VideoHero from '../src/Components/VideoHero/VideoHero';
export const getAll = async (endpoint?: string, limit?: number, category?: string, search?: string, skip?: number, totalCount?: boolean) => {
  try {

    const req = await fetch(`${server}/api/${endpoint ? endpoint : 'home'}?limit=${limit || 100}&category=${category ? category : ''}&search=${search ? search : ''}&skip=${skip}&totalCount=${totalCount === true ? 'true' : 'false'}`)
    console.log(`${server}/api/${endpoint ? endpoint : 'home'}?limit=${limit || 100}&category=${category ? category : ''}&search=${search ? search : ''}&skip=${skip}&totalCount=${totalCount === true ? 'true' : 'false'}`);
    
    const res = await req.json()

    if (res) {
      return res
    }
    return null
  }
  catch (er) {
    console.log('er getAll: ', er);

  }
}
export default function Home({ data: staticData, category }: { category: any, data: any }) {

  const [quickView, setQuickView] = useState<{ isOpen: boolean, productId: null | string }>({ isOpen: false, productId: null })
  const [data, setData] = useState<IProduct[] | any>(staticData)
  const [cates, setCates] = useContext(Categories);
  const coldStart = async () => {
    const req = await fetch(`${server}/api/cold`)
    const res = await req.json()
    // if (!data && data?.length < 0) {
    //   const req = await getAll()
    //   if (req && req?.data && req?.data?.length > 0)
    //     {
    //       console.log('req: ', req);
    //       setData(req.data)
    //   }
    // }
  }
  useEffect(() => {
    coldStart()
    // setCates(category);
  }, [])

  console.log('data: ', data);

  return (
    <>
      <Head>
        <title>Moka Coffee Store | Buy tasty coffee in Lebanon</title>
        <meta name="robots" content="index,follow" />
        {/* <meta name="description" content="Moka Coffee provide a wide range of European electronics (stock and new)" /> */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <meta name="distribution" content="Global" />
        <meta name="keywords" content="Moka Coffee, premium coffee, specialty coffee, espresso, latte, cappuccino, coffee beans, fresh coffee, artisan coffee, coffee shop, best coffee, roasted coffee, coffee lovers, rich aroma, high-quality coffee, handcrafted coffee, gourmet coffee, sustainable coffee, organic coffee, coffee experience, coffee brand" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="theme-color" content="#935525" />
        <meta content="binmoka.com" name="author" />

        <link rel="canonical" href="https://binmoka.com/" />
        <link rel="alternate" href="https://binmoka.com/" hrefLang="en" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Moka Coffee Store | Buy tasty coffee in Lebanon" />
        <meta property="og:url" content="https://binmoka.com/" />
        <meta property="og:site_name" content="Moka Coffee Store" />
        <meta property="og:image" content="https://res.cloudinary.com/dtilcqpqn/image/upload/v1741088776/jlnajjbmntdrvp1tfat9.png" />
        {/* <meta property="og:description" content="Moka Coffee provide a wide range of European electronics (stock and new)" /> */}

        <meta name="og:description" content={`
        Moka Coffee is a premium coffee brand dedicated to delivering rich, aromatic, and high-quality coffee experiences.
        `} />
        <meta name="description" content={`
        Moka Coffee is a premium coffee brand dedicated to delivering rich, aromatic, and high-quality coffee experiences.
        `} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <TopAd />
      <Navbar />
      <CategoryMenu category={category} />
      <main>
        {/* <VideoHero/> */}

        {/* <MainCarousel/> */}
        {/* <CategoryImages/> */}
        <WhatsApp />
        <ProductCollection
          data={data && data.filter((item:any) => item.category === 'Coffee')}
          setQuickView={setQuickView}
          Collectiontitle='Coffee Category'
        />
        <ProductCollection
          data={data && data.filter((item:any) => item.category === 'Coffee machine')}
          setQuickView={setQuickView}
          Collectiontitle='Coffee machine'
        />
        <ProductCollection
          data={data && data.filter((item:any) => item.category === 'espresso pod')}
          setQuickView={setQuickView}
          Collectiontitle='Espresso pod'
        />

        <QuickView setQuickView={setQuickView} productId={quickView.productId} isOpen={quickView.isOpen} />
      </main>
      <Perks />
    </>
  )
}

export async function getServerSideProps() {
  // export async function  getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  try {


    const res = await getAll()

    if (!res || !res?.data) {
      return {
        props: {
          data: null,
        },
      }
    }
    return {
      props: {
        // data : res.data.reverse(),
        data: res.data,
        // category : res.category
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      // revalidate: 500, // In seconds
    }
  }
  catch (errr) {
    console.log('errr: ', errr);

  }
}
