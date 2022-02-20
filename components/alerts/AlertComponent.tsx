import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { FC } from "react";

interface AlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}

const AlertComponent: FC<AlertProps> = ({ open, setOpen, onClose }) => {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
    setOpen(false);
  };

  const action = (
    <Box>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Alert severity="error" onClose={() => {}} action={action}>
      This is an error alert — check it out!
    </Alert>
  );
};

export default AlertComponent;
