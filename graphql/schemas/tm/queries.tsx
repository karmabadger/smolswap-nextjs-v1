import { gql } from "@apollo/client";

const GET_COLLECTIONS = gql`
  query getCollections {
    collections(orderBy: name) {
      address
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
      floorPrice
      totalListings
      totalVolume
      listings(where: { status: Active }) {
        token {
          floorPrice
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
      attributes {
        name
        percentage
        value
      }
    }
  }
`;

const GET_COLLECTION_METADATA = gql`
  query getCollectionMetadata($ids: [ID!]!) {
    tokens(first: 1000, where: { id_in: $ids }) {
      id
      metadata {
        id
        image
        name
        description
      }
      name
      tokenId
    }
  }
`;

const GET_COLLECTION_ATTRIBUTES = gql`
  query getCollectionAttributes($id: ID!) {
    collection(id: $id) {
      attributes {
        name
        percentage
        value
      }
    }
  }
`;

// variables: {
//     id: '0x6325439389e0797ab35752b4f43a14c004f22a9c',
//     isERC1155: false,
//     tokenName: '',
//     skipBy: 0,
//     first: 42,
//     filter: [],
//     orderBy: 'pricePerItem',
//     orderDirection: 'asc'
//   },
const GET_COLLECTION_LISTINGS = gql`
  query getCollectionListings(
    $id: ID!
    $orderDirection: OrderDirection!
    $tokenName: String
    $skipBy: Int!
    $first: Int!
    $orderBy: Listing_orderBy!
    $isERC1155: Boolean!
    $filter: [String!]
  ) {
    collection(id: $id) {
      name
      address
      standard
      tokens(
        orderBy: floorPrice
        orderDirection: $orderDirection
        where: { name_contains: $tokenName }
      ) @include(if: $isERC1155) {
        id
        name
        tokenId
        listings(where: { status: Active }, orderBy: pricePerItem) {
          pricePerItem
          quantity
          status
        }
        metadata {
          image
          name
          description
        }
      }
      listings(
        first: $first
        skip: $skipBy
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          status: Active
          tokenName_contains: $tokenName
          filters_contains: $filter
        }
      ) @skip(if: $isERC1155) {
        user {
          id
        }
        expires
        id
        pricePerItem
        token {
          tokenId
          metadata {
            image
            name
            description
          }
          name
        }
        quantity
      }
    }
  }
`;

const GET_COLLECTION_LISTINGS_METADATA = gql`
  query getCollectionListingsMetadata(
    $id: ID!
    $orderDirection: OrderDirection!
    $tokenName: String
    $skipBy: Int!
    $first: Int!
    $orderBy: Listing_orderBy!
    $isERC1155: Boolean!
    $filter: [String!]
  ) {
    collection(id: $id) {
      tokens(
        orderBy: floorPrice
        orderDirection: $orderDirection
        where: { name_contains: $tokenName }
      ) @include(if: $isERC1155) {
        id
        tokenId
        metadata {
          id
          image
          name
          description
        }
      }
      listings(
        first: $first
        skip: $skipBy
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          status: Active
          tokenName_contains: $tokenName
          filters_contains: $filter
        }
      ) @skip(if: $isERC1155) {
        id
        token {
          id
          metadata {
            image
            name
            description
            id
            attributes {
              id
              attribute {
                id
                name
                name
              }
            }
          }
          name
          tokenId
        }
      }
    }
  }
`;

// {
//   "filter": [],
//     "first": 42,
//       "id": "0x6325439389e0797ab35752b4f43a14c004f22a9c",
//         "isERC1155": false,
//           "orderBy": "pricePerItem",
//             "orderDirection": "asc",
//               "skipBy": 0,
//                 "tokenName": "",
//                   "maxPrice": "3900000000000000000000"
// }
const GET_COLLECTION_LISTINGS_WITH_MAX_PRICE = gql`
  query getCollectionListingsWithMaxPrice(
    $id: ID!
    $orderDirection: OrderDirection!
    $tokenName: String
    $skipBy: Int!
    $first: Int!
    $orderBy: Listing_orderBy!
    $isERC1155: Boolean!
    $filter: [String!]
    $maxPrice: BigInt
  ) {
    collection(id: $id) {
      name
      address
      standard
      tokens(
        orderBy: floorPrice
        orderDirection: $orderDirection
        where: { name_contains: $tokenName }
      ) @include(if: $isERC1155) {
        id
        name
        tokenId
        listings(
          where: { status: Active, pricePerItem_lte: $maxPrice }
          orderBy: pricePerItem
        ) {
          pricePerItem
          quantity
          status
        }
        metadata {
          image
          name
          description
        }
      }
      listings(
        first: $first
        skip: $skipBy
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          status: Active
          tokenName_contains: $tokenName
          filters_contains: $filter
          pricePerItem_lte: $maxPrice
        }
      ) @skip(if: $isERC1155) {
        user {
          id
        }
        expires
        id
        pricePerItem
        token {
          tokenId
          metadata {
            image
            name
            description
          }
          name
        }
        quantity
      }
    }
  }
`;

