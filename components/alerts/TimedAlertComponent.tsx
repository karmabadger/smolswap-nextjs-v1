import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

interface AlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  timeout: number;
}

const AlertComponent: FC<AlertProps> = ({
  open,
  setOpen,
  onClose,
  timeout,
}) => {
  const [progress, setProgress] = useState(0);
  const progressBarActive = true;
  const progressUnit = 250;
  const progressNumUnits = timeout / progressUnit;

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

  useEffect(() => {
    setProgress(0);
    let timeElapsed = 0;
    const timer = setInterval(() => {
      if (timeElapsed >= timeout) {
        console.log("clearing timer");
        clearInterval(timer);
        onClose();
      } else {
        timeElapsed += progressUnit;
        setProgress((oldProgress) => {
          const diff = 100 / progressNumUnits;
          return Math.min(oldProgress + diff, 100);
        });
      }
    }, progressUnit);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Alert severity="error" onClose={() => {}} action={action}>
        Boxxed timed
      </Alert>
      <Box>
        {progressBarActive && (
          <LinearProgress
            sx={{
              width: "100%",
              position: "fixed",
            }}
            variant="determinate"
            value={progress}
            // color={severity}
          />
        )}
      </Box>
    </Box>
  );
};

export default AlertComponent;
