const getMachineLocationsFromList = (machinesList) => {
  let areas = [];
  [...new Set(machinesList.map((item) => item.machine_location))].forEach(
    (value1, value2, set) => {
      areas.push({ label: value1, value: value1 });
    }
  );
  return areas;
};

const getMachineGroupsFromList = (location, machinesList) => {
  const machineGroups = [];
  [
    ...new Set(
      machinesList
        .filter((item) => item.machine_location === location)
        .map((item) => item.machine_group)
    ),
  ].forEach((value1, value2, set) => {
    machineGroups.push({ label: value1, value: value1 });
  });
  return machineGroups;
};

const getMachinesFromList = (location, group, machinesList) => {
  const machines = machinesList
    .filter(
      (item) =>
        item.machine_location === location && item.machine_group === group
    )
    .map(({ id, machine_name }) => {
      return { label: machine_name, value: id };
    });
  return machines;
};

const getOperatorsFromList = (operatorsList) => {
  const operators = operatorsList.map(({ id, name }) => {
    return { label: name, value: id };
  });
  return operators;
};

export {
  getMachineLocationsFromList,
  getMachineGroupsFromList,
  getMachinesFromList,
  getOperatorsFromList,
};
