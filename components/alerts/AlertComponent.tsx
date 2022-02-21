import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { FC } from "react";
import { AlertClass } from "@atoms/alertViewAtom";

interface AlertProps {
  index: number;
  onClose: () => void;
  alertObj: AlertClass;
}

const AlertComponent: FC<AlertProps> = ({ index, onClose, alertObj }) => {
  const handleClick = () => {
    // setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
    // setOpen(false);
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
      {alertObj.title ? <AlertTitle>{alertObj.title}</AlertTitle> : null}
      {alertObj.message}
    </Alert>
  );
};

export default AlertComponent;
