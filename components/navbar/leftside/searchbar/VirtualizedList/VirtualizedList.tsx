import { FC } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Typography from "@mui/material/Typography";

import { styled, useTheme } from "@mui/material/styles";

import { collectionNameToPath } from "@utils/data/collectionData";
import { Collection } from "@graphql/generated/next/react-apollo";
import Link from "next/link";

const StyledBox = styled(Box)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
}));

interface VirtualizedListProps {
  widthValue: number;
  collections: Collection[];
}

const VirtualizedList: FC<VirtualizedListProps> = ({
  widthValue,
  collections,
}) => {
  console.log("VLIST", collections, widthValue);
  const theme = useTheme();
  const baseRoute = process.env.NEXT_PUBLIC_BASE_ROUTE;

  return (
    <StyledBox
      style={{ margin: "0px" }}
      sx={{
        margin: "0px",
        bgcolor: "background.paper",
        zIndex: theme.zIndex.modal,
      }}
    >
      <List
        sx={{
          width: widthValue,
          p: "0px",
        }}
      >
        {collections.map((collection, index) => (
          <ListItem button sx={{ paddingLeft: "48px" }} key={index}>
            <Link
              href={`${baseRoute}collection/${collectionNameToPath(
                collection.name
              )}`}
              passHref
            >
              <a>
                <Typography variant="body2">{collection.name}</Typography>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
};

export default VirtualizedList;
