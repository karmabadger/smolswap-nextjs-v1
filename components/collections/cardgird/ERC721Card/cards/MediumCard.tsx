import { useState, useEffect, FC, SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import Box from "@mui/material/Box";

import { strWeiToETH } from "utils/data/erc20utils";
import { Collection } from "@graphql/generated/marketplace/react-apollo";
import {
  CollectionListingsListingDataItem,
  CollectionsMetadataDataItem,
} from "@customTypes/treasureMarketplaceQueryTypes";

interface SmallCardProps {
  collection: Collection;
  listing: CollectionListingsListingDataItem;
  tokenMetadata: CollectionsMetadataDataItem;
  listIndex: number;
  //   handleBuyItem: () => void;
}
const MediumCard: FC<SmallCardProps> = ({
  collection,
  listing,
  tokenMetadata,
  listIndex,
}) => {
  const [open, setOpen] = useState(false);

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
    <Card sx={{ maxWidth: 256, minHeight: 256 }}>
      <Box
        sx={{
          height: 256,
          width: 256,
        }}
      >
        {imgLink !== "" ? (
          <CardMedia
            sx={{
              height: 256,
              width: 256,
            }}
            component="img"
            image={imgLink}
            // onClick={handleOpen}
          />
        ) : (
          <CardMedia
            sx={{
              height: 256,
              width: 256,
            }}
            component="img"
            image={loadingImgLink}
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
        style={{ paddingBottom: "21px" }}
        sx={{
          px: "16px",
          paddingBottom: "0px",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            m: "0px",
          }}
        >
          {listing.token.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${strWeiToETH(listing.pricePerItem)} $MAGIC`}
        </Typography>

        <Box
          sx={{
            height: "37px",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "18px",
            paddingBottom: "0px",
          }}
        >
          <Button
            size="small"
            sx={{
              p: "0px",
              height: "22px",
            }}
          >
            Buy Now
          </Button>
          <Button
            size="small"
            sx={{
              p: "0px",
              height: "22px",
            }}
            onClick={handleOpen}
          >
            See details
          </Button>

          {addedState ? (
            <IconButton
              sx={{
                py: "0px",
                px: "0px",
                marginLeft: "10px",
              }}
              aria-label="add-to-cart"
              onClick={handleRemoveFromCart}
            >
              <RemoveShoppingCartIcon
                // size="large"
                fontSize="inherit"
                color="primary"
              />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                py: "0px",
                px: "0px",
                marginLeft: "10px",
              }}
              aria-label="add-to-cart"
              onClick={handleAddToCart}
            >
              <AddShoppingCartIcon
                // size="large"
                fontSize="inherit"
                color="primary"
              />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MediumCard;
