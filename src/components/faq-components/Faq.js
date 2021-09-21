import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import darkThemeContext from "../darkThemeContext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { motion } from "framer-motion";

import "./css/Faq.css";



export default function Pricing() {
    const { darkTheme } = useContext(darkThemeContext);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='faq-content'>
                <h1 className='faq-heading'>General</h1>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>Why Can't I see Anything in the Marketplace?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography >
                            Users are required to login and connect their Metamask accounts via the Metamask extension in order to see NFTs within the marketplace.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>Why Can't I Create New Tokens?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography>
                            Currently, only approved administrators can mint new tokens.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>How do I Unsubscribe from the Newsletter?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography>
                            Users can unsubscribe from the footer of every newsletter email sent.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>Can we Trust Auxiun Marketplace?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography>
                            Yes! We use the upmost security when storing your data!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <h1 className='faq-heading'>Finance</h1>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>Is Auxiun Marketplace Free?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography >
                            There is no ongoing subscription required to use the marketplace.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='faq-accordian' style={{ color: darkTheme ? 'aliceblue' : '' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: darkTheme ? '#424242' : '' }}
                    >
                        <Typography className='faq-question'>What is the Currency Used to Purchase the NFTs?</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='faq-answer' style={{ backgroundColor: darkTheme ? '#4C4C4C' : 'lightgray' }}>
                        <Typography>
                            Currently, the only currency supported is Etherium
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </motion.div>
    );
}
