import { atom, useAtom } from "jotai";

class Alert {
  public id: number;
  public title: string;
  public message: string;
  public severity: string;
  public variant: string;
  public color: string | null;

  public timed: boolean;
  public timeout: number;
  public progressBarActive: boolean;

  public closeable: boolean;
  public undoable: boolean;
  public hasAction: boolean;

  public onClose = (): void => {};
  // public actionElement = Element;

  public static count = 0;

  constructor(
    title: string,
    message: string,
    severity: string,
    variant: string = "standard",
    color: string | null = null,
    timed: boolean = false,
    timeout: number = 3000,
    progressBarActive: boolean = false,
    closeable: boolean = false,
    undoable: boolean = false,
    hasAction: boolean = false
  ) {
    this.id = Alert.count++;

    this.title = title;
    this.message = message;
    this.severity = severity;
    this.variant = variant;
    this.color = color;

    this.timed = timed;
    this.timeout = timeout;
    this.progressBarActive = progressBarActive;

    this.closeable = closeable;
    this.undoable = undoable;
    this.hasAction = hasAction;
  }

  public clear = (): void => {};
}

class SnackBar {
  public message: string;
  public severity: string;
  public variant: string;
  public color: string | null;

  public timed: boolean;
  public timeout: number;
  public progressBarActive?: boolean;

  public closeable: boolean;
  public undoable: boolean;
  public hasAction: boolean;

  public onClose = (): void => {};
  // public actionElement = Element;
  constructor(
    message: string,
    severity: string,
    variant: string,
    color: string | null = null,
    timed: boolean = false,
    timeout: number = 3000,
    progressBarActive: boolean = false,
    closeable: boolean = false,
    undoable: boolean = false,
    hasAction: boolean = false
  ) {
    this.message = message;
    this.severity = severity;
    this.variant = variant;
    this.color = color;

    this.timed = timed;
    this.timeout = timeout;
    this.progressBarActive = progressBarActive;

    this.closeable = closeable;
    this.undoable = undoable;
    this.hasAction = hasAction;
  }
}

// class AlertView {
//   public alertList: Alert[] = [];
//   public alertComponentList: JSX.Element[] = [];
//   public snackBarList: SnackBar[] = [];
//   public snackBarComponentList: JSX.Element[] = [];

//   public removeAlert(alert: Alert): () => void {
//     return () => {
//       for (let i = 0; i < this.alertList.length; i++) {
//         if (this.alertList[i] === alert) {
//           this.alertList.splice(i, 1);
//           this.alertComponentList.splice(i, 1);
//         }
//       }
//     };
//   }

//   public addAlert(message: string, severity: string, variant: string): void {
//     const alert = new Alert(message, severity, variant);
//     this.alertList.push(alert);
//   }

//   public addTimedAlert(
//     message: string,
//     severity: string,
//     variant: string,
//     timeout: number,
//     progressBarActive: boolean
//   ): void {
//     this.alertList.push(
//       new Alert(
//         message,
//         severity,
//         variant,
//         null,
//         true,
//         timeout,
//         progressBarActive
//       )
//     );
//   }

//   public addStandardSnackBar(
//     message: string,
//     severity: string,
//     variant: string
//   ): void {
//     this.snackBarList.push(new SnackBar(message, severity, variant));
//   }

//   public addTimedSnackBar(
//     message: string,
//     severity: string,
//     variant: string,
//     timeout: number,
//     progressBarActive: boolean
//   ): void {
//     this.snackBarList.push(
//       new SnackBar(
//         message,
//         severity,
//         variant,
//         null,
//         true,
//         timeout,
//         progressBarActive
//       )
//     );
//   }
// }

// const alertViewAtom = atom<AlertView>(new AlertView());
// const useAlertView = () => {
//   const alertView = useAtom(alertViewAtom);
//   return alertView;
// };

const alertListAtom = atom<Alert[]>([]);
const useAlertList = () => {
  const alertList = useAtom(alertListAtom);
  return alertList;
};

interface AlertListObj {
  alertList: Alert[];
}
const alertListObjAtom = atom<AlertListObj>({ alertList: [] });
const useAlertListObj = () => {
  const alertListObj = useAtom(alertListObjAtom);
  return alertListObj;
};

const snackbarListAtom = atom<SnackBar[]>([]);
const useSnackBarsList = () => {
  const snackbarList = useAtom(snackbarListAtom);
  return snackbarList;
};

// export default alertViewAtom;

export {
  Alert as AlertClass,
  SnackBar as SnackBarClass,
  // AlertView,
  // useAlertView,
  alertListAtom,
  useAlertList,
  type AlertListObj,
  alertListObjAtom,
  useAlertListObj,
  snackbarListAtom,
  useSnackBarsList,
};
