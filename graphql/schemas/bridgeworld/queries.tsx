import { gql } from "@apollo/client";

const GET_BRIDGEWORLD_METADATA = gql`
  query getBridgeworldMetadata($ids: [ID!]!) {
    tokens(first: 1000, where: { id_in: $ids }) {
      id
      image
      name
      tokenId
      metadata {
        __typename
        ... on LegionInfo {
          boost
          cooldown
          crafting
          questing
          summons
          rarity
          role
          type
          summons
          questingXp
          craftingXp
        }
        ... on ConsumableInfo {
          id
          type
          size
        }
        ... on TreasureInfo {
          id
          boost
          category
          tier
        }
      }
    }
  }
`;

export { GET_BRIDGEWORLD_METADATA };
