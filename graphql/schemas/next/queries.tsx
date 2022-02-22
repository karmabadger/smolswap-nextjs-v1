import { gql } from "@apollo/client";

const GET_COLLECTIONS = gql`
  query getCollections {
    collections(orderBy: name, where: { name_not: "Legions" }) {
      contract
      name
      standard
    }
  }
`;

// requires:
// $id: String!
const GET_COLLECTION_STATS = gql`
  query getCollectionStats($id: ID!) {
    collection(id: $id) {
      name
      floorPrice
      totalListings
      totalVolume
      listings(where: { status: Active }) {
        token {
          floorPrice
          tokenId
          name
        }
      }
    }
  }
`;

// variables: { id: '0x6325439389e0797ab35752b4f43a14c004f22a9c' },
const GET_COLLECTION_INFO = gql`
  query getCollectionInfo($id: ID!) {
    collection(id: $id) {
      id
      name
      standard
    }
  }
`;

const GET_COLLECTIONS_LISTED_TOKENS = gql`
  query getCollectionsListedTokens($collection: String!) {
    listings(
      first: 1000
      where: { collection: $collection, status: Active }
      orderBy: id
    ) {
      token {
        id
      }
    }
  }
`;

const GET_COLLECTION_LISTINGS = gql`
  query getCollectionListings(
    $erc1155Filters: Token_filter
    $erc1155Ordering: Token_orderBy
    $erc721Filters: Listing_filter
    $erc721Ordering: Listing_orderBy
    $isERC1155: Boolean!
    $orderDirection: OrderDirection
    $skip: Int
  ) {
    tokens(
      first: 200
      orderBy: floorPrice
      orderDirection: $orderDirection
      where: $erc1155Filters
    ) @include(if: $isERC1155) {
      __typename
      id
      floorPrice
      tokenId
      listings(where: { status: Active }, orderBy: pricePerItem) {
        id
        pricePerItem
        quantity
      }
    }
    listings(
      first: 42
      orderBy: $erc721Ordering
      orderDirection: $orderDirection
      skip: $skip
      where: $erc721Filters
    ) @skip(if: $isERC1155) {
      __typename
      seller {
        id
      }
      expires
      id
      pricePerItem
      token {
        id
        tokenId
        name
      }
      quantity
    }
  }
`;

const GET_COLLECTION_LISTINGS_COUNT = gql`
  query getCollectionListingsCount(
    $erc1155Filters: Token_filter
    $erc1155Ordering: Token_orderBy
    $erc721Filters: Listing_filter
    $erc721Ordering: Listing_orderBy
    $isERC1155: Boolean!
    $orderDirection: OrderDirection
    $skip: Int
  ) {
    tokens(
      first: 200
      orderBy: floorPrice
      orderDirection: $orderDirection
      where: $erc1155Filters
    ) @include(if: $isERC1155) {
      __typename
      id
      floorPrice
      tokenId
      listings(where: { status: Active }, orderBy: pricePerItem) {
        id
        pricePerItem
        quantity
      }
    }
    listings(
      first: 42
      orderBy: $erc721Ordering
      orderDirection: $orderDirection
      skip: $skip
      where: $erc721Filters
    ) @skip(if: $isERC1155) {
      __typename
      id
    }
  }
`;

// variables: {
//     collectionId: '0x6325439389e0797ab35752b4f43a14c004f22a9c',
//     tokenId: '10266'
//   }
const GET_TOKEN_DETAILS = gql`
  query getTokenDetails($collectionId: ID!, $tokenId: BigInt!) {
    collection(id: $collectionId) {
      name
      standard
      tokens(where: { tokenId: $tokenId }) {
        id
        tokenId
        lowestPrice: listings(
          where: { status: Active }
          first: 1
          orderBy: pricePerItem
          orderDirection: asc
        ) {
          ...ListingFieldsWithToken
        }
        listings(orderBy: blockTimestamp, orderDirection: desc) {
          id
          status
          buyer {
            id
          }
          pricePerItem
          seller {
            id
          }
          blockTimestamp
        }
        owners {
          user {
            id
          }
        }
      }
    }
  }

  fragment ListingFieldsWithToken on Listing {
    seller {
      id
    }
    expires
    id
    pricePerItem
    quantity
  }
`;

export {
  GET_COLLECTIONS,
  GET_COLLECTION_STATS,
  GET_COLLECTION_INFO,
  GET_COLLECTIONS_LISTED_TOKENS,
  GET_COLLECTION_LISTINGS,
  GET_COLLECTION_LISTINGS_COUNT,
  GET_TOKEN_DETAILS,
};
