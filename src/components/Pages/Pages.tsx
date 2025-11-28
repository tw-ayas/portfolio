import { ContentWrapperProps } from "./ContentWrapper";
import { ContactContent } from "./Contact";
import { AboutContent } from "./About";

/* ---------- Pages definitions ---------- */
export const AboutMe: ContentWrapperProps = {
    id: "about",
    title: "About",
    lead: "Software Engineer — Performance optimization & scalable systems",
    avatarSrc: null,
    ctas: [
        { label: "Download CV", href: "/resume.pdf", variant: "outlined" },
        { label: "Contact", href: "/contact", variant: "contained" },
    ],
    children: <AboutContent />,
};

export const ContactMe: ContentWrapperProps = {
    id: "contact",
    title: "Contact",
    lead: "Get in touch for work, consulting or speaking opportunities",
    children: <ContactContent />,
};

export const pages: ContentWrapperProps[] = [AboutMe, ContactMe];