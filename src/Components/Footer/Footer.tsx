import Link from 'next/link';
import { Typography } from '@mui/material'
// import Logo from '../../assets/icons/logo';

const Footer = () => (
  <footer className="site-footer " style={{ color: 'white', background: 'black' }}>
    <div className="container " style={{ color: 'white', background: 'black' }}>
      <div className="site-footer__top">
        <div className="site-footer__description">
          <div className='logos cursor' style={{ maxWidth: '180px' }}>

            <Link href="/">
              {/* <a><h1 className="site-logo"><Logo />E-Shop</h1></a> */}
              {/* https://res.cloudinary.com/dwxm8f25f/image/upload/v1675357773/logo_ghli5e.jpg */}
              {/* https://res.cloudinary.com/dwxm8f25f/image/upload/v1675713948/logo_sktnut_1_jwy2hk.png */}
              <img className='img' src='https://res.cloudinary.com/dtilcqpqn/image/upload/v1740830051/vkpejp5cg3gxqi6kgnb8.png' alt="Powerhouse-lb Logo" />
            </Link>
          </div>
          <Typography component='h1' sx={{ fontSize: '.9em' }} className='footer-p white'>
            Moka Coffee is a premium coffee brand dedicated to delivering rich, aromatic, and high-quality coffee experiences.
          </Typography>
          {/* <ul className="site-footer__social-networks">
          <li><a href="https://www.facebook.com/profile.php?id=100063581229923" rel="noreferrer" target='_blank'><i className="icon-facebook"></i></a></li>
          <li><a href="#"><i className="icon-twitter"></i></a></li>
          <li><a href="#"><i className="icon-linkedin"></i></a></li>
          <li><a href={`${process.env.NEXT_PUBLIC_INSTA}`}rel="noreferrer" target='_blank' ><i className="icon-instagram"></i></a></li>
          <li><a href="#"><i className="icon-youtube-play"></i></a></li>
        </ul> */}
        </div>

        <div className="site-footer__links">
          {/* <div>
        <iframe style={{height:'100%',width:'100%',border:0}} frameBorder="0" src="https://www.google.com/maps/embed/v1/place?q=Beirut,+Lebanon&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div> */}


          <ul className='ul-white' style={{ color: 'white', background: 'black' }}>
            
          </ul>

          <ul className='ul-white' style={{ color: 'white', background: 'black' }}>
            <li className='link-title'>Contact</li>
            <li><a href="#"> Lebanon/Beirut</a></li>

            <li>
              <a href="https://www.facebook.com/profile.php?id=61560890102042" target="_blank" rel="noreferrer" >
                <img className='img' src='https://ucarecdn.com/d77856af-ef62-40fd-97c5-60bbb0cb0098/fb.png' style={{ width: 20}}/> Facebook</a>
            </li>

            <li><a href="https://www.instagram.com/cafe.moka2025" target="_blank" rel="noreferrer" >
            <img className='img' src='https://ucarecdn.com/114fe16a-c2f7-49c6-90ed-cc30336768f8/insta.png' style={{ width: 20}}/> Instagram</a>
            </li> 

            <li><a href={'https://wa.me/71566680'} rel="noreferrer" target='_blank' >
            <img className='img' src='https://ucarecdn.com/678f97e4-123b-44e8-89b0-5adc4f738898/wa.png' style={{ width: 20}}/>{` +961 71 566 680`}
            </a></li>

          </ul>
        </div>
      </div>
    </div>
 
  </footer>
);


export default Footer
