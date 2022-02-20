import { atom, useAtom } from "jotai";

class Alert {
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
  public actionElement = Element;

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
  public actionElement = Element;
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

class AlertView {
  public alertList: Alert[] = [];
  public alertComponentList: JSX.Element[] = [];
  public snackBarList: SnackBar[] = [];
  public snackBarComponentList: JSX.Element[] = [];

  public addAlert(message: string, severity: string, variant: string): void {
    this.alertList.push(new Alert(message, severity, variant));
  }

  public addTimedAlert(
    message: string,
    severity: string,
    variant: string,
    timeout: number,
    progressBarActive: boolean
  ): void {
    this.alertList.push(
      new Alert(
        message,
        severity,
        variant,
        null,
        true,
        timeout,
        progressBarActive
      )
    );
  }

  public addStandardSnackBar(
    message: string,
    severity: string,
    variant: string
  ): void {
    this.snackBarList.push(new SnackBar(message, severity, variant));
  }

  public addTimedSnackBar(
    message: string,
    severity: string,
    variant: string,
    timeout: number,
    progressBarActive: boolean
  ): void {
    this.snackBarList.push(
      new SnackBar(
        message,
        severity,
        variant,
        null,
        true,
        timeout,
        progressBarActive
      )
    );
  }
}

const alertViewAtom = atom<AlertView>(new AlertView());

const useAlertView = () => {
  const alertView = useAtom(alertViewAtom);
  return alertView;
};

export default alertViewAtom;

export { Alert, SnackBar, AlertView, useAlertView };
