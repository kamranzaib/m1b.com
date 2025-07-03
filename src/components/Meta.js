import { Helmet } from "react-helmet";

const Meta = ({ title, description, image, url }) => {
  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "M1B Construction",
  description: "High-quality construction services in NYC.",
  image: "https://your-website.com/default-thumbnail.png",
  url: "https://your-website.com",
};

export default Meta;