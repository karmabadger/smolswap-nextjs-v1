type CollectionListingsTokenDataItem =
    {
        __typename: 'Token',
        id: string,
        floorPrice?: any | null,
        tokenId: any,
        listings?: Array<{ __typename?: 'Listing', id: string, pricePerItem: any, quantity: number }> | null
    }
type CollectionListingsListingDataItem =
    {
        __typename: 'Listing',
        expires: any,
        id: string,
        pricePerItem: any,
        quantity: number,
        seller: { __typename?: 'User', id: string },
        token: { __typename?: 'Token', id: string, tokenId: any, name?: string | null }
    }


type CollectionsMetadataDataItem =
    {
        id: string,
        __typename?: 'Token',
        name?: string | null,
        tokenId: any,
        metadata?: { __typename?: 'Metadata', image: string, name: string, description: string } | null
    }


export {
    type CollectionListingsTokenDataItem,
    type CollectionListingsListingDataItem,
    type CollectionsMetadataDataItem,
}