const GET_COLLECTION_LISTINGS_COUNT = gql`
  query getCollectionListingsCount(
    $id: ID!
    $orderDirection: OrderDirection!
    $tokenName: String
    $skipBy: Int!
    $first: Int!
    $orderBy: Listing_orderBy!
    $isERC1155: Boolean!
    $filter: [String!]
  ) {
    collection(id: $id) {
      name
      address
      standard
      tokens(
        orderBy: floorPrice
        orderDirection: $orderDirection
        where: { name_contains: $tokenName }
      ) @include(if: $isERC1155) {
        id
        listings(where: { status: Active }, orderBy: pricePerItem) {
          status
        }
      }
      listings(
        first: $first
        skip: $skipBy
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          status: Active
          tokenName_contains: $tokenName
          filters_contains: $filter
        }
      ) @skip(if: $isERC1155) {
        id
      }
    }
  }
`;

const GET_COLLECTION_LISTINGS_COUNT_WITH_MAX_PRICE = gql`
  query getCollectionListingsCountWithMaxPrice(
    $id: ID!
    $orderDirection: OrderDirection!
    $tokenName: String
    $skipBy: Int!
    $first: Int!
    $orderBy: Listing_orderBy!
    $isERC1155: Boolean!
    $filter: [String!]
    $maxPrice: BigInt
  ) {
    collection(id: $id) {
      name
      address
      standard
      tokens(
        orderBy: floorPrice
        orderDirection: $orderDirection
        where: { name_contains: $tokenName }
      ) @include(if: $isERC1155) {
        id
        listings(
          where: { status: Active, pricePerItem_lte: $maxPrice }
          orderBy: pricePerItem
        ) {
          status
        }
      }
      listings(
        first: $first
        skip: $skipBy
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          status: Active
          tokenName_contains: $tokenName
          filters_contains: $filter
          pricePerItem_lte: $maxPrice
        }
      ) @skip(if: $isERC1155) {
        id
      }
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
        tokenId
        lowestPrice: listings(
          where: { status: Active }
          first: 1
          orderBy: pricePerItem
          orderDirection: asc
        ) {
          ...ListingFieldsWithToken
        }
        metadata {
          attributes {
            attribute {
              id
              name
              percentage
              value
            }
          }
          description
          id
          image
          name
        }
        listings(orderBy: blockTimestamp, orderDirection: desc) {
          id
          status
          transactionLink
          buyer {
            id
          }
          pricePerItem
          user {
            id
          }
          blockTimestamp
        }
        owner {
          id
        }
      }
    }
  }

  fragment ListingFieldsWithToken on Listing {
    transactionLink
    user {
      id
    }
    expires
    id
    pricePerItem
    quantity
  }
`;

const GET_TOKENS_BY_ATTRIBUTE_IDS_AND_IDS = gql`
  query getFilteredTokensByAttributeIds(
    $attributeIds: [String!]!
    $tokenIds: [String!]!
  ) {
    metadataAttributes(
      where: { attribute_in: $attributeIds, metadata_in: $tokenIds }
    ) {
      id
    }
  }
`;

export {
  GET_COLLECTIONS,
  GET_COLLECTION_STATS,
  GET_COLLECTION_METADATA,
  GET_COLLECTION_ATTRIBUTES,
  GET_COLLECTION_INFO,
  GET_COLLECTION_LISTINGS,
  GET_COLLECTION_LISTINGS_METADATA,
  GET_COLLECTION_LISTINGS_WITH_MAX_PRICE,
  GET_COLLECTION_LISTINGS_COUNT,
  GET_COLLECTION_LISTINGS_COUNT_WITH_MAX_PRICE,
  GET_TOKEN_DETAILS,
  GET_TOKENS_BY_ATTRIBUTE_IDS_AND_IDS,
};
