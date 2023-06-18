import Image from "next/image";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { fetchDataFromApi, BASE_URL } from "../../utils/FetchApi";
import Property from "src/components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  imageUrl,
  linkName,
  buttonText,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} alt="banenr" width={500} height={300} />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text color="gray.700" fontSize="lg" paddingBottom="3" paddingTop="3">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button colorScheme="teal" fontSize="lg" variant="solid">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);
export default function Home({ propertiesForRent, propertiesForSale }) {
  // console.log("propertiesForRent", propertiesForRent);
  // console.log("propertiesForsaleee", propertiesForSale);
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1=" Explore from Apartments, builder floors, villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}
export async function getStaticProps() {
  const getPropertiesForSales = await fetchDataFromApi(
    `${BASE_URL}/properties/list?locationExternalIDs=${5002}&purpose=for-sale&hitsPerPage=6`
  );
  const getPropertiesForRent = await fetchDataFromApi(
    `${BASE_URL}/properties/list?locationExternalIDs=${5002}&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertiesForSale: getPropertiesForSales?.hits,
      propertiesForRent: getPropertiesForRent?.hits,
    },
  };
}
