// HeroBanner.js
import { Container, Typography } from "@mui/material";

// const AboutUs = () => {
//   return (
//     <div className="page-container about-container" id="about">
//       <div className="content-wrapper">
//         <h1>Über Uns</h1>
//         <div>Links</div>
//       </div>
//     </div>
//   );
// };

const AboutUs = () => {
  return (
    <>
      <Container
        sx={(theme) => ({
          padding: theme.spacings.md,
        })}
      >
        <Typography
          variant="h3"
          sx={(theme) => ({
            padding: theme.spacings.lg,
          })}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nam
          accusamus ea. Tempore nulla facere fugit. Ipsa vitae similique,
          voluptatem assumenda qui perspiciatis laboriosam, quia quasi quidem,
          ullam officiis tempore.
        </Typography>
        <Typography
          variant="h3"
          sx={(theme) => ({
            padding: theme.spacings.lg,
          })}
        >
          2nd.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nam
          accusamus ea. Tempore nulla facere fugit. Ipsa vitae similique,
          voluptatem assumenda qui perspiciatis laboriosam, quia quasi quidem,
          ullam officiis tempore.
        </Typography>
        <Typography
          variant="h3"
          sx={(theme) => ({
            padding: theme.spacings.lg,
          })}
        >
          hello. Lorem, ipsum dolor sit amet amet consectetur adipisicing elit.
          Aperiam iste maxime placeat omnis porro facilis quae perspiciatis
          ipsum adipisci architecto odit consequatur nam dolorum dolor,
          provident nihil vitae cumque veritatis, temporibus ducimus.
          consectetur adipisicing elit. Aperiam iste maxime placeat omnis porro
          facilis quae perspiciatis ipsum adipisci architecto odit consequatur
          nam dolorum dolor, provident nihil vitae cumque veritatis, temporibus
          ducimus.
        </Typography>
      </Container>
    </>
  );
};
export default AboutUs;
