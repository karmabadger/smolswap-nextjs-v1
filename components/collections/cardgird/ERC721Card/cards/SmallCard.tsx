import { useState, useEffect, FC, SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

import Box from "@mui/material/Box";

import useWindowDimensions from "hooks/useWindowDimensions.jsx";

// import ERC721Modal from "./Modals/ERC721Modal";

import { BigNumber } from "ethers";
import { strWeiToETH } from "utils/data/erc20utils";
import { Collection } from "@graphql/generated/marketplace/react-apollo";
import {
  CollectionListingsListingDataItem,
  CollectionsMetadataDataItem,
} from "@customTypes/treasureMarketplaceQueryTypes";
// import { ListingFieldsWithTokenFragmentDoc } from "@graphql/generated/marketplace/react-query";
// import getTreasureMarketplaceContract from "contracts/treasure-marketplace/contract";
// import getSmolswapContract from "contracts/smolswap/contract.js";
// import getERC20Contract from "contracts/erc20/contract.js";
// const treasureMarketplace = getContract("treasure-marketplace");

import { useWalletContext } from "@atoms/walletAtom";

interface SmallCardProps {
  collection: Collection;
  listing: CollectionListingsListingDataItem;
  tokenMetadata: CollectionsMetadataDataItem;
  listIndex: number;
  //   handleBuyItem: () => void;
}
const SmallCard: FC<SmallCardProps> = ({
  collection,
  listing,
  tokenMetadata,
  listIndex,
  // handleBuyItem
}) => {
  const [open, setOpen] = useState(false);
  const { connected, account, signer } = useWalletContext();

  if (listIndex <= 0) {
    // console.log(
    //   listIndex,
    //   listing.pricePerItem,
    //   strWeiToETH(listing.pricePerItem),
    //   listing,
    //   tokenMetadata
    // );
  }

  const handleOpen = (event: SyntheticEvent<Element, Event>) => {
    setOpen(true);
    // setAnchorEl(document.body);
  };
  const handleClose = () => setOpen(false);

  //   const OrderData = {
  //     name: item.token.name,
  //     collectionAddress: item.id,
  //     tokenId: item.token.tokenId,
  //     metadata: item.token.metadata,
  //     expires: item.expires,
  //     pricePerItem: item.pricePerItem,
  //     quantity: 1,
  //     owner: item.user.id,
  //     standard: "ERC721",
  //   };

  //   const added = cart.cartContextObj.checkIfItemInCart(OrderData);
  //   const [addedState, setAddedState] = useState(added);
  const [addedState, setAddedState] = useState(false);

  const handleAddToCart = (event: SyntheticEvent<Element, Event>) => {
    // if (!added) {
    //   cart.cartContextObj.addItem(OrderData);
    setAddedState(true);

    //   alertContext.addTimedSnackbar(
    //     "standard",
    //     `${item.token.name} added to cart`,
    //     "success",
    //     3000,
    //     false
    //   );
    // }
  };

  const handleRemoveFromCart = (event: SyntheticEvent<Element, Event>) => {
    // if (added) {
    //   cart.cartContextObj.removeItem(OrderData);
    setAddedState(false);
    //   alertContext.addTimedSnackbar(
    //     "standard",
    //     `${item.token.name} removed from cart`,
    //     "success",
    //     3000,
    //     false
    //   );
    // }
  };

  const parsedList = tokenMetadata?.metadata?.image
    ? tokenMetadata?.metadata?.image.split("/")
    : [];

  const imgLink =
    parsedList.length >= 5
      ? `https://marketplace.treasure.lol/_next/image?url=https%3A%2F%2Fipfs.io%2Fipfs%2F${parsedList[2]}%2F${parsedList[3]}%2F${parsedList[4]}&w=1920&q=75`
      : "";

  const loadingImgLink = `https://marketplace.treasure.lol/_next/image?url=https%3A%2F%2Fipfs.io%2Fipfs%2FQmR87K1oY8dXL4op91A9zcz4hPmCd8JbMVDTTuUnpXyQcr%2F5774%2F5.png&w=1920&q=75`;

  const id = open ? "simple-popper" : "not-open";
  return (
    <Card sx={{ maxWidth: 128, minHeight: 128 }}>
      <Box
        sx={{
          height: 128,
          width: 128,
        }}
      >
        {imgLink !== "" ? (
          <CardMedia
            sx={{
              height: 128,
              width: 128,
            }}
            component="img"
            image={imgLink}
            // onClick={handleOpen}
          />
        ) : (
          <CardMedia
            sx={{
              height: 128,
              width: 128,
            }}
            component="img"
            image={`https://marketplace.treasure.lol/_next/image?url=https%3A%2F%2Fipfs.io%2Fipfs%2FQmR87K1oY8dXL4op91A9zcz4hPmCd8JbMVDTTuUnpXyQcr%2F5774%2F5.png&w=1920&q=75`}
            // onClick={handleOpen}
          />
        )}
      </Box>

      {collection && listing && (
        <Box sx={{ position: "relative" }}>
          {/* <ERC721Modal
            open={open}
            handleClose={handleClose}
            id={id}
            item={item}
            collection={collection}
            addedState={addedState}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          /> */}
        </Box>
      )}

      <CardContent
        style={{ paddingBottom: "10px" }}
        sx={{
          px: "0px",
          paddingBottom: "0px",
        }}
      >
        <Box
          sx={{
            marginBottom: "6px",
            px: "8px",
          }}
        >
          <Typography
            gutterBottom
            variant={"smh1" as any}
            component="div"
            sx={{
              m: "0px",
            }}
            noWrap
          >
            {listing.token.name}
          </Typography>
          <Typography variant={"smbody" as any} noWrap color="text.secondary">
            {`${strWeiToETH(listing.pricePerItem)} $MAGIC`}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "18px",
            paddingBottom: "0px",
          }}
        >
          <Box>
            <Button
              style={{
                fontSize: "0.6rem",
                padding: "0px",
                width: "60px",
              }}
              size="small"
              sx={{
                p: "0px",
                height: "22px",
                width: "64px",
              }}
              disabled={signer ? false : true}
              //   onClick={handleBuyItem}
            >
              Buy Now
            </Button>
          </Box>

          {addedState ? (
            <IconButton
              onClick={handleRemoveFromCart}
              sx={{
                py: "0px",
                px: "0px",
                marginLeft: "8px",
              }}
              aria-label="add-to-cart"
              disabled={signer ? false : true}
            >
              <RemoveShoppingCartIcon fontSize="inherit" color="primary" />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleAddToCart}
              sx={{
                py: "0px",
                px: "0px",
                marginLeft: "8px",
              }}
              aria-label="add-to-cart"
              disabled={signer ? false : true}
            >
              <AddShoppingCartIcon fontSize="inherit" color="primary" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SmallCard;
