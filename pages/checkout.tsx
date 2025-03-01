import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../src/Components/checkoutComponents/AddressForm';
// import PaymentForm from './PaymentForm';
import Review, { totalCal } from '../src/Components/checkoutComponents/Review';
import Footer from '../src/Components/Footer/Footer';
import Navbar from '../src/Components/Navbar/Navbar';
import Btn from '../src/Components/Btn/Btn';
import { useEffect, useState } from 'react';
import { loadState, saveState } from '../src/Utils/LocalstorageFn';
import { server } from '../src/Utils/Server';
import Head from 'next/head';



const steps = ['Shipping address', 'Review your order'];

function getStepContent(step: number, setInfo: any, handleChange: any, info: any, setActiveStep: any) {
  switch (step) {
    case 0:
      return <AddressForm setInfo={setInfo} handleChange={handleChange} info={info} />;
    // case 1:
    //   return <PaymentForm />;
    case 1:
      return <Review setActiveStep={setActiveStep} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [info, setInfo] = useState({
    firstName: '',
    lastName: '', city: '', email: '', phone: '', address1: '', address2: ''
  })
  const handleChange = (e: any) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (info && info.email && info.firstName && info.lastName && info.address1 && info.phone) {
      saveState('info', info)
      setActiveStep(activeStep + 1);

    }

  };
  const saved = activeStep === steps.length
  const saveOrder = async () => {
    const products = loadState('usercart');
    const total = totalCal(products);
  
    if (products && info && total) {
      try {
        // Send order data to the server
        const rawResponse = await fetch(`${server}/api/save-order`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order: { info, products, total } })
        });
  
        // Wait for the server response
        if (!rawResponse.ok) {
          throw new Error('Failed to save the order');
        }
  
        const content = await rawResponse.json();
  
        // Clear the cart after saving the order
        saveState('usercart', []); // Assuming `saveState` is used to update the local storage or state.
  
        // Perform a hard refresh and navigate to '/'
        window.location.href = '/';
      } catch (error) {
        console.error('Error saving the order:', error);
        alert('Something went wrong while saving the order. Please try again.');
      }
    } else {
      alert('Cart or user information is incomplete.');
    }
  };
  
  
  // Utility function to clear localStorage (or any cart state management you use)
  const clearState = (key:any) => {
    localStorage.removeItem(key);
  };
  
  
  useEffect(() => {

    if (saved) {
      saveOrder()
    }

  }, [saved])

  return (
    <>
      <Head>
        <title>Oxinab | Checkout | Order</title>
        <meta name="robots" content="index,follow" />
        {/* <meta name="description" content="Power house provide a wide range of European electronics (stock and new)" /> */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <meta name="distribution" content="Global" />
        <meta name="keywords" content="stethoscope, thermometer, sphygmomanometer, nebulizer, glucometer, otoscope, defibrillator, ultrasound machine, ECG machine, MRI scanner, CT scanner, infusion pump, ventilator, surgical scissors, scalpel, forceps, retractors, sutures, syringes, IV drip, oxygen concentrator, pulse oximeter, wheelchair, crutches, prosthetics, orthopedic braces, dialysis machine, endoscope, anesthesia machine, dental drill, sterilizer, biopsy needle, blood bag, catheter, pacemaker, hearing aid, microscope, laboratory centrifuge, incubator, autoclave, surgical lights, examination table, medical gloves, face masks, surgical gown, first aid kit, bandages, splints, medical swabs, disinfectants, EpiPen, insulin pen, diagnostic test kits, hospital bed, patient monitor, suction machine, blood pressure cuff." />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="theme-color" content="#0794ca" />
        <meta content="oxinab.me" name="author" />

        <link rel="canonical" href="https://oxinab.me/" />
        <link rel="alternate" href="https://oxinab.me/" hrefLang="en" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Oxinab" />
        <meta property="og:url" content="https://oxinab.me/" />
        <meta property="og:site_name" content="Power house" />
        <meta property="og:image" content="https://res.cloudinary.com/dusvquybw/image/upload/v1740486798/e767gffynefbmg5uz631.jpg" />
        {/* <meta property="og:description" content="Power house provide a wide range of European electronics (stock and new)" /> */}

        <meta name="og:description" content={`
        Oxinab specializing in providing high-quality medical supplies and healthcare solutions.
        `} />
        <meta name="description" content={`
        Oxinab specializing in providing high-quality medical supplies and healthcare solutions.
        `} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number has been recorded! We will message you soon, so please stay alert.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, setInfo, handleChange, info, setActiveStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    type='submit'
                    form="myform"
                    // variant="contained"
                    onClick={handleNext}
                  // sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </>

  );
}