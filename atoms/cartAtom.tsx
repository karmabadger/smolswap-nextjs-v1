import { atom, useAtom } from "jotai";

import { Listing } from "@graphql/generated/marketplace/react-apollo";

interface Token {
  id: string;
  tokenId: string;
  name: string | null;
}

interface User {
  id: string;
}

// interface OrderData {
//   name: item.token.name;
//   collectionAddress: item.id;
//   tokenId: item.token.tokenId;
//   metadata: item.token.metadata;
//   expires: item.expires;
//   pricePerItem: item.pricePerItem;
//   quantity: 1;
//   owner: item.user.id;
//   standard: "ERC721";
// }
class SingleBuyOrder {
  public collectionAddress: string;
  public expires: number;
  public seller: User;
  public id: string;
  public pricePerItem: string;
  public token: Token;
  public quantity: number;
  public standard: string;

  constructor(
    listing: Listing,
    collectionAddress: string,
    standard: string = "ERC721",
    quantity: number = 1
  ) {
    this.seller = listing.seller;
    this.expires = listing.expires;
    this.id = listing.id;
    this.pricePerItem = listing.pricePerItem;
    this.token = {
      id: listing.token.id,
      name: listing.token.name || null,
      tokenId: listing.token.tokenId,
    };

    this.collectionAddress = collectionAddress;
    this.standard = standard;
    this.quantity = quantity;
  }
}

class CollectionsMap {
  //   namesList: string[];
  mapping: { [key: string]: SingleBuyOrder[] } = {};

  addItemListing(item: SingleBuyOrder) {
    const tokenId = item.token.tokenId;
    if (this.mapping[tokenId]) {
      this.mapping[tokenId].push(item);
    } else {
      this.mapping[tokenId] = [item];
    }
  }
}

class Cart {
  public buyOrderList: SingleBuyOrder[];
  public collectionsDictByAddress: CollectionsMap;
  public selectedBooleanList: boolean[];

  constructor(buyOrderList?: SingleBuyOrder[]) {
    this.buyOrderList = buyOrderList || [];

    this.selectedBooleanList = new Array(this.buyOrderList.length).fill(false);

    this.collectionsDictByAddress = new CollectionsMap();
    for (const item of this.buyOrderList) {
      this.collectionsDictByAddress.addItemListing(item);
    }
  }

  public addItem(item: SingleBuyOrder) {
    this.buyOrderList.push(item);
    this.collectionsDictByAddress.addItemListing(item);
    this.selectedBooleanList.push(false);
  }
}
