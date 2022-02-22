import { BigNumber } from 'ethers';

/* Solidity Version: ^0.8.11
 *
 * struct BuyOrder {
 *     address assetAddress;
 *     uint256 tokenId;
 *     address seller;
 *     uint256 quantity;
 *     uint256 maxPricePerItem;
 * }
*/

//jsdoc
interface BuyOrder {
    assetAddress: string;
    tokenId: BigNumber;
    seller: string;
    quantity: BigNumber;
    maxPricePerItem: BigNumber;
}


// export { BuyOrder };