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
    $first: Int
  ) {
    tokens(
      first: $first
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
      first: $first
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
      status
      id
      pricePerItem
      token {
        id
        tokenId
        name
      }
      blockTimestamp
      transactionLink
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
    $first: Int
  ) {
    tokens(
      first: $first
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
      first: $first
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

// const GET_COLLECTION_LISTINGS_WITH_MAX_PRICE = gql`
//   query getCollectionListingsWithMaxPrice(
//     $erc1155Filters: Token_filter
//     $erc1155Ordering: Token_orderBy
//     $erc721Filters: Listing_filter
//     $erc721Ordering: Listing_orderBy
//     $isERC1155: Boolean!
//     $orderDirection: OrderDirection
//     $skip: Int
//     $first: Int
//   ) {
//     tokens(
//       first: $first
//       orderBy: floorPrice
//       orderDirection: $orderDirection
//       where: $erc1155Filters
//     ) @include(if: $isERC1155) {
//       __typename
//       id
//       floorPrice
//       tokenId
//       listings(where: { status: Active }, orderBy: pricePerItem) {
//         id
//         pricePerItem
//         quantity
//       }
//     }
//     listings(
//       first: $first
//       orderBy: $erc721Ordering
//       orderDirection: $orderDirection
//       skip: $skip
//       where: $erc721Filters
//     ) @skip(if: $isERC1155) {
//       __typename
//       seller {
//         id
//       }
//       expires
//       id
//       pricePerItem
//       token {
//         id
//         tokenId
//         name
//       }
//       quantity
//     }
//   }
// `;

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
          ...ListingFieldsWithTokenDetails
        }
        listings(orderBy: blockTimestamp, orderDirection: desc) {
          id
          blockTimestamp
          buyer {
            id
          }
          expires
          pricePerItem
          quantity
          seller {
            id
          }
          status
          transactionLink
        }
        owners {
          user {
            id
          }
        }
      }
    }
  }

  fragment ListingFieldsWithTokenDetails on Listing {
    seller {
      id
    }
    expires
    id
    pricePerItem
    quantity
  }
`;

const GET_TOKENS_BY_NAME_AND_ID = gql`
  query getTokensByNameAndIds($name: String!, $ids: [ID!]!) {
    tokens(first: 1000, where: { name_contains: $name, id_in: $ids }) {
      id
    }
  }
`;

const GET_TOKENS_BY_NAME_AND_COLLECTION_ID = gql`
  query getTokensByName($name: String!, $collections: [String!]!) {
    tokens(
      first: 1000
      where: { name_contains: $name, collection_in: $collections }
    ) {
      id
    }
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
  GET_TOKENS_BY_NAME_AND_ID,
  GET_TOKENS_BY_NAME_AND_COLLECTION_ID,
};
