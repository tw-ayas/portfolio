import { Container, styled } from "@mui/material";
import Navigation from "./Navigation";
import { Content } from "./Pages/Content";

const WebsiteContainer = styled(Container, { name: 'WebsiteContainer' })(({theme} ) => ({
	display: 'grid',
}))

export function Website() {

    return (
        <WebsiteContainer
	        maxWidth={false}
	        className="App"
	        disableGutters={true}
	        sx={(theme) => ({
	        	gridTemplateRows: {xs: `${theme.appShell.appBarInnerHeightSm} 1fr`, md: `${theme.appShell.appBarInnerHeightMd} 1fr`},
										overflow: 'hidden',
	        })}
        >
            <Navigation />
            <Content />
        </WebsiteContainer>
    )
}
