import "ts-jest";
import { IHighlightStyles, Logger, TLogLevelColor } from "../src";
import { doesLogContain } from "./helper";

const stdOut = [];
const stdErr = [];

const logger: Logger = new Logger({
  suppressStdOutput: true,
  stdOut: {
    write: (print: string) => {
      stdOut.push(print);
    },
  },
  stdErr: {
    write: (print: string) => {
      stdErr.push(print);
    },
  },
});

describe("Logger: settings", () => {
  beforeEach(() => {
    stdOut.length = 0;
    stdErr.length = 0;
  });

  test("init logger: plain", (): void => {
    const logger: Logger = new Logger();
    expect(logger instanceof Logger).toBe(true);
  });

  test("init logger: type", (): void => {
    const logger: Logger = new Logger({ type: "json" });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.type).toBe("json");
  });

  test("init logger: instanceName ", (): void => {
    const logger: Logger = new Logger({
      instanceName: "ABC",
      displayInstanceName: true,
    });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.instanceName).toBe("ABC");
  });

  test("init logger: minLevel", (): void => {
    const logger: Logger = new Logger({ minLevel: "debug" });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.minLevel).toBe("debug");
  });

  test("init logger: name", (): void => {
    const logger: Logger = new Logger({ name: "Test" });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.name).toBe("Test");
  });

  test("init logger: caller as logger name", (): void => {
    const logger: Logger = new Logger({ setCallerAsLoggerName: true });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.name).toBe("Logger");
  });

  test("init logger: exposeStack", (): void => {
    const logger: Logger = new Logger({ exposeStack: true });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.exposeStack).toBe(true);
  });

  test("init logger: suppressStdOutput", (): void => {
    const logger: Logger = new Logger({ suppressStdOutput: true });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.suppressStdOutput).toBe(true);
  });

  test("init logger: overwriteConsole", (): void => {
    const logger: Logger = new Logger({ overwriteConsole: true });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.overwriteConsole).toBe(true);
  });

  test("init logger: logLevelsColors", (): void => {
    const logLevelsColors: TLogLevelColor = {
      0: "whiteBright",
      1: "bgRed",
      2: "yellowBright",
      3: "bgBlueBright",
      4: "greenBright",
      5: "gray",
      6: "bgCyanBright",
    };
    const logger: Logger = new Logger({
      logLevelsColors,
    });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.logLevelsColors[0]).toBe(logLevelsColors[0]);
    expect(logger.settings.logLevelsColors[1]).toBe(logLevelsColors[1]);
    expect(logger.settings.logLevelsColors[2]).toBe(logLevelsColors[2]);
    expect(logger.settings.logLevelsColors[3]).toBe(logLevelsColors[3]);
    expect(logger.settings.logLevelsColors[4]).toBe(logLevelsColors[4]);
    expect(logger.settings.logLevelsColors[5]).toBe(logLevelsColors[5]);
    expect(logger.settings.logLevelsColors[6]).toBe(logLevelsColors[6]);
  });

  test("init logger: prettyInspectHighlightStyles", (): void => {
    const highlightStyles: IHighlightStyles = {
      name: "blueBright",
      special: "redBright",
      number: "greenBright",
      bigint: "bgBlueBright",
      boolean: "bgBlue",
      undefined: "bgBlack",
      null: "bgMagentaBright",
      string: "bgRed",
      symbol: "black",
      date: "bgGreenBright",
      regexp: "reset",
      module: "hidden",
    };

    const logger: Logger = new Logger({
      prettyInspectHighlightStyles: highlightStyles,
    });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.prettyInspectHighlightStyles.name).toBe(
      highlightStyles.name
    );
    expect(logger.settings.prettyInspectHighlightStyles.special).toBe(
      highlightStyles.special
    );
    expect(logger.settings.prettyInspectHighlightStyles.number).toBe(
      highlightStyles.number
    );
    expect(logger.settings.prettyInspectHighlightStyles.bigint).toBe(
      highlightStyles.bigint
    );
    expect(logger.settings.prettyInspectHighlightStyles.boolean).toBe(
      highlightStyles.boolean
    );
    expect(logger.settings.prettyInspectHighlightStyles.undefined).toBe(
      highlightStyles.undefined
    );
    expect(logger.settings.prettyInspectHighlightStyles.null).toBe(
      highlightStyles.null
    );
    expect(logger.settings.prettyInspectHighlightStyles.string).toBe(
      highlightStyles.string
    );
    expect(logger.settings.prettyInspectHighlightStyles.symbol).toBe(
      highlightStyles.symbol
    );
    expect(logger.settings.prettyInspectHighlightStyles.date).toBe(
      highlightStyles.date
    );
    expect(logger.settings.prettyInspectHighlightStyles.regexp).toBe(
      highlightStyles.regexp
    );
    expect(logger.settings.prettyInspectHighlightStyles.module).toBe(
      highlightStyles.module
    );
  });

  /* date time */

  /* dateTimePattern */
  test("init logger: dateTimePattern: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");

    const month = new Date().getMonth() + 1;
    const monthStr = month < 10 ? "0" + month : month.toString();
    expect(
      doesLogContain(
        stdArray,
        new Date().getFullYear().toString() + "-" + monthStr
      )
    ).toBeTruthy();
  });

  test("init logger: dateTimePattern: day.month.year", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      dateTimePattern: "day.month.year",
    });
    logger.info("test 123");

    const month = new Date().getMonth() + 1;
    const monthStr = month < 10 ? "0" + month : month.toString();
    expect(
      doesLogContain(
        stdArray,
        monthStr + "." + new Date().getFullYear().toString()
      )
    ).toBeTruthy();
  });

  /* dateTimeTimezone */
  test("init logger: dateTimeTimezone: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");

    const [
      ,
      ,
      ,
      ,
      ,
      ,
      { value: hour },
      ,
      { value: minute },
    ] = new Intl.DateTimeFormat("en", {
      weekday: undefined,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "utc",
    }).formatToParts(new Date());
    expect(doesLogContain(stdArray, `${hour}:${minute}`)).toBeTruthy();
  });

  test("init logger: dateTimeTimezone: Europe/Berlin", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const timezone: string = "Europe/Berlin";
    const logger: Logger = new Logger({
      stdOut: std,
      dateTimeTimezone: timezone,
    });
    logger.info("test 123");

    const [
      ,
      ,
      ,
      ,
      ,
      ,
      { value: hour },
      ,
      { value: minute },
    ] = new Intl.DateTimeFormat("en", {
      weekday: undefined,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timezone,
    }).formatToParts(new Date());
    expect(doesLogContain(stdArray, `${hour}:${minute}`)).toBeTruthy();
  });

  /* printLogMessageInNewLine */
  test("init logger: printLogMessageInNewLine: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");
    expect(stdArray[3]).toBe("  \t");
  });

  test("init logger: printLogMessageInNewLine: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      printLogMessageInNewLine: true,
    });
    logger.info("test 123");
    expect(stdArray[3]).toBe("\n");
  });

  test("init logger: printLogMessageInNewLine: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      printLogMessageInNewLine: false,
    });
    logger.info("test 123");
    expect(stdArray[3]).toBe("  \t");
  });

  /* display settings */

  /* displayDateTime */
  test("init logger: displayDateTime: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");
    expect(
      doesLogContain(stdArray, new Date().getFullYear().toString())
    ).toBeTruthy();
  });

  test("init logger: displayDateTime: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, displayDateTime: true });
    logger.info("test 123");
    expect(
      doesLogContain(stdArray, new Date().getFullYear().toString())
    ).toBeTruthy();
  });

  test("init logger: displayDateTime: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, displayDateTime: false });
    logger.info("test 123");
    expect(
      doesLogContain(stdArray, new Date().getFullYear().toString())
    ).toBeFalsy();
  });

  /* displayLogLevel */
  test("init logger: displayLogLevel: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "INFO")).toBeTruthy();
  });

  test("init logger: displayLogLevel: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, displayLogLevel: true });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "INFO")).toBeTruthy();
  });

  test("init logger: displayLogLevel: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, displayLogLevel: false });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "INFO")).toBeFalsy();
  });

  /* displayInstanceName */
  test("init logger: displayInstanceName: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, instanceName: "name" });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "@name")).toBeFalsy();
  });

  test("init logger: displayInstanceName: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayInstanceName: true,
      instanceName: "name",
    });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "@name")).toBeTruthy();
  });

  test("init logger: displayInstanceName: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayInstanceName: false,
      instanceName: "name",
    });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "@name")).toBeFalsy();
  });

  /* displayLoggerName */
  test("init logger: displayLoggerName: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std, name: "name" });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "name")).toBeTruthy();
  });

  test("init logger: displayLoggerName: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayLoggerName: true,
      name: "name",
    });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "name")).toBeTruthy();
  });

  test("init logger: displayLoggerName: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayLoggerName: false,
      name: "name",
    });
    logger.info("test 123");
    expect(doesLogContain(stdArray, "name")).toBeFalsy();
  });

  /* displayFunctionName */
  test("init logger: displayFunctionName: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    function fnctn() {
      logger.info("test 123");
    }
    fnctn();
    expect(doesLogContain(stdArray, "fnctn")).toBeTruthy();
  });

  test("init logger: displayFunctionName: true", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayFunctionName: true,
    });
    function fnctn() {
      logger.info("test 123");
    }
    fnctn();
    expect(doesLogContain(stdArray, "fnctn")).toBeTruthy();
  });

  test("init logger: displayFunctionName: false", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayFunctionName: false,
    });
    function fnctn() {
      logger.info("test 123");
    }
    fnctn();
    expect(doesLogContain(stdArray, "fnctn")).toBeFalsy();
  });

  /* displayFilePath */
  test("init logger: displayFilePath: default", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({ stdOut: std });
    logger.info("test 123");

    expect(doesLogContain(stdArray, "settings.test.ts")).toBeTruthy();
  });

  test("init logger: displayFilePath: hidden", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayFilePath: "hidden",
    });
    logger.info("test 123");

    expect(doesLogContain(stdArray, "settings.test.ts")).toBeFalsy();
  });

  test("init logger: displayFilePath: displayAll", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayFilePath: "displayAll",
    });
    logger.info("test 123");

    expect(doesLogContain(stdArray, "settings.test.ts")).toBeTruthy();
  });

  test("init logger: displayFilePath: hideNodeModulesOnly (not node_modules)", (): void => {
    const stdArray: string[] = [];
    const std: { write: (print: string) => void } = {
      write: (print: string) => {
        stdArray.push(print);
      },
    };
    const logger: Logger = new Logger({
      stdOut: std,
      displayFilePath: "hideNodeModulesOnly",
    });
    logger.info("test 123");

    expect(doesLogContain(stdArray, "settings.test.ts")).toBeTruthy();
  });

  /* Std */
  test("init logger: stdOut", (): void => {
    const std: { write: () => void } = { write: () => {} };
    const logger: Logger = new Logger({ stdOut: std });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.stdOut).toBe(std);
  });

  test("init logger: stdErr", (): void => {
    const std: { write: () => void } = { write: () => {} };
    const logger: Logger = new Logger({ stdErr: std });
    expect(logger instanceof Logger).toBe(true);
    expect(logger.settings.stdErr).toBe(std);
  });
});
