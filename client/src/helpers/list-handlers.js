const getAreasFromList = (machinesList) => {
  let areas = [];
  [...new Set(machinesList.map((item) => item.machine_location))].forEach(
    (value1, value2, set) => {
      areas.push({ label: value1, value: value1 });
    }
  );
  return areas;
};

const getMachinesFromList = (area, machinesList) => {
  const machines = machinesList
    .filter((item) => item.machine_location === area)
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

export { getAreasFromList, getMachinesFromList, getOperatorsFromList };
