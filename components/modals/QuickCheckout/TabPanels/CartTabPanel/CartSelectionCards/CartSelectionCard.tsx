import { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import Checkbox from "@mui/material/Checkbox";

import { strWeiToETH, strETHToWei } from "utils/data/erc20utils";
// import smol from "./smol.png";

interface CartSelectionCardProps {
  listing: any;
  value: any;
  index: number;
  handleToggle: any;
  selectedList: any;
  setSelectedList: any;
}
const CartSelectionCard: FC<CartSelectionCardProps> = ({
  handleToggle,
  value,
  listing,
  index,
  selectedList,
  setSelectedList,
}) => {
  const theme = useTheme();

  const handleRemoveFromCart = () => {
    // console.log("remove from cart", item);
    // // remove from cart
    // cart.cartContextObj.removeItem(item);
    // const newSelectedList = [];
    // for (let i = 0; i < selectedList.length; i++) {
    //   if (i !== index) {
    //     newSelectedList.push(selectedList[i]);
    //   }
    // }
    // setSelectedList(newSelectedList);
  };

  const handleMaxPricePerItemChange = (event: React.SyntheticEvent | Event) => {
    const target = event.target as HTMLInputElement;
    // console.log(
    //   "max price per item change",
    //   typeof target.value,
    //   strETHToWei(target.value)
    // );

    listing.maxPricePerItem = strETHToWei(target.value);
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          sx={{
            // height: "100%",
            height: "84px",
          }}
          image={""}
          alt="img of NFT"
        />
      </Box>
      <Box
        sx={{
          flexGrow: "1",
          height: "84px",
        }}
      >
        <CardContent
          style={{
            paddingBottom: "0px",
          }}
          sx={{
            py: 0,
            height: "100%",
            // display: "flex", flexDirection: "column", justifyContent: "center"
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                width: "256px",
                minWidth: "256px",
                flexGrow: "0",
                flexShrink: "0",
                marginLeft: "4px",
                marginRight: "4px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "0.9rem",
                }}
                // component="div"
                variant="h6"
                noWrap
              >
                {listing.name}
              </Typography>
              <Typography
                style={{
                  fontSize: "0.75rem",
                }}
                // variant="subtitle1"
                color="text.secondary"
                // component="div"
                noWrap
              >
                {`${strWeiToETH(listing.pricePerItem)} $MAGIC`}
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: "6",
                minWidth: "100px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Max Price Per Item"
                size="small"
                id="standard-size-normal"
                defaultValue={strWeiToETH(listing.maxPricePerItem)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  width: "100%",
                }}
                onChange={handleMaxPricePerItemChange}
              />
            </Box>

            <Box
              sx={{
                width: "100px",
                minWidth: "90px",
                flexGrow: "1",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {listing.standard === "ERC721" ? (
                <TextField
                  label="Quantity"
                  size="small"
                  id="standard-size-normal"
                  defaultValue="1"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              ) : (
                <TextField
                  label="Quantity"
                  size="small"
                  id="standard-size-normal"
                  defaultValue="1"
                  // disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleRemoveFromCart}
              >
                <RemoveShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CartSelectionCard;
