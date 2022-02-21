import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { AlertClass } from "@atoms/alertViewAtom";

interface AlertProps {
  index: number;
  onClose: () => void;
  alertObj: AlertClass;
  controls: any;
}

const TimedAlertComponent: FC<AlertProps> = ({
  index,
  onClose,
  alertObj,
  controls,
}) => {
  const [progress, setProgress] = useState(0);
  const progressBarActive = true;
  const progressUnit = 250;
  const progressNumUnits = alertObj.timeout / progressUnit;

  const onClose2 = () => {
    controls.dequeue();
    console.log("dequeue2");
  };
  useEffect(() => {
    console.log(index, progress, alertObj.timeout, progress > 99);
    if (progress > 99) {
      onClose2();
    }
  }, [progress]);

  // const
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
      // console.log("timer", timeElapsed, progress, timeout);
      if (timeElapsed >= alertObj.timeout) {
        console.log("clearing timer", index);
        onClose2();
        clearInterval(timer);
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
        {alertObj.title ? <AlertTitle>{alertObj.title}</AlertTitle> : null}
        {alertObj.message}
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

export default TimedAlertComponent;
