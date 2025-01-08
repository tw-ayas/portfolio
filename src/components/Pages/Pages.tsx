import Contact from "../Contact";
import {ContentWrapperProps} from "./ContentWrapper";
import {Box} from "@mui/material";
import AboutUs from "../AboutUs";

const AboutMe: ContentWrapperProps = {
    id: 'about',
    title: 'About Me',
    children: (
        <AboutUs />
    ),
}

const ContactMe: ContentWrapperProps = {
    id: 'contact',
    title: 'Contact Me',
    children: (
        <Contact />
    ),
}

const Courses: ContentWrapperProps = {
    id: 'courses',
    title: 'Course',
    children: (
        <Box></Box>
    ),
}

const Coaching: ContentWrapperProps = {
    id: 'coaching',
    title: 'Coaching',
    children: (
        <Box></Box>
    ),
}

export const Pages = [AboutMe, ContactMe]