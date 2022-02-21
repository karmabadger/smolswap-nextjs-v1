import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { FC } from "react";

interface SettingsButtonProps {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openArg: boolean) => void;
}
const SettingsButton: FC<SettingsButtonProps> = ({
  openSettingsModal,
  setOpenSettingsModal,
}) => {
  const handleClick = () => {
    setOpenSettingsModal(true);
  };

  return (
    <Tooltip title="Setting" arrow>
      <IconButton
        color="secondary"
        aria-label="shopping cart checkout"
        sx={{ p: "12px", mx: "5px" }}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SettingsButton;
