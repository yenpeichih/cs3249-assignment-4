const dashboard = Machine({
  id: "Dashboard States",
  initial: "Display",
  states: {
    method: {
      initial: "roomNotSelected",
      states: {
        roomNotSelected: {
          entry: ["checkRoomSelected"],
          on: {
            isSelected: {
              target: "roomSelected",
              actions: ["addColor", "displayGraph"],
            },
          },
        },
        roomSelected: {
          entry: ["checkRoomSelected"],
          on: {
            roomUnselected: {
              target: "roomNotSelected",
              actions: ["removeColor", "removeGraph"],
            },
          },
        },
        hist: {
          entry: ["calculateAverageTemperature"],
          type: "history",
        },
      },
      on: {
        startDateTimeChanged: {
          target: "graphUpdating",
          actions: ["setStartDateAndTime"],
        },
        EndDateTimeChanged: {
          target: "graphUpdating",
          actions: ["setEndDateAndTime"],
        },
        sampleSizeChanged: {
          target: "graphUpdating",
          actions: ["setSampleSize"],
        },
      },
    },
    graphUpdating: {
      on: {
        graphUpdated: {
          target: "Display.hist",
          actions: ["displayUpdatedGraph"],
        },
      },
    },
  },
});
